## 改动记录✨
### 总的最新记录 - 项目功能扩展与组件完善
- 新增项目管理页面路由分组 `(projects)` 及相关页面
- 新增 AI 代码页面完整组件（CodeAiChat、CodeFileExplorer、CodeLayout、CodeOutputPreview、CodePythonEditor）
- 新增创新亮点页面组件（InnovationPage）
- 新增 AI 文库页面组件（LiteratureReviewPage）
- 新增项目管理页面组件（ProjectsPage、CreateProjectModal）
- 新增 AI 写作页面完整组件（WritingAiChat、WritingFileExplorer、WritingLatexEditor、WritingLayout、WritingPdfPreview）
- 新增共享编辑器布局组件（EditorLayout）
- 完善知识库组件（新增 KnowledgeCardModal）
- 完善关联图组件（新增 GraphNode）
- 更新项目依赖（Next.js 升级至 16.2.1，新增 react-markdown、remark-gfm）
- 新增项目 README.md 文档
- 删减沉思相关板块


## 项目结构
智协平台ICP-Intelligent Collaboration Platform
### 1. 项目根目录
```bash
ICP/
├── app/                 # Next.js App Router 目录
├── components/          # React 组件目录
├── context/             # React Context 目录
├── public/              # 静态资源目录
├── types/               # TypeScript 类型定义目录
├── .gitignore           # Git 忽略文件配置
├── Change.md            # 改动记录文档✨
├── README.md            # 项目说明文档
├── eslint.config.mjs    # ESLint 配置
├── next.config.ts       # Next.js 配置
├── package-lock.json    # npm 依赖锁定文件
├── package.json         # 项目依赖和脚本
├── postcss.config.mjs   # PostCSS 配置
└── tsconfig.json        # TypeScript 配置
```

### 2. app/ 目录
```bash
app/
├── (large)/             # 大页面分组（首页）
│   ├── layout.tsx       # 大页面布局
│   └── page.tsx         # 大页面首页（落地页）
├── (main)/              # 主要布局/页面分组（个人中心）
│   ├── (pages)/         # 主要功能页面
│   │   ├── code/        # AI代码相关页面
│   │   ├── drawing/     # AI绘图相关页面
│   │   ├── idea/        # AI创新点相关页面✨
│   │   ├── knowledge/   # 知识库相关页面
│   │   ├── library/     # AI文库相关页面
│   │   ├── reading/     # AI阅读相关页面✨
│   │   ├── resources/   # 资源中心相关页面
│   │   ├── graph/       # 关联图相关页面（ReactFlow）
│   │   └── writing/     # AI写作相关页面
│   ├── private/         # 个人页面（学术搜索）
│   │   └── page.tsx     # 个人页面首页✨
│   └── layout.tsx       # 主要布局（左右结构）
├── (projects)/          # 项目管理页面分组✨
│   ├── projects/        # 项目管理页面
│   │   └── page.tsx
│   └── layout.tsx       # 项目管理布局
├── globals.css          # 全局样式
└── layout.tsx           # 整体/根布局
```

### 3. components/ 目录
```bash
components/
├── User/                # 用户相关组件
│   ├── ClientWrapper.tsx   # 客户端包装器
│   ├── LoginModal.tsx      # 登录注册弹窗
│   └── UserSection.tsx     # 用户信息区域
├── large/               # 大页面组件（落地页）
│   ├── Announcement.tsx     # 公告组件
│   ├── FeatureCards.tsx     # 功能卡片
│   ├── Footer.tsx           # 页脚
│   ├── Header.tsx           # 页眉
│   ├── HeroSection.tsx      # 主视觉区
│   └── SideToolbar.tsx      # 侧边工具栏
├── pages/               # 主要页面组件
│   ├── common/                  # 通用组件
│   │   ├── BaseUploader.tsx    # 基础上传组件
│   │   ├── FeatureHeader.tsx   # 功能头部
│   │   ├── HistorySidebar.tsx  # 历史记录侧边栏✨
│   │   └── HistoryTrigger.tsx  # 历史记录触发器✨
│   ├── knowledge/          # 知识库相关组件
│   │   ├── KnowledgeContent.tsx   # 知识库内容
│   │   ├── KnowledgeSidebar.tsx   # 知识库侧边栏
│   │   ├── KnowledgeCardModal.tsx  # 知识卡片弹窗✨
│   │   └── NoteUploadModal.tsx    # 笔记上传弹窗
│   ├── reading/         # AI阅读页面组件
│   │   └── FileUploader.tsx  # 文件上传器
│   ├── search/          # 学术搜索页面组件
│   │   ├── ImageUploadModal.tsx # 图片上传弹窗
│   │   ├── ModeSelector.tsx     # 搜索模式选择器
│   │   ├── ModelSelect.tsx      # 模型选择器
│   │   └── SearchBox.tsx        # 搜索框
│   ├── graph/            # 关联图相关组件✨
│   │   ├── FlowCanvas.tsx       # ReactFlow画布
│   │   ├── GraphNode.tsx         # 图节点组件✨
│   │   ├── SidebarLeft.tsx      # 左侧边栏
│   │   ├── SidebarRight.tsx     # 右侧边栏
│   │   └── SourceGraphContainer.tsx # 关联图容器
│   ├── code/             # AI代码页面组件✨
│   │   ├── CodeAiChat.tsx       # 代码AI聊天
│   │   ├── CodeFileExplorer.tsx  # 代码文件浏览器
│   │   ├── CodeLayout.tsx        # 代码页面布局
│   │   ├── CodeOutputPreview.tsx # 代码输出预览
│   │   └── CodePythonEditor.tsx  # Python编辑器
│   ├── writing/          # AI写作页面组件✨
│   │   ├── WritingAiChat.tsx     # 写作AI聊天
│   │   ├── WritingFileExplorer.tsx # 写作文件浏览器
│   │   ├── WritingLatexEditor.tsx # LaTeX编辑器
│   │   ├── WritingLayout.tsx      # 写作页面布局
│   │   └── WritingPdfPreview.tsx # PDF预览
│   ├── idea/             # 亮点页面组件✨
│   │   └── InnovationPage.tsx    # 创新页面
│   ├── library/          # AI文库页面组件✨
│   │   └── LiteratureReviewPage.tsx # 文献综述页面
│   ├── projects/         # 项目管理页面组件✨
│   │   ├── ProjectsPage.tsx       # 项目页面
│   │   └── CreateProjectModal.tsx # 创建项目弹窗
│   └── shared/           # 共享组件✨
│       └── EditorLayout.tsx      # 编辑器布局
└── private/             # 个人页面组件
    └── siderbar/        # 侧边栏相关组件
       ├── Sidebar.tsx       # 侧边栏主组件
       ├── SidebarItem.tsx   # 侧边栏项目
       └── SiderbarData.tsx  # 侧边栏数据
```

### 4. context/ 目录
```bash
context/✨
├── LayoutContext.tsx    # 全局布局状态管理 Context
├── ReadingContext.tsx   # 阅读页面状态管理 Context
└── HistoryContext.tsx   # 历史记录状态管理 Context
```

### 5. types/ 目录
```bash
types/✨
└── pages/               # 页面相关类型定义
    ├── graph.ts         # 关联图类型
    ├── history.ts       # 历史记录类型
    ├── paper.ts         # 论文相关类型
    ├── reading.ts       # 阅读页面类型
    └── search.ts        # 搜索页面类型
└── private/             # 个人页面相关类型
    └── sidebar.ts       # 侧边栏类型
```

### 6. public/ 目录
```bash
public/
└── favicon.svg          # 网站图标
```

### 7. 页面路由说明
```bash
/                       # 落地页 (app/(large)/page.tsx)
/private                # 学术搜索页（个人首页）
/library                # AI文库页
/reading                # AI阅读页
/writing                # AI写作页
/drawing                # AI绘图页
/code                   # AI代码页
/idea                   # 亮点页
/graph                  # 关联图页（ReactFlow可视化）
/knowledge              # 知识库页
/resources              # 资源中心页
/projects               # 项目管理页✨
```

## 项目技术栈
### 核心框架
- Next.js : 16.2.1（最新版本）
- React : 19.2.3
- React DOM : 19.2.3

### UI 组件库
- Ant Design : 6.2.2（UI 组件库）
- @ant-design/cssinjs : 2.0.3
- @ant-design/icons : 6.1.0

### 可视化组件
- ReactFlow : 11.11.4（流程图/溯源树可视化）

### Markdown 支持
- react-markdown : 10.1.0（Markdown 渲染）
- remark-gfm : 4.0.1（GFM 语法支持）

### 动画和图标
- Framer Motion : 12.0.0（动画库）
- Lucide React : 0.563.0（图标库）

### 样式
- Tailwind CSS : 4.0.0（最新版本）
- PostCSS : 8.4.49

### 开发工具
- TypeScript : 5.7.2
- ESLint : 9.0.0
- @types/node : 20.11.0
- @types/react : 19.0.0
- @types/react-dom : 19.0.0
