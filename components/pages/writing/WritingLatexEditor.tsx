'use client';
import { useRef, useState } from 'react';
import {
  CaretRightOutlined,
  SaveOutlined,
  DownloadOutlined,
  FileTextOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const MOCK_LATEX_CONTENT = `\\documentclass[10pt,journal]{IEEEtran}

% 1. 基础编包
\\usepackage[T1]{fontenc}

% 2. 数学包组
\\usepackage{amsmath}

% 3. 字体配置
\\usepackage{newtxtext}
\\usepackage{newtxmath}

\\let\\openbox\\relax
\\let\\proof\\relax
\\let\\endproof\\relax
\\usepackage{amsthm}

% 4. 数学增强与加粗
\\usepackage{amsfonts}
\\usepackage{bm}

% 5. 算法与图形
\\usepackage{graphicx}
\\usepackage{subcaption}
\\usepackage{epstopdf}
\\usepackage{algorithm}
\\usepackage[noend]{algpseudocode}

% 6. 表格与格式
\\usepackage{booktabs}
\\usepackage{enumitem}
\\usepackage{multirow}
\\usepackage{threeparttable}
\\usepackage{colortbl}
\\usepackage{setspace}
\\usepackage{multicol}

% 7. 链接与 URL
\\usepackage{url}
\\usepackage[colorlinks,linkcolor=blue,anchorcolor=blue,citecolor=green]{hyperref}

% --- 定理类型 ---
\\newtheorem{theorem}{Theorem}
\\newtheorem{proposition}{Proposition}

\\begin{document}

\\title{Breaking the Efficiency-Privacy Trade-off in\\\\
Federated Unlearning via Subspace Decoupling}

\\author{Shih He, Jiantao Cai, Jiangang Sha,\\\\
Kao Yang, Hai Lu, Xiaohui Jia and Zhifeng Tian}

\\maketitle

\\begin{abstract}
Federated machine unlearning (FMU) aims to remove the influence of targeted
data from a federated model upon request. For deep models, exact retraining is
often prohibitively expensive, while existing approximate methods either suffer
from slow unlearning speed, or risk compromising the retained data performance.
To address these challenges, FARVU-S (Fisher-Aware Recovery for Verifiable
Unlearning via Subspace) is proposed to achieve efficient and effective federated
unlearning by retrieving the orthogonal subspace. FAR-VUS decomposes the
model parameters into orthogonal subspaces via a cholesky-like algorithm.
\\end{abstract}

\\section{Introduction}
\\label{sec:intro}

FEDERATED Learning (FL) has emerged as a cornerstone of distributed machine
learning, enabling multiple parties to collaboratively train a global model while
keeping their raw data local~\\cite{mcmahan2017}. This paradigm effectively addresses
the concerns of traditional centralized ML.

The remainder of this paper is organized as follows: Section~\\ref{sec:method}
describes our proposed method. Section~\\ref{sec:experiments} presents experimental
results. Section~\\ref{sec:conclusion} concludes.

\\end{document}`;

interface Tab {
  id: string;
  name: string;
  modified: boolean;
}

interface WritingLatexEditorProps {
  activeFile?: string;
}

export default function WritingLatexEditor({ activeFile = 'IEEE_main.tex' }: WritingLatexEditorProps) {
  const [content, setContent] = useState(MOCK_LATEX_CONTENT);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'main', name: activeFile, modified: false },
    { id: 'appendix', name: 'IEEE_main_appendix.tex', modified: false },
  ]);
  const [activeTab, setActiveTab] = useState('main');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);

  const lines = content.split('\n');
  const lineCount = lines.length;

  const handleScroll = () => {
    if (lineNumRef.current && textareaRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleCursorChange = () => {
    if (textareaRef.current) {
      const { selectionStart } = textareaRef.current;
      const textBefore = content.substring(0, selectionStart);
      const lineNum = textBefore.split('\n').length;
      const col = textBefore.split('\n').pop()!.length + 1;
      setCursorPos({ line: lineNum, col });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTab ? { ...t, modified: true } : t))
    );
  };

  const closeTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId) {
      setActiveTab(newTabs[0].id);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#ffffff' }}>
      {/* Tab bar + Toolbar */}
      <div
        className="flex items-center shrink-0 border-b"
        style={{ background: '#f5f5f5', borderColor: '#e0e0e0' }}
      >
        {/* Tabs */}
        <div className="flex items-center overflow-x-auto flex-1 min-w-0">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs cursor-pointer shrink-0 border-r select-none ${
                activeTab === tab.id
                  ? 'text-gray-800 border-t-2 border-t-orange-400'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              style={{
                background: activeTab === tab.id ? '#ffffff' : 'transparent',
                borderRightColor: '#e0e0e0',
              }}
            >
              <FileTextOutlined style={{ color: '#f97316', fontSize: '11px' }} />
              <span>{tab.name}</span>
              {tab.modified && (
                <span style={{ color: '#e2e2e2', fontSize: '8px' }}>●</span>
              )}
              <button
                onClick={(e) => closeTab(e, tab.id)}
                className="text-gray-400 hover:text-gray-700 ml-0.5"
                style={{ fontSize: '11px', lineHeight: 1 }}
              >
                <CloseOutlined />
              </button>
            </div>
          ))}
        </div>

        {/* Toolbar actions */}
        <div className="flex items-center gap-1 px-2 shrink-0">
          <button
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-white rounded transition-colors"
            style={{ background: '#1a5c3a', fontSize: '12px' }}
          >
            <CaretRightOutlined />
            <span>编译</span>
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
            style={{ color: '#6b7280' }}
            title="保存"
          >
            <SaveOutlined style={{ fontSize: '11px' }} />
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
            style={{ color: '#6b7280' }}
            title="下载"
          >
            <DownloadOutlined style={{ fontSize: '11px' }} />
          </button>
        </div>
      </div>

      {/* Editor body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers */}
        <div
          ref={lineNumRef}
          className="select-none overflow-hidden shrink-0 pt-2 pb-2 text-right font-mono border-r"
          style={{
            background: '#fafafa',
            color: '#9ca3af',
            fontSize: '12px',
            lineHeight: '20px',
            width: '44px',
            paddingRight: '8px',
            borderColor: '#e5e7eb',
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} style={{ lineHeight: '20px' }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <div className="flex-1 overflow-hidden" style={{ background: '#ffffff' }}>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            onScroll={handleScroll}
            onClick={handleCursorChange}
            onKeyUp={handleCursorChange}
            spellCheck={false}
            className="w-full h-full resize-none outline-none border-none p-2 pl-1 font-mono"
            style={{
              background: '#ffffff',
              color: '#1f2937',
              fontSize: '13px',
              lineHeight: '20px',
              caretColor: '#1f2937',
              tabSize: 2,
            }}
          />
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-3 shrink-0 border-t"
        style={{ background: '#1a5c3a', color: '#ffffff', fontSize: '11px', height: '22px', borderColor: '#e5e7eb' }}
      >
        <div className="flex items-center gap-3">
          <span>LaTeX</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            行 {cursorPos.line}, 列 {cursorPos.col}
          </span>
          <span>LaTeX</span>
          <span>Pro</span>
        </div>
      </div>
    </div>
  );
}
