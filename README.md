# ICP - Intelligent Collaboration Platform (智协平台)

## 项目简介

ICP是一个基于Next.js构建的智能协作平台，提供AI写作、AI绘图、AI代码、AI阅读、知识库管理、关联图可视化等多种智能协作功能。

## 技术栈(详情见Change.md)

- **框架**: Next.js 16.1.6, React 19.2.3
- **UI组件**: Ant Design 6.2.2, Tailwind CSS 4.0.0
- **可视化**: ReactFlow 11.11.4
- **动画**: Framer Motion 12.0.0
- **图标**: Lucide React 0.563.0
- **开发语言**: TypeScript 5.7.2

**说明**: 以下内容详情请参考 Change.md：
- 完整的技术栈版本信息
- 详细的项目结构说明
- 各功能页面的具体介绍
- 改动记录和版本历史


## 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

## 从零开始安装指南

### 1. 安装 Node.js

#### Windows:
1. 访问 [Node.js官网](https://nodejs.org/)
2. 下载LTS版本（18.x或更高版本）
3. 运行安装程序，按提示完成安装
4. 打开命令行验证安装：
   ```bash
   node --version
   npm --version
   ```

#### macOS:
```bash
# 使用Homebrew安装
brew install node

# 验证安装
node --version
npm --version
```

#### Linux (Ubuntu/Debian):
```bash
# 更新包管理器
sudo apt update

# 安装Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

### 2. 验证环境

确保你的环境满足要求：
```bash
# 检查Node.js版本（需要 >= 18.0.0）
node --version

# 检查npm版本（需要 >= 8.0.0）
npm --version


```

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/YTWM-alt/ai-platfrom.git
cd ICP-main
```

### 2. 安装项目依赖

```bash
# 使用npm安装依赖
npm install


```

**安装说明：**
- 此命令会读取 `package.json` 文件中的依赖列表
- 自动下载所有必需的包到 `node_modules` 目录
- 生成 `package-lock.json` 文件锁定依赖版本
- 首次安装可能需要几分钟时间

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

