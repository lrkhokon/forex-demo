
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  TrendingUp, 
  Plus, 
  Settings, 
  Trash2, 
  Edit3, 
  Search,
  Eye,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { NewsArticle, Broker } from '../types';

interface Props {
  news: NewsArticle[];
  brokers: Broker[];
  onDeleteNews: (id: string) => void;
  onDeleteBroker: (id: string) => void;
  onAddNews: (article: NewsArticle) => void;
  onAddBroker: (broker: Broker) => void;
}

export const AdminDashboard: React.FC<Props> = ({ 
  news, 
  brokers, 
  onDeleteNews, 
  onDeleteBroker,
  onAddNews,
  onAddBroker
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'brokers'>('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [addType, setAddType] = useState<'news' | 'broker' | null>(null);
  
  // Form States
  const [newsForm, setNewsForm] = useState({ title: '', category: 'Analysis', summary: '' });
  const [brokerForm, setBrokerForm] = useState({ name: '', regulation: '', minDeposit: '$100', rating: 5 });
  const [showSuccess, setShowSuccess] = useState(false);

  const stats = [
    { label: 'Total Visits', value: '42.8K', change: '+12%', color: 'text-blue-600' },
    { label: 'Signal Success', value: '88.4%', change: '+5%', color: 'text-emerald-600' },
    { label: 'New Signups', value: '1,204', change: '+24%', color: 'text-orange-600' },
    { label: 'Broker Clicks', value: '18.9K', change: '-2%', color: 'text-rose-600' },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addType === 'news') {
      onAddNews({
        id: Math.random().toString(36).substr(2, 9),
        title: newsForm.title,
        category: newsForm.category,
        summary: newsForm.summary,
        timestamp: 'Just now',
        image: `https://picsum.photos/seed/${Math.random()}/800/450`
      });
    } else if (addType === 'broker') {
      onAddBroker({
        id: Math.random().toString(36).substr(2, 9),
        name: brokerForm.name,
        regulation: brokerForm.regulation,
        minDeposit: brokerForm.minDeposit,
        rating: brokerForm.rating,
        logo: `https://picsum.photos/seed/${Math.random()}/100/100`,
        leverage: '1:30',
        link: '#'
      });
    }
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsAddModalOpen(false);
      setAddType(null);
      setNewsForm({ title: '', category: 'Analysis', summary: '' });
      setBrokerForm({ name: '', regulation: '', minDeposit: '$100', rating: 5 });
    }, 2000);
  };

  return (
    <div className="lg:col-span-12 space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500">Manage site content and view real-time performance.</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            <Plus size={18} className="mr-2" /> ADD CONTENT
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition border border-slate-200 shadow-sm"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">{stat.label}</div>
            <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-[10px] font-bold bg-slate-50 px-2 py-0.5 rounded-full inline-block text-slate-500">
              {stat.change} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
        <div className="flex border-b border-slate-100 px-4 bg-slate-50/50">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition ${activeTab === 'news' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Manage News
          </button>
          <button 
            onClick={() => setActiveTab('brokers')}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition ${activeTab === 'brokers' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Broker Reviews
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="font-black text-lg text-slate-800">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Newspaper, label: 'Draft Forecast', desc: 'Create a new market outlook', type: 'news' },
                  { icon: Users, label: 'Add Broker', desc: 'Register a new provider', type: 'broker' },
                  { icon: TrendingUp, label: 'Update Signals', desc: 'Modify active trading alerts', type: null },
                ].map((action, i) => (
                  <div 
                    key={i} 
                    onClick={() => { if(action.type) { setAddType(action.type as any); setIsAddModalOpen(true); } }}
                    className="group p-6 rounded-2xl border-2 border-dashed border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition mb-4">
                      <action.icon size={24} />
                    </div>
                    <div className="font-bold text-slate-800">{action.label}</div>
                    <div className="text-xs text-slate-500">{action.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                 <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search articles..." className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm border-none outline-none focus:ring-1 focus:ring-blue-100" />
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold text-slate-400 uppercase">
                      <th className="pb-4">Article Title</th>
                      <th className="pb-4">Category</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {news.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50/50">
                        <td className="py-4">
                          <div className="flex items-center">
                            <img src={item.image} className="w-10 h-10 rounded-lg object-cover mr-3 shadow-sm" />
                            <div>
                              <div className="font-bold text-slate-800 text-sm">{item.title}</div>
                              <div className="text-[10px] text-slate-400">{item.timestamp}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 text-right space-x-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 transition"><Edit3 size={16} /></button>
                          <button onClick={() => onDeleteNews(item.id)} className="p-2 text-slate-400 hover:text-rose-600 transition"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'brokers' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold text-slate-400 uppercase">
                      <th className="pb-4">Broker Name</th>
                      <th className="pb-4">Regulation</th>
                      <th className="pb-4">Rating</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {brokers.map((broker) => (
                      <tr key={broker.id} className="group hover:bg-slate-50/50">
                        <td className="py-4">
                          <div className="flex items-center">
                            <img src={broker.logo} className="w-10 h-10 rounded-lg mr-3 bg-white border border-slate-100" />
                            <div className="font-bold text-slate-800 text-sm">{broker.name}</div>
                          </div>
                        </td>
                        <td className="py-4 text-xs text-slate-500">{broker.regulation}</td>
                        <td className="py-4">
                          <div className="flex text-yellow-400 font-bold text-sm">
                             {broker.rating} ★
                          </div>
                        </td>
                        <td className="py-4 text-right space-x-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 transition"><Edit3 size={16} /></button>
                          <button onClick={() => onDeleteBroker(broker.id)} className="p-2 text-slate-400 hover:text-rose-600 transition"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Content Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-800">Add New Content</h2>
              <button onClick={() => { setIsAddModalOpen(false); setAddType(null); }} className="text-slate-400 hover:text-slate-600 p-2">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              {!addType ? (
                <div className="grid grid-cols-2 gap-6">
                  <button 
                    onClick={() => setAddType('news')}
                    className="flex flex-col items-center p-8 rounded-2xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition text-center"
                  >
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                      <Newspaper size={32} />
                    </div>
                    <span className="font-bold text-slate-800">News Article</span>
                    <span className="text-xs text-slate-500 mt-1">Forecasts, Analysis, Crypto</span>
                  </button>
                  <button 
                    onClick={() => setAddType('broker')}
                    className="flex flex-col items-center p-8 rounded-2xl border-2 border-slate-100 hover:border-orange-600 hover:bg-orange-50 transition text-center"
                  >
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                      <Users size={32} />
                    </div>
                    <span className="font-bold text-slate-800">Broker Review</span>
                    <span className="text-xs text-slate-500 mt-1">Comparison, Ratings</span>
                  </button>
                </div>
              ) : showSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">Content Added!</h3>
                  <p className="text-slate-500 mt-2">The database has been updated successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleAddSubmit} className="space-y-5">
                  <button onClick={() => setAddType(null)} className="text-blue-600 text-xs font-bold mb-4 flex items-center">
                     ← BACK TO SELECTION
                  </button>
                  
                  {addType === 'news' ? (
                    <>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase">Article Title</label>
                        <input 
                          type="text" 
                          required
                          value={newsForm.title}
                          onChange={e => setNewsForm({...newsForm, title: e.target.value})}
                          placeholder="e.g. BTC Price Targets for Q4"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
                          <select 
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                            value={newsForm.category}
                            onChange={e => setNewsForm({...newsForm, category: e.target.value})}
                          >
                            <option>Analysis</option>
                            <option>Forecast</option>
                            <option>Commodities</option>
                            <option>Crypto</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase">Thumbnail</label>
                          <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center text-slate-400 text-sm">
                             <ImageIcon size={16} className="mr-2" /> Auto-Generated
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase">Short Summary</label>
                        <textarea 
                          required
                          rows={3}
                          value={newsForm.summary}
                          onChange={e => setNewsForm({...newsForm, summary: e.target.value})}
                          placeholder="Brief description for the news feed..."
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase">Broker Name</label>
                        <input 
                          type="text" 
                          required
                          value={brokerForm.name}
                          onChange={e => setBrokerForm({...brokerForm, name: e.target.value})}
                          placeholder="e.g. Vantage Markets"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase">Regulation</label>
                          <input 
                            type="text" 
                            required
                            value={brokerForm.regulation}
                            onChange={e => setBrokerForm({...brokerForm, regulation: e.target.value})}
                            placeholder="e.g. FCA, CySEC"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase">Min Deposit</label>
                          <input 
                            type="text" 
                            required
                            value={brokerForm.minDeposit}
                            onChange={e => setBrokerForm({...brokerForm, minDeposit: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <button type="submit" className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black hover:bg-slate-900 transition mt-4">
                    PUBLISH CONTENT
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Side Panel */}
      {isSettingsOpen && (
        <>
          <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)}></div>
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-[120] shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="font-black text-slate-800 flex items-center"><Settings size={20} className="mr-2" /> Site Settings</h3>
               <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-8">
               <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">General Configuration</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                       <span className="text-sm font-semibold text-slate-700">Live Ticker</span>
                       <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                       <span className="text-sm font-semibold text-slate-700">AI Market Insights</span>
                       <div className="w-10 h-5 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                    </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Global Alert Text</h4>
                  <textarea 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-1 focus:ring-blue-200 outline-none"
                    defaultValue="NFP data release expected in 4h 20m. Volatility expected."
                    rows={2}
                  ></textarea>
                  <p className="text-[10px] text-slate-400">This updates the orange notification bar at the top of the site.</p>
               </div>

               <div className="pt-8">
                  <button onClick={() => { setIsSettingsOpen(false); alert('Settings saved locally.'); }} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                    SAVE CHANGES
                  </button>
               </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
