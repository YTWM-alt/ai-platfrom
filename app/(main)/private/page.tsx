'use client';

import { useState } from 'react';
import { ModeSelector } from '@/components/pages/search/ModeSelector';
import { SearchInput } from '@/components/private/SearchInput';
import { ModelSelect } from '@/components/private/ModelSelect';
import { Button } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { FeatureHeader } from '@/components/private/FeatureHeader';

export default function SearchPage() {
  const [mode, setMode] = useState<'simple' | 'smart'>('smart');
  const [isWebSearch, setIsWebSearch] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const handleSend = () => {
    console.log("执行搜索:", searchValue, "模型模式:", mode);
    // 在这里添加你的搜索请求逻辑
  };

  return (
    <div className="min-h-screen w-full bg-mesh-green flex flex-col items-center justify-center space-y-8 px-4">
      {/* 标题 */}
      <FeatureHeader 
        title="AI 帮你理解科学" 
        tag="GLM-4.6满血版 ✨" 
        align="center" 
      />

      {/* 搜索对话框 */}
      <div className="w-full max-w-4xl bg-white rounded-[24px] shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        <SearchInput
          value={searchValue} 
          onChange={setSearchValue} 
          placeholder={mode === 'simple' ? "请输入搜索内容..." : "请输入想检索的问题..."}
          leftElement={mode === 'smart' ? <Button icon={<PictureOutlined />} type="text" className="text-gray-400" /> : null}
        />
        <div className="flex justify-between items-center px-4 pb-4">
          {/* 模式切换器 */}
          <ModeSelector mode={mode} setMode={setMode} isWebSearch={isWebSearch} setIsWebSearch={setIsWebSearch} />
          <ModelSelect 
            showModelSelector={mode === 'smart'} // 仅在智能模式下显示模型选择
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}
