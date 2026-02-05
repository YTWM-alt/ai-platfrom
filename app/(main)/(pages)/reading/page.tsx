"use client";

import { useRouter } from 'next/navigation';
import { ConfigProvider } from 'antd';
import { ClockCircleOutlined, ReadOutlined } from '@ant-design/icons';
import { FeatureHeader } from '@/components/pages/common/FeatureHeader';
import { FileUploader } from '@/components/pages/reading/FileUploader';
import { ReadingProvider } from '@/context/ReadingContext';

export default function AIReaderPage() {
  const router = useRouter();

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
        <div className="min-h-screen p-8 flex flex-col items-center relative overflow-hidden">
          {/* 顶部工具 */}
          <div className="w-full max-w-5xl flex justify-between items-center mb-16">
            <div className="absolute top-6 left-8 z-10 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              <ClockCircleOutlined style={{ fontSize: '20px' }} />
            </div>
          </div>

          {/* 标题组件 */}
          <FeatureHeader 
            title="AI 阅读"
            tag="GLM-4.0 满血版 ✦"
            description="作为你的论文阅读助手，我可以帮你快速解读论文：进行多语言论文的高精准翻译，对论文中文本、图片、公式高精准解读与问答"
            icon={<ReadOutlined />}
            align="left"
          />

          {/* 上传组件 */}
          <FileUploader 
            onLibraryClick={() => router.push('/knowledge')}
          />
        </div>
      </ReadingProvider>
    </ConfigProvider>
  );
}