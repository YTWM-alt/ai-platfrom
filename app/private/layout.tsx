'use client';
import Sidebar from '@/components/private/siderbar/Sidebar'; 
import { LayoutProvider, useLayout } from '@/context/LayoutContext';
import { ConfigProvider } from 'antd';

// 左右排版的容器
function PrivatePage({ children }: { children: React.ReactNode }) {
  const { collapsed, setCollapsed } = useLayout();

return (
    <ConfigProvider
        theme={{
          token: {
          colorPrimary: '#1a5c3a',       // 锁定主绿色
          // colorLink: '#1a5c3a',          // 修复链接变蓝
          // colorTextBase: '#4b5563',      // 基础文字改用深灰
          // colorBorder: '#f0f0f0',        // 灰白色边框
          borderRadius: 12,              // 圆角
          },
          components: {
          Input: {
            activeBorderColor: '#e5e7eb',
            // hoverBorderColor: '#e5e7eb',
            // activeShadow: 'none', 
          },
          Checkbox: {
            colorPrimary: '#1a5c3a',   // 勾选框
          },
          Button: {
            colorPrimary: '#1a5c3a',     // 确保登录按钮主色正确
            colorPrimaryHover: '#166534',
          },
          Modal: {
            headerBg: 'transparent',
          }
        },
      }}
    >
      <div className="flex h-screen w-full overflow-hidden bg-white">
        
        {/* 侧边栏：只负责看，不负责管逻辑 */}
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
        {/* 主内容区：只负责滚动和边距 */}
        <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'} bg-mesh-green overflow-y-auto`}>
          {children}
        </main>
      </div>
    </ConfigProvider>
  );
}

// 2. 导出最终布局
export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <PrivatePage>{children}</PrivatePage>
    </LayoutProvider>
  );
}
