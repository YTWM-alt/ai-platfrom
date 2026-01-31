# AI人机协作平台 - 依赖版本说明

## 版本更新日期
2026年1月30日

---

## 核心框架

| 依赖包 | 版本 | 说明 |
|--------|------|------|
| **Next.js** | `16.1.6` | React全栈框架，支持App Router、Server Components |
| **React** | `19.2.3` | UI框架核心，React 19引入了并发特性和新hooks |
| **React DOM** | `19.2.3` | React DOM渲染器 |

---

## UI组件库

| 依赖包 | 版本 | 说明 |
|--------|------|------|
| **Ant Design** | `^6.2.2` | 企业级UI组件库，提供丰富的组件 |
| **@ant-design/cssinjs** | `^2.0.3` | Ant Design CSS-in-JS 解决方案 |
| **@ant-design/icons** | `^6.1.0` | Ant Design 图标库 |
| **Lucide React** | `^0.563.0` | 现代化图标库，替代Feather Icons |
| **Framer Motion** | `^12.0.0` | 动画库，用于页面过渡和交互动效 |

---

## 样式工具

| 依赖包 | 版本 | 说明 |
|--------|------|------|
| **Tailwind CSS** | `^4.0.0` | 原子化CSS框架（v4使用CSS-first配置） |
| **@tailwindcss/postcss** | `^4.0.0` | Tailwind CSS v4的PostCSS插件 |
| **PostCSS** | `^8.4.49` | CSS转换工具 |

---

## 开发工具

| 依赖包 | 版本 | 说明 |
|--------|------|------|
| **TypeScript** | `^5.7.2` | JavaScript超集，提供类型检查 |
| **@types/node** | `^20.11.0` | Node.js类型定义 |
| **@types/react** | `^19.0.0` | React类型定义 |
| **@types/react-dom** | `^19.0.0` | React DOM类型定义 |
| **ESLint** | `^9.0.0` | 代码检查工具 |
| **eslint-config-next** | `16.1.6` | Next.js官方ESLint配置 |

---

## Tailwind CSS v4 配置说明

Tailwind CSS v4 采用了全新的 **CSS-first** 配置方式：

### 1. PostCSS配置
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### 2. CSS主题配置
在 `globals.css` 中使用 `@theme` 定义自定义颜色：
```css
@import "tailwindcss";

@theme {
  --color-primary-50: #f0fdf4;
  --color-primary-500: #1a5c3a;
  --color-primary-600: #166534;
  --color-primary-700: #14532d;
  /* ... */
}
```

### 3. 主要变化
- ❌ 不再需要 `@tailwind base/components/utilities`
- ❌ 不再需要 `autoprefixer`（已内置）
- ✅ 使用 `@import "tailwindcss"` 导入
- ✅ 使用 `@theme` 定义自定义主题变量

---

## 安装步骤

```bash
# 进入项目目录
cd ai-platform

# 删除旧的依赖
rm -rf node_modules package-lock.json

# 安装新依赖
npm install

# 启动开发服务器
npm run dev
```

---

## 注意事项

1. **React 19 兼容性**：确保所有第三方库支持React 19
2. **Tailwind CSS v4**：配置方式与v3完全不同，使用CSS变量
3. **Ant Design 6**：API可能与v5有差异，需查阅官方文档
4. **Next.js 16**：使用App Router，确保组件正确标记 `'use client'`

---

## 项目自定义主题色

| 色阶 | 色值 | 用途 |
|------|------|------|
| primary-50 | `#f0fdf4` | 浅色背景 |
| primary-100 | `#dcfce7` | 悬停背景 |
| primary-500 | `#1a5c3a` | 主色调（深绿） |
| primary-600 | `#166534` | 按钮渐变 |
| primary-700 | `#14532d` | 深色强调 |
| accent | `#1a5c3a` | 强调色 |

---

## 项目结构

```
ai-platform/                        # 统一项目目录
├── src/                            # Next.js 前端源码
│   ├── app/
│   │   ├── page.tsx                # 大主页
│   │   ├── layout.tsx              # 根布局
│   │   ├── globals.css             # 全局样式（含Tailwind主题）
│   │   └── knowledge/              # 知识库子路由
│   │       └── page.tsx
│   ├── components/
│   │   ├── Header.tsx              # 顶部导航
│   │   ├── HeroSection.tsx         # Hero区域
│   │   ├── FeatureCards.tsx        # 功能卡片
│   │   ├── Announcement.tsx        # 公告栏
│   │   ├── SideToolbar.tsx         # 侧边工具栏
│   │   ├── Footer.tsx              # 页脚
│   │   └── knowledge/              # 知识库组件
│   │       ├── FileUpload.tsx
│   │       ├── DocumentList.tsx
│   │       ├── SearchPanel.tsx
│   │       └── Sidebar.tsx
│   └── lib/
│       └── api.ts                  # API工具函数
│
├── services/                       # 后端服务
│   ├── middleware/                 # NestJS中台（端口3001）
│   ├── backend/                    # FastAPI后台（端口8000）
│   ├── docker-compose.yml          # Docker编排
│   ├── .env.example                # 环境变量示例
│   └── README.md                   # 后端服务文档
│
├── package.json                    # 前端依赖
├── tailwind.config.ts              # Tailwind配置
└── VERSIONS.md                     # 本文档
```

### 路由说明

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 大主页 | 平台入口，展示所有功能模块 |
| `/knowledge` | 知识库 | 知识管理系统（上传、文档管理、搜索） |

---

*文档最后更新：2026-01-30*
