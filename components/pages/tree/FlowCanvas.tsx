"use client";

import React, { useState, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  MiniMap, 
  useReactFlow, 
  BackgroundVariant,
  NodeMouseHandler
} from 'reactflow'; 
import 'reactflow/dist/style.css';

import { Paper } from '@/types/pages/paper';
import { TreeNode, TreeEdge, TreeNodeData } from '@/types/pages/tree';
import { Plus, Minus, Maximize, Lock, LockOpen, HelpCircle, X } from 'lucide-react';

interface FlowCanvasProps {
  papers: Paper[]; 
  onNodeClick: (paper: Paper) => void;
}

export default function FlowCanvas({ papers, onNodeClick }: FlowCanvasProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { zoomIn, zoomOut, fitView } = useReactFlow(); 

  // TreeNode[] 严格定义节点数组
  const nodes: TreeNode[] = useMemo(() => {
    return papers.map((p, i) => ({
      id: p.id,
      // 必须符合 tree.ts 中 TreeNodeData 的定义
      data: { 
        label: p.title,
        paper: p, // 将完整数据存入节点
        isRoot: i === 0 // 假设第一个是根节点
      },
      position: { x: 400 + i * 220, y: 300 + (i % 2 === 0 ? 60 : -60) },
      style: {
        width: Math.max(90, Math.min(180, Math.sqrt(p.citations) * 1.6)),
        height: Math.max(90, Math.min(180, Math.sqrt(p.citations) * 1.6)),
        borderRadius: '50%',
        backgroundColor: `rgba(45, 95, 95, ${Math.max(0.2, (p.year - 2010) / 16)})`,
        color: p.year > 2018 ? '#fff' : '#1a3333',
        border: '2px solid #2d5f5f',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        fontSize: '11px', 
        padding: '12px', 
        fontWeight: '600', 
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      },
    }));
  }, [papers]);

  //  TreeEdge[] 定义连线
  const edges: TreeEdge[] = useMemo(() => {
    return papers.slice(1).map((p) => ({
      id: `e-${p.id}`, 
      source: papers[0].id, 
      target: p.id,
      style: { stroke: '#2d5f5f', strokeWidth: 1, opacity: 0.15 }
    }));
  }, [papers]);

  // 处理点击事件：直接从节点数据中获取 paper 对象
  const handleNodeClick: NodeMouseHandler = (_, node) => {
    // node 类型自动推断为 Node，通过类型断言确保安全
    const nodeData = node.data as TreeNodeData;
    if (nodeData.paper) {
      onNodeClick(nodeData.paper);
    }
  };

  return (
    <div className="h-full w-full relative react-flow-academic">
        <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            onNodeClick={handleNodeClick}
            fitView
            nodesDraggable={!isLocked}
            panOnDrag={!isLocked}
            zoomOnScroll={true} 
            zoomOnPinch={true}
            preventScrolling={true} 
            maxZoom={4}
            minZoom={0.1}
        >
            <Background variant={BackgroundVariant.Lines} color="#f1f5f9" gap={40} />
        
            {/* 控制面板部分 */}
            <div className="absolute left-5 bottom-4 z-50 flex flex-col bg-white shadow-sm border border-slate-200 rounded-sm overflow-hidden">
                <button onClick={() => zoomIn()} className="w-9 h-9 flex items-center justify-center border-b border-slate-100 hover:bg-slate-50" title="放大">
                    <Plus size={14} className="text-black" />
                </button>
                <button onClick={() => zoomOut()} className="w-9 h-9 flex items-center justify-center border-b border-slate-100 hover:bg-slate-50" title="缩小">
                    <Minus size={14} className="text-black" />
                </button>
                <button onClick={() => fitView()} className="w-9 h-9 flex items-center justify-center border-b border-slate-100 hover:bg-slate-50" title="适应屏幕">
                    <Maximize size={13} className="text-black" />
                </button>
                <button onClick={() => setIsLocked(!isLocked)} className="w-9 h-9 flex items-center justify-center border-b border-slate-100 hover:bg-slate-50" title={isLocked ? "解锁" : "锁定"}>
                    {isLocked ? <Lock size={13} className="text-[#2d5f5f]" strokeWidth={2.5} /> : <LockOpen size={13} className="text-black" />}
                </button>
                <button onClick={() => setShowHelp(!showHelp)} className="w-9 h-9 flex items-center justify-center hover:bg-slate-50" title="帮助">
                    <HelpCircle size={14} className={showHelp ? "text-[#2d5f5f]" : "text-black"} />
                </button>
            </div>

            {/* 帮助说明窗口 */}
            {showHelp && (
              <div className="absolute bottom-10 left-18 z-100 w-80 bg-white shadow-2xl rounded-lg border border-slate-100 p-5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-800">如何阅读图表</h3>
                  <button onClick={() => setShowHelp(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={16} />
                  </button>
                </div>
                
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  每个节点都是与原论文相关的学术论文。
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>论文按<b>相似性</b>与<b>引用数量</b>排序</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>节点<b className="text-lg mx-0.5">大小</b>是引用次数</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>节点<b className="text-primary mx-0.5">颜色</b>是出版年份</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-primary rounded-full" />
                    <span><b>类似</b>的论文具有强烈的连通线并聚集在一起</span>
                  </li>
                </ul>

                <button className="mt-5 text-[12px] font-bold text-primary hover:underline cursor-pointer">
                  了解更多信息
                </button>
              </div>
            )}

            {/* 右下角 MiniMap 和时间轴 */}
            <div className="absolute bottom-6 right-8 z-50 flex flex-col items-end pointer-events-none">
                <MiniMap 
                    style={{ position: 'static', margin: 0, width: 240, height: 150, background: 'transparent' }} 
                    maskColor="rgba(241, 245, 249, 0.4)"
                />
                <div className="mt-1 flex flex-col items-end gap-1.5 w-[240px]">
                    <div className="h-3 w-full bg-linear-to-r from-slate-200 via-[#4d8b8b] to-primary" />
                    <div className="flex justify-between w-full text-[13px] text-slate-600 font-bold font-mono">
                    <span>2009</span>
                    <span>2025</span>
                    </div>
                </div>
            </div>
        </ReactFlow>

        <style jsx global>{`
          .react-flow-academic .react-flow__controls-button {
            width: 28px !important;
            height: 28px !important;
            padding: 0 !important;
            border-bottom: 1px solid #f1f5f9 !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            background: white !important;
          }
          .react-flow-academic .react-flow__controls-button:last-child {
            border-bottom: none !important;
          }
        `}</style>
    </div>
  );
}