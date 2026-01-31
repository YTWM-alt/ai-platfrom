'use client';
import { SearchOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

interface ModeSelectorProps {
  mode: 'simple' | 'smart';
  setMode: (mode: 'simple' | 'smart') => void;
  isWebSearch: boolean;
  setIsWebSearch: (val: boolean) => void;
}

export const ModeSelector = ({ mode, setMode, isWebSearch, setIsWebSearch }: ModeSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* 简单搜索按钮 */}
      <div className="relative h-9 rounded-full overflow-hidden group">
        {mode !== 'simple' && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="absolute -inset-full animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E5E7EB_0%,var(--color-primary)_50%,#E5E7EB_100%)]" />
          </div>
        )}
        <button 
          onClick={() => setMode('simple')}
          className={`relative m-[1.5px] flex items-center gap-2 h-[calc(100%-3px)] px-4 rounded-full transition-all z-10 border-none outline-none cursor-pointer
            ${mode === 'simple' ? 'bg-emerald-50 text-primary font-bold shadow-[inset_0_0_0_1px_rgba(26,92,58,0.1)]' : 'bg-white text-gray-600 shadow-[inset_0_0_0_1px_rgba(26,92,58,0.1)]'}`}
        >
          <SearchOutlined className="text-base" />
          <span className="text-[14px]">简单搜索</span>
        </button>
      </div>

      {/* 智能搜索按钮 */}
      <div className="relative h-9 rounded-full overflow-hidden group">
        {mode !== 'smart' && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="absolute -inset-full animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E5E7EB_0%,var(--color-primary)_50%,#E5E7EB_100%)]" />
          </div>
        )}
        <div 
          onClick={() => setMode('smart')}
          className={`relative m-[1.5px] flex items-center h-[calc(100%-3px)] pl-4 pr-2 rounded-full transition-all z-10 cursor-pointer
            ${mode === 'smart' ? 'bg-emerald-50 text-primary font-bold shadow-[inset_0_0_0_1px_rgba(26,92,58,0.1)]' : 'bg-white text-gray-600 shadow-[inset_0_0_0_1px_rgba(26,92,58,0.1)]'}`}
        >
          <ThunderboltOutlined className="text-base mr-2" />
          <span className="text-[14px] mr-2">智能搜索</span>
          {mode === 'smart' && (
            <div className="relative flex items-center h-full ml-1" onClick={e => e.stopPropagation()}>
              <Switch size="small" checked={isWebSearch} onChange={setIsWebSearch} className="custom-compact-switch shrink-0" />
              <span className={`absolute inset-0 pointer-events-none text-[10px] font-bold text-white flex items-center ${isWebSearch ? 'justify-start pl-1.5 opacity-100' : 'opacity-0'}`}>联网</span>
              <span className={`absolute inset-0 pointer-events-none text-[10px] font-bold text-white flex items-center ${!isWebSearch ? 'justify-end pr-1.5 opacity-100' : 'opacity-0'}`}>离线</span>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        /* 联网/离线开关 (Switch) - 修复垂直居中与文字位置 */
        .custom-compact-switch.ant-switch {
            min-width: 46px !important; /* 稍微微调宽度，确保文字不拥挤 */
            height: 20px !important;
            background-color: #cbd5e1 !important;
            display: flex !important;
            align-items: center !important;
            border: none !important;
        }

        /* 选中态（联网）背景色锁定 */
        .custom-compact-switch.ant-switch.ant-switch-checked {
            background-color: var(--color-primary) !important;
        }

        /* 修复小圆点 (Handle) 的位置冲突 */
        .custom-compact-switch .ant-switch-handle {
            width: 14px !important;
            height: 14px !important;
            top: 50% !important;
            transform: translateY(-50%) !important; /* 强制垂直居中 */
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* 选中态圆点的水平位置固定 */
        .custom-compact-switch.ant-switch-checked .ant-switch-handle {
            inset-inline-start: calc(100% - 17px) !important;
        }

        /* 彻底清理内部干扰元素 */
        .custom-compact-switch .ant-switch-inner {
            display: none !important;
        }
      `}</style>
    </div>
  );
};
