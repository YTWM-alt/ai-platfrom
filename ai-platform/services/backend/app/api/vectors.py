from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class VectorEmbedding(BaseModel):
    id: str
    documentId: str
    chunkId: str
    embedding: List[float]
    content: str

class VectorCreate(BaseModel):
    documentId: str
    embeddings: List[VectorEmbedding]

vectors_store: dict = {}

@router.post("")
async def store_vectors(data: VectorCreate):
    """存储向量嵌入到向量数据库"""
    if data.documentId not in vectors_store:
        vectors_store[data.documentId] = []
    
    vectors_store[data.documentId].extend([e.dict() for e in data.embeddings])
    
    return {
        "message": "向量存储成功",
        "documentId": data.documentId,
        "count": len(data.embeddings)
    }

@router.get("/{document_id}")
async def get_vectors(document_id: str):
    """获取文档的所有向量"""
    if document_id not in vectors_store:
        raise HTTPException(status_code=404, detail="文档向量不存在")
    return {"documentId": document_id, "vectors": vectors_store[document_id]}

@router.delete("/{document_id}")
async def delete_vectors(document_id: str):
    """删除文档的所有向量"""
    if document_id in vectors_store:
        del vectors_store[document_id]
    return {"message": "向量删除成功", "documentId": document_id}

@router.post("/similarity")
async def similarity_search(query_embedding: List[float], limit: int = 10):
    """向量相似度搜索"""
    results = []
    for doc_id, embeddings in vectors_store.items():
        for emb in embeddings:
            score = cosine_similarity(query_embedding, emb["embedding"])
            results.append({
                "documentId": doc_id,
                "chunkId": emb["chunkId"],
                "content": emb["content"],
                "score": score
            })
    
    results.sort(key=lambda x: x["score"], reverse=True)
    return {"results": results[:limit]}

def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """计算余弦相似度"""
    import math
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    norm1 = math.sqrt(sum(a * a for a in vec1))
    norm2 = math.sqrt(sum(b * b for b in vec2))
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return dot_product / (norm1 * norm2)
