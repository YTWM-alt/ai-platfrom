import { Paper } from './paper';
import { Node, Edge } from 'reactflow';

//树节点 data 属性的严格定义
export interface TreeNodeData extends Record<string, unknown> {
  label: string;       // 节点上显示的标题
  paper: Paper;       // 绑定的完整论文对象，方便点击时直接获取
  isRoot?: boolean;    // 是否为 Origin Paper
}

//强类型节点：Node<T> 泛型会让你在 node.data 中获得智能提示
export type TreeNode = Node<TreeNodeData>;

//强类型边：目前使用标准 Edge，未来可扩展自定义 EdgeData
export type TreeEdge = Edge;

//画布数据整体接口
export interface FlowData {
  nodes: TreeNode[];
  edges: TreeEdge[];
}