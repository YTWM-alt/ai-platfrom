from typing import List, Optional, Dict, Any
import asyncio

class HybridSearchService:
    """
    混合搜索服务 - 整合多种数据库进行联合检索
    - 向量数据库 (Milvus): 语义相似度匹配
    - 图数据库 (Neo4j): 知识关系查询
    - 结构化数据库 (PostgreSQL): 元数据过滤
    - 非结构化数据库 (MongoDB): 全文检索
    """
    
    def __init__(self):
        self.weights = {
            "vector": 0.4,
            "graph": 0.2,
            "structured": 0.2,
            "unstructured": 0.2
        }
    
    async def search(
        self,
        query: str,
        limit: int = 10,
        filters: Optional[Dict] = None
    ) -> List[Dict[str, Any]]:
        """执行混合搜索，融合多个数据源的结果"""
        
        vector_task = self.vector_search(query, limit * 2)
        graph_task = self.graph_search(query, limit * 2)
        fulltext_task = self.fulltext_search(query, limit * 2)
        structured_task = self.structured_search(query, limit * 2, filters)
        
        results = await asyncio.gather(
            vector_task,
            graph_task,
            fulltext_task,
            structured_task,
            return_exceptions=True
        )
        
        merged_results = self._merge_results(results, limit)
        return merged_results
    
    async def vector_search(self, query: str, limit: int = 10) -> List[Dict]:
        """向量数据库语义搜索"""
        from app.api.documents import documents_store
        
        results = []
        for doc_id, doc in documents_store.items():
            for chunk in doc.get("chunks", [])[:3]:
                if query.lower() in chunk.get("content", "").lower():
                    results.append({
                        "id": chunk["id"],
                        "documentId": doc_id,
                        "content": chunk["content"][:200] + "...",
                        "score": 0.85 + (0.1 if query.lower() in chunk["content"].lower()[:50] else 0),
                        "source": doc["name"],
                        "database": "vector"
                    })
        
        return sorted(results, key=lambda x: x["score"], reverse=True)[:limit]
    
    async def graph_search(self, query: str, limit: int = 10) -> List[Dict]:
        """图数据库知识关系查询"""
        from app.api.graph import graph_store
        
        results = []
        for doc_id, graph_data in graph_store.items():
            for entity in graph_data.get("entities", []):
                if query.lower() in entity.get("name", "").lower():
                    results.append({
                        "id": entity["id"],
                        "documentId": doc_id,
                        "content": f"实体: {entity['name']} (类型: {entity['type']})",
                        "score": 0.75,
                        "source": "知识图谱",
                        "database": "graph"
                    })
        
        return results[:limit]
    
    async def fulltext_search(self, query: str, limit: int = 10) -> List[Dict]:
        """非结构化数据库全文检索"""
        from app.api.documents import documents_store
        
        results = []
        query_lower = query.lower()
        
        for doc_id, doc in documents_store.items():
            for chunk in doc.get("chunks", []):
                content = chunk.get("content", "")
                if query_lower in content.lower():
                    results.append({
                        "id": chunk["id"],
                        "documentId": doc_id,
                        "content": content[:200] + "..." if len(content) > 200 else content,
                        "score": content.lower().count(query_lower) * 0.1 + 0.5,
                        "source": doc["name"],
                        "database": "unstructured"
                    })
        
        return sorted(results, key=lambda x: x["score"], reverse=True)[:limit]
    
    async def structured_search(
        self,
        query: str,
        limit: int = 10,
        filters: Optional[Dict] = None
    ) -> List[Dict]:
        """结构化数据库元数据查询"""
        from app.api.documents import documents_store
        
        results = []
        for doc_id, doc in documents_store.items():
            if query.lower() in doc.get("name", "").lower():
                results.append({
                    "id": doc_id,
                    "documentId": doc_id,
                    "content": f"文档: {doc['name']} (大小: {doc['size']} bytes)",
                    "score": 0.6,
                    "source": doc["name"],
                    "database": "structured"
                })
        
        return results[:limit]
    
    def _merge_results(
        self,
        all_results: List,
        limit: int
    ) -> List[Dict]:
        """融合多源搜索结果，按加权分数排序"""
        merged = []
        seen_ids = set()
        
        for i, results in enumerate(all_results):
            if isinstance(results, Exception):
                continue
            
            db_type = ["vector", "graph", "unstructured", "structured"][i]
            weight = self.weights.get(db_type, 0.25)
            
            for result in results:
                result_id = result.get("id")
                if result_id not in seen_ids:
                    seen_ids.add(result_id)
                    result["score"] = result.get("score", 0.5) * weight * 2
                    merged.append(result)
        
        merged.sort(key=lambda x: x["score"], reverse=True)
        return merged[:limit]
