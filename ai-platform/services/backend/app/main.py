from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import documents, search, vectors, graph, admin

app = FastAPI(
    title="知识管理系统后台",
    description="多数据库存储与混合查询服务",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents.router, prefix="/api/documents", tags=["文档管理"])
app.include_router(search.router, prefix="/api/search", tags=["混合搜索"])
app.include_router(vectors.router, prefix="/api/vectors", tags=["向量存储"])
app.include_router(graph.router, prefix="/api/graph", tags=["图数据库"])
app.include_router(admin.router, prefix="/api/admin", tags=["后台管理"])

@app.get("/")
async def root():
    return {"message": "知识管理系统后台服务运行中", "version": "0.1.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
