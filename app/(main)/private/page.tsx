'use client';

import { useState } from 'react';
import { ModeSelector } from '@/components/pages/search/ModeSelector';
import { ModelSelect } from '@/components/pages/search/ModelSelect';
import { FeatureHeader } from '@/components/pages/common/FeatureHeader';
import { SearchBox } from '@/components/pages/search/SearchBox';
import { SearchMode, SearchRequest } from '@/types/pages/search';

export default function SearchPage() {
  const [mode, setMode] = useState<SearchMode>('smart');
  const [isWebSearch, setIsWebSearch] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const handleSend = () => {
  // 未来可在这里构建符合 SearchRequest 接口的对象发给后端
    console.log("执行搜索:", searchValue, "模式:", mode);
  };

  return (
    <div className="min-h-screen w-full bg-mesh-green flex flex-col items-center justify-center space-y-8 px-4">
      <FeatureHeader title="AI 帮你理解科学" tag="GLM-4.6满血版 ✨" align="center" />
      <SearchBox
        value={searchValue}
        onChange={setSearchValue}
        mode={mode}
        bottomExtra={
          <>
            <ModeSelector 
              mode={mode} 
              setMode={setMode} 
              isWebSearch={isWebSearch} 
              setIsWebSearch={setIsWebSearch} 
            />
            <ModelSelect 
              showModelSelector={mode === 'smart'} 
              onSend={handleSend}
            />
          </>
        }
      />
    </div>
  );
}