'use client';
import { useState } from 'react';
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  RightOutlined,
  FullscreenOutlined,
  DownloadOutlined,
  ReloadOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const MOCK_PDF_PAGES = [
  {
    page: 1,
    content: (
      <div style={{ fontFamily: 'Times New Roman, serif' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <h1
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              lineHeight: 1.3,
              marginBottom: '8px',
            }}
          >
            Breaking the Efficiency-Privacy Trade-off in
            <br />
            Federated Unlearning via Subspace Decoupling
          </h1>
          <p style={{ fontSize: '10px', color: '#444', marginBottom: '6px' }}>
            Shih He, Jiantao Cai, Jiangang Sha, Kao Yang, Hai Lu, Xiaohui Jia and Zhifeng Tian
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '8px', lineHeight: 1.6 }}>
          {/* Left column */}
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '4px', fontSize: '9px' }}>
              Abstract
            </p>
            <p style={{ textAlign: 'justify', marginBottom: '8px' }}>
              Federated machine unlearning (FMU) aims to remove the influence of targeted data
              from a federated model upon request. For deep models, exact retraining is often
              prohibitively expensive, while existing approximate methods either suffer from
              slow unlearning speed, or risk compromising the retained data performance.
              This paper proposes FAR-VUS (Fisher-Aware Recovery Realignment for Verifiable
              Unlearning via Subspace), a novel approach to achieve efficient and effective
              federated unlearning by retrieving the orthogonal subspace. FARVU-S decomposes
              the model parameters into orthogonal subspaces via a cholesky-like algorithm and
              a diagonal decomposition algorithm.
            </p>
            <p style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '9px' }}>
              I. Introduction
            </p>
            <p style={{ textAlign: 'justify', marginBottom: '6px' }}>
              FEDERATED Learning (FL) has emerged as a cornerstone of distributed machine
              learning, enabling multiple parties to collaboratively train a global model while
              keeping their raw data local [1], [2]. This paradigm effectively addresses the
              privacy concerns of traditional centralized ML by ensuring that sensitive user
              data never leaves the client device.
            </p>
            <p style={{ textAlign: 'justify', marginBottom: '6px' }}>
              Today, it is widely accepted in healthcare and social media platforms to train ML
              models with patients' medical data. The California Consumer Privacy Act (CCPA) [7],
              the "right to be forgotten" has become a fundamental legal requirement. This right
              mandates that organizations must be able to erase an individual's data from a
              trained model upon request. The straightforward solution involves retraining the
              model from scratch after removing the target data.
            </p>
            <p style={{ textAlign: 'justify', marginBottom: '6px' }}>
              In federated settings, achieving efficient unlearning is more challenging because
              clients do not share their data. After the first round of FL training, a client may
              need to store a long history of updates, which creates additional storage pressure.
              It also creates new privacy risks because it keeps sensitive historical information
              on the server.
            </p>
          </div>
          {/* Right column */}
          <div style={{ flex: 1 }}>
            <p style={{ textAlign: 'justify', marginBottom: '6px' }}>
              To address this problem, we propose FAR-VUS (Fisher-Aware Recovery for Verifiable
              Unlearning via Subspace). This approach combines the idea of Fisher information
              with subspace decomposition to efficiently remove the influence of targeted data
              from the federated model. Our method decomposes model parameters into orthogonal
              subspaces, enabling targeted parameter perturbation that only affects the "forget
              direction" while preserving the "retain direction."
            </p>
            <p style={{ textAlign: 'justify', marginBottom: '8px' }}>
              The three stages of our FAR-VUS framework are: (1) subspace identification using
              second-order statistics, (2) selective gradient projection into the forget subspace,
              and (3) realignment to maintain the performance on retained clients. In extensive
              experiments on three standard benchmarks, CIFAR-10, CIFAR-100, and Tiny-ImageNet,
              our method achieves up to 38× speedup compared to exact unlearning.
            </p>
            <p style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '9px' }}>
              II. Related Work
            </p>
            <p style={{ textAlign: 'justify', marginBottom: '6px' }}>
              <strong>Machine Unlearning.</strong> The concept of machine unlearning was first
              introduced in [12] and has since attracted growing attention. Prior work on
              centralized unlearning can be broadly categorized into exact and approximate
              methods. Exact methods [13], [14] guarantee that the unlearned model is
              statistically indistinguishable from a retrained model.
            </p>
            <p style={{ textAlign: 'justify', marginBottom: '6px' }}>
              <strong>Federated Unlearning.</strong> Several prior works have studied the problem
              of unlearning in federated settings. FedEraser [15] proposes to utilize historical
              updates to calibrate the global model. KNOT [16] clusters similar clients together
              to speed up retraining. However, most existing methods require storing gradient
              history or performing multiple retraining rounds.
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function WritingPdfPreview() {
  const [page, setPage] = useState(1);
  const totalPages = 12;
  const [zoom, setZoom] = useState(100);
  const [isCompiled] = useState(true);

  const zoomIn = () => setZoom((z) => Math.min(200, z + 10));
  const zoomOut = () => setZoom((z) => Math.max(40, z - 10));

  const scaledWidth = Math.round(560 * zoom / 100);
  const scaledPadding = Math.round(48 * zoom / 100);
  const scaledFontBase = zoom / 100;

  return (
    <div className="h-full flex flex-col bg-gray-200">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-white border-b border-gray-200 shrink-0">
        <FileTextOutlined style={{ color: '#ef4444', fontSize: '12px' }} />
        <span className="text-xs text-gray-500 truncate flex-1 ml-1">IEEE_main.pdf</span>
        <button
          className="flex items-center gap-1 px-2 py-0.5 text-white text-xs rounded transition-colors shrink-0"
          style={{ background: '#1a5c3a', fontSize: '11px' }}
        >
          <ReloadOutlined style={{ fontSize: '10px' }} />
          <span>刷新</span>
        </button>
        <button
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded shrink-0"
          title="下载PDF"
        >
          <DownloadOutlined style={{ fontSize: '11px' }} />
        </button>
        <button
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded shrink-0"
          title="全屏预览"
        >
          <FullscreenOutlined style={{ fontSize: '11px' }} />
        </button>
      </div>

      {/* Zoom + Page navigation */}
      <div className="flex items-center justify-center gap-2 px-3 py-1 bg-white border-b border-gray-200 shrink-0">
        <button
          onClick={zoomOut}
          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
        >
          <ZoomOutOutlined style={{ fontSize: '11px' }} />
        </button>
        <span className="text-xs text-gray-600 w-10 text-center select-none">{zoom}%</span>
        <button
          onClick={zoomIn}
          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
        >
          <ZoomInOutlined style={{ fontSize: '11px' }} />
        </button>
        <div className="w-px h-3 bg-gray-300 mx-1" />
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors disabled:opacity-30"
        >
          <LeftOutlined style={{ fontSize: '10px' }} />
        </button>
        <span className="text-xs text-gray-600 select-none">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors disabled:opacity-30"
        >
          <RightOutlined style={{ fontSize: '10px' }} />
        </button>
      </div>

      {/* PDF canvas area */}
      <div className="flex-1 overflow-auto flex items-start justify-center py-4">
        {isCompiled ? (
          <div
            className="bg-white shadow-xl"
            style={{
              width: `${scaledWidth}px`,
              minHeight: `${Math.round(792 * zoom / 100)}px`,
              padding: `${scaledPadding}px`,
              transform: 'none',
            }}
          >
            <div style={{ transform: `scale(${scaledFontBase})`, transformOrigin: 'top left', width: `${100 / scaledFontBase}%` }}>
              {MOCK_PDF_PAGES[0].content}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 text-gray-400 mt-20">
            <FileTextOutlined style={{ fontSize: '48px', color: '#d1d5db' }} />
            <p className="text-sm">点击「编译」生成 PDF 预览</p>
          </div>
        )}
      </div>
    </div>
  );
}
