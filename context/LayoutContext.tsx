'use client';
import React, { createContext, useContext, useState } from 'react';

// 1. 定义管家能管理的“数据清单”类型
interface LayoutContextType {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (v: boolean) => void;
  login: () => void;
  logout: () => void;
}

// 2. 初始化 Context，解决 any 报错
const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  // 登录状态初始化
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <LayoutContext.Provider value={{ 
      collapsed, 
      setCollapsed, 
      isLoggedIn, 
      isLoginModalOpen, 
      setIsLoginModalOpen, 
      login, 
      logout 
    }}>
      {children}
    </LayoutContext.Provider>
  );
};

// 3. 这里的用法也稍微健壮一点
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("useLayout 必须在 LayoutProvider 内部使用");
  return context;
};