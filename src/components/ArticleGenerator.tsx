import React, { useState } from 'react';
import { Sparkles, FileText, MessageSquare, Target, Crown, Gem, Wand2 } from 'lucide-react';
import { KeywordData, ArticleData, PAQData } from '../types';

interface ArticleGeneratorProps {
  selectedKeyword: KeywordData;
  onComplete: (article: ArticleData) => void;
}

const ArticleGenerator: React.FC<ArticleGeneratorProps> = ({ selectedKeyword, onComplete }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const generationSteps = [
    { title: 'Coletando perguntas relacionadas (PAA)', icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
    { title: 'Criando elementos de SEO otimizados', icon: Target, color: 'from-purple-500 to-purple-600' },
    { title: 'Desenvolvendo introdução emocional', icon: Gem, color: 'from-pink-500 to-pink-600' },
    { title: 'Estruturando o corpo do artigo', icon: FileText, color: 'from-emerald-500 to-emerald-600' },
    { title: 'Finalizando com CTA elegante', icon: Crown, color: 'from-amber-500 to-amber-600' }
  ];

  const generatePAAQuestions = (keyword: string): PAQData[] => {
    const questions: { [key: string]: PAQData[] } = {
      'joias de prata premium': [
        {
          question: 'O que torna uma joia de prata verdadeiramente premium?',
          answer: 'Joias de prata premium se distinguem pela pureza do metal (925 ou superior), acabamento artesanal impecável, design exclusivo e certificação de qualidade. Na Viora, cada peça passa por rigoroso controle de qualidade.'
        },
        {
          question: 'Como identificar joias de prata autênticas?',
          answer: 'Joias de prata autênticas possuem marcação 925, peso adequado, não deixam marcas na pele e mantêm o brilho natural. A Viora fornece certificado de autenticidade com cada peça.'
        },
        {
          question: 'Qual a diferença entre prata 925 e prata comum?',
          answer: 'A prata 925 contém 92,5% de prata pura, oferecendo durabilidade superior e resistência ao desgaste. É o padrão internacional para joias de qualidade premium.'
        }
      ],
      'aliança de prata 925': [
        {
          question: 'Aliança de prata 925 é adequada para uso diário?',
          answer: 'Sim, a prata 925 é ideal para uso diário devido à sua durabilidade e resistência. Com os cuidados adequados, uma aliança Viora mantém sua beleza por décadas.'
        },
        {
          question: 'Como cuidar de aliança de prata para que não escureça?',
          answer: 'Mantenha a aliança seca, evite contato com produtos químicos e guarde em local arejado. A oxidação natural pode ser facilmente removida com produtos específicos.'
        }
      ]
    };

    return questions[keyword] || [
      {
        question: `Por que escolher ${keyword} da Viora?`,
        answer: `As ${keyword} da Viora combinam tradição artesanal com design contemporâneo, oferecendo peças únicas que refletem personalidade e sofisticação.`
      },
      {
        question: `Como ${keyword} podem expressar minha personalidade?`,
        answer: `Cada ${keyword.slice(0, -1)} é uma extensão de quem você é, permitindo expressar sua individualidade através de designs únicos e significativos.`
      },
      {
        question: `Qual o simbolismo das ${keyword}?`,
        answer: `As ${keyword} carregam significados profundos de conexão, amor e memórias preciosas, tornando-se parte da sua história pessoal.`
      }
    ];
  };

  const generateArticle = async (): Promise<ArticleData> => {
    const keyword = selectedKeyword.keyword;
    const variations = selectedKeyword.variations;

    await new Promise(resolve => setTimeout(resolve, 2000));

    const title = generateTitle(keyword);
    const slug = generateSlug(title);
    const metaDescription = generateMetaDescription(keyword);
    const introduction = generateIntroduction(keyword);
    const sections = generateSections(keyword, variations);
    const paaQuestions = generatePAAQuestions(keyword);
    const conclusion = generateConclusion(keyword);

    return {
      title,
      slug,
      metaDescription,
      introduction,
      sections,
      paaQuestions,
      conclusion,
      keyword,
      variations
    };
  };

  const generateTitle = (keyword: string): string => {
    const templates = [
      `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}: Elegância Atemporal em Cada Detalhe`,
      `Descubra ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} que Contam Sua História`,
      `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}: Onde Tradição Encontra Modernidade`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[áàâãä]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòôõö]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const generateMetaDescription = (keyword: string): string => {
    return `Explore ${keyword} premium da Viora. Peças únicas em prata 925 que combinam elegância, qualidade e significado. Descubra a coleção exclusiva.`;
  };

  const generateIntroduction = (keyword: string): string => {
    const intros = [
      `No universo das joias, existe uma linguagem silenciosa que transcende palavras. Cada ${keyword.slice(0, -1)} carrega consigo não apenas a beleza do metal precioso, mas também a essência de quem a escolhe. Na Viora, compreendemos que uma joia é muito mais que um acessório – é uma extensão da sua personalidade, um reflexo da sua história única.

      Quando você escolhe ${keyword} da nossa coleção, está investindo em peças que foram criadas com paixão e dedicação artesanal. Cada detalhe é pensado para mulheres que valorizam a autenticidade e buscam expressar sua individualidade através da elegância atemporal.

      Nossa filosofia vai além da simples criação de joias. Acreditamos que cada peça deve contar uma história, despertar emoções e criar conexões profundas com quem a usa. É essa visão que nos move a criar ${keyword} verdadeiramente especiais.`,
      
      `Existe uma magia particular no momento em que uma mulher encontra a joia perfeita. É um instante de reconhecimento mútuo, onde a peça parece sussurrar: "eu pertenço a você". Na Viora, dedicamos nossa expertise à criação de ${keyword} que despertam exatamente essa sensação.

      Cada ${keyword.slice(0, -1)} em nossa coleção nasce de uma combinação única entre tradição artesanal e visão contemporânea. Utilizamos apenas prata 925 da mais alta qualidade, garantindo que cada peça não apenas encante pela beleza, mas também perdure através do tempo como um legado precioso.

      Para a mulher moderna que compreende que verdadeiro luxo reside nos detalhes e na autenticidade, nossas ${keyword} representam muito mais que acessórios – são símbolos de uma vida vivida com propósito e elegância.`
    ];

    return intros[Math.floor(Math.random() * intros.length)];
  };

  const generateSections = (keyword: string, variations: string[]): ArticleData['sections'] => {
    return [
      {
        h2: `A Arte de Escolher ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} Excepcionais`,
        h3: 'Critérios de Qualidade Premium',
        content: `A seleção de ${keyword} verdadeiramente excepcionais requer conhecimento e sensibilidade. Na Viora, cada peça passa por critérios rigorosos que garantem não apenas beleza, mas também durabilidade e significado.

        O primeiro aspecto a considerar é a pureza do metal. Nossa prata 925 oferece a combinação perfeita entre resistência e maleabilidade, permitindo acabamentos refinados que realçam cada detalhe do design. Esta liga especial garante que suas ${keyword} mantenham o brilho natural por anos.

        Além da qualidade técnica, valorizamos o design como expressão artística. Cada ${keyword.slice(0, -1)} é concebida para harmonizar com diferentes estilos e ocasiões, desde momentos íntimos até celebrações especiais, sempre mantendo a elegância como marca registrada.`
      },
      {
        h2: `O Simbolismo Profundo das ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`,
        h3: 'Conexões Emocionais e Significados',
        content: `Muito além de sua beleza física, as ${keyword} carregam simbolismos profundos que ressoam com a alma feminina. Cada peça da Viora é criada com a consciência de que se tornará parte da história pessoal de quem a escolhe.

        A prata, metal lunar por excelência, sempre foi associada à intuição, sensibilidade e força interior feminina. Quando trabalhada com maestria artesanal, ela se torna um canal para expressar a complexidade e profundidade da personalidade moderna.

        Nossas ${keyword} são desenhadas para acompanhar diferentes fases da vida, adaptando-se e ganhando novos significados conforme as experiências se acumulam. É essa capacidade de evolução simbólica que torna cada peça verdadeiramente especial.`
      },
      {
        h2: `Cuidados Essenciais para suas ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`,
        h3: 'Preservando a Beleza Através do Tempo',
        content: `Manter suas ${keyword} sempre radiantes é uma forma de honrar o investimento em qualidade e preservar as memórias que elas representam. Com cuidados adequados, suas peças Viora manterão sua beleza original por gerações.

        A limpeza regular com produtos específicos para prata é fundamental. Recomendamos o uso de flanela macia e produtos não abrasivos, sempre seguindo movimentos suaves que respeitem o acabamento artesanal de cada peça.

        O armazenamento correto também é crucial. Mantenha suas ${keyword} em ambiente seco, preferencialmente em compartimentos individuais para evitar arranhões. Evite o contato direto com perfumes e cosméticos antes que sejam completamente absorvidos pela pele.`
      },
      {
        h2: `Tendências e Estilos em ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`,
        h3: 'Modernidade com Elegância Atemporal',
        content: `O universo das ${keyword} está em constante evolução, mas as melhores peças são aquelas que conseguem incorporar tendências contemporâneas sem perder sua essência clássica. Na Viora, seguimos essa filosofia criando peças que são simultaneamente modernas e atemporais.

        As tendências atuais favorecem designs que equilibram minimalismo sofisticado com detalhes marcantes. Peças versáteis que podem ser usadas sozinhas para um look clean ou combinadas para criar composições mais elaboradas e expressivas.

        Nossa abordagem prioriza a criação de ${keyword} que se adaptem ao estilo de vida contemporâneo, oferecendo versatilidade sem comprometer a elegância. Cada peça é pensada para complementar tanto looks casuais quanto ocasiões mais formais.`
      }
    ];
  };

  const generateConclusion = (keyword: string): string => {
    return `Escolher ${keyword} da Viora é muito mais que uma decisão de compra – é um investimento em sua identidade e autoexpressão. Cada peça de nossa coleção representa o encontro perfeito entre tradição artesanal e visão contemporânea, criado especialmente para mulheres que compreendem que verdadeira elegância transcende tendências passageiras.

    Nossa dedicação à qualidade premium, combinada com designs que celebram a individualidade feminina, resulta em ${keyword} que se tornam parte integrante da sua história pessoal. Cada detalhe é pensado para acompanhar você em momentos únicos, criando memórias preciosas que perdurarão através do tempo.

    Convidamos você a descobrir nossa coleção exclusiva de ${keyword} e encontrar a peça que falará diretamente ao seu coração. Na Viora, acreditamos que toda mulher merece joias tão únicas quanto sua essência. Explore nossa coleção e permita-se ser envolvida pela magia da prata premium trabalhada com paixão artesanal.`;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    for (let i = 0; i < generationSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    const article = await generateArticle();
    onComplete(article);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-full border border-amber-400/20">
          <Wand2 className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-bold text-white">Geração de Artigo Premium</h2>
        </div>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Criando conteúdo SEO otimizado com a elegância da marca Viora
        </p>
      </div>

      {/* Selected Keyword Card */}
      <div className="relative bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-xl border border-amber-400/30 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent rounded-xl"></div>
        <div className="relative">
          <h3 className="text-lg font-semibold text-amber-300 mb-4 flex items-center space-x-2">
            <Crown className="w-5 h-5" />
            <span>Keyword Selecionada</span>
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-pulse"></div>
              <span className="text-2xl font-bold text-white">{selectedKeyword.keyword}</span>
            </div>
            <div className="text-right space-y-1">
              <div className="text-sm text-slate-400">Volume: {selectedKeyword.volume.toLocaleString()}/mês</div>
              <div className="text-sm text-slate-400">Dificuldade: {selectedKeyword.difficulty}/100</div>
              <div className="text-lg font-bold text-amber-400">Score: {selectedKeyword.score}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-slate-400 mb-2">Variações semânticas:</div>
            <div className="flex flex-wrap gap-2">
              {selectedKeyword.variations.map((variation, idx) => (
                <span key={idx} className="px-3 py-1 bg-amber-500/10 text-amber-300 text-sm rounded-full border border-amber-500/20">
                  {variation}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generation Progress */}
      {isGenerating && (
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <span className="text-xl font-semibold text-white">Gerando artigo premium...</span>
          </div>
          
          <div className="space-y-4">
            {generationSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  index < currentStep ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 scale-110' : 
                  index === currentStep ? `bg-gradient-to-r ${step.color} scale-110 animate-pulse` : 
                  'bg-slate-700 scale-100'
                }`}>
                  {index < currentStep ? (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <step.icon className={`w-6 h-6 ${index === currentStep ? 'text-white' : 'text-slate-400'}`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-medium transition-colors duration-300 ${
                    index < currentStep ? 'text-emerald-400' : 
                    index === currentStep ? 'text-white' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </div>
                  {index === currentStep && (
                    <div className="text-sm text-slate-300 mt-1">Em andamento...</div>
                  )}
                  {index < currentStep && (
                    <div className="text-sm text-emerald-400 mt-1">Concluído ✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generate Button */}
      {!isGenerating && (
        <button
          onClick={handleGenerate}
          className="group relative w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center space-x-3">
            <Sparkles className="w-6 h-6" />
            <span>Gerar Artigo SEO Premium</span>
          </span>
        </button>
      )}
    </div>
  );
};

export default ArticleGenerator;