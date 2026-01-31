'use client';
import { Upload, Button } from 'antd';
import { UploadOutlined, LayoutOutlined } from '@ant-design/icons';
import { FileText } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';

const { Dragger } = Upload;

interface FileUploaderProps {
  onLibraryClick: () => void;
}

export const FileUploader = ({ onLibraryClick }: FileUploaderProps) => {
  const { isLoggedIn, setIsLoginModalOpen } = useLayout();

  const handleBeforeUpload = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return Upload.LIST_IGNORE; // 阻止上传
    }
    return true;
  };

  return (
    <div className="w-full max-w-4xl relative group">
      <div className="rounded-[40px] overflow-hidden border border-dashed border-primary group-hover:border-primary/40 transition-all bg-white/40 backdrop-blur-md">
        <Dragger
          style={{ border: 'none', background: 'transparent' }}
          className="bg-transparent! py-20"
          multiple={false}
          showUploadList={false}
          beforeUpload={handleBeforeUpload}
        >
          <div className="flex flex-col items-center justify-center">
            {/* PDF 图标装饰 */}
            <div className="mb-6 relative">
               <div className="w-14 h-16.5 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-gray-100" />
                  <div className="absolute bottom-3 left-[-6px] bg-[#ef4444] text-white text-[8px] font-bold px-1 rounded-sm shadow-sm">PDF</div>
               </div>
            </div>
            
            <h2 className="text-primary text-xl font-medium mb-2">拖放或点击可上传文件</h2>
            <p className="text-gray-400 text-sm mb-10">支持PDF文件，文件大小不超过50M</p>
            
            <div className="flex gap-4">
              <Button 
                icon={<UploadOutlined />} 
                size="large"
                className="rounded-xl! h-11! px-8! border-gray-200! text-gray-700! font-medium! hover:text-primary! hover:border-primary!"
              >
                上传本地文献阅读
              </Button>
              <Button 
                icon={<LayoutOutlined />}
                size="large"
                className="rounded-xl! !h-11! px-8! border-gray-200! text-gray-700! font-medium! hover:text-primary! hover:border-primary!"
                onClick={(e) => {
                  e.stopPropagation();
                  onLibraryClick();
                }}
              >
                前往我的知识库
              </Button>
            </div>
          </div>
        </Dragger>
      </div>
      {/* 背景光晕 */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};