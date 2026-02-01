'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SearchOutlined, LeftOutlined, RightOutlined, HomeOutlined  } from '@ant-design/icons';
import { NAV_ITEMS } from './SiderbarData'; 
import { SidebarItem } from './SidebarItem'; 
import { useLayout } from '@/context/LayoutContext';
import { UserSection } from '../../User/UserSection';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // 直接从 Context 中解构所有状态和控制函数
  const { 
    collapsed, 
    setCollapsed, 
    isLoggedIn, 
    setIsLoginModalOpen 
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
     <aside className={`fixed left-0 top-0 h-screen flex flex-col border-r border-r-gray-200 bg-white! z-50 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} sidebar-shadow`}>
        {/* 收起/展开按钮 */}
      <div 
        onClick={() => setCollapsed(!collapsed)} 
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer shadow-md z-60"
      >
        {collapsed ? <RightOutlined className="text-[10px]" /> : <LeftOutlined className="text-[10px]" />}
      </div>

      {/* === 顶部 Logo 区域 === */}
      <div className={`shrink-0 pt-6 pb-2 border-b border-gray-200 flex flex-col gap-2 transition-all duration-300 ${collapsed ? 'px-0 items-center' : 'px-4'}`}>
        <div className={`flex items-center gap-2 px-1 mb-1 ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-9 h-9 relative shrink-0">
            <Image 
              src="/favicon.svg"   
              alt="Logo"
              fill              
              priority             
              className="object-contain" 
            />
          </div>
          {!collapsed && ( 
            <div className="flex flex-col justify-between h-8 py-0 whitespace-nowrap animate-in fade-in duration-300">
              <span className="text-[18px] font-bold text-primary leading-none tracking-tight">智协平台</span>
              <span className="text-[11px] text-gray-400 font-medium tracking-wider">AI人机协作</span>
            </div>
          )}
        </div>
        {/* 搜索和返回主页按钮的自适应居中 */}
        <div className={`w-full ${collapsed ? 'px-3' : ''}`}>
          <button 
            onClick={() => handleNavClick('/private')} 
            className="w-full h-10 bg-primary text-white rounded-xl flex items-center justify-center transition-all"
          >
          <SearchOutlined className={collapsed ? 'text-xl' : 'text-lg mr-2'} />
          {!collapsed && <span>学术搜索</span>}
          </button>
              
          <button 
            onClick={() => handleNavClick('/')} 
            className="w-full h-10 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl flex items-center justify-center mt-2 transition-colors transition-all"
          >
            <HomeOutlined className={collapsed ? 'text-xl' : 'text-lg mr-2'} />
            {!collapsed && <span>返回大主页</span>}
          </button>
        </div>
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
    </>
  );
}