# AI人机协作智能平台

一站式AI协作平台，融合知识管理、智能写作、AI绘图、代码辅助四大核心能力。

## 🏗️ 项目结构

```
ai-platform/
├── src/                      # Next.js 前端源码
│   ├── app/                  # App Router
│   │   ├── page.tsx          # 大主页
│   │   └── knowledge/        # 知识库模块
│   ├── components/           # React组件
│   └── lib/                  # 工具函数
│
├── services/                 # 后端服务
│   ├── middleware/           # NestJS中台 (端口3001)
│   ├── backend/              # FastAPI后台 (端口8000)
│   └── docker-compose.yml    # Docker编排
│
├── package.json              # 前端依赖
└── VERSIONS.md               # 版本说明
```

## 🚀 快速启动

### 方式一：仅启动前端（开发模式）

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看大主页。

### 方式二：完整启动（前端 + 后端）

#### 1. 启动前端
```bash
cd ai-platform
npm install
npm run dev
```

#### 2. 启动后端服务（使用Docker）
```bash
cd ai-platform
cd services
docker-compose up -d
```

#### 3. 或手动启动后端

**后台 FastAPI (端口8000)**
```bash
cd ai-platform
cd services/backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**中台 NestJS (端口3001)**
```bash
cd ai-platform
cd services/middleware
npm install
npm run start:dev
```

## 📍 路由说明

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 大主页 | 平台入口，展示所有功能模块 |
| `/knowledge` | 知识库 | 文档上传、管理、智能搜索 |

## 🔧 端口配置

| 服务 | 端口 | 说明 |
|------|------|------|
| Next.js 前端 | 3000 | 用户界面 |
| NestJS 中台 | 3001 | 文档处理、索引 |
| FastAPI 后台 | 8000 | 数据存储、检索 |

## 📦 技术栈

- **前端**: Next.js 16 + React 19 + TailwindCSS 4 + Ant Design 6
- **中台**: NestJS 10
- **后台**: FastAPI + PostgreSQL + MongoDB + Milvus + Neo4j

## 📝 开发命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产版本
npm start

# 代码检查
npm run lint
```

---

详细版本信息请参考 [VERSIONS.md](./VERSIONS.md)
