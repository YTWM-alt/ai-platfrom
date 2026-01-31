import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI人机协作平台',
  description: '智能写作、知识管理、AI绘图、代码辅助一站式平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}
