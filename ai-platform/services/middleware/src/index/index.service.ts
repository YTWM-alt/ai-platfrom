import { Injectable } from '@nestjs/common';

export interface DocumentIndex {
  documentId: string;
  keywords: string[];
  summary: string;
  createdAt: Date;
}

@Injectable()
export class IndexService {
  private indices: Map<string, DocumentIndex> = new Map();

  async createIndex(documentId: string, content: string): Promise<DocumentIndex> {
    const keywords = this.extractKeywords(content);
    const summary = this.generateSummary(content);

    const index: DocumentIndex = {
      documentId,
      keywords,
      summary,
      createdAt: new Date(),
    };

    this.indices.set(documentId, index);
    return index;
  }

  extractKeywords(content: string): string[] {
    const words = content
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fa5]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);

    const frequency: Map<string, number> = new Map();
    words.forEach(word => {
      frequency.set(word, (frequency.get(word) || 0) + 1);
    });

    return Array.from(frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word]) => word);
  }

  generateSummary(content: string, maxLength: number = 200): string {
    const sentences = content.split(/[。！？.!?]/);
    let summary = '';
    
    for (const sentence of sentences) {
      if (summary.length + sentence.length <= maxLength) {
        summary += sentence + '。';
      } else {
        break;
      }
    }

    return summary || content.substring(0, maxLength) + '...';
  }

  async getIndex(documentId: string): Promise<DocumentIndex | null> {
    return this.indices.get(documentId) || null;
  }

  async deleteIndex(documentId: string): Promise<boolean> {
    return this.indices.delete(documentId);
  }
}
