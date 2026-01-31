"""
数据库连接配置
支持四种数据库：
1. PostgreSQL - 结构化数据库 (文档元数据)
2. MongoDB - 非结构化数据库 (原始文档内容)
3. Milvus - 向量数据库 (语义向量)
4. Neo4j - 图数据库 (知识关系)
"""

import os
from typing import Optional

class DatabaseConfig:
    """数据库配置"""
    
    # PostgreSQL
    POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
    POSTGRES_PORT = int(os.getenv("POSTGRES_PORT", "5432"))
    POSTGRES_DB = os.getenv("POSTGRES_DB", "knowledge_db")
    POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "password")
    
    # MongoDB
    MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/knowledge_db")
    
    # Milvus
    MILVUS_HOST = os.getenv("MILVUS_HOST", "localhost")
    MILVUS_PORT = int(os.getenv("MILVUS_PORT", "19530"))
    
    # Neo4j
    NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
    NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "password")
    
    @classmethod
    def get_postgres_url(cls) -> str:
        return f"postgresql+asyncpg://{cls.POSTGRES_USER}:{cls.POSTGRES_PASSWORD}@{cls.POSTGRES_HOST}:{cls.POSTGRES_PORT}/{cls.POSTGRES_DB}"


class PostgresConnection:
    """PostgreSQL连接管理"""
    
    _engine = None
    
    @classmethod
    async def get_engine(cls):
        if cls._engine is None:
            from sqlalchemy.ext.asyncio import create_async_engine
            cls._engine = create_async_engine(
                DatabaseConfig.get_postgres_url(),
                echo=True
            )
        return cls._engine


class MongoConnection:
    """MongoDB连接管理"""
    
    _client = None
    _db = None
    
    @classmethod
    async def get_db(cls):
        if cls._client is None:
            from motor.motor_asyncio import AsyncIOMotorClient
            cls._client = AsyncIOMotorClient(DatabaseConfig.MONGODB_URI)
            cls._db = cls._client.get_default_database()
        return cls._db


class MilvusConnection:
    """Milvus向量数据库连接管理"""
    
    _connection = None
    
    @classmethod
    def connect(cls):
        if cls._connection is None:
            from pymilvus import connections
            cls._connection = connections.connect(
                alias="default",
                host=DatabaseConfig.MILVUS_HOST,
                port=DatabaseConfig.MILVUS_PORT
            )
        return cls._connection


class Neo4jConnection:
    """Neo4j图数据库连接管理"""
    
    _driver = None
    
    @classmethod
    def get_driver(cls):
        if cls._driver is None:
            from neo4j import GraphDatabase
            cls._driver = GraphDatabase.driver(
                DatabaseConfig.NEO4J_URI,
                auth=(DatabaseConfig.NEO4J_USER, DatabaseConfig.NEO4J_PASSWORD)
            )
        return cls._driver
    
    @classmethod
    def close(cls):
        if cls._driver:
            cls._driver.close()
            cls._driver = None
