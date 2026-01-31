'use client'

import { Search, ChevronDown, BookOpen, PenTool, Image, Code, Database, Sparkles, User } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const navItems = [
  {
    id: 'knowledge',
    label: '知识库',
    icon: Database,
    href: '/knowledge',
    subItems: ['知识导入', '知识管理', '智能检索']
  },
  {
    id: 'writing',
    label: '智能写作',
    icon: PenTool,
    subItems: ['论文写作', '报告生成', '文案创作', '智能润色']
  },
  {
    id: 'drawing',
    label: 'AI绘图',
    icon: Image,
    subItems: ['图像生成', '图像编辑', '风格迁移']
  },
  {
    id: 'code',
    label: '代码助手',
    icon: Code,
    subItems: ['代码生成', '代码解释', '代码优化', '调试助手']
  },
  {
    id: 'tools',
    label: '工具箱',
    icon: Sparkles,
    subItems: ['PDF解析', '翻译助手', '思维导图', '数据分析']
  },
  {
    id: 'resources',
    label: '资源中心',
    icon: BookOpen,
    subItems: ['模板库', '案例库', '教程文档']
  },
]

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">智协平台</h1>
              <span className="text-xs text-gray-400">AI人机协作</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${activeTab === item.id 
                        ? 'text-primary-600 bg-primary-50' 
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${activeTab === item.id 
                        ? 'text-primary-600 bg-primary-50' 
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </button>
                )}
                
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-1 w-40 py-2 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {item.subItems.map((subItem, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
              <User className="w-4 h-4" />
              <span>个人中心</span>
            </button>
            <button className="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
              登录
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg hover:shadow-lg transition-all">
              免费注册
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
