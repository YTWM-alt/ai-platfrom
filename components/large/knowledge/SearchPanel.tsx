'use client'

import { useState } from 'react'
import { Search, Database, Network, FileText, Zap } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  content: string
  source: string
  score: number
  database: 'vector' | 'graph' | 'structured' | 'unstructured'
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: '研究方法论',
    content: '本研究采用定性与定量相结合的混合研究方法，通过问卷调查和深度访谈收集数据...',
    source: '研究报告.pdf',
    score: 0.95,
    database: 'vector'
  },
  {
    id: '2',
    title: '相关文献综述',
    content: '根据知识图谱分析，该主题与人工智能、机器学习、自然语言处理等领域密切相关...',
    source: '技术文档.pdf',
    score: 0.88,
    database: 'graph'
  },
  {
    id: '3',
    title: '数据分析结果',
    content: '实验数据表明，系统在准确率方面达到了92.5%，召回率为89.3%...',
    source: '研究报告.pdf',
    score: 0.82,
    database: 'structured'
  },
]

const databaseIcons = {
  vector: Zap,
  graph: Network,
  structured: Database,
  unstructured: FileText,
}

const databaseLabels = {
  vector: '向量数据库',
  graph: '图数据库',
  structured: '结构化数据库',
  unstructured: '非结构化数据库',
}

export function SearchPanel() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    
    setIsSearching(true)
    setTimeout(() => {
      setResults(mockResults)
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="输入您的问题，系统将从多个数据库中智能检索..."
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="px-8 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 font-medium"
        >
          {isSearching ? '搜索中...' : '智能搜索'}
        </button>
      </div>

      <div className="flex gap-2 text-sm">
        <span className="text-gray-500">数据源：</span>
        {Object.entries(databaseLabels).map(([key, label]) => {
          const Icon = databaseIcons[key as keyof typeof databaseIcons]
          return (
            <span key={key} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-gray-600">
              <Icon className="w-4 h-4" />
              {label}
            </span>
          )
        })}
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">搜索结果 ({results.length})</h3>
          
          {results.map((result) => {
            const Icon = databaseIcons[result.database]
            return (
              <div key={result.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">{result.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-600 rounded text-sm">
                      <Icon className="w-4 h-4" />
                      {databaseLabels[result.database]}
                    </span>
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-sm">
                      相似度: {(result.score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{result.content}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FileText className="w-4 h-4" />
                  <span>来源: {result.source}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
