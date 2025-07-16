import React, { useState } from 'react';
import { Crown, Search, FileText, Eye, Sparkles, Gem } from 'lucide-react';
import KeywordAnalysis from './components/KeywordAnalysis';
import ArticleGenerator from './components/ArticleGenerator';
import ArticlePreview from './components/ArticlePreview';
import { KeywordData, ArticleData } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [keywordData, setKeywordData] = useState<KeywordData[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordData | null>(null);
  const [generatedArticle, setGeneratedArticle] = useState<ArticleData | null>(null);

  const steps = [
    { id: 1, title: 'Análise de Keywords', icon: Search, description: 'Descobrir oportunidades de ranqueamento' },
    { id: 2, title: 'Geração do Artigo', icon: FileText, description: 'Criar conteúdo SEO otimizado' },
    { id: 3, title: 'Visualização Final', icon: Eye, description: 'Revisar e exportar conteúdo' }
  ];

  const handleKeywordAnalysis = (data: KeywordData[], selected: KeywordData) => {
    setKeywordData(data);
    setSelectedKeyword(selected);
    setCurrentStep(2);
  };

  const handleArticleGeneration = (article: ArticleData) => {
    setGeneratedArticle(article);
    setCurrentStep(3);
  };

  const resetProcess = () => {
    setCurrentStep(1);
    setKeywordData([]);
    setSelectedKeyword(null);
    setGeneratedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950">
      {/* Header Premium */}
      <header className="relative bg-gradient-to-r from-amber-600/10 via-amber-500/5 to-rose-gold/10 backdrop-blur-xl border-b border-amber-400/20">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl blur opacity-75"></div>
                <div className="relative p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-2xl">
                  <Crown className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                  Viora SEO Studio
                </h1>
                <p className="text-amber-200/80 text-sm font-medium">Plataforma de Geração de Artigos Premium</p>
              </div>
            </div>
            <button
              onClick={resetProcess}
              className="group relative px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Novo Artigo</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Progress Steps Premium */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 rounded-2xl"></div>
          
          <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-amber-400/20 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-12">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                  <div className="flex flex-col items-center space-y-4">
                    {/* Step Icon */}
                    <div className={`relative group ${
                      step.id === currentStep 
                        ? 'scale-110' 
                        : step.id < currentStep 
                        ? 'scale-105' 
                        : 'scale-100'
                    } transition-all duration-500`}>
                      <div className={`absolute inset-0 rounded-full blur-lg ${
                        step.id === currentStep 
                          ? 'bg-gradient-to-r from-amber-400 to-amber-600 opacity-60' 
                          : step.id < currentStep 
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-40' 
                          : 'bg-slate-600 opacity-20'
                      }`}></div>
                      <div className={`relative p-4 rounded-full border-2 ${
                        step.id === currentStep 
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400 shadow-lg shadow-amber-500/25' 
                          : step.id < currentStep 
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400 shadow-lg shadow-emerald-500/25' 
                          : 'bg-slate-800 border-slate-600'
                      } transition-all duration-500`}>
                        <step.icon className={`w-6 h-6 ${
                          step.id <= currentStep ? 'text-white' : 'text-slate-400'
                        }`} />
                      </div>
                    </div>
                    
                    {/* Step Info */}
                    <div className="text-center max-w-xs">
                      <h3 className={`font-semibold mb-1 ${
                        step.id === currentStep 
                          ? 'text-amber-300' 
                          : step.id < currentStep 
                          ? 'text-emerald-300' 
                          : 'text-slate-400'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-8 mt-4">
                      <div className={`h-0.5 rounded-full transition-all duration-700 ${
                        step.id < currentStep 
                          ? 'bg-gradient-to-r from-emerald-500 to-amber-500' 
                          : 'bg-slate-700'
                      }`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-xl"></div>
              <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
                {currentStep === 1 && (
                  <KeywordAnalysis onComplete={handleKeywordAnalysis} />
                )}
                {currentStep === 2 && selectedKeyword && (
                  <ArticleGenerator 
                    selectedKeyword={selectedKeyword}
                    onComplete={handleArticleGeneration}
                  />
                )}
                {currentStep === 3 && generatedArticle && (
                  <ArticlePreview article={generatedArticle} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
    </div>
  );
}

export default App;