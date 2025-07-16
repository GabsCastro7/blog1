export interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  score: number;
  variations: string[];
}

export interface PAQData {
  question: string;
  answer: string;
}

export interface ArticleData {
  title: string;
  slug: string;
  metaDescription: string;
  introduction: string;
  sections: {
    h2: string;
    h3?: string;
    content: string;
  }[];
  paaQuestions: PAQData[];
  conclusion: string;
  keyword: string;
  variations: string[];
}