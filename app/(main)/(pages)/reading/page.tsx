"use client";

import { ConfigProvider } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { FeatureHeader } from '@/components/pages/common/FeatureHeader';
import { FileUploader } from '@/components/pages/reading/FileUploader';
import { ReadingProvider } from '@/context/ReadingContext';
import { HistorySidebar } from '@/components/pages/common/HistorySidebar';
import { HistoryTrigger } from '@/components/pages/common/HistoryTrigger';
import router from 'next/router';

export default function AIReaderPage() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1a5c3a',
          borderRadius: 12,
        },
      }}
    >
      <ReadingProvider>
        {/* 最外层容器：h-screen 确保铺满屏幕，relative 方便内部绝对定位 */}
        <div className="relative flex h-screen w-full overflow-hidden bg-mesh-green">
          {/* 历史侧边栏：包裹一层 absolute 容器
              使用 z-50 确保它能盖住搜索框；
              采用绝对定位后，它弹出时不会推挤右侧内容，中间的搜索框依然是屏幕物理中心 */}
          <div className="z-50">
            <HistorySidebar />
          </div>

          {/* 主内容区：使用 flex-1 自动撑满全球导航栏右侧的空间 */}
          <div className="flex-1 relative overflow-y-auto">
            {/* 居中容器：min-h-full 配合 flex 居中 */}
            <div className="min-h-full flex flex-col items-center justify-center relative px-6">
              {/* 触发按钮：定位于“主内容区”的左上角
                  className 设为 top-6 left-6 避开左侧边缘，增加 z-index */}
              <HistoryTrigger 
                module="reading" 
                title="历史对话" 
              />

              {/* 内容容器 */}
              <div className="w-full max-w-4xl flex flex-col items-center">
                <FeatureHeader 
                  title="AI 阅读"
                  tag="GLM-4.0 满血版 ✦"
                  description="作为你的论文阅读助手，我可以帮你快速解读论文：进行多语言论文的高精准翻译，对论文中文本、图片、公式高精准解读与问答"
                  icon={<ReadOutlined />}
                  align="left"
                />
                <div className="w-full mt-2">
                  <FileUploader onLibraryClick={() => router.push('/knowledge')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReadingProvider>
    </ConfigProvider>
  );
}