'use client'

import { useState } from 'react'
import { FileText, Trash2, Eye, Edit } from 'lucide-react'

interface Document {
  id: string
  name: string
  size: string
  uploadDate: string
  chunks: number
  status: 'indexed' | 'pending' | 'error'
}

const mockDocuments: Document[] = [
  { id: '1', name: '研究报告.pdf', size: '2.3 MB', uploadDate: '2024-01-15', chunks: 45, status: 'indexed' },
  { id: '2', name: '技术文档.pdf', size: '1.8 MB', uploadDate: '2024-01-14', chunks: 32, status: 'indexed' },
  { id: '3', name: '会议记录.docx', size: '856 KB', uploadDate: '2024-01-13', chunks: 18, status: 'pending' },
]

export function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">文档名称</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">大小</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">上传日期</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">分块数</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">状态</th>
            <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-gray-800">{doc.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600">{doc.size}</td>
              <td className="px-6 py-4 text-gray-600">{doc.uploadDate}</td>
              <td className="px-6 py-4 text-gray-600">{doc.chunks}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  doc.status === 'indexed' 
                    ? 'bg-green-100 text-green-700' 
                    : doc.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {doc.status === 'indexed' ? '已索引' : doc.status === 'pending' ? '处理中' : '错误'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="查看">
                    <Eye className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="编辑">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                  <button 
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors" 
                    title="删除"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
