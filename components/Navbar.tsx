
import React, { useState } from 'react';
import { Menu, X, Search, Globe, ChevronDown, Check, User as UserIcon, LogOut, Shield } from 'lucide-react';
import { User } from '../types';

interface Props {
  user: User | null;
  onSearch: (query: string) => void;
  onNavigate: (path: string) => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<Props> = ({ user, onSearch, onNavigate, onOpenLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Forex Brokers', sub: ['Best Brokers', 'Reviews', 'Compare', 'Regulation'] },
    { name: 'Market News', sub: ['Daily News', 'Analysis', 'Forecasts', 'Cryptocurrency'] },
    { name: 'Trading Signals', sub: ['Free Signals', 'Premium Signals', 'Performance'] },
    { name: 'Education', sub: ['Basics', 'Strategy', 'Glossary', 'Webinars'] },
    { name: 'Tools', sub: ['Economic Calendar', 'Calculators', 'Sentiment'] },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch(val);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-black tracking-tighter text-blue-800 flex items-center cursor-pointer" onClick={() => onNavigate('Home')}>
              DAILY<span className="text-orange-500">FOREX</span>
              <div className="ml-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group cursor-pointer py-5">
                <div 
                  className="flex items-center text-sm font-semibold text-slate-700 hover:text-blue-800"
                  onClick={() => onNavigate(link.name)}
                >
                  {link.name} <ChevronDown size={14} className="ml-1 text-slate-400 group-hover:text-blue-800" />
                </div>
                <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-2xl border border-slate-100 p-2 w-56 rounded-b-md animate-in slide-in-from-top-1 duration-200">
                  {link.sub.map(s => (
                    <div 
                      key={s} 
                      onClick={(e) => { e.stopPropagation(); onNavigate(s); }}
                      className="px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative flex items-center bg-slate-100 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-200 transition">
              <Search className="text-slate-400 mr-2" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all duration-300"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            {user ? (
              <div className="flex items-center space-x-3">
                {user.role === 'admin' && (
                  <button 
                    onClick={() => onNavigate('Admin')}
                    className="flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition"
                  >
                    <Shield size={14} className="mr-1" /> DASHBOARD
                  </button>
                )}
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                  <UserIcon size={16} />
                </div>
                <button onClick={onLogout} className="text-slate-400 hover:text-rose-600 transition">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenLogin}
                className="flex items-center px-6 py-2 rounded-full bg-blue-800 text-white font-bold text-sm hover:bg-blue-900 transition shadow-sm"
              >
                SIGN IN
              </button>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 pb-4 shadow-xl">
          <div className="px-4 py-3">
             <input 
                type="text" 
                placeholder="Search market..." 
                className="w-full bg-slate-100 border-none rounded-lg p-3 text-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
          </div>
          {navLinks.map((link) => (
            <div key={link.name} className="px-4 py-3 border-b border-slate-50">
              <div className="font-bold text-slate-800 mb-2" onClick={() => { onNavigate(link.name); setIsOpen(false); }}>{link.name}</div>
              <div className="grid grid-cols-2 gap-2 pl-2">
                {link.sub.map(s => (
                  <div key={s} className="text-sm text-slate-500 py-1" onClick={() => { onNavigate(s); setIsOpen(false); }}>{s}</div>
                ))}
              </div>
            </div>
          ))}
          <div className="p-4">
            {user ? (
              <button onClick={onLogout} className="w-full bg-slate-100 text-slate-700 py-3 rounded-lg font-bold">LOGOUT</button>
            ) : (
              <button onClick={onOpenLogin} className="w-full bg-blue-800 text-white py-3 rounded-lg font-bold">SIGN IN</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
