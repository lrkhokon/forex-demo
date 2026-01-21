
import React, { useEffect, useState } from 'react';
import { MarketPair } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

const INITIAL_DATA: MarketPair[] = [
  { symbol: 'EUR/USD', price: 1.0845, change: 0.0012, changePercent: 0.11, status: 'up' },
  { symbol: 'GBP/USD', price: 1.2634, change: -0.0023, changePercent: -0.18, status: 'down' },
  { symbol: 'USD/JPY', price: 151.42, change: 0.15, changePercent: 0.10, status: 'up' },
  { symbol: 'AUD/USD', price: 0.6512, change: -0.0005, changePercent: -0.08, status: 'down' },
  { symbol: 'Gold', price: 2178.50, change: 12.40, changePercent: 0.57, status: 'up' },
  { symbol: 'BTC/USD', price: 68420.00, change: -1250, changePercent: -1.79, status: 'down' },
];

export const Ticker: React.FC = () => {
  const [pairs, setPairs] = useState(INITIAL_DATA);
  const [lastUpdateIdx, setLastUpdateIdx] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * INITIAL_DATA.length);
      setPairs(current => current.map((p, i) => {
        if (i === idx) {
          const change = (Math.random() - 0.5) * (p.price * 0.001);
          const newPrice = p.price + change;
          return {
            ...p,
            price: newPrice,
            status: change > 0 ? 'up' : 'down'
          };
        }
        return p;
      }));
      setLastUpdateIdx(idx);
      setTimeout(() => setLastUpdateIdx(null), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 text-white py-2 overflow-hidden whitespace-nowrap border-b border-slate-700">
      <div className="flex animate-[ticker_40s_linear_infinite] hover:[animation-play-state:paused]">
        {[...pairs, ...pairs].map((pair, idx) => (
          <div key={idx} className={`flex items-center px-6 border-r border-slate-700 transition-colors duration-500 ${lastUpdateIdx === idx % pairs.length ? (pair.status === 'up' ? 'bg-emerald-900/30' : 'bg-rose-900/30') : ''}`}>
            <span className="font-bold mr-2 text-xs md:text-sm">{pair.symbol}</span>
            <span className={`mr-2 font-mono text-xs md:text-sm ${lastUpdateIdx === idx % pairs.length ? (pair.status === 'up' ? 'text-emerald-400' : 'text-rose-400') : ''}`}>
              {pair.price.toFixed(pair.symbol === 'USD/JPY' || pair.symbol === 'Gold' || pair.symbol === 'BTC/USD' ? 2 : 4)}
            </span>
            <div className={`flex items-center text-[10px] md:text-xs ${pair.status === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {pair.status === 'up' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
              <span>{Math.abs(pair.changePercent).toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
