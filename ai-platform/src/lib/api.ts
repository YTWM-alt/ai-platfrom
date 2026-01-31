const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Document {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  chunkCount: number;
  createdAt: string;
  status: string;
}

export interface SearchResult {
  id: string;
  documentId: string;
  content: string;
  score: number;
  source: string;
  database: string;
}

export const api = {
  async uploadDocument(file: File): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('上传失败');
    }

    return response.json();
  },

  async getDocuments(): Promise<Document[]> {
    const response = await fetch(`${API_BASE_URL}/documents`);
    if (!response.ok) {
      throw new Error('获取文档列表失败');
    }
    return response.json();
  },

  async getDocument(id: string): Promise<Document> {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`);
    if (!response.ok) {
      throw new Error('获取文档失败');
    }
    return response.json();
  },

  async deleteDocument(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('删除文档失败');
    }
  },

  async search(query: string, limit: number = 10): Promise<SearchResult[]> {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, limit }),
    });

    if (!response.ok) {
      throw new Error('搜索失败');
    }

    const data = await response.json();
    return data.results;
  },

  async vectorSearch(query: string): Promise<SearchResult[]> {
    const response = await fetch(`${API_BASE_URL}/search/vector`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data.results;
  },

  async graphSearch(query: string): Promise<SearchResult[]> {
    const response = await fetch(`${API_BASE_URL}/search/graph`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data.results;
  },
};

export default api;
