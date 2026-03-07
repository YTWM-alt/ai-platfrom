'use client';
import { useState } from 'react';
import {
  FolderOutlined,
  FolderOpenOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileOutlined,
  PlusOutlined,
  EllipsisOutlined,
  SearchOutlined,
} from '@ant-design/icons';

interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  fileExt?: string;
  children?: FileNode[];
}

const mockFileTree: FileNode[] = [
  {
    id: 'root',
    name: 'arXiv-2012.13891v3',
    type: 'folder',
    children: [
      {
        id: 'sections',
        name: 'sections',
        type: 'folder',
        children: [
          { id: 's1', name: 'introduction.tex', type: 'file', fileExt: 'tex' },
          { id: 's2', name: 'related_work.tex', type: 'file', fileExt: 'tex' },
          { id: 's3', name: 'method.tex', type: 'file', fileExt: 'tex' },
          { id: 's4', name: 'experiments.tex', type: 'file', fileExt: 'tex' },
          { id: 's5', name: 'conclusion.tex', type: 'file', fileExt: 'tex' },
        ],
      },
      {
        id: 'figs',
        name: 'Figs',
        type: 'folder',
        children: [
          { id: 'f1', name: 'fig_architecture.pdf', type: 'file', fileExt: 'pdf' },
          { id: 'f2', name: 'fig_fairuve.pdf', type: 'file', fileExt: 'pdf' },
          { id: 'f3', name: 'fig_results.pdf', type: 'file', fileExt: 'pdf' },
          { id: 'f4', name: 'fig_comparison.pdf', type: 'file', fileExt: 'pdf' },
        ],
      },
      {
        id: 'bios',
        name: 'Bios',
        type: 'folder',
        children: [
          { id: 'b1', name: 'bio_author1.tex', type: 'file', fileExt: 'tex' },
          { id: 'b2', name: 'bio_author2.tex', type: 'file', fileExt: 'tex' },
        ],
      },
      { id: 'main', name: 'IEEE_main.tex', type: 'file', fileExt: 'tex' },
      { id: 'appendix-tex', name: 'IEEE_main_appendix_(精简).tex', type: 'file', fileExt: 'tex' },
      { id: 'appendix-pdf', name: 'IEEE_main_appendix_(精简).pdf', type: 'file', fileExt: 'pdf' },
      { id: 'appendix-aux', name: 'IEEE_main_appendix_(精简).aux', type: 'file', fileExt: 'aux' },
      { id: 'appendix-bbl', name: 'IEEE_main_appendix_(精简).bbl', type: 'file', fileExt: 'bbl' },
      { id: 'appendix-log', name: 'IEEE_main_appendix_(精简).log', type: 'file', fileExt: 'log' },
      { id: 'refs', name: 'references.bib', type: 'file', fileExt: 'bib' },
      { id: 'cls', name: 'IEEEtran.cls', type: 'file', fileExt: 'cls' },
      { id: 'synctex', name: 'IEEE_main.synctex.gz', type: 'file', fileExt: 'gz' },
    ],
  },
];

function getFileIcon(fileExt?: string) {
  switch (fileExt) {
    case 'tex':
      return <FileTextOutlined style={{ color: '#f97316' }} />;
    case 'pdf':
      return <FilePdfOutlined style={{ color: '#ef4444' }} />;
    case 'bib':
      return <FileOutlined style={{ color: '#3b82f6' }} />;
    case 'cls':
    case 'sty':
      return <FileOutlined style={{ color: '#8b5cf6' }} />;
    default:
      return <FileOutlined style={{ color: '#9ca3af' }} />;
  }
}

function FileTreeNode({
  node,
  depth = 0,
  activeId,
  onSelect,
}: {
  node: FileNode;
  depth?: number;
  activeId: string;
  onSelect: (id: string, name: string) => void;
}) {
  const [expanded, setExpanded] = useState(depth === 0);

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-1.5 py-[3px] pr-2 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
          style={{ paddingLeft: `${6 + depth * 14}px` }}
        >
          {expanded ? (
            <FolderOpenOutlined style={{ color: '#f59e0b', fontSize: '12px', flexShrink: 0 }} />
          ) : (
            <FolderOutlined style={{ color: '#f59e0b', fontSize: '12px', flexShrink: 0 }} />
          )}
          <span className="truncate font-medium">{node.name}</span>
        </button>
        {expanded && node.children && (
          <div>
            {node.children.map((child) => (
              <FileTreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                activeId={activeId}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(node.id, node.name)}
      className={`w-full flex items-center gap-1.5 py-[3px] pr-2 text-xs rounded transition-colors ${
        activeId === node.id
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      style={{ paddingLeft: `${6 + depth * 14}px` }}
    >
      <span style={{ flexShrink: 0, fontSize: '12px' }}>{getFileIcon(node.fileExt)}</span>
      <span className="truncate">{node.name}</span>
    </button>
  );
}

interface WritingFileExplorerProps {
  onFileSelect?: (id: string, name: string) => void;
}

export default function WritingFileExplorer({ onFileSelect }: WritingFileExplorerProps) {
  const [activeId, setActiveId] = useState('main');

  const handleSelect = (id: string, name: string) => {
    setActiveId(id);
    onFileSelect?.(id, name);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#f3f3f3' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 shrink-0" style={{ background: '#f3f3f3' }}>
        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">资源管理器</span>
        <div className="flex items-center gap-0.5">
          <button className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded">
            <PlusOutlined style={{ fontSize: '11px' }} />
          </button>
          <button className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded">
            <EllipsisOutlined style={{ fontSize: '11px' }} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-2 pb-1.5 shrink-0">
        <div className="relative">
          <SearchOutlined
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            style={{ fontSize: '11px' }}
          />
          <input
            type="text"
            placeholder="搜索文件..."
            className="w-full h-6 pl-6 pr-2 text-xs border border-gray-200 rounded focus:outline-none focus:border-primary/50 bg-white"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto px-1 pb-2">
        {mockFileTree.map((node) => (
          <FileTreeNode
            key={node.id}
            node={node}
            depth={0}
            activeId={activeId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
