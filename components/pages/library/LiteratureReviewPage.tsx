'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  SearchOutlined,
  CheckCircleFilled,
  FileTextOutlined,
  TableOutlined,
  ApartmentOutlined,
  ThunderboltOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  CalendarOutlined,
  TeamOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

/* ═══════════════════════════════════════════════════════
   类型定义
   ═══════════════════════════════════════════════════════ */

interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  abstract: string;
}

interface ComparisonRow {
  paperId: string;
  shortName: string;
  year: number;
  // 模型架构
  encoderOnly: boolean;
  decoderOnly: boolean;
  encoderDecoder: boolean;
  // 训练范式
  pretraining: boolean;
  instructTuning: boolean;
  rlhf: boolean;
  // 能力维度
  reasoning: boolean;
  codeGen: boolean;
  multimodal: boolean;
  // 特性
  openSource: boolean;
  chineseOpt: boolean;
}

interface RoadmapEra {
  year: string;
  title: string;
  color: string;
  papers: { id: string; name: string; tag: string }[];
}

/* ═══════════════════════════════════════════════════════
   Mock 数据
   ═══════════════════════════════════════════════════════ */

const MOCK_PAPERS: Paper[] = [
  {
    id: 'p1',
    title: 'Attention Is All You Need',
    authors: 'Vaswani, Shazeer, Parmar et al.',
    year: 2017,
    venue: 'NeurIPS 2017',
    abstract: '提出 Transformer 架构，完全基于注意力机制，取代了传统 RNN/CNN 在序列建模中的地位，成为现代大语言模型的基础架构。',
  },
  {
    id: 'p2',
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    authors: 'Devlin, Chang, Lee, Toutanova',
    year: 2019,
    venue: 'NAACL 2019',
    abstract: '提出双向预训练语言模型 BERT，通过掩码语言模型和下一句预测任务进行预训练，在多项 NLP 基准上取得突破性成绩。',
  },
  {
    id: 'p3',
    title: 'Language Models are Few-Shot Learners (GPT-3)',
    authors: 'Brown, Mann, Ryder et al.',
    year: 2020,
    venue: 'NeurIPS 2020',
    abstract: 'GPT-3 展示了 1750 亿参数语言模型的少样本学习能力，无需微调即可通过提示完成多种 NLP 任务。',
  },
  {
    id: 'p4',
    title: 'Retrieval-Augmented Generation (RAG)',
    authors: 'Lewis, Perez, Piktus et al.',
    year: 2020,
    venue: 'NeurIPS 2020',
    abstract: '提出检索增强生成框架，将外部知识库检索与语言模型生成相结合，显著提升知识密集型任务的表现。',
  },
  {
    id: 'p5',
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    authors: 'Hu, Shen, Wallis et al.',
    year: 2021,
    venue: 'ICLR 2022',
    abstract: '提出低秩适配方法 LoRA，通过冻结预训练权重并注入低秩矩阵实现高效微调，大幅降低训练成本。',
  },
  {
    id: 'p6',
    title: 'Training LMs to Follow Instructions (InstructGPT)',
    authors: 'Ouyang, Wu, Jiang et al.',
    year: 2022,
    venue: 'NeurIPS 2022',
    abstract: '提出基于人类反馈的强化学习（RLHF）方法训练语言模型遵循人类指令，显著提升模型输出与人类意图的对齐程度。',
  },
  {
    id: 'p7',
    title: 'Chain-of-Thought Prompting Elicits Reasoning',
    authors: 'Wei, Wang, Schuurmans et al.',
    year: 2022,
    venue: 'NeurIPS 2022',
    abstract: '提出思维链提示方法，通过在提示中加入中间推理步骤，显著提升大语言模型在数学和逻辑推理任务上的表现。',
  },
  {
    id: 'p8',
    title: 'LLaMA: Open and Efficient Foundation Language Models',
    authors: 'Touvron, Lavril, Izacard et al.',
    year: 2023,
    venue: 'arXiv 2023',
    abstract: 'Meta 发布的开源大语言模型系列，证明在较小规模下通过充分训练可达到与更大模型相当的性能。',
  },
  {
    id: 'p9',
    title: 'GPT-4 Technical Report',
    authors: 'OpenAI',
    year: 2023,
    venue: 'arXiv 2023',
    abstract: 'GPT-4 是一个大规模多模态模型，能同时处理文本和图像输入，在多项专业考试中达到人类水平的表现。',
  },
  {
    id: 'p10',
    title: 'PaLM 2 Technical Report',
    authors: 'Anil, Dai, Firat et al.',
    year: 2023,
    venue: 'arXiv 2023',
    abstract: 'Google 发布的新一代语言模型，在推理、多语言和代码生成能力上有显著提升，支持超过 100 种语言。',
  },
];

const COMPARISON_DATA: ComparisonRow[] = [
  { paperId: 'p1', shortName: 'Transformer', year: 2017, encoderOnly: false, decoderOnly: false, encoderDecoder: true, pretraining: false, instructTuning: false, rlhf: false, reasoning: false, codeGen: false, multimodal: false, openSource: true, chineseOpt: false },
  { paperId: 'p2', shortName: 'BERT', year: 2019, encoderOnly: true, decoderOnly: false, encoderDecoder: false, pretraining: true, instructTuning: false, rlhf: false, reasoning: false, codeGen: false, multimodal: false, openSource: true, chineseOpt: true },
  { paperId: 'p3', shortName: 'GPT-3', year: 2020, encoderOnly: false, decoderOnly: true, encoderDecoder: false, pretraining: true, instructTuning: false, rlhf: false, reasoning: true, codeGen: true, multimodal: false, openSource: false, chineseOpt: false },
  { paperId: 'p4', shortName: 'RAG', year: 2020, encoderOnly: false, decoderOnly: false, encoderDecoder: true, pretraining: true, instructTuning: false, rlhf: false, reasoning: true, codeGen: false, multimodal: false, openSource: true, chineseOpt: false },
  { paperId: 'p5', shortName: 'LoRA', year: 2021, encoderOnly: false, decoderOnly: true, encoderDecoder: true, pretraining: false, instructTuning: true, rlhf: false, reasoning: false, codeGen: false, multimodal: false, openSource: true, chineseOpt: false },
  { paperId: 'p6', shortName: 'InstructGPT', year: 2022, encoderOnly: false, decoderOnly: true, encoderDecoder: false, pretraining: true, instructTuning: true, rlhf: true, reasoning: true, codeGen: true, multimodal: false, openSource: false, chineseOpt: false },
  { paperId: 'p7', shortName: 'CoT', year: 2022, encoderOnly: false, decoderOnly: true, encoderDecoder: false, pretraining: false, instructTuning: false, rlhf: false, reasoning: true, codeGen: false, multimodal: false, openSource: false, chineseOpt: false },
  { paperId: 'p8', shortName: 'LLaMA', year: 2023, encoderOnly: false, decoderOnly: true, encoderDecoder: false, pretraining: true, instructTuning: true, rlhf: false, reasoning: true, codeGen: true, multimodal: false, openSource: true, chineseOpt: true },
  { paperId: 'p9', shortName: 'GPT-4', year: 2023, encoderOnly: false, decoderOnly: true, encoderDecoder: false, pretraining: true, instructTuning: true, rlhf: true, reasoning: true, codeGen: true, multimodal: true, openSource: false, chineseOpt: true },
  { paperId: 'p10', shortName: 'PaLM 2', year: 2023, encoderOnly: false, decoderOnly: true, encoderDecoder: false, pretraining: true, instructTuning: true, rlhf: true, reasoning: true, codeGen: true, multimodal: true, openSource: false, chineseOpt: true },
];

const ROADMAP_DATA: RoadmapEra[] = [
  {
    year: '2017',
    title: 'Transformer 架构奠基',
    color: '#6366f1',
    papers: [{ id: 'p1', name: 'Transformer', tag: '自注意力机制' }],
  },
  {
    year: '2019',
    title: '预训练范式确立',
    color: '#3b82f6',
    papers: [{ id: 'p2', name: 'BERT', tag: '双向编码' }],
  },
  {
    year: '2020',
    title: '规模效应与检索增强',
    color: '#0ea5e9',
    papers: [
      { id: 'p3', name: 'GPT-3', tag: '175B 参数' },
      { id: 'p4', name: 'RAG', tag: '检索增强生成' },
    ],
  },
  {
    year: '2021',
    title: '高效微调探索',
    color: '#14b8a6',
    papers: [{ id: 'p5', name: 'LoRA', tag: '低秩适配' }],
  },
  {
    year: '2022',
    title: '对齐技术与推理增强',
    color: '#1a5c3a',
    papers: [
      { id: 'p6', name: 'InstructGPT', tag: 'RLHF 对齐' },
      { id: 'p7', name: 'CoT', tag: '思维链推理' },
    ],
  },
  {
    year: '2023',
    title: '多模态与开源生态',
    color: '#f59e0b',
    papers: [
      { id: 'p9', name: 'GPT-4', tag: '多模态' },
      { id: 'p8', name: 'LLaMA', tag: '开源' },
      { id: 'p10', name: 'PaLM 2', tag: '多语言' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   主组件
   ═══════════════════════════════════════════════════════ */

type ActiveTab = 'table' | 'roadmap';

export default function LiteratureReviewPage() {
  const [papers] = useState<Paper[]>(MOCK_PAPERS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['p1', 'p2', 'p3', 'p6', 'p8', 'p9']));
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('table');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const filteredPapers = useMemo(() => {
    if (!search.trim()) return papers;
    const q = search.toLowerCase();
    return papers.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q)
    );
  }, [papers, search]);

  const togglePaper = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setIsGenerated(false);
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(papers.map((p) => p.id)));
    setIsGenerated(false);
  }, [papers]);

  const deselectAll = useCallback(() => {
    setSelectedIds(new Set());
    setIsGenerated(false);
  }, []);

  const handleGenerate = useCallback(() => {
    if (selectedIds.size < 2) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 1500);
  }, [selectedIds]);

  const selectedComparison = useMemo(
    () => COMPARISON_DATA.filter((r) => selectedIds.has(r.paperId)),
    [selectedIds]
  );

  const selectedRoadmap = useMemo(
    () =>
      ROADMAP_DATA.map((era) => ({
        ...era,
        papers: era.papers.filter((p) => selectedIds.has(p.id)),
      })).filter((era) => era.papers.length > 0),
    [selectedIds]
  );

  /* ── 渲染：对比勾选标记 ── */
  const Mark = ({ value }: { value: boolean }) => (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs ${
        value
          ? 'bg-primary/10 text-primary'
          : 'bg-gray-50 text-gray-300'
      }`}
    >
      {value ? <CheckOutlined style={{ fontSize: '10px' }} /> : <CloseOutlined style={{ fontSize: '9px' }} />}
    </span>
  );

  return (
    <div className="flex h-full overflow-hidden bg-white">
      {/* ═══ 左侧：论文选择面板 ═══ */}
      <div className="w-[300px] shrink-0 border-r border-gray-100 flex flex-col bg-gray-50/50">
        {/* 标题 */}
        <div className="px-4 pt-5 pb-3">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <FileTextOutlined style={{ fontSize: '14px' }} className="text-primary" />
            论文选择
          </h2>
          <p className="text-[11px] text-gray-400 mt-1">选择论文后点击「生成综述」分析文献</p>
        </div>

        {/* 搜索 */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white focus-within:border-primary/40 transition-colors">
            <SearchOutlined style={{ color: '#9ca3af', fontSize: '13px' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索论文标题、作者..."
              className="flex-1 bg-transparent text-xs text-gray-700 outline-none placeholder-gray-400"
            />
          </div>
        </div>

        {/* 全选/取消 */}
        <div className="px-4 pb-2 flex items-center justify-between text-[11px]">
          <span className="text-gray-500">
            已选 <span className="font-semibold text-primary">{selectedIds.size}</span> / {papers.length} 篇
          </span>
          <div className="flex items-center gap-2">
            <button onClick={selectAll} className="text-primary hover:underline">全选</button>
            <button onClick={deselectAll} className="text-gray-400 hover:text-gray-600">清空</button>
          </div>
        </div>

        {/* 论文列表 */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1.5">
          {filteredPapers.map((paper) => {
            const selected = selectedIds.has(paper.id);
            return (
              <button
                key={paper.id}
                onClick={() => togglePaper(paper.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-150 ${
                  selected
                    ? 'border-primary/30 bg-primary/5 shadow-sm'
                    : 'border-transparent bg-white hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                      selected
                        ? 'bg-primary border-primary'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {selected && <CheckOutlined style={{ fontSize: '8px', color: '#fff' }} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-semibold leading-snug mb-1 ${selected ? 'text-gray-900' : 'text-gray-700'}`}>
                      {paper.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <span className="flex items-center gap-0.5">
                        <TeamOutlined style={{ fontSize: '9px' }} />
                        {paper.authors.split(',')[0]} et al.
                      </span>
                      <span className="flex items-center gap-0.5">
                        <CalendarOutlined style={{ fontSize: '9px' }} />
                        {paper.year}
                      </span>
                    </div>
                    <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                      {paper.venue}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 生成按钮 */}
        <div className="px-4 py-3 border-t border-gray-100 bg-white">
          <button
            onClick={handleGenerate}
            disabled={selectedIds.size < 2 || isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            style={{
              background:
                selectedIds.size >= 2 && !isGenerating
                  ? 'linear-gradient(135deg, #1a5c3a 0%, #166534 100%)'
                  : '#d1d5db',
            }}
          >
            {isGenerating ? (
              <>
                <LoadingOutlined style={{ fontSize: '14px' }} />
                <span>正在分析...</span>
              </>
            ) : (
              <>
                <ThunderboltOutlined style={{ fontSize: '14px' }} />
                <span>生成综述</span>
              </>
            )}
          </button>
          {selectedIds.size < 2 && (
            <p className="text-center text-[10px] text-gray-400 mt-1.5">请至少选择 2 篇论文</p>
          )}
        </div>
      </div>

      {/* ═══ 右侧：主内容区 ═══ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Tab 栏 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'table'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TableOutlined style={{ fontSize: '12px' }} />
              文献对比表
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ApartmentOutlined style={{ fontSize: '12px' }} />
              研究脉络图
            </button>
          </div>

          {isGenerated && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
              <DownloadOutlined style={{ fontSize: '12px' }} />
              导出
            </button>
          )}
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-sm font-medium text-gray-600">AI 正在分析 {selectedIds.size} 篇文献...</p>
              <p className="text-xs text-gray-400 mt-1">生成对比表格与研究脉络图</p>
            </div>
          ) : !isGenerated ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ThunderboltOutlined style={{ fontSize: '40px', marginBottom: '16px' }} className="text-gray-300" />
              <p className="text-sm text-gray-500">选择论文后点击「生成综述」</p>
              <p className="text-xs text-gray-400 mt-1">AI 将自动分析文献并生成对比表和研究脉络</p>
            </div>
          ) : activeTab === 'table' ? (
            /* ═══ 文献对比表 ═══ */
            <div className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-800">Summary of Selected Literature</h3>
                <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                  {selectedComparison.length} 篇
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-xs border-collapse min-w-[800px]">
                  {/* 分组表头 */}
                  <thead>
                    <tr className="bg-gray-50">
                      <th rowSpan={2} className="px-3 py-2.5 text-left font-bold text-gray-700 border-b border-r border-gray-200 sticky left-0 bg-gray-50 z-10 min-w-[100px]">
                        论文
                      </th>
                      <th rowSpan={2} className="px-3 py-2.5 text-center font-bold text-gray-700 border-b border-r border-gray-200 w-14">
                        年份
                      </th>
                      <th colSpan={3} className="px-3 py-2 text-center font-bold text-gray-700 border-b border-r border-gray-200 bg-blue-50/50">
                        模型架构
                      </th>
                      <th colSpan={3} className="px-3 py-2 text-center font-bold text-gray-700 border-b border-r border-gray-200 bg-green-50/50">
                        训练范式
                      </th>
                      <th colSpan={3} className="px-3 py-2 text-center font-bold text-gray-700 border-b border-r border-gray-200 bg-purple-50/50">
                        能力维度
                      </th>
                      <th colSpan={2} className="px-3 py-2 text-center font-bold text-gray-700 border-b border-gray-200 bg-amber-50/50">
                        特性
                      </th>
                    </tr>
                    <tr className="bg-gray-50/80 text-gray-500 font-medium">
                      {/* 模型架构 */}
                      <th className="px-2 py-2 text-center border-b border-r border-gray-200 bg-blue-50/30 whitespace-nowrap">Encoder</th>
                      <th className="px-2 py-2 text-center border-b border-r border-gray-200 bg-blue-50/30 whitespace-nowrap">Decoder</th>
                      <th className="px-2 py-2 text-center border-b border-r border-gray-200 bg-blue-50/30 whitespace-nowrap">Enc-Dec</th>
                      {/* 训练范式 */}
                      <th className="px-2 py-2 text-center border-b border-r border-gray-200 bg-green-50/30 whitespace-nowrap">预训练</th>
                      <th className="px-2 py-2 text-center border-b border-r border-gray-200 bg-green-50/30 whitespace-nowrap">指令微调</th>
                      <th className="px-2 py-2 text-center border-b border-r border-gray-200 bg-green-50/30 whitespace-nowrap">RLHF</th>
                      {/* 能力维度 */}
                      <th className="px-2 py-2 text-center border-b border-r border-gray-200 bg-purple-50/30 whitespace-nowrap">推理增强</th>
                      <th className="px-2 py-2 text-center border-b border-r border-gray-200 bg-purple-50/30 whitespace-nowrap">代码生成</th>
                      <th className="px-2 py-2 text-center border-b border-r border-gray-200 bg-purple-50/30 whitespace-nowrap">多模态</th>
                      {/* 特性 */}
                      <th className="px-2 py-2 text-center border-b border-r border-gray-200 bg-amber-50/30 whitespace-nowrap">开源</th>
                      <th className="px-2 py-2 text-center border-b border-gray-200 bg-amber-50/30 whitespace-nowrap">中文优化</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedComparison.map((row, idx) => (
                      <tr
                        key={row.paperId}
                        onMouseEnter={() => setHoveredRow(row.paperId)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`transition-colors ${
                          hoveredRow === row.paperId ? 'bg-primary/5' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="px-3 py-2.5 font-semibold text-gray-800 border-r border-b border-gray-100 sticky left-0 bg-inherit z-10">
                          {row.shortName}
                        </td>
                        <td className="px-3 py-2.5 text-center text-gray-600 border-r border-b border-gray-100">
                          {row.year}
                        </td>
                        <td className="px-2 py-2.5 text-center border-r border-b border-gray-100"><Mark value={row.encoderOnly} /></td>
                        <td className="px-2 py-2.5 text-center border-r border-b border-gray-100"><Mark value={row.decoderOnly} /></td>
                        <td className="px-2 py-2.5 text-center border-r border-b border-gray-100"><Mark value={row.encoderDecoder} /></td>
                        <td className="px-2 py-2.5 text-center border-r border-b border-gray-100"><Mark value={row.pretraining} /></td>
                        <td className="px-2 py-2.5 text-center border-r border-b border-gray-100"><Mark value={row.instructTuning} /></td>
                        <td className="px-2 py-2.5 text-center border-r border-b border-gray-100"><Mark value={row.rlhf} /></td>
                        <td className="px-2 py-2.5 text-center border-r border-b border-gray-100"><Mark value={row.reasoning} /></td>
                        <td className="px-2 py-2.5 text-center border-r border-b border-gray-100"><Mark value={row.codeGen} /></td>
                        <td className="px-2 py-2.5 text-center border-r border-b border-gray-100"><Mark value={row.multimodal} /></td>
                        <td className="px-2 py-2.5 text-center border-r border-b border-gray-100"><Mark value={row.openSource} /></td>
                        <td className="px-2 py-2.5 text-center border-b border-gray-100"><Mark value={row.chineseOpt} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 表格底部说明 */}
              <div className="mt-3 flex items-start gap-1.5 text-[10px] text-gray-400">
                <InfoCircleOutlined style={{ fontSize: '10px', marginTop: '2px' }} />
                <span>
                  Encoder = 仅编码器架构，Decoder = 仅解码器架构，Enc-Dec = 编解码器架构。
                  <CheckCircleFilled style={{ fontSize: '9px', color: '#1a5c3a', margin: '0 2px' }} /> 表示该论文具备此特性，
                  <CloseOutlined style={{ fontSize: '8px', color: '#d1d5db', margin: '0 2px' }} /> 表示不涉及。
                </span>
              </div>
            </div>
          ) : (
            /* ═══ 研究脉络图 ═══ */
            <div className="p-5">
              <div className="mb-5 flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-800">大语言模型研究演进脉络</h3>
                <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                  {selectedRoadmap.reduce((sum, era) => sum + era.papers.length, 0)} 篇文献
                </span>
              </div>

              {/* 垂直时间线 */}
              <div className="relative pl-8">
                {/* 时间线主轴 */}
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-indigo-300 via-primary to-amber-300 rounded-full" />

                {selectedRoadmap.map((era, eraIdx) => (
                  <div key={era.year} className={`relative ${eraIdx > 0 ? 'mt-8' : ''}`}>
                    {/* 时间节点圆点 */}
                    <div
                      className="absolute -left-[17.5px] top-1 w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md z-10"
                      style={{ background: era.color }}
                    >
                      {era.year.slice(-2)}
                    </div>

                    {/* 时代标题 */}
                    <div className="ml-6 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-800">{era.year}</span>
                        <span className="text-[11px] font-semibold text-gray-600">{era.title}</span>
                      </div>
                    </div>

                    {/* 论文卡片 */}
                    <div className="ml-6 flex flex-wrap gap-3">
                      {era.papers.map((paper) => {
                        const fullPaper = MOCK_PAPERS.find((p) => p.id === paper.id);
                        return (
                          <div
                            key={paper.id}
                            className="group relative bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 p-4 w-[280px]"
                          >
                            {/* 顶部色带 */}
                            <div
                              className="absolute top-0 left-4 right-4 h-0.5 rounded-b-full"
                              style={{ background: era.color }}
                            />

                            <div className="flex items-start gap-2.5">
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                                style={{ background: era.color }}
                              >
                                {paper.name.charAt(0)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-xs font-bold text-gray-800 group-hover:text-primary transition-colors">
                                  {paper.name}
                                </h4>
                                <span
                                  className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded-md font-medium"
                                  style={{
                                    background: `${era.color}15`,
                                    color: era.color,
                                  }}
                                >
                                  {paper.tag}
                                </span>
                              </div>
                            </div>

                            {fullPaper && (
                              <p className="mt-2.5 text-[11px] text-gray-500 leading-relaxed line-clamp-3">
                                {fullPaper.abstract}
                              </p>
                            )}

                            {/* 连线指示器 */}
                            {eraIdx < selectedRoadmap.length - 1 && (
                              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: era.color, opacity: 0.4 }} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* 演进箭头说明 */}
                    {eraIdx < selectedRoadmap.length - 1 && (
                      <div className="ml-6 mt-3 flex items-center gap-2 text-[10px] text-gray-300">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-gray-400 whitespace-nowrap">
                          {era.title.includes('架构') ? '架构奠基 →' :
                           era.title.includes('预训练') ? '预训练发展 →' :
                           era.title.includes('规模') ? '规模扩展 →' :
                           era.title.includes('微调') ? '高效适配 →' :
                           era.title.includes('对齐') ? '安全对齐 →' : '持续演进 →'}
                        </span>
                        <div className="flex-1 h-px bg-gray-100" />
                      </div>
                    )}
                  </div>
                ))}

                {/* 未来展望 */}
                <div className="relative mt-8">
                  <div className="absolute -left-[17.5px] top-1 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-[10px] font-bold shadow-sm z-10">
                    ?
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-gray-400">未来</span>
                      <span className="text-[11px] text-gray-400">研究展望</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['AGI 通用智能', '具身智能', '自主 Agent', '科学发现'].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] text-gray-400 border border-dashed border-gray-200 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
