
import React from 'react';
import { NewsArticle } from '../types';
import { Clock, Share2, ArrowRight } from 'lucide-react';

interface NewsFeedProps {
  news: NewsArticle[];
  filter?: string;
  onViewArticle: (article: NewsArticle) => void;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ news, filter = '', onViewArticle }) => {
  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(filter.toLowerCase()) || 
    item.summary.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">
          {filter ? `Search Results for "${filter}"` : 'Latest Analysis & News'}
        </h2>
        <div className="flex space-x-2">
          {['All', 'Forex', 'Crypto', 'Stocks'].map(cat => (
            <button key={cat} className="px-4 py-1.5 text-xs font-semibold rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 transition">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredNews.map((item) => (
          <article 
            key={item.id} 
            onClick={() => onViewArticle(item)}
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row group cursor-pointer hover:shadow-md transition duration-300"
          >
            <div className="md:w-1/3 h-52 md:h-auto overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded">{item.category}</span>
                  <div className="flex items-center text-slate-400 text-xs">
                    <Clock size={12} className="mr-1" />
                    {item.timestamp}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-800 transition">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{item.summary}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-blue-600 text-xs font-bold flex items-center">
                  READ ANALYSIS <ArrowRight size={14} className="ml-1" />
                </span>
                <button 
                  className="text-slate-400 hover:text-blue-600"
                  onClick={(e) => { e.stopPropagation(); alert('Shared link to: ' + item.title); }}
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
        {filteredNews.length === 0 && (
          <div className="py-20 text-center bg-white rounded-xl border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-medium italic">No news articles match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
