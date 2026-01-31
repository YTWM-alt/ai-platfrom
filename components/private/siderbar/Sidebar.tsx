'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SearchOutlined, LeftOutlined, RightOutlined, HomeOutlined  } from '@ant-design/icons';
import { NAV_ITEMS } from './SiderbarData'; // 导入配置
import { SidebarItem } from './SidebarItem'; // 导入零件
import LoginModal from '../User/LoginModal';
import { useLayout } from '@/context/LayoutContext';
import { UserSection } from '../User/UserSection';

// 增加 props 接口，方便父组件控制或同步状态
interface SidebarProps {
  collapsed: boolean;
  onCollapse: (val: boolean) => void;
}

export default function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 从管家这里拿所有的状态
  const { 
    isLoggedIn, 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    // logout, 
    login 
  } = useLayout();  

  const handleNavClick = (path: string) => {
    if (pathname === path) return;
    router.push(path);
    // 如果没登录且点击了受限区域，弹出登录
    if (path !== '/private' && path !== '/' && !isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  };

return (
    <>
      <aside className={`fixed left-0 top-0 h-screen flex flex-col border-r-gray-200 bg-white! z-50 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} sidebar-shadow`}>
        {/* 收起/展开按钮 */}
        <div onClick={() => onCollapse(!collapsed)} className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-white border-gray-300 rounded-full flex items-center justify-center cursor-pointer shadow-md z-60">
          {collapsed ? <RightOutlined className="text-[10px]" /> : <LeftOutlined className="text-[10px]" />}
        </div>

        {/* === 顶部 Logo 区域 === */}
        <div className="shrink-0 px-4 pt-6 pb-2 border-b border-gray-200 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1 mb-1">
            <div className="w-8 h-8 bg-primary flex items-center justify-center text-white shadow-sm shrink-0">
              <div className="w-8 h-8 relative shrink-0">
                <Image 
                  src="/favicon.svg"   
                  alt="Logo"
                  fill                 // 填充父容器
                  priority             // 侧边栏 Logo 通常是首屏关键元素，建议加 priority 加快加载速度
                  className="object-contain" 
                />
              </div>
            </div>
            {!collapsed && ( // 折叠时隐藏文字
              <div className="flex flex-col justify-between h-8 py-0 whitespace-nowrap animate-in fade-in duration-300">
                <span className="text-[18px] font-bold text-primary leading-none tracking-tight">智协平台</span>
                <span className="text-[11px] text-gray-400 font-medium tracking-wider">AI人机协作</span>
              </div>
            )}
          </div>

          <button onClick={() => handleNavClick('/private')} className="w-full h-10 bg-primary text-white rounded-xl flex items-center justify-center">
            <SearchOutlined className={collapsed ? 'text-xl' : 'text-lg mr-2'} />
            {!collapsed && <span>学术搜索</span>}
          </button>
          <button onClick={() => handleNavClick('/')} className="w-full h-10 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl flex items-center justify-center mt-2 transition-colors">
            <HomeOutlined className={collapsed ? 'text-xl' : 'text-lg mr-2'} />
            {!collapsed && <span>返回大主页</span>}
          </button>
        </div>

        {/* === 中间菜单区域 === */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <SidebarItem 
              key={item.id} 
              item={item} 
              collapsed={collapsed} 
              isActive={pathname.startsWith(item.path)}
              onClick={() => handleNavClick(item.path)}
            />
          ))}
        </div>

        {/* === 底部用户区域 === */}
        <UserSection collapsed={collapsed} /> 
      </aside>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onSuccess={login}  />
    </>
  );
}