"use client";
import { ReactFlowProvider } from 'reactflow';
import SourceTreeContainer from '@/components/pages/tree/SourceTreeContainer';

//作为入口，只负责“叫出”溯源树组件
export default function TreePage() {
  // 可以在这里进行服务端数据获取
  return (
    <ReactFlowProvider>
      <SourceTreeContainer />
    </ReactFlowProvider>
  );
}