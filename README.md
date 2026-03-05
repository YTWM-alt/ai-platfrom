# ICP - Intelligent Collaboration Platform (智协平台)

## 项目简介

ICP是一个基于Next.js构建的智能协作平台，提供AI写作、AI绘图、AI代码、AI阅读、知识库管理、关联图可视化等多种智能协作功能。

## 技术栈

- **框架**: Next.js 16.1.6, React 19.2.3
- **UI组件**: Ant Design 6.2.2, Tailwind CSS 4.0.0
- **可视化**: ReactFlow 11.11.4
- **动画**: Framer Motion 12.0.0
- **图标**: Lucide React 0.563.0
- **开发语言**: TypeScript 5.7.2
(详情见Change.md)

## 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/YTWM-alt/ai-platfrom.git
cd ICP-main
```

### 2. 安装依赖

```bash
npm install

```

### 3. 启动开发服务器

```bash
npm run dev

```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。



## 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   # 查找占用3000端口的进程
   lsof -i :3000
   # 杀死进程
   kill -9 <PID>
   ```

2. **依赖安装失败**
   ```bash
   # 清除缓存重新安装
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **构建失败**
   ```bash
   # 检查Node.js版本
   node --version  # 应该 >= 18.0.0
   
   # 检查TypeScript编译
   npx tsc --noEmit
   ```

