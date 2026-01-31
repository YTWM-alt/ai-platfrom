from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class Entity(BaseModel):
    id: str
    name: str
    type: str
    properties: dict = {}

class Relation(BaseModel):
    id: str
    sourceId: str
    targetId: str
    type: str
    properties: dict = {}

class GraphData(BaseModel):
    documentId: str
    entities: List[Entity]
    relations: List[Relation]

graph_store: dict = {}

@router.post("")
async def store_graph(data: GraphData):
    """存储知识图谱数据到图数据库"""
    graph_store[data.documentId] = {
        "entities": [e.dict() for e in data.entities],
        "relations": [r.dict() for r in data.relations]
    }
    return {
        "message": "图谱存储成功",
        "documentId": data.documentId,
        "entityCount": len(data.entities),
        "relationCount": len(data.relations)
    }

@router.get("/{document_id}")
async def get_graph(document_id: str):
    """获取文档的知识图谱"""
    if document_id not in graph_store:
        raise HTTPException(status_code=404, detail="图谱不存在")
    return {"documentId": document_id, **graph_store[document_id]}

@router.delete("/{document_id}")
async def delete_graph(document_id: str):
    """删除文档的知识图谱"""
    if document_id in graph_store:
        del graph_store[document_id]
    return {"message": "图谱删除成功", "documentId": document_id}

@router.get("/{document_id}/entities")
async def get_entities(document_id: str, entity_type: Optional[str] = None):
    """获取实体列表"""
    if document_id not in graph_store:
        raise HTTPException(status_code=404, detail="图谱不存在")
    
    entities = graph_store[document_id]["entities"]
    if entity_type:
        entities = [e for e in entities if e["type"] == entity_type]
    return {"entities": entities}

@router.get("/{document_id}/relations")
async def get_relations(document_id: str, relation_type: Optional[str] = None):
    """获取关系列表"""
    if document_id not in graph_store:
        raise HTTPException(status_code=404, detail="图谱不存在")
    
    relations = graph_store[document_id]["relations"]
    if relation_type:
        relations = [r for r in relations if r["type"] == relation_type]
    return {"relations": relations}

@router.post("/query")
async def query_graph(query: str, document_id: Optional[str] = None):
    """图谱查询 - 查找相关实体和关系"""
    results = []
    
    search_scope = {document_id: graph_store[document_id]} if document_id else graph_store
    
    for doc_id, graph_data in search_scope.items():
        for entity in graph_data.get("entities", []):
            if query.lower() in entity["name"].lower():
                results.append({
                    "type": "entity",
                    "documentId": doc_id,
                    "data": entity
                })
    
    return {"query": query, "results": results}
