
import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="text-2xl font-black text-white mb-6">
              DAILY<span className="text-orange-500">FOREX</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-sm">
              DailyForex provides you with the latest market news, analysis and forex broker reviews from our experts. Trade with confidence with our advanced tools.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-sm">RESOURCES</h4>
            <ul className="space-y-3 text-xs">
              <li><button onClick={() => onNavigate('Forex Brokers')} className="hover:text-white transition text-left">Forex Brokers</button></li>
              <li><button onClick={() => onNavigate('Live Rates')} className="hover:text-white transition text-left">Live Rates</button></li>
              <li><button onClick={() => onNavigate('Signals')} className="hover:text-white transition text-left">Signals</button></li>
              <li><button onClick={() => onNavigate('Calendar')} className="hover:text-white transition text-left">Economic Calendar</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm">LEARN</h4>
            <ul className="space-y-3 text-xs">
              <li><button onClick={() => onNavigate('Education')} className="hover:text-white transition text-left">Forex Education</button></li>
              <li><button onClick={() => onNavigate('Strategies')} className="hover:text-white transition text-left">Trading Strategies</button></li>
              <li><button onClick={() => onNavigate('Videos')} className="hover:text-white transition text-left">Video Tutorials</button></li>
              <li><button onClick={() => onNavigate('Analysis')} className="hover:text-white transition text-left">Market Analysis</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm">COMPANY</h4>
            <ul className="space-y-3 text-xs">
              <li><button onClick={() => onNavigate('About Us')} className="hover:text-white transition text-left">About Us</button></li>
              <li><button onClick={() => onNavigate('Contact')} className="hover:text-white transition text-left">Contact Us</button></li>
              <li><button onClick={() => onNavigate('Affiliates')} className="hover:text-white transition text-left">Affiliates</button></li>
              <li><button onClick={() => onNavigate('Privacy Policy')} className="hover:text-white transition text-left">Privacy Policy</button></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-bold mb-6 text-sm">NEWSLETTER</h4>
            <div className="flex">
              <input type="text" placeholder="Email" className="bg-slate-800 border-none px-4 py-2 rounded-l w-full text-xs focus:ring-1 focus:ring-blue-500" />
              <button className="bg-blue-600 p-2 rounded-r hover:bg-blue-700">
                <Mail size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="bg-slate-950 p-6 rounded-lg text-[11px] leading-relaxed text-slate-500 border border-slate-800">
            <span className="font-bold text-slate-400 block mb-2 uppercase tracking-wide">Risk Warning:</span>
            Trading foreign exchange and CFDs on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you.
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600">
            <p>© 2024 DailyForex Demo Portal. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button onClick={() => onNavigate('Terms')}>Terms & Conditions</button>
              <button onClick={() => onNavigate('Privacy')}>Privacy Policy</button>
              <button onClick={() => onNavigate('Cookies')}>Cookies</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
