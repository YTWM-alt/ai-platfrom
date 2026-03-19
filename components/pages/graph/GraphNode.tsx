import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { GraphNodeData } from '@/types/pages/graph';

const GraphNode = ({ data, selected, dragging}: NodeProps<GraphNodeData>) => {
  const { label, isRoot, isSelected, translation } = data;
  
  // 动态样式计算
  const isHighlighted = isSelected || selected; // 支持 ReactFlow 的默认选中和自定义选中
  
  // 基础圆圈样式
  const baseStyle = `
    relative flex flex-col items-center justify-center text-center
    rounded-full transition-all duration-500 ease-out
    backdrop-blur-md border border-white/20 shadow-lg
    hover:scale-105 hover:shadow-xl hover:z-50
  `;

  // 呼吸灯效果 (仅对 Root 或 Highlighted 生效)
  const pulseEffect = (isRoot || isHighlighted) ? 'animate-pulse-slow' : '';

  // 颜色主题（绿白为主）
  // Root: 绿底蓝字
  // Highlighted: 蓝底黑字
  // Normal: 白底绿字（玻璃质感）
  let colorTheme = '';
  if (isRoot) {
    colorTheme = 'bg-green-600 text-blue-500 border-green-300/50';
  } else if (isHighlighted) {
    colorTheme = 'bg-blue-500 text-black border-black/20 shadow-[0_0_20px_rgba(59,130,246,0.4)]';
  } else {
    colorTheme = 'bg-white/80 text-green-700 border-green-200 hover:border-green-300/50 hover:bg-white/95';
  }

  const dragEffect = dragging ? 'ring-2 ring-[#FFD700] scale-105' : '';

  return (
    <div className={`${baseStyle} ${colorTheme} ${pulseEffect} ${dragEffect} w-full h-full overflow-hidden p-2`}>
      {/* 连接点 - 隐藏但功能存在 */}
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      
      <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none select-none">
        {/* 标题 - 自动折行 */}
        <div className={`font-bold leading-tight break-words w-full px-1
          ${(isRoot || isHighlighted) ? 'text-[13px] md:text-[14px]' : 'text-[10px] md:text-[11px]'}
        `}>
          {label}
        </div>
        
        {/* 英文翻译 - 必须显示 */}
        {translation && (
          <div className={`mt-1 opacity-80 italic font-medium leading-tight w-full px-1
            ${(isRoot || isHighlighted) ? 'text-[10px]' : 'text-[8px]'}
          `}>
            {translation}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(GraphNode);