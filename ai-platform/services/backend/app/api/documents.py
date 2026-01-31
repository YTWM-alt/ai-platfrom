from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

router = APIRouter()

class ChunkModel(BaseModel):
    id: str
    documentId: str
    content: str
    chunkIndex: int
    metadata: dict = {}

class DocumentCreate(BaseModel):
    id: str
    name: str
    size: int
    mimeType: str
    chunks: List[ChunkModel]

class DocumentResponse(BaseModel):
    id: str
    name: str
    size: int
    mimeType: str
    chunkCount: int
    createdAt: datetime
    status: str

documents_store: dict = {}

@router.post("", response_model=DocumentResponse)
async def create_document(document: DocumentCreate):
    doc_data = {
        "id": document.id,
        "name": document.name,
        "size": document.size,
        "mimeType": document.mimeType,
        "chunks": [chunk.dict() for chunk in document.chunks],
        "chunkCount": len(document.chunks),
        "createdAt": datetime.now(),
        "status": "indexed"
    }
    documents_store[document.id] = doc_data
    return DocumentResponse(**doc_data)

@router.get("", response_model=List[DocumentResponse])
async def list_documents():
    return [DocumentResponse(**doc) for doc in documents_store.values()]

@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(document_id: str):
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="文档不存在")
    return DocumentResponse(**documents_store[document_id])

@router.delete("/{document_id}")
async def delete_document(document_id: str):
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="文档不存在")
    del documents_store[document_id]
    return {"message": "文档删除成功", "id": document_id}

@router.get("/{document_id}/chunks", response_model=List[ChunkModel])
async def get_document_chunks(document_id: str):
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="文档不存在")
    chunks = documents_store[document_id].get("chunks", [])
    return [ChunkModel(**chunk) for chunk in chunks]

@router.put("/{document_id}")
async def update_document(document_id: str, name: Optional[str] = None):
    if document_id not in documents_store:
        raise HTTPException(status_code=404, detail="文档不存在")
    if name:
        documents_store[document_id]["name"] = name
    return {"message": "文档更新成功", "id": document_id}
