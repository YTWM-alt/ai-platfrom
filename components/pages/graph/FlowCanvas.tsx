"use client";

import ReactFlow, {
  Background,
  useReactFlow,
  BackgroundVariant,
  NodeMouseHandler,
  OnNodesChange,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import { GraphNode, GraphEdge } from "@/types/pages/graph";
import GraphNodeComponent from "./GraphNode";
import {
  Plus,
  Minus,
  Maximize,
  HelpCircle,
  X,
  Undo2,
  Redo2,
  Trash2,
} from "lucide-react";

interface FlowCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onNodeClick: NodeMouseHandler;
  onNodeContextMenu?: NodeMouseHandler;
  onNodesChange?: OnNodesChange;
  showHelp: boolean;
  onToggleHelp: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onDelete: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const nodeTypes = {
  custom: GraphNodeComponent,
};

export default function FlowCanvas({
  nodes,
  edges,
  onNodeClick,
  onNodeContextMenu,
  onNodesChange,
  showHelp,
  onToggleHelp,
  onUndo,
  onRedo,
  onDelete,
  canUndo,
  canRedo,
}: FlowCanvasProps) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="h-full w-full relative react-flow-academic">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onNodeContextMenu={onNodeContextMenu}
        onNodesChange={onNodesChange}
        fitView
        preventScrolling={true}
        maxZoom={4}
        minZoom={0.1}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#e5e7eb"
          gap={24}
          size={1}
        />

        {/* 顶部工具栏 */}
       <Panel position="top-left" className="!m-0 pointer-events-auto !z-[100]">
          <div className="ml-5 mt-4 flex items-center gap-2 bg-white/90 backdrop-blur-md shadow-sm border border-slate-200 rounded-full px-2 py-1 pointer-events-auto">
          <button
            onClick={onUndo}
            disabled={!canUndo}
           role="button"
           aria-label="撤销操作"
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              canUndo ? "hover:bg-slate-50" : "opacity-40 cursor-not-allowed"
            }`}
            title="撤销 (Ctrl+Z)"
          >
            <Undo2 size={14} className="text-black" />
          </button>

          <button
            onClick={onRedo}
            disabled={!canRedo}
           role="button"
           aria-label="重做操作"
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              canRedo ? "hover:bg-slate-50" : "opacity-40 cursor-not-allowed"
            }`}
            title="前进 (Ctrl+Y / Ctrl+Shift+Z)"
          >
            <Redo2 size={14} className="text-black" />
          </button>

          <button
            onClick={onDelete}
           role="button"
           aria-label="删除节点"
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-slate-50"
            title="删除节点 (Delete)"
          >
            <Trash2 size={14} className="text-black" />
          </button>

          <div className="w-px h-5 bg-slate-200" />

          <button
           onClick={() => zoomIn()}
           role="button"
           aria-label="放大视图"
           className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-slate-50"
            title="放大"
          >
            <Plus size={14} className="text-black" />
          </button>

          <button
           onClick={() => zoomOut()}
           role="button"
           aria-label="缩小视图"
           className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-slate-50"
            title="缩小"
          >
            <Minus size={14} className="text-black" />
          </button>

          <button
           onClick={() => fitView()}
           role="button"
           aria-label="适应屏幕"
           className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-slate-50"
            title="适应屏幕"
          >
            <Maximize size={13} className="text-black" />
          </button>
          </div>
        </Panel>

       {/* 左下角帮助按钮 */}
       <Panel position="bottom-left" className="!m-0 pointer-events-auto !z-[100]">
         <div className="ml-5 mb-4 bg-white/80 backdrop-blur-md shadow-sm border border-slate-200 rounded-xl overflow-hidden pointer-events-auto">
          <button
            onClick={onToggleHelp}
           role="button"
           aria-label="显示帮助"
            className="w-9 h-9 flex items-center justify-center hover:bg-slate-50"
            title="帮助 (H)"
          >
            <HelpCircle
              size={14}
              className={showHelp ? "text-[#2d5f5f]" : "text-black"}
            />
          </button>
          </div>
        </Panel>

        {/* 帮助说明窗口 */}
        {showHelp && (
          <Panel position="bottom-left" className="!m-0 pointer-events-auto">
            <div className="ml-5 mb-20 w-80 bg-white/90 backdrop-blur-md shadow-2xl rounded-xl border border-slate-100 p-5 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-800">如何阅读图表</h3>
              <button
                onClick={onToggleHelp}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              交互式知识图谱指南：
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                <span>
                  <b>点击</b>节点展开更多关联
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                <span>
                  <b>右键</b>点击可选中/锁定节点
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                <span>
                  <b>拖拽</b>可自由调整节点位置
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                <span>
                  <b>Delete</b> 删除选中节点
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                <span>
                  <b>Ctrl+Z / Ctrl+Y</b> 撤销与前进
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 bg-[#FFD700] rounded-full" />
                <span>
                  底部输入新词可与选中节点<b>建立连接</b>
                </span>
              </li>
            </ul>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}
