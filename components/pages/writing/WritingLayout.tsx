'use client';
import { useEffect, useRef, useState } from 'react';
import WritingAiChat from './WritingAiChat';
import WritingFileExplorer from './WritingFileExplorer';
import WritingLatexEditor from './WritingLatexEditor';
import WritingPdfPreview from './WritingPdfPreview';

type DividerType = 'file' | 'pdf' | 'chat';

interface DragState {
  type: DividerType;
  startX: number;
  startWidth: number;
}

export default function WritingLayout() {
  const [fileWidth, setFileWidth] = useState(220);
  const [pdfWidth, setPdfWidth] = useState(400);
  const [chatWidth, setChatWidth] = useState(300);
  const [activeFile, setActiveFile] = useState('IEEE_main.tex');

  const dragging = useRef<DragState | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = e.clientX - dragging.current.startX;

      if (dragging.current.type === 'file') {
        // Divider between File and Editor: drag right → file gets wider
        setFileWidth(Math.max(160, Math.min(420, dragging.current.startWidth + delta)));
      } else if (dragging.current.type === 'pdf') {
        // Divider between Editor and PDF: drag right → pdf gets narrower (editor grows)
        setPdfWidth(Math.max(280, Math.min(720, dragging.current.startWidth - delta)));
      } else {
        // Divider between PDF and Chat: drag right → chat gets narrower (pdf grows)
        setChatWidth(Math.max(240, Math.min(500, dragging.current.startWidth - delta)));
      }
    };

    const handleMouseUp = () => {
      if (dragging.current) {
        dragging.current = null;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startDrag =
    (type: DividerType, currentWidth: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      dragging.current = { type, startX: e.clientX, startWidth: currentWidth };
    };

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* ── Panel 1: File Explorer ── */}
      <div
        className="flex-shrink-0 overflow-hidden border-r border-gray-200"
        style={{ width: fileWidth }}
      >
        <WritingFileExplorer
          onFileSelect={(_id, name) => setActiveFile(name)}
        />
      </div>

      {/* ── Divider 1: File | Editor ── */}
      <Divider onMouseDown={startDrag('file', fileWidth)} />

      {/* ── Panel 2: LaTeX Editor ── */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <WritingLatexEditor activeFile={activeFile} />
      </div>

      {/* ── Divider 2: Editor | PDF ── */}
      <Divider onMouseDown={startDrag('pdf', pdfWidth)} />

      {/* ── Panel 3: PDF Preview ── */}
      <div
        className="flex-shrink-0 overflow-hidden"
        style={{ width: pdfWidth }}
      >
        <WritingPdfPreview />
      </div>

      {/* ── Divider 3: PDF | Chat ── */}
      <Divider onMouseDown={startDrag('chat', chatWidth)} />

      {/* ── Panel 4: AI Chat ── */}
      <div
        className="flex-shrink-0 overflow-hidden border-l border-gray-200"
        style={{ width: chatWidth }}
      >
        <WritingAiChat />
      </div>
    </div>
  );
}

function Divider({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 cursor-col-resize transition-colors duration-150 relative z-10"
      style={{
        width: '4px',
        background: hovered ? 'rgba(26,92,58,0.5)' : '#e5e7eb',
      }}
    />
  );
}
