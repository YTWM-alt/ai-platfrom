'use client';

import { ConfigProvider, App } from 'antd';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1a5c3a',
          borderRadius: 12,
        },
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}
