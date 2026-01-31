import './globals.css';
import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICP - 智协平台 - AI人机协作", // 在这里修改你想要的标题
  description: "AI帮你理解科学，提供高精准论文解读与问答",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
