import React, { useState } from 'react';
import { Download, Copy, Eye, Code, ExternalLink, Crown, Gem, Sparkles } from 'lucide-react';
import { ArticleData } from '../types';

interface ArticlePreviewProps {
  article: ArticleData;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  const [viewMode, setViewMode] = useState<'preview' | 'markdown'>('preview');
  const [copied, setCopied] = useState(false);

  const generateMarkdown = (): string => {
    const markdown = `# ${article.title}

**Slug:** ${article.slug}

**Meta Descrição:** ${article.metaDescription}

## Introdução

${article.introduction}

${article.sections.map(section => `## ${section.h2}

${section.h3 ? `### ${section.h3}\n\n` : ''}${section.content}`).join('\n\n')}

## Perguntas Frequentes

${article.paaQuestions.map(paa => `### ${paa.question}

${paa.answer}`).join('\n\n')}

## Conclusão

${article.conclusion}

---

**Palavra-chave principal:** ${article.keyword}
**Variações:** ${article.variations.join(', ')}`;

    return markdown;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-full border border-emerald-400/20">
            <Crown className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">Artigo Premium Gerado</h2>
          </div>
          <p className="text-slate-300 text-lg">Seu conteúdo SEO otimizado está pronto para publicação</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              viewMode === 'preview' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25' 
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
            }`}
          >
            <Eye className="w-5 h-5 inline mr-2" />
            Preview
          </button>
          <button
            onClick={() => setViewMode('markdown')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              viewMode === 'markdown' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25' 
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
            }`}
          >
            <Code className="w-5 h-5 inline mr-2" />
            Markdown
          </button>
        </div>
      </div>

      {/* SEO Info Card */}
      <div className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-xl border border-amber-400/30 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent rounded-xl"></div>
        <div className="relative">
          <h3 className="text-lg font-semibold text-amber-300 mb-4 flex items-center space-x-2">
            <Gem className="w-5 h-5" />
            <span>Elementos SEO Otimizados</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Título (H1)</label>
              <div className="text-white bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                {article.title}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Slug</label>
              <div className="text-amber-400 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 font-mono text-sm">
                {article.slug}
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-slate-400">Meta Descrição</label>
              <div className="text-white bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                {article.metaDescription}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Display */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
        {viewMode === 'preview' ? (
          <div className="prose prose-invert prose-amber max-w-none">
            <article className="space-y-8">
              {/* Title */}
              <div className="text-center space-y-4 pb-8 border-b border-slate-700/50">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent leading-tight">
                  {article.title}
                </h1>
              </div>

              {/* Introduction */}
              <div className="space-y-4">
                <div className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
                  {article.introduction}
                </div>
              </div>

              {/* Sections */}
              {article.sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h2 className="text-2xl font-bold text-amber-300 flex items-center space-x-2">
                    <Sparkles className="w-6 h-6" />
                    <span>{section.h2}</span>
                  </h2>
                  {section.h3 && (
                    <h3 className="text-xl font-semibold text-white pl-8">{section.h3}</h3>
                  )}
                  <div className="text-slate-300 leading-relaxed whitespace-pre-line pl-4">
                    {section.content}
                  </div>
                </div>
              ))}

              {/* FAQ Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-amber-300 flex items-center space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span>Perguntas Frequentes</span>
                </h2>
                <div className="space-y-6">
                  {article.paaQuestions.map((paa, index) => (
                    <div key={index} className="bg-slate-900/30 rounded-lg p-6 border-l-4 border-amber-500">
                      <h3 className="text-lg font-semibold text-white mb-3">{paa.question}</h3>
                      <p className="text-slate-300 leading-relaxed">{paa.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conclusion */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-amber-300 flex items-center space-x-2">
                  <Crown className="w-6 h-6" />
                  <span>Conclusão</span>
                </h2>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line bg-gradient-to-r from-amber-500/5 to-transparent p-6 rounded-lg border border-amber-500/20">
                  {article.conclusion}
                </div>
              </div>
            </article>
          </div>
        ) : (
          <div className="relative">
            <pre className="bg-slate-900/50 text-slate-300 p-6 rounded-lg overflow-x-auto text-sm leading-relaxed border border-slate-700/50">
              {generateMarkdown()}
            </pre>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={copyToClipboard}
          className="flex-1 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 border border-slate-600/50 hover:border-slate-500/50 group"
        >
          <Copy className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span>{copied ? 'Copiado!' : 'Copiar Markdown'}</span>
        </button>
        <button
          onClick={downloadMarkdown}
          className="flex-1 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-amber-500/25 group hover:scale-[1.02]"
        >
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span>Download Premium</span>
        </button>
      </div>

      {/* Optimization Summary */}
      <div className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-xl border border-emerald-400/30 p-6">
        <div className="relative">
          <h3 className="text-lg font-semibold text-emerald-300 mb-4 flex items-center space-x-2">
            <Gem className="w-5 h-5" />
            <span>Resumo da Otimização</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-sm text-slate-400">Palavra-chave principal:</span>
              <div className="text-amber-400 font-semibold text-lg">{article.keyword}</div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-slate-400">Variações utilizadas:</span>
              <div className="flex flex-wrap gap-2">
                {article.variations.map((variation, idx) => (
                  <span key={idx} className="px-2 py-1 bg-emerald-500/10 text-emerald-300 text-xs rounded-full border border-emerald-500/20">
                    {variation}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;