## 改动记录
1. 记录1
- 改动Logo图标
- 个人页面侧边栏导航栏新增部分内容
- 项目结构改动
- 删除未使用的svg图片

2. 记录2
- 组件整合及位置变动
- 链接两页的部分跳转
- 统一两页的登录界面样式及状态
- 个人页面优化：
    - 用户登录/登出样式
    - 侧边导航栏折叠时图标的居中
    - 新增学术搜索页（个人页面的默认页）图片上传界面
    - 稍微整理了一下个人页面的css


## 项目结构
智协平台ICP-Intelligent Collaboration Platform
1. 项目根目录
```bash
ICP/
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
```
2. app/ 目录✨
```bash
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
│   │   └── page.tsx       # 个人页面首页（学术搜索页）
│   └── layout.tsx       # 主要布局（左右结构）
├── globals.css          # 全局样式
└── layout.tsx           # 整体/根布局
```
3. components/ 目录✨
```bash
components/
├── User/                # 用户相关组件
│   ├── ClientWrapper.tsx   # 客户端包装器
│   ├── LoginModal.tsx      # 登录注册弹窗
│   └── UserSection.tsx     # 用户信息区域
├── large/               # 大页面组件
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
│   ├── reading/         # AI阅读页面组件
│   │   └── FileUploader.tsx  # 文件上传器
│   └── search/          # 学术搜索页面组件
│       ├── ImageUploadModal.tsx # 图片上传弹窗（智能搜索项）
│       ├── ModeSelector.tsx     # 搜索模式选择器
│       ├── ModelSelect.tsx      # 模型选择器
│       └── SearchBox.tsx        # 搜索框
└── private/             # 个人页面组件
    └── siderbar/        # 侧边栏相关组件
       ├── Sidebar.tsx       # 侧边栏主组件
       ├── SidebarItem.tsx   # 侧边栏项目
       └── SiderbarData.tsx  # 侧边栏数据
```
4. context/ 目录✨
```bash
context/
└── LayoutContext.tsx    # 全局状态管理 Context
```
5. public/ 目录
```bash
public/
└── favicon.svg          # 网站图标
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
