import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { v4 as uuidv4 } from 'uuid';
import * as pdfParse from 'pdf-parse';

export interface DocumentChunk {
  id: string;
  documentId: string;
  content: string;
  chunkIndex: number;
  metadata: {
    page?: number;
    section?: string;
  };
}

export interface ProcessedDocument {
  id: string;
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  chunks: DocumentChunk[];
  createdAt: Date;
  status: 'processing' | 'indexed' | 'error';
}

@Injectable()
export class DocumentService {
  private documents: Map<string, ProcessedDocument> = new Map();
  private readonly BACKEND_URL = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async processDocument(file: Express.Multer.File): Promise<ProcessedDocument> {
    const documentId = uuidv4();
    
    try {
      let textContent = '';
      
      if (file.mimetype === 'application/pdf') {
        const pdfData = await pdfParse(file.buffer);
        textContent = pdfData.text;
      } else {
        textContent = file.buffer.toString('utf-8');
      }

      const chunks = this.splitDocument(textContent, documentId);

      const document: ProcessedDocument = {
        id: documentId,
        name: file.originalname,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        chunks,
        createdAt: new Date(),
        status: 'processing',
      };

      this.documents.set(documentId, document);

      await this.sendToBackend(document);

      document.status = 'indexed';
      return document;
    } catch (error) {
      throw new HttpException(
        `文档处理失败: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  splitDocument(text: string, documentId: string): DocumentChunk[] {
    const chunks: DocumentChunk[] = [];
    const paragraphs = text.split(/\n\n+/);
    
    let chunkIndex = 0;
    let currentChunk = '';
    const maxChunkSize = 1000;

    for (const paragraph of paragraphs) {
      if (currentChunk.length + paragraph.length > maxChunkSize && currentChunk) {
        chunks.push({
          id: uuidv4(),
          documentId,
          content: currentChunk.trim(),
          chunkIndex: chunkIndex++,
          metadata: {},
        });
        currentChunk = paragraph;
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      }
    }

    if (currentChunk.trim()) {
      chunks.push({
        id: uuidv4(),
        documentId,
        content: currentChunk.trim(),
        chunkIndex: chunkIndex++,
        metadata: {},
      });
    }

    return chunks;
  }

  async sendToBackend(document: ProcessedDocument): Promise<void> {
    try {
      await this.httpService.axiosRef.post(
        `${this.BACKEND_URL}/api/documents`,
        {
          id: document.id,
          name: document.name,
          size: document.size,
          mimeType: document.mimeType,
          chunks: document.chunks,
        },
      );
    } catch (error) {
      console.error('发送到后台失败:', error.message);
    }
  }

  async getAllDocuments(): Promise<ProcessedDocument[]> {
    return Array.from(this.documents.values());
  }

  async getDocument(id: string): Promise<ProcessedDocument | null> {
    return this.documents.get(id) || null;
  }

  async deleteDocument(id: string): Promise<boolean> {
    try {
      await this.httpService.axiosRef.delete(
        `${this.BACKEND_URL}/api/documents/${id}`,
      );
      return this.documents.delete(id);
    } catch (error) {
      console.error('删除文档失败:', error.message);
      return this.documents.delete(id);
    }
  }

  async getDocumentChunks(id: string): Promise<DocumentChunk[]> {
    const document = this.documents.get(id);
    return document?.chunks || [];
  }
}
