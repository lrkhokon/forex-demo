
import React, { useEffect, useState } from 'react';
import { getMarketAnalysis } from '../services/geminiService';
import { Bot, RefreshCw, AlertCircle } from 'lucide-react';

export const MarketAnalysisAI: React.FC = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalysis = async () => {
    setLoading(true);
    const data = await getMarketAnalysis();
    setAnalysis(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl p-6 shadow-xl border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
            <Bot className="text-blue-400" />
          </div>
          <h2 className="text-xl font-bold">AI Market Outlook</h2>
        </div>
        <button 
          onClick={fetchAnalysis}
          disabled={loading}
          className="text-slate-400 hover:text-white transition disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-slate-800 rounded w-3/4"></div>
          <div className="h-4 bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-800 rounded w-5/6"></div>
        </div>
      ) : analysis ? (
        <div className="space-y-6">
          <div>
            <h3 className="text-blue-400 font-semibold mb-2 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              {analysis.headline}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">Key Trends</h4>
                <ul className="space-y-2 text-sm">
                  {analysis.keyTrends.map((t: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">Top Movers</h4>
                <ul className="space-y-2 text-sm">
                  {analysis.topMovers.map((m: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="text-orange-400 mr-2">→</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-lg">
             <div className="flex items-start">
                <AlertCircle className="text-blue-400 shrink-0 mr-3 mt-1" size={18} />
                <p className="text-sm italic text-blue-100">
                  <span className="font-bold text-blue-400 block not-italic mb-1 uppercase tracking-tighter text-xs">Expert Opinion</span>
                  "{analysis.advice}"
                </p>
             </div>
          </div>
        </div>
      ) : (
        <p className="text-slate-500 text-sm">Failed to load AI insights. Please try again.</p>
      )}
    </div>
  );
};
