## 改动记录✨
### 记录1
- 更新Logo图标资源
- 完善个人页面侧边栏导航功能
- 调整项目目录结构
- 清理未使用的SVG图片资源

### 记录2 - 组件优化与功能整合
- 整合相关组件并优化组件目录结构
- 完善页面间的路由跳转逻辑
- 统一登录界面的视觉样式和交互状态
- 优化个人页面用户登录/登出体验
- 改进侧边导航栏图标折叠效果及居中布局
- 新增学术搜索页图片上传弹窗功能
- 优化个人页面CSS样式代码

### 记录3 - 知识库功能
- 新增知识库页面及相关组件
- 实现知识库侧边栏和内容区域布局
- 添加笔记上传弹窗组件

### 记录4 - UI/UX优化
- 优化导航栏样式和排版间距
- 重构上传PDF按钮和创建笔记按钮组件
- 提升组件复用性，减少代码冗余

### 记录5 - 关联图功能与类型系统优化
- 溯源树改名，新增关联图功能页面
- 集成ReactFlow组件库实现论文引用关系可视化
- 新增阅读页面上下文（ReadingContext.tsx）用于状态管理
- 新增types目录统一管理TypeScript类型接口
- 优化项目整体架构，明确功能模块划分
- 更新项目依赖，引入ReactFlow 11.11.4


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
│   │   ├── idea/        # 亮点相关页面
│   │   ├── knowledge/   # 知识库相关页面
│   │   ├── library/     # AI文库相关页面
│   │   ├── reading/     # AI阅读相关页面
│   │   ├── resources/   # 资源中心相关页面
│   │   ├── thinking/    # 沉思相关页面
│   │   ├── graph/       # 关联图相关页面（ReactFlow）
│   │   └── writing/     # AI写作相关页面
│   ├── private/         # 个人页面（学术搜索）
│   │   └── page.tsx     # 个人页面首页
│   └── layout.tsx       # 主要布局（左右结构）
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
│   │   └── FeatureHeader.tsx   # 功能头部
│   ├── knowledge/          # 知识库相关组件
│   │   ├── KnowledgeContent.tsx   # 知识库内容
│   │   ├── KnowledgeSidebar.tsx   # 知识库侧边栏
│   │   └── NoteUploadModal.tsx    # 笔记上传弹窗
│   ├── reading/         # AI阅读页面组件
│   │   └── FileUploader.tsx  # 文件上传器
│   ├── search/          # 学术搜索页面组件
│   │   ├── ImageUploadModal.tsx # 图片上传弹窗
│   │   ├── ModeSelector.tsx     # 搜索模式选择器
│   │   ├── ModelSelect.tsx      # 模型选择器
│   │   └── SearchBox.tsx        # 搜索框
│   └── graph/            # 关联图相关组件
│       ├── FlowCanvas.tsx       # ReactFlow画布
│       ├── SidebarLeft.tsx      # 左侧边栏
│       ├── SidebarRight.tsx     # 右侧边栏
│       └── SourceGraphContainer.tsx # 关联图容器
└── private/             # 个人页面组件
    └── siderbar/        # 侧边栏相关组件
       ├── Sidebar.tsx       # 侧边栏主组件
       ├── SidebarItem.tsx   # 侧边栏项目
       └── SiderbarData.tsx  # 侧边栏数据
```

### 4. context/ 目录
```bash
context/
├── LayoutContext.tsx    # 全局布局状态管理 Context
└── ReadingContext.tsx   # 阅读页面状态管理 Context
```

### 5. types/ 目录
```bash
types/
└── pages/               # 页面相关类型定义
    ├── paper.ts         # 论文相关类型
    ├── reading.ts       # 阅读页面类型
    ├── search.ts        # 搜索页面类型
    └── graph.ts          # 关联图类型
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
/thinking               # 沉思页
/idea                   # 亮点页
/graph                  # 关联图页（ReactFlow可视化）
/knowledge              # 知识库页
/resources              # 资源中心页
```
## 项目技术栈
### 核心框架
- Next.js : 16.1.6（最新版本）
- React : 19.2.3
- React DOM : 19.2.3

### UI 组件库
- Ant Design : 6.2.2（UI 组件库）
- @ant-design/cssinjs : 2.0.3
- @ant-design/icons : 6.1.0

### 可视化组件
- ReactFlow : 11.11.4（流程图/溯源树可视化）

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
