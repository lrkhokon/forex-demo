
import React, { useState, useEffect } from 'react';
import { Ticker } from './components/Ticker';
import { Navbar } from './components/Navbar';
import { MarketAnalysisAI } from './components/MarketAnalysisAI';
import { MarketGrid } from './components/MarketGrid';
import { BrokerList } from './components/BrokerList';
import { NewsFeed } from './components/NewsFeed';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Bell, TrendingUp, Check, ArrowLeft, ExternalLink, Shield } from 'lucide-react';
import { NewsArticle, Broker, User } from './types';

// Mock Initial Data
const INITIAL_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'EUR/USD Forecast: Euro Gains Ground as Dollar Retreats on Rate Cut Hopes',
    category: 'Analysis',
    timestamp: '2 hours ago',
    image: 'https://picsum.photos/seed/forex1/800/450',
    summary: 'The Euro is showing signs of recovery as US Treasury yields cool down following the latest labor market data releases. Technical indicators suggest a support zone at 1.0820...'
  },
  {
    id: '2',
    title: 'Gold Prices Hit Record Highs as Safe Haven Demand Surges Amid Geopolitical Tensions',
    category: 'Commodities',
    timestamp: '4 hours ago',
    image: 'https://picsum.photos/seed/gold/800/450',
    summary: 'Investors are flocking to bullion as a hedge against global uncertainty, driving prices past the $2,200 mark for the first time. Analysts predict further gains if central banks continue buying...'
  },
  {
    id: '3',
    title: 'NFP Data Preview: What to Expect from the Upcoming US Jobs Report',
    category: 'Forecast',
    timestamp: '5 hours ago',
    image: 'https://picsum.photos/seed/charts/800/450',
    summary: 'Economists are anticipating a steady growth in payrolls, but any deviation could spark massive volatility in the USD pairs. We break down the three most likely scenarios...'
  }
];

const INITIAL_BROKERS: Broker[] = [
  { id: 'b1', name: 'Plus500', rating: 4.8, logo: 'https://picsum.photos/seed/p500/100/100', minDeposit: '$100', leverage: '1:30', regulation: 'FCA, ASIC, CySEC', link: '#' },
  { id: 'b2', name: 'AvaTrade', rating: 4.5, logo: 'https://picsum.photos/seed/ava/100/100', minDeposit: '$100', leverage: '1:400', regulation: 'FCA, FSCA', link: '#' },
  { id: 'b3', name: 'eToro', rating: 4.7, logo: 'https://picsum.photos/seed/etoro/100/100', minDeposit: '$50', leverage: '1:30', regulation: 'CySEC, FCA', link: '#' },
];

const App: React.FC = () => {
  // Navigation & View State
  const [activeView, setActiveView] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewedArticle, setViewedArticle] = useState<NewsArticle | null>(null);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Content State (Editable by Admin)
  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [brokers, setBrokers] = useState<Broker[]>(INITIAL_BROKERS);

  // Widget States
  const [signalConf, setSignalConf] = useState(94);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalConf(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.min(Math.max(prev + delta, 90), 99);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleNavigate = (path: string) => {
    setActiveView(path);
    setSearchQuery('');
    setViewedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (email: string) => {
    setUser({ email, role: 'admin' });
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    if (activeView === 'Admin') setActiveView('Home');
  };

  const handleDeleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const handleDeleteBroker = (id: string) => {
    setBrokers(prev => prev.filter(b => b.id !== id));
  };

  const handleAddNews = (article: NewsArticle) => {
    setNews(prev => [article, ...prev]);
  };

  const handleAddBroker = (broker: Broker) => {
    setBrokers(prev => [broker, ...prev]);
  };

  const handleViewArticle = (article: NewsArticle) => {
    setViewedArticle(article);
    setActiveView('ArticleDetail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = () => {
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
    }, 1500);
  };

  // Virtual Page Renderer
  const renderContent = () => {
    if (activeView === 'Admin' && user?.role === 'admin') {
      return (
        <AdminDashboard 
          news={news} 
          brokers={brokers} 
          onDeleteNews={handleDeleteNews} 
          onDeleteBroker={handleDeleteBroker}
          onAddNews={handleAddNews}
          onAddBroker={handleAddBroker}
        />
      );
    }

    if (viewedArticle && activeView === 'ArticleDetail') {
      return (
        <div className="lg:col-span-8 space-y-6">
          <button onClick={() => handleNavigate('Home')} className="flex items-center text-blue-600 font-bold text-sm mb-4">
            <ArrowLeft size={16} className="mr-2" /> BACK TO NEWS
          </button>
          <img src={viewedArticle.image} className="w-full h-80 object-cover rounded-2xl shadow-lg" alt={viewedArticle.title} />
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-blue-600 font-bold text-xs uppercase mb-4 block">{viewedArticle.category} • {viewedArticle.timestamp}</span>
            <h1 className="text-3xl font-black text-slate-800 mb-6 leading-tight">{viewedArticle.title}</h1>
            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p className="font-semibold text-slate-700">{viewedArticle.summary}</p>
              <p>The market environment continues to evolve rapidly as global macroeconomic factors take center stage. Our team of experts has analyzed the current technical formations to identify the high-probability setups for the upcoming session.</p>
              <p>Traders should remain cautious of sudden volatility spikes, especially around high-impact economic releases. We recommend strictly adhering to risk management protocols, including the use of stop-loss orders and appropriate position sizing.</p>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-8 italic text-slate-500">
                Disclaimer: The information provided in this analysis is for educational purposes only and does not constitute investment advice.
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeView !== 'Home' && activeView !== 'Admin') {
      return (
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                 <Shield size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-4">{activeView}</h2>
              <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm mb-8">
                 <span>Home</span> <span>/</span> <span className="text-blue-600 font-bold">{activeView}</span>
              </div>
              <p className="text-slate-500 max-w-lg mx-auto leading-relaxed mb-8">
                This is a simulated landing page for the <strong>{activeView}</strong> section. In a production environment, this page would contain detailed data, expert comparison tables, and dynamic tools related to {activeView.toLowerCase()}.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                 <button onClick={() => handleNavigate('Home')} className="bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition">
                   BACK TO HOME
                 </button>
                 <button className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center">
                   LIVE UPDATES <ExternalLink size={16} className="ml-2" />
                 </button>
              </div>
           </div>
        </div>
      );
    }

    return (
      <>
        <div className="lg:col-span-8 space-y-10">
          {!searchQuery && (
            <div 
              onClick={() => handleViewArticle({
                id: 'main', 
                title: 'Will the Fed Cut Rates? Global Markets React to Inflation Surprise',
                image: 'https://picsum.photos/seed/marketmain/1200/600',
                category: 'BREAKING',
                timestamp: 'LIVE NOW',
                summary: 'Wall Street faces uncertainty as CPI figures beat expectations, leading analysts to revise their Q2 forecasts for USD/EUR pairs.'
              })}
              className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer aspect-video md:aspect-[21/9]"
            >
              <img src="https://picsum.photos/seed/marketmain/1200/600" alt="Main" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full lg:w-3/4">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded text-xs font-bold">MARKET ALERT</span>
                  <span className="text-slate-300 text-xs font-medium flex items-center">
                    <Bell size={12} className="mr-1" /> LIVE COVERAGE
                  </span>
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 group-hover:underline underline-offset-4">
                  Will the Fed Cut Rates? Global Markets React to Inflation Surprise
                </h1>
                <p className="text-slate-300 text-sm md:text-lg mb-6 line-clamp-2 md:line-clamp-none">
                  Wall Street faces uncertainty as CPI figures beat expectations, leading analysts to revise their Q2 forecasts for USD/EUR pairs.
                </p>
                <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-black text-sm uppercase tracking-wider hover:bg-orange-500 hover:text-white transition">
                  Full Report
                </button>
              </div>
            </div>
          )}

          {!searchQuery && <MarketAnalysisAI />}
          
          <NewsFeed news={news} filter={searchQuery} onViewArticle={handleViewArticle} />
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-emerald-600 text-white p-6 rounded-xl shadow-lg border border-emerald-500 overflow-hidden relative group cursor-pointer" onClick={() => handleNavigate('Signals')}>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="font-bold flex items-center"><TrendingUp size={20} className="mr-2" /> Top Signal</h3>
              <span className="bg-emerald-400 text-emerald-900 px-2 py-0.5 rounded text-[10px] font-black transition-all duration-1000">
                {signalConf}% CONFIDENCE
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 relative z-10">
              <div className="text-2xl font-black">BUY EUR/JPY</div>
              <div className="text-3xl font-mono">163.42</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs relative z-10">
              <div className="bg-black/10 p-2 rounded">TP: <span className="font-bold font-mono">164.80</span></div>
              <div className="bg-black/10 p-2 rounded">SL: <span className="font-bold font-mono">162.90</span></div>
            </div>
            <button className="w-full mt-4 bg-white text-emerald-700 py-2.5 rounded font-black text-xs hover:bg-emerald-50 transition shadow relative z-10">
              CLAIM PREMIUM SIGNALS
            </button>
          </div>

          <MarketGrid filter={searchQuery} />
          
          <BrokerList brokers={brokers} onNavigate={handleNavigate} />

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Trading School</h3>
             <div className="space-y-4">
                {[
                  'How to use RSI effectively?',
                  'Basics of Candlestick patterns',
                  'Risk management 101'
                ].map((edu, idx) => (
                  <div key={idx} className="flex items-start cursor-pointer hover:text-blue-600 transition" onClick={() => handleNavigate('Lesson: ' + edu)}>
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center mr-3 text-xs font-bold text-slate-500 shrink-0">0{idx+1}</div>
                    <p className="text-sm font-semibold">{edu}</p>
                  </div>
                ))}
             </div>
             <button onClick={() => handleNavigate('Education')} className="w-full mt-6 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition">
                GO TO ACADEMY
             </button>
          </div>

          <div className="bg-slate-100 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold mb-2">Market Insights</h3>
            <p className="text-xs text-slate-500 mb-4">Get daily forecasts directly via email.</p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
              <button 
                onClick={handleSubscribe}
                disabled={subscribing || subscribed}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center ${subscribed ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-white hover:bg-slate-900'}`}
              >
                {subscribing ? 'SUBSCRIBING...' : subscribed ? <><Check size={14} className="mr-1" /> SUBSCRIBED</> : 'SUBSCRIBE'}
              </button>
            </div>
          </div>
        </aside>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fdfdfd]">
      <Ticker />
      <Navbar 
        user={user} 
        onSearch={setSearchQuery} 
        onNavigate={handleNavigate} 
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <div className="bg-blue-50 py-2 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center text-[11px] text-blue-800 font-medium">
          <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded text-[9px] font-black mr-2">HOT</span>
          NFP data release expected in 4h 20m. Volatility expected.
          <button onClick={() => handleNavigate('Calendar')} className="ml-2 underline font-bold">Read Preview</button>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  );
};

export default App;
