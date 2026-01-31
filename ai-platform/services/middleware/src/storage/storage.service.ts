import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StorageService {
  private readonly BACKEND_URL = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async storeDocument(documentData: any): Promise<any> {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.BACKEND_URL}/api/documents`,
        documentData,
      );
      return response.data;
    } catch (error) {
      console.error('存储文档失败:', error);
      throw error;
    }
  }

  async storeChunks(documentId: string, chunks: any[]): Promise<any> {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.BACKEND_URL}/api/documents/${documentId}/chunks`,
        { chunks },
      );
      return response.data;
    } catch (error) {
      console.error('存储分块失败:', error);
      throw error;
    }
  }

  async storeVectorEmbeddings(documentId: string, embeddings: any[]): Promise<any> {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.BACKEND_URL}/api/vectors`,
        { documentId, embeddings },
      );
      return response.data;
    } catch (error) {
      console.error('存储向量失败:', error);
      throw error;
    }
  }

  async storeKnowledgeGraph(documentId: string, entities: any[], relations: any[]): Promise<any> {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.BACKEND_URL}/api/graph`,
        { documentId, entities, relations },
      );
      return response.data;
    } catch (error) {
      console.error('存储知识图谱失败:', error);
      throw error;
    }
  }

  async queryBackend(query: string): Promise<any> {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.BACKEND_URL}/api/search`,
        { query },
      );
      return response.data;
    } catch (error) {
      console.error('查询后台失败:', error);
      throw error;
    }
  }
}
