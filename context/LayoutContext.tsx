'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

// 1. 定义 Context 接口
interface LayoutContextType {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  isLoggedIn: boolean;
  isUserLoading: boolean; 
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (v: boolean) => void;
  login: () => void;
  logout: () => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const savedStatus = localStorage.getItem('isLoggedIn') === 'true';
    // 使用 setTimeout 避开级联渲染报错
    setTimeout(() => {
      setIsLoggedIn(savedStatus);
      setIsUserLoading(false);
    }, 0);
  }, []);

  // 使用 useCallback 保证函数引用稳定
  const login = useCallback(() => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoginModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    // 登出后重定向到主页
    if (typeof window !== 'undefined') {
      // window.location.href = '/'; // 退出登录则跳转为大页面
      window.location.reload(); // 退出后仅刷新页面，清除所有状态
    }
  }, []);

  // 4. 使用 useMemo 优化 Context Value，防止不必要的全量重绘
  const contextValue = useMemo(() => ({
    collapsed,
    setCollapsed,
    isLoggedIn,
    isUserLoading,
    isLoginModalOpen,
    setIsLoginModalOpen,
    login,
    logout
  }), [collapsed, isLoggedIn, isUserLoading, isLoginModalOpen, login, logout]);

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout 必须在 LayoutProvider 内部使用");
  }
  return context;
};