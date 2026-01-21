
import React from 'react';
import { Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Broker } from '../types';

interface Props {
  brokers: Broker[];
  onNavigate: (path: string) => void;
}

export const BrokerList: React.FC<Props> = ({ brokers, onNavigate }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 className="font-bold text-slate-800 flex items-center">
          <Star className="text-yellow-400 mr-2" size={18} fill="currentColor" />
          Top Rated Brokers
        </h3>
        <button onClick={() => onNavigate('Compare')} className="text-blue-600 text-xs font-semibold hover:underline">Compare All</button>
      </div>
      <div className="p-4 space-y-4">
        {brokers.map((broker) => (
          <div key={broker.id} className="flex items-center p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition group cursor-pointer">
            <img src={broker.logo} alt={broker.name} className="w-12 h-12 rounded bg-slate-100 mr-4" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">{broker.name}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < Math.floor(broker.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <div className="flex items-center text-[10px] text-slate-500 mt-1 space-x-3">
                <span className="flex items-center"><ShieldCheck size={10} className="mr-1 text-emerald-500" /> {broker.regulation}</span>
                <span>Min: {broker.minDeposit}</span>
              </div>
            </div>
            <div className="ml-4 opacity-0 group-hover:opacity-100 transition">
              <ArrowRight size={16} className="text-blue-600" />
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
        <p className="text-[10px] text-slate-400 leading-tight">
          74-89% of retail investor accounts lose money when trading CFDs with these providers.
        </p>
      </div>
    </div>
  );
};
