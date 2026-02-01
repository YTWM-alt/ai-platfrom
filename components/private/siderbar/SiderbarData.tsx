import React from 'react';
import { 
  BookOutlined, ReadOutlined, EditOutlined, HighlightOutlined, CodeOutlined,
  BulbOutlined, StarOutlined, ApartmentOutlined, DatabaseOutlined,
  ProductOutlined, 
} from '@ant-design/icons';

// 导出导航栏具有的数据
export const NAV_ITEMS = [
  { id: 'library', label: 'AI文库', icon: <BookOutlined />, path: '/library' },
  { id: 'reading', label: 'AI阅读', icon: <ReadOutlined />, path: '/reading' },
  { id: 'writing', label: 'AI写作', icon: <EditOutlined />, path: '/writing' },
  { id: 'drawing', label: 'AI绘图', icon: <HighlightOutlined />, path: '/drawing' },
  { id: 'code', label: 'AI代码', icon: <CodeOutlined />, path: '/code' },
  { id: 'thinking', label: '沉思', icon: <BulbOutlined />, path: '/thinking' },
  { id: 'highlights', label: '亮点', icon: <StarOutlined />, path: '/idea' },
  { id: 'tree', label: '溯源树', icon: <ApartmentOutlined />, path: '/tree' },
  { id: 'knowledge', label: '知识库', icon: <DatabaseOutlined />, path: '/knowledge' },
  { id: 'resources', label:'资源中心', icon:<ProductOutlined />, path:'/resources'},
];