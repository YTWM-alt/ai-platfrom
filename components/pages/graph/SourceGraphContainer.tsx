"use client";

import { useState } from 'react';
import FlowCanvas from './FlowCanvas';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import { Paper } from '@/types/pages/paper';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';

export default function SourceGraphContainer() {
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  const handlePaperSelect = (paper: Paper) => {
    setSelectedPaper(paper); // 这会更新 selectedId 传回给左栏
    setIsRightOpen(true);    // 这会打开右栏显示摘要
  };

  const papers: Paper[] = [
    { id: '1', title: 'Deep Learning in NLP', author: 'John Doe', year: 2023, citations: 1200, abstract: 'Summary...', url: '#' },
    { id: '2', title: 'Attention is All You Need', author: 'Vaswani et al.', year: 2017, citations: 50000, abstract: 'The Transformer...', url: '#' },
    { id: '3', title: 'BERT: Pre-training...', author: 'Devlin et al.', year: 2018, citations: 35000, abstract: 'BERT...', url: '#' },
  ];

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#f8fafc]">
      
      {/* --- 左侧区域 --- */}
      <div className="relative flex h-full group/left z-30">
        <aside 
          className={`${isLeftOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white relative z-30 overflow-hidden shrink-0 shadow-[4px_0_10px_rgba(0,0,0,0.1)]`}
        >
          <div className="w-80 h-full">
            <SidebarLeft 
            papers={papers} 
            onSelect={handlePaperSelect} 
            selectedId={selectedPaper?.id} 
            />
          </div>
        </aside>
        
        {/* 左侧抽屉按钮容器 */}
        <div 
        className={`absolute top-10 z-20 transition-all duration-300 ease-in-out
            ${isLeftOpen 
            ? 'right-0 translate-x-0 group-hover/left:translate-x-full opacity-0 group-hover/left:opacity-100' 
            : 'left-0 opacity-100'}`}
        >
        <button 
            onClick={() => setIsLeftOpen(!isLeftOpen)}
            className="w-6 h-14 bg-white border border-slate-200 border-l-0 shadow-[4px_0_10px_rgba(0,0,0,0.05)] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
        >
            {isLeftOpen ? <CaretLeftOutlined className="text-slate-400! text-[14px]" /> : <CaretRightOutlined className="text-slate-400! text-[14px]" />}
        </button>
        </div>
      </div>

      {/* --- 中间主画布 --- */}
      <main className="flex-1 relative min-w-0 z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [bg-size:24px_24px]">
        <FlowCanvas papers={papers} onNodeClick={handlePaperSelect} />
      </main>

      {/* --- 右侧区域 --- */}
      <div className="relative flex h-full group/right z-30">
        {/* 右侧抽屉按钮容器 */}
        <div 
        className={`absolute top-10 z-20 transition-all duration-300 ease-in-out
            ${isRightOpen 
            ? 'left-0 translate-x-0 group-hover/right:-translate-x-full opacity-0 group-hover/right:opacity-100' 
            : 'right-0 opacity-100'}`}
        >
        <button 
            onClick={() => setIsRightOpen(!isRightOpen)}
            className="w-6 h-14 bg-white border border-slate-200 border-r-0 shadow-[-4px_0_10px_rgba(0,0,0,0.05)] hover:bg-slate-50 flex items-center justify-center cursor-pointer"
        >
            {isRightOpen ? <CaretRightOutlined className="text-slate-400! text-[14px]" /> : <CaretLeftOutlined className="text-slate-400! text-[14px]" />}
        </button>
        </div>

        <aside 
          className={`${isRightOpen ? 'w-96' : 'w-0'} transition-all duration-300 bg-white relative z-30 shrink-0 overflow-hidden shadow-[-4px_0_10px_rgba(0,0,0,0.1)]`}
        >
          <div className="w-96 h-full">
            {/* 绑定 id 作为 key，论文切换时状态自动重置 */}
            <SidebarRight 
              key={selectedPaper?.id || 'empty'} 
              paper={selectedPaper} 
            />
          </div>
        </aside>
      </div>
    </div>
  );
}