'use client';
import { 
  UploadOutlined, 
  FileTextOutlined, 
  SearchOutlined,
  EyeOutlined,
  DeleteOutlined,
  InboxOutlined,
  ApartmentOutlined,
  DatabaseOutlined,
  FileSearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { BaseUploader } from '@/components/pages/common/BaseUploader';
import { NoteUploadModal } from '@/components/pages/knowledge/NoteUploadModal';
import { useState } from 'react';


interface KnowledgeContentProps {
  activeItem: string;
}

// 模拟文献数据
const mockDocuments = [
  { id: 1, name: '深度学习研究综述.pdf', type: 'pdf', size: '2.3 MB', date: '2024-01-15', tags: ['深度学习', 'AI'], status: '已解析' },
  { id: 2, name: '强化学习算法优化.pdf', type: 'pdf', size: '1.8 MB', date: '2024-01-12', tags: ['强化学习'], status: '已解析' },
  { id: 3, name: '自然语言处理论文.pdf', type: 'pdf', size: '3.5 MB', date: '2024-01-10', tags: ['NLP', '大模型'], status: '解析中' },
];

// 模拟标签数据
const mockTags = [
  { id: 1, name: '深度学习', count: 15, color: 'bg-blue-100 text-blue-600' },
  { id: 2, name: '强化学习', count: 8, color: 'bg-green-100 text-green-600' },
  { id: 3, name: 'NLP', count: 12, color: 'bg-purple-100 text-purple-600' },
  { id: 4, name: '大模型', count: 20, color: 'bg-orange-100 text-orange-600' },
  { id: 5, name: '知识图谱', count: 6, color: 'bg-pink-100 text-pink-600' },
];

// 模拟知识卡片数据
const mockCards = [
  { id: 1, title: 'Transformer架构', content: '基于自注意力机制的神经网络架构...', source: '深度学习研究综述.pdf', date: '2024-01-15' },
  { id: 2, title: 'RAG技术原理', content: '检索增强生成技术结合了检索和生成...', source: '自然语言处理论文.pdf', date: '2024-01-10' },
];

export default function KnowledgeContent({ activeItem }: KnowledgeContentProps) {
  // 渲染文献列表
  const renderDocumentList = () => (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {/* 使用 BaseUploader 包裹按钮 */}
          <BaseUploader 
            accept=".pdf" 
            onSuccess={(file) => console.log("列表页上传成功:", file.name)}
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm">
              <UploadOutlined />
              <span>上传PDF</span>
            </button>
          </BaseUploader>
        </div>
        <div className="relative">
          <input 
            type="text"
            placeholder="搜索文献..."
            className="w-64 h-9 pl-9 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
          />
          <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      {/* 表头 */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-500">
        <div className="col-span-4">文件名</div>
        <div className="col-span-3">标签</div>
        <div className="col-span-2">状态</div>
        <div className="col-span-2">日期</div>
        <div className="col-span-1">操作</div>
      </div>
      {/* 文献列表 */}
      {mockDocuments.map((doc) => (
        <div key={doc.id} className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors text-sm items-center">
          <div className="col-span-4 flex items-center gap-2">
            <FileTextOutlined className="text-red-500 text-lg" />
            <span className="text-gray-700 truncate">{doc.name}</span>
          </div>
          <div className="col-span-3 flex flex-wrap gap-1">
            {doc.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">{tag}</span>
            ))}
          </div>
          <div className="col-span-2">
            <span className={`px-2 py-0.5 text-xs rounded ${doc.status === '已解析' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
              {doc.status}
            </span>
          </div>
          <div className="col-span-2 text-gray-500">{doc.date}</div>
          <div className="col-span-1 flex items-center gap-1">
            <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-colors">
              <EyeOutlined />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
              <DeleteOutlined />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // 渲染PDF上传区域
  const renderPdfUpload = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center hover:border-primary transition-colors cursor-pointer">
        <InboxOutlined className="text-5xl text-gray-300 mb-4" />
        <p className="text-gray-600 mb-2">点击或拖拽PDF文件到此处上传</p>
        <p className="text-gray-400 text-sm">支持批量上传，单个文件最大50MB</p>
        <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
          选择文件
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-medium text-gray-700 mb-3">上传须知</h3>
        <ul className="text-sm text-gray-500 space-y-2">
          <li>• 支持PDF格式的学术论文</li>
          <li>• 系统将自动解析论文内容，提取关键信息</li>
          <li>• 解析完成后可进行标签管理和知识卡片创建</li>
        </ul>
      </div>
    </div>
  );

  // 渲染关键词检索
  const renderKeywordSearch = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-medium text-gray-700 mb-4">智能论文检索</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">研究关键词</label>
            <input 
              type="text"
              placeholder="输入关键词，如：深度学习、强化学习、自然语言处理..."
              className="w-full h-10 px-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">研究动机（可选）</label>
            <textarea 
              placeholder="描述你的研究目标和动机，系统将为你推荐最相关的SOTA论文..."
              className="w-full h-24 px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
          <button className="w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
            <SearchOutlined />
            <span>搜索论文</span>
          </button>
        </div>
      </div>
    </div>
  );

  // 渲染PDF解析
  const renderPdfParse = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-700">PDF解析队列</h3>
          <span className="text-sm text-gray-400">共 3 个文件</span>
        </div>
        {mockDocuments.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <FileSearchOutlined className="text-primary text-lg" />
              <span className="text-gray-700">{doc.name}</span>
            </div>
            <span className={`px-2 py-0.5 text-xs rounded ${doc.status === '已解析' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
              {doc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // 渲染知识图谱
  const renderKnowledgeGraph = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-96 flex flex-col items-center justify-center">
      <ApartmentOutlined className="text-5xl text-gray-300 mb-4" />
      <p className="text-gray-500 mb-2">知识图谱可视化</p>
      <p className="text-gray-400 text-sm">上传并解析PDF后，系统将自动构建知识图谱</p>
    </div>
  );

  // 渲染向量数据库
  const renderVectorDB = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-96 flex flex-col items-center justify-center">
      <DatabaseOutlined className="text-5xl text-gray-300 mb-4" />
      <p className="text-gray-500 mb-2">向量数据库</p>
      <p className="text-gray-400 text-sm">文献内容将被向量化存储，支持语义检索</p>
    </div>
  );

  // 渲染标签管理
  const renderTagManage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-700">标签管理</h3>
          <button className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover">
            <PlusOutlined />
            <span>新建标签</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {mockTags.map((tag) => (
            <div key={tag.id} className={`px-4 py-2 rounded-lg ${tag.color} flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity`}>
              <span>{tag.name}</span>
              <span className="text-xs opacity-70">({tag.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 渲染知识卡片
  const renderKnowledgeCards = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">共 {mockCards.length} 张卡片</span>
        <button className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover">
          <PlusOutlined />
          <span>新建卡片</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCards.map((card) => (
          <div key={card.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-gray-800 mb-2">{card.title}</h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{card.content}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>来源: {card.source}</span>
              <span>{card.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 渲染阅读笔记
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const renderReadingNotes = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="text-center py-12">
        <FileTextOutlined className="text-5xl text-gray-300 mb-4" />
        <p className="text-gray-500 mb-2">阅读笔记</p>
        <p className="text-gray-400 text-sm mb-4">记录你的阅读心得和研究想法</p>
        
        {/* 点击打开弹窗 */}
        <button 
          onClick={() => setIsNoteModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          创建笔记
        </button>
      </div>

      {/* 引入弹窗组件 */}
      <NoteUploadModal 
        open={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onNewNote={() => {
          console.log("跳转到编辑器");
          setIsNoteModalOpen(false);
        }}
        onUploadSuccess={(file) => {
          console.log("笔记文件/粘贴内容已就绪:", file);
          setIsNoteModalOpen(false);
        }}
      />
    </div>
  );

  // 根据选中项渲染内容
  const renderContent = () => {
    switch (activeItem) {
      case 'all-docs':
        return renderDocumentList();
      case 'pdf-upload':
        return renderPdfUpload();
      case 'keyword-search':
        return renderKeywordSearch();
      case 'pdf-parse':
        return renderPdfParse();
      case 'knowledge-graph':
        return renderKnowledgeGraph();
      case 'vector-db':
        return renderVectorDB();
      case 'tag-manage':
        return renderTagManage();
      case 'knowledge-card':
        return renderKnowledgeCards();
      case 'reading-notes':
        return renderReadingNotes();
      default:
        return renderDocumentList();
    }
  };

  // 获取标题
  const getTitle = () => {
    const titles: Record<string, string> = {
      'all-docs': '全部文献',
      'pdf-upload': 'PDF上传',
      'keyword-search': '关键词检索',
      'pdf-parse': 'PDF解析',
      'knowledge-graph': '知识图谱',
      'vector-db': '向量数据库',
      'tag-manage': '标签管理',
      'knowledge-card': '知识卡片',
      'reading-notes': '阅读笔记',
    };
    return titles[activeItem] || '全部文献';
  };

  return (
    <div className="flex-1 h-full overflow-auto p-6 bg-gray-50">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{getTitle()}</h2>
      {renderContent()}
    </div>
  );
}
