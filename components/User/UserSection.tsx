'use client';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLayout } from '@/context/LayoutContext';

interface SidebarUserProps {
  collapsed: boolean;
}

export const UserSection = ({ collapsed }: SidebarUserProps) => {
  const { isLoggedIn, setIsLoginModalOpen, logout } = useLayout();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      if (confirm("确定要退出登录吗？")) logout();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="shrink-0 p-4 border-t border-gray-200 bg-white">
      <Button 
        type={isLoggedIn ? "default" : "primary"} 
        block={!collapsed} 
        className={`h-10 rounded-xl ${!isLoggedIn ? 'bg-primary!' : ''}`} 
        onClick={handleAuthClick}
      >
        {collapsed ? (
          <UserOutlined className={isLoggedIn ? "text-green-500" : ""} />
        ) : (
          isLoggedIn ? "退出登录" : "登录 / 注册"
        )}
      </Button>
    </div>
  );
};