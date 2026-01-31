import React from 'react';
import { 
  BookOutlined, ReadOutlined, EditOutlined, 
  BulbOutlined, StarOutlined, ApartmentOutlined, DatabaseOutlined 
} from '@ant-design/icons';

// 导出导航栏具有的数据
export const NAV_ITEMS = [
  { id: 'library', label: 'AI文库', icon: <BookOutlined />, path: '/private/library' },
  { id: 'reading', label: 'AI阅读', icon: <ReadOutlined />, path: '/private/reading' },
  { id: 'writing', label: 'AI写作', icon: <EditOutlined />, path: '/private/writing' },
  { id: 'thinking', label: '沉思', icon: <BulbOutlined />, path: '/private/thinking' },
  { id: 'highlights', label: '亮点', icon: <StarOutlined />, path: '/private/idea' },
  { id: 'tree', label: '溯源树', icon: <ApartmentOutlined />, path: '/private/tree' },
  { id: 'knowledge', label: '知识库', icon: <DatabaseOutlined />, path: '/private/knowledge' },
];