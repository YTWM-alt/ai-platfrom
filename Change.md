## 改动记录
- 改动Logo图标
- 侧边栏导航栏新增部分内容
- 项目结构改动
- 删除未使用的svg图片

## 项目结构
1. 项目根目录
智协平台ICP-Intelligent Collaboration Platform/
e:\std\basic\项目\Nextjs\try\icp\ICP\ICP\
├── app/                 # Next.js App Router 目录
├── components/          # React 组件目录
├── context/             # React Context 目录
├── public/              # 静态资源目录
├── .gitignore           # Git 忽略文件配置
├── Change.md            # 改动记录文档✨
├── eslint.config.mjs    # ESLint 配置
├── next.config.ts       # Next.js 配置
├── package-lock.json    # npm 依赖锁定文件
├── package.json         # 项目依赖和脚本
├── postcss.config.mjs   # PostCSS 配置
└── tsconfig.json        # TypeScript 配置

2. app/ 目录✨
app/
├── (large)/             # **大页面分组**
│   ├── layout.tsx       # 大页面布局
│   └── page.tsx         # 大页面首页
├── (main)/              # **主要布局/页面分组**
│   ├── (pages)/         # **主要页面分组**
│   │   ├── code/        # AI代码相关页面
│   │   ├── drawing/     # AI绘图相关页面
│   │   ├── idea/        # 亮点相关页面
│   │   ├── knowledge/   # 知识库相关页面
│   │   ├── library/     # AI文库相关页面
│   │   ├── reading/     # AI阅读相关页面
│   │   ├── resource/    # 资源中心相关页面
│   │   ├── thinking/    # 沉思相关页面
│   │   ├── tree/        # 溯源树相关页面
│   │   └── writing/     # AI写作相关页面
│   ├── private/         # **个人页面**
│   └── layout.tsx       # 主要布局（左右结构）
├── globals.css          # 全局样式
└── layout.tsx           # 整体/根布局

3. components/ 目录✨
components/
├── User/                # 用户相关组件
│   ├── LoginModal.tsx   # 登录模态框
│   └── UserSection.tsx  # 用户信息区域
├── large/               # 大页面组件
│   ├── knowledge/       # 知识相关大型组件
│   │   ├── DocumentList.tsx  # 文档列表
│   │   ├── FileUpload.tsx    # 文件上传
│   │   ├── SearchPanel.tsx   # 搜索面板
│   │   └── Sidebar.tsx       # 侧边栏
│   ├── Announcement.tsx     # 公告组件
│   ├── FeatureCards.tsx     # 功能卡片
│   ├── Footer.tsx           # 页脚
│   ├── Header.tsx           # 页眉
│   ├── HeroSection.tsx      # 英雄区域
│   └── SideToolbar.tsx      # 侧边工具栏
├── pages/               # 主要页面组件
│   ├── reading/         # 阅读页面组件
│   │   └── FileUploader.tsx  # 阅读页面的文件上传器
│   └── search/          # 搜索相关组件
│       └── ModeSelector.tsx  # 搜索模式选择器
└── private/             # 个人页面组件
    ├── siderbar/        # 侧边栏相关组件
    │   ├── Sidebar.tsx       # 侧边栏主组件
    │   ├── SidebarItem.tsx   # 侧边栏项目
    │   └── SiderbarData.tsx  # 侧边栏数据
    ├── FeatureHeader.tsx     # 功能头部
    ├── ModelSelect.tsx       # 模型选择
    └── SearchInput.tsx       # 搜索输入

4. context/ 目录
context/
└── LayoutContext.tsx    # 布局相关的 Context

5. public/ 目录✨
public/
└── favicon.svg          # 网站图标

## 项目技术栈
### 核心框架
- Next.js : 16.1.6（最新版本）
- React : 19.2.3
- React DOM : 19.2.3
### UI 组件库
- Ant Design : 6.2.2（UI 组件库）
- @ant-design/cssinjs : 2.0.3
- @ant-design/icons : 6.1.0
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
