'use client';
import React from 'react';
import { Input } from 'antd';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  leftElement?: React.ReactNode; // 左侧可选的按钮/组件（如上传图片按钮）
}

export const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "请输入内容...", 
  leftElement 
}: SearchInputProps) => {
  return (
    <div className="relative p-4 flex gap-2 items-start">
      {/* 如果有传入左侧元素则显示 */}
      {leftElement && (
        <div className="shrink-0 mt-1">
          {leftElement}
        </div>
      )}
      
      <Input.TextArea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoSize={{ minRows: 3, maxRows: 8 }}
        variant="borderless"
        className="text-[17px] p-2 resize-none! placeholder:text-gray-300 focus:shadow-none"
      />
    </div>
  );
};