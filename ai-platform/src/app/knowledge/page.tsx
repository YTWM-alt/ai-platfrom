'use client'

import { useState } from 'react'
import { FileUpload } from '@/components/knowledge/FileUpload'
import { DocumentList } from '@/components/knowledge/DocumentList'
import { SearchPanel } from '@/components/knowledge/SearchPanel'
import { Sidebar } from '@/components/knowledge/Sidebar'

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'documents' | 'search' | 'admin'>('upload')

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'upload' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">上传文档</h1>
              <FileUpload />
            </div>
          )}
          
          {activeTab === 'documents' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">文档管理</h1>
              <DocumentList />
            </div>
          )}
          
          {activeTab === 'search' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">智能搜索</h1>
              <SearchPanel />
            </div>
          )}
          
          {activeTab === 'admin' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">后台管理</h1>
              <p className="text-gray-600">文档数据的增删改查管理</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
