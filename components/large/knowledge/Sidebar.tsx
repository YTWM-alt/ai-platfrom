'use client'

import { Upload, FileText, Search, Settings, Home } from 'lucide-react'
import Link from 'next/link'

interface SidebarProps {
  activeTab: 'upload' | 'documents' | 'search' | 'admin'
  onTabChange: (tab: 'upload' | 'documents' | 'search' | 'admin') => void
}

const menuItems = [
  { id: 'upload' as const, icon: Upload, label: '上传文档' },
  { id: 'documents' as const, icon: FileText, label: '文档管理' },
  { id: 'search' as const, icon: Search, label: '智能搜索' },
  { id: 'admin' as const, icon: Settings, label: '后台管理' },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary-600">智能知识库</h1>
        <p className="text-sm text-gray-500 mt-1">Knowledge Management</p>
      </div>
      
      <nav className="mt-4">
        <Link 
          href="/"
          className="w-full flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">返回主页</span>
        </Link>
        
        <div className="border-t border-gray-100 my-2" />
        
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                isActive 
                  ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
