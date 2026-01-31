from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()

class SystemStats(BaseModel):
    totalDocuments: int
    totalChunks: int
    totalVectors: int
    totalEntities: int
    totalRelations: int
    lastUpdated: datetime

@router.get("/stats", response_model=SystemStats)
async def get_system_stats():
    """获取系统统计信息"""
    from app.api.documents import documents_store
    from app.api.vectors import vectors_store
    from app.api.graph import graph_store
    
    total_chunks = sum(len(doc.get("chunks", [])) for doc in documents_store.values())
    total_vectors = sum(len(vecs) for vecs in vectors_store.values())
    total_entities = sum(len(g.get("entities", [])) for g in graph_store.values())
    total_relations = sum(len(g.get("relations", [])) for g in graph_store.values())
    
    return SystemStats(
        totalDocuments=len(documents_store),
        totalChunks=total_chunks,
        totalVectors=total_vectors,
        totalEntities=total_entities,
        totalRelations=total_relations,
        lastUpdated=datetime.now()
    )

@router.post("/clear")
async def clear_all_data():
    """清空所有数据"""
    from app.api.documents import documents_store
    from app.api.vectors import vectors_store
    from app.api.graph import graph_store
    
    documents_store.clear()
    vectors_store.clear()
    graph_store.clear()
    
    return {"message": "所有数据已清空"}

@router.get("/databases")
async def get_database_status():
    """获取各数据库连接状态"""
    return {
        "postgresql": {"status": "mock", "description": "结构化数据库"},
        "mongodb": {"status": "mock", "description": "非结构化数据库"},
        "milvus": {"status": "mock", "description": "向量数据库"},
        "neo4j": {"status": "mock", "description": "图数据库"}
    }

@router.post("/reindex/{document_id}")
async def reindex_document(document_id: str):
    """重新索引文档"""
    from app.api.documents import documents_store
    
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="文档不存在")
    
    return {"message": "文档重新索引成功", "documentId": document_id}
