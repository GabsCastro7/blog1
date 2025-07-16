import React, { useState } from 'react';
import { Search, TrendingUp, Target, Zap, CheckCircle, Gem, Crown, Star } from 'lucide-react';
import { KeywordData } from '../types';

interface KeywordAnalysisProps {
  onComplete: (data: KeywordData[], selected: KeywordData) => void;
}

const KeywordAnalysis: React.FC<KeywordAnalysisProps> = ({ onComplete }) => {
  const [keywords, setKeywords] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<KeywordData[]>([]);

  const defaultKeywords = [
    'joias de prata premium',
    'aliança de prata 925',
    'anel de prata feminino',
    'colar de prata elegante',
    'joias artesanais prata',
    'brincos de prata delicados',
    'pulseira de prata moderna',
    'conjunto joias prata',
    'joias prata personalizadas',
    'pingente de prata único'
  ].join('\n');

  const generateKeywordData = (keyword: string): KeywordData => {
    const baseVolumes: { [key: string]: number } = {
      'joias de prata premium': 8900,
      'aliança de prata 925': 12400,
      'anel de prata feminino': 15600,
      'colar de prata elegante': 6800,
      'joias artesanais prata': 4200,
      'brincos de prata delicados': 3800,
      'pulseira de prata moderna': 2900,
      'conjunto joias prata': 5600,
      'joias prata personalizadas': 3200,
      'pingente de prata único': 2400
    };

    const baseDifficulties: { [key: string]: number } = {
      'joias de prata premium': 42,
      'aliança de prata 925': 38,
      'anel de prata feminino': 45,
      'colar de prata elegante': 35,
      'joias artesanais prata': 28,
      'brincos de prata delicados': 32,
      'pulseira de prata moderna': 30,
      'conjunto joias prata': 40,
      'joias prata personalizadas': 25,
      'pingente de prata único': 22
    };

    const volume = baseVolumes[keyword] || Math.floor(Math.random() * 8000) + 2000;
    const difficulty = baseDifficulties[keyword] || Math.floor(Math.random() * 40) + 20;
    
    const score = Math.round(((volume / 100) * 0.6) + ((100 - difficulty) * 0.4));

    const variations = generateVariations(keyword);
    
    return {
      keyword,
      volume,
      difficulty,
      intent: determineIntent(keyword),
      score,
      variations
    };
  };

  const generateVariations = (keyword: string): string[] => {
    const variations: { [key: string]: string[] } = {
      'joias de prata premium': ['joias prata de luxo', 'joias prata exclusivas', 'joias prata sofisticadas'],
      'aliança de prata 925': ['aliança prata maciça', 'aliança prata verdadeira', 'aliança prata certificada'],
      'anel de prata feminino': ['anel prata mulher', 'anel prata delicado', 'anel prata elegante'],
      'colar de prata elegante': ['colar prata fino', 'colar prata sofisticado', 'corrente prata elegante']
    };

    return variations[keyword] || [
      `${keyword} artesanal`,
      `${keyword} exclusivo`,
      `${keyword} premium`
    ];
  };

  const determineIntent = (keyword: string): KeywordData['intent'] => {
    if (keyword.includes('premium') || keyword.includes('luxo')) return 'commercial';
    if (keyword.includes('como') || keyword.includes('o que')) return 'informational';
    if (keyword.includes('comprar') || keyword.includes('preço')) return 'transactional';
    return 'commercial';
  };

  const analyzeKeywords = async () => {
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));

    const keywordList = keywords.trim() ? keywords.split('\n').map(k => k.trim()).filter(k => k) : defaultKeywords.split('\n');
    const analysisResults = keywordList.map(generateKeywordData);
    
    analysisResults.sort((a, b) => b.score - a.score);
    
    setResults(analysisResults);
    setIsAnalyzing(false);
  };

  const selectKeyword = (keyword: KeywordData) => {
    onComplete(results, keyword);
  };

  const getIntentColor = (intent: KeywordData['intent']) => {
    switch (intent) {
      case 'commercial': return 'text-amber-400 bg-amber-500/10';
      case 'transactional': return 'text-emerald-400 bg-emerald-500/10';
      case 'informational': return 'text-blue-400 bg-blue-500/10';
      case 'navigational': return 'text-purple-400 bg-purple-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-emerald-400';
    if (difficulty < 50) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreIcon = (index: number) => {
    if (index === 0) return <Crown className="w-4 h-4 text-amber-400" />;
    if (index === 1) return <Gem className="w-4 h-4 text-slate-300" />;
    if (index === 2) return <Star className="w-4 h-4 text-amber-600" />;
    return <Target className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-full border border-amber-400/20">
          <Search className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-bold text-white">Análise de Palavras-Chave</h2>
        </div>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Descubra as melhores oportunidades de ranqueamento para suas joias premium
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-semibold text-amber-300 mb-3">
            Palavras-chave candidatas (uma por linha)
          </label>
          <div className="relative">
            <textarea
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder={defaultKeywords}
              className="w-full h-40 px-6 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 resize-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent rounded-xl pointer-events-none"></div>
          </div>
        </div>

        <button
          onClick={analyzeKeywords}
          disabled={isAnalyzing}
          className="group relative w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center space-x-3">
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Analisando oportunidades de SEO...</span>
              </>
            ) : (
              <>
                <Zap className="w-6 h-6" />
                <span>Iniciar Análise Premium</span>
              </>
            )}
          </span>
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              <span>Oportunidades Identificadas</span>
            </h3>
            <div className="text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-lg">
              {results.length} palavras-chave analisadas
            </div>
          </div>

          <div className="grid gap-6">
            {results.map((result, index) => (
              <div
                key={result.keyword}
                className="group relative bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
              >
                {/* Ranking Badge */}
                <div className="absolute -top-3 -left-3">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold ${
                    index === 0 ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' :
                    index === 1 ? 'bg-gradient-to-r from-slate-400 to-slate-500 text-white' :
                    index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {getScoreIcon(index)}
                    <span>#{index + 1}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <h4 className="font-semibold text-white text-lg">{result.keyword}</h4>
                      <div className={`px-3 py-1 text-xs rounded-full font-medium ${getIntentColor(result.intent)}`}>
                        {result.intent}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-400">Score: {result.score}</div>
                      <div className="text-xs text-slate-400">Potencial de ranqueamento</div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Volume Mensal</div>
                        <div className="text-lg font-semibold text-white">{result.volume.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-500/10 rounded-lg">
                        <Target className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Dificuldade SEO</div>
                        <div className={`text-lg font-semibold ${getDifficultyColor(result.difficulty)}`}>
                          {result.difficulty}/100
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Variations */}
                  <div>
                    <div className="text-sm text-slate-400 mb-2">Variações semânticas:</div>
                    <div className="flex flex-wrap gap-2">
                      {result.variations.map((variation, idx) => (
                        <span key={idx} className="px-3 py-1 bg-amber-500/10 text-amber-300 text-sm rounded-full border border-amber-500/20">
                          {variation}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => selectKeyword(result)}
                    className="w-full py-3 bg-gradient-to-r from-amber-600/80 to-amber-500/80 hover:from-amber-600 hover:to-amber-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Selecionar para Geração</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordAnalysis;