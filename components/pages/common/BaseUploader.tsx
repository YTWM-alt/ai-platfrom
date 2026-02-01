'use client';
import { Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { useLayout } from '@/context/LayoutContext';

const { Dragger } = Upload;

interface BaseUploaderProps {
  onSuccess: (file: RcFile) => void;
  accept?: string;
  children?: React.ReactNode;
  className?: string; // 支持外部传入类名
}

export const BaseUploader = ({ onSuccess, accept = "image/*", children, className }: BaseUploaderProps) => {
  const { isLoggedIn, setIsLoginModalOpen } = useLayout();

  const handleBeforeUpload: UploadProps['beforeUpload'] = (file: RcFile) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return Upload.LIST_IGNORE;
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('文件不能超过 10MB');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleCustomRequest: UploadProps['customRequest'] = (options) => {
    const { file, onSuccess: antdSuccess } = options;
    setTimeout(() => {
      antdSuccess?.("ok");
      onSuccess(file as RcFile);
    }, 500);
  };

  return (
    <Dragger
      accept={accept}
      multiple={false}
      showUploadList={false}
      beforeUpload={handleBeforeUpload}
      customRequest={handleCustomRequest}
      // w-full! 确保在父级 div 中撑满，同时清除 Antd 默认 padding
      style={{ border: 'none', background: 'transparent' }}
      className={`
        border-none! bg-transparent! transition-none
        [&.ant-upload-drag-hover]:border-none! 
        [&>.ant-upload]:p-0! 
        ${className}
      `}
    >
      {children}
    </Dragger>
  );
};