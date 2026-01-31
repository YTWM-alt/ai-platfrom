'use client';
import React from 'react';
import { Select } from 'antd';
import { SendOutlined, DownOutlined } from '@ant-design/icons';

interface ModelOption {
  value: string;
  label: string;
}

interface ModelSelectProps {
  showModelSelector?: boolean;   // 是否显示模型选择器
  options?: ModelOption[];       // 模型列表
  onSend?: () => void;           // 点击发送的回调
  defaultValue?: string;
}

export const ModelSelect = ({ 
  showModelSelector = true, 
  options = [
    { value: 'glm-4.5-air', label: 'GLM-4.5 Air' },
    { value: 'glm-4-plus', label: 'GLM-4 Plus' },
  ],
  onSend,
  defaultValue = "glm-4.5-air"
}: ModelSelectProps) => {
  return (
    <div className="flex items-center gap-3 rounded-full px-2">
      {showModelSelector && (
        <div className="bg-emerald-50 rounded-full items-center shadow-[inset_0_0_0_1px_rgba(26,92,58,0.1)] overflow-hidden">
          <Select
            defaultValue={defaultValue}
            variant="borderless"
            suffixIcon={<DownOutlined className="select-arrow-icon" />}
            // 修复过时警告：使用 classNames 替换 popupClassName
            classNames={{
              popup: {
                root: 'model-select-dropdown'
              }
            }}
            className="text-primary font-medium model-select-custom h-9 flex items-center"
            options={options}
          />
        </div>
      )}
      
      {/* 发送按钮 */}
      <button 
        onClick={onSend}
        className="group relative h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm bg-gray-100 hover:bg-primary border-none outline-none cursor-pointer shrink-0"
      >
        <SendOutlined className="absolute text-lg text-primary! font-bold transition-all duration-300 group-hover:scale-50 group-hover:opacity-0" />
        <SendOutlined className="absolute text-lg text-white! transition-all duration-300 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:-rotate-45" />
      </button>

      <style jsx global>{`
        /* 1. 搜索框内显示的文字颜色 */
        .model-select-custom .ant-select-selection-item {
          color: #1a5c3a !important; 
          font-weight: 700 !important; 
          font-size: 14px;
        }

        /* 2. 箭头颜色 */
        .model-select-custom .select-arrow-icon {
          color: #1a5c3a !important;
        }

        /* 3. 下拉列表容器样式 */
        .model-select-dropdown .ant-select-item-option-content {
          color: #4b5563 !important; 
        }

        /* 选中项文字颜色 */
        .model-select-dropdown .ant-select-item-option-selected .ant-select-item-option-content {
          color: #1a5c3a !important;
          font-weight: 700 !important;
        }

        /* 选中项背景透明化 */
        .model-select-dropdown .ant-select-item-option-selected {
          background-color: transparent !important; 
        }

        /* 悬停效果 */
        .model-select-dropdown .ant-select-item-option-active {
          background-color: #f0fdf4 !important; 
        }

        /* 勾选图标颜色 */
        .model-select-dropdown .ant-select-item-option-state {
          color: #1a5c3a !important;
        }

        /* 列表项圆角 */
        .model-select-dropdown .ant-select-item {
          margin: 4px 6px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};