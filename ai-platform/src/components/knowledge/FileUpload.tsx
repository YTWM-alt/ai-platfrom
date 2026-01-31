'use client'

import { useCallback, useState } from 'react'
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react'

interface UploadedFile {
  name: string
  size: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
}

export function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }, [])

  const handleFiles = async (fileList: File[]) => {
    for (const file of fileList) {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.name.endsWith('.docx')) {
        const newFile: UploadedFile = {
          name: file.name,
          size: file.size,
          status: 'uploading'
        }
        
        setFiles(prev => [...prev, newFile])
        
        setTimeout(() => {
          setFiles(prev => 
            prev.map(f => f.name === file.name ? { ...f, status: 'processing' } : f)
          )
        }, 1000)
        
        setTimeout(() => {
          setFiles(prev => 
            prev.map(f => f.name === file.name ? { ...f, status: 'completed' } : f)
          )
        }, 3000)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          isDragging 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400'
        }`}
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-lg text-gray-600 mb-2">拖拽文件到此处或点击上传</p>
        <p className="text-sm text-gray-400 mb-4">支持 PDF、DOCX 格式</p>
        <label className="inline-block">
          <input
            type="file"
            accept=".pdf,.docx"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />
          <span className="px-6 py-2 bg-primary-600 text-white rounded-lg cursor-pointer hover:bg-primary-700 transition-colors">
            选择文件
          </span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">上传队列</h3>
          </div>
          <ul className="divide-y divide-gray-100">
            {files.map((file, index) => (
              <li key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-red-500" />
                  <div>
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === 'uploading' && (
                    <>
                      <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                      <span className="text-sm text-primary-500">上传中...</span>
                    </>
                  )}
                  {file.status === 'processing' && (
                    <>
                      <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                      <span className="text-sm text-orange-500">处理中...</span>
                    </>
                  )}
                  {file.status === 'completed' && (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-green-500">已完成</span>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
