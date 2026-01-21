
import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { MarketPair } from '../types';
import { Bot, X, Loader2, Sparkles } from 'lucide-react';
import { getPairAnalysis } from '../services/geminiService';

const MOCK_PAIRS: MarketPair[] = [
  { symbol: 'EUR/USD', price: 1.0845, change: 0.0012, changePercent: 0.11, status: 'up' },
  { symbol: 'GBP/USD', price: 1.2634, change: -0.0023, changePercent: -0.18, status: 'down' },
  { symbol: 'USD/JPY', price: 151.42, change: 0.15, changePercent: 0.10, status: 'up' },
  { symbol: 'USD/CHF', price: 0.9015, change: -0.0042, changePercent: -0.46, status: 'down' },
  { symbol: 'USD/CAD', price: 1.3582, change: 0.0051, changePercent: 0.38, status: 'up' },
];

export const MarketGrid: React.FC<{ filter?: string }> = ({ filter = '' }) => {
  const [pairs, setPairs] = useState(MOCK_PAIRS);
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [pairAnalysis, setPairAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPairs(current => current.map(p => {
        const change = (Math.random() - 0.5) * 0.0005;
        return { ...p, price: p.price + change, status: change > 0 ? 'up' : 'down' };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = async (symbol: string) => {
    setSelectedPair(symbol);
    setIsAnalyzing(true);
    const data = await getPairAnalysis(symbol);
    setPairAnalysis(data);
    setIsAnalyzing(false);
  };

  const filtered = pairs.filter(p => p.symbol.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800">Live Forex Rates</h3>
          <span className="text-[10px] text-slate-400 font-mono flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
            LIVE FEED
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {filtered.map((pair) => (
            <div key={pair.symbol} className="p-4 flex items-center justify-between hover:bg-slate-50 transition group">
              <div className="w-1/3">
                <div className="font-bold text-slate-800">{pair.symbol}</div>
                <div className="text-xs text-slate-400">Foreign Exchange</div>
              </div>
              <div className="w-1/3 font-mono font-semibold text-right transition-colors duration-500">
                {pair.price.toFixed(4)}
              </div>
              <div className="w-1/3 flex items-center justify-end space-x-3">
                 <button 
                  onClick={() => handleAnalyze(pair.symbol)}
                  className="p-1.5 rounded-full bg-slate-50 text-blue-600 hover:bg-blue-600 hover:text-white transition opacity-0 group-hover:opacity-100"
                  title="AI Analysis"
                 >
                   <Bot size={14} />
                 </button>
                 <div className={`text-right font-medium text-xs ${pair.status === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {pair.status === 'up' ? '▲' : '▼'} {Math.abs(pair.changePercent).toFixed(2)}%
                 </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm italic">No pairs matching "{filter}"</div>
          )}
        </div>
      </div>

      {/* AI Analysis Modal */}
      {selectedPair && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-blue-50">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white mr-3">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 leading-none">{selectedPair} Analysis</h4>
                  <span className="text-[10px] text-blue-600 font-bold tracking-tighter uppercase">Gemini Powered</span>
                </div>
              </div>
              <button onClick={() => setSelectedPair(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Loader2 className="animate-spin text-blue-600 mb-4" size={32} />
                  <p className="text-sm text-slate-500 animate-pulse">Scanning market indicators...</p>
                </div>
              ) : pairAnalysis ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-400">SENTIMENT</span>
                    <span className={`text-sm font-black px-2 py-0.5 rounded ${pairAnalysis.sentiment.toLowerCase().includes('bullish') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {pairAnalysis.sentiment}
                    </span>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Key Level to Watch</label>
                    <p className="text-lg font-mono font-bold text-slate-800">{pairAnalysis.keyLevel}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Trade Strategy</label>
                    <p className="text-sm text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-lg italic border-l-4 border-blue-500">
                      "{pairAnalysis.tradeIdea}"
                    </p>
                  </div>
                  <button onClick={() => setSelectedPair(null)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition mt-4">
                    Got it
                  </button>
                </div>
              ) : (
                <p className="text-center text-rose-500 text-sm">Failed to generate analysis.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
