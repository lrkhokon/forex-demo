
export interface MarketPair {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  status: 'up' | 'down';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  image: string;
  summary: string;
}

export interface Broker {
  id: string;
  name: string;
  rating: number;
  logo: string;
  minDeposit: string;
  leverage: string;
  regulation: string;
  link: string;
}

export interface MarketSignal {
  pair: string;
  type: 'BUY' | 'SELL';
  entry: number;
  tp: number;
  sl: number;
  confidence: number;
}

export interface User {
  email: string;
  role: 'admin' | 'user';
}
