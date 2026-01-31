from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from app.services.hybrid_search import HybridSearchService

router = APIRouter()
search_service = HybridSearchService()

class SearchQuery(BaseModel):
    query: str
    limit: int = 10
    filters: Optional[dict] = None

class SearchResult(BaseModel):
    id: str
    documentId: str
    content: str
    score: float
    source: str
    database: str

class SearchResponse(BaseModel):
    query: str
    results: List[SearchResult]
    totalCount: int

@router.post("", response_model=SearchResponse)
async def hybrid_search(search_query: SearchQuery):
    """
    混合搜索接口 - 从多个数据库联合检索
    - 向量数据库: 语义相似度匹配
    - 图数据库: 知识关系查询
    - 结构化数据库: 元数据过滤
    - 非结构化数据库: 全文检索
    """
    results = await search_service.search(
        query=search_query.query,
        limit=search_query.limit,
        filters=search_query.filters
    )
    
    return SearchResponse(
        query=search_query.query,
        results=results,
        totalCount=len(results)
    )

@router.post("/vector")
async def vector_search(search_query: SearchQuery):
    """仅从向量数据库搜索"""
    results = await search_service.vector_search(
        query=search_query.query,
        limit=search_query.limit
    )
    return {"results": results, "database": "vector"}

@router.post("/graph")
async def graph_search(search_query: SearchQuery):
    """仅从图数据库搜索"""
    results = await search_service.graph_search(
        query=search_query.query,
        limit=search_query.limit
    )
    return {"results": results, "database": "graph"}

@router.post("/fulltext")
async def fulltext_search(search_query: SearchQuery):
    """全文检索"""
    results = await search_service.fulltext_search(
        query=search_query.query,
        limit=search_query.limit
    )
    return {"results": results, "database": "fulltext"}
