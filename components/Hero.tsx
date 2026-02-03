
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
  onNetworkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onNetworkClick }) => {
  return (
    <div className="relative overflow-hidden bg-white pt-24 pb-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-50 text-slate-900 text-[10px] font-black uppercase tracking-widest mb-10 border border-slate-200">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#dec52d] mr-2 animate-pulse"></span>
              The Global Standard for Hotel Intelligence
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
              Manage Your <br />
              <span className="text-[#dec52d] drop-shadow-sm">Property Data.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-12 leading-relaxed max-w-xl font-medium">
              Britrip (hoteliers) provides a professional-grade interface for owners to manage, sync, and optimize property data across the global hospitality ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onCtaClick}
                className="px-12 py-5 bg-[#0f172a] text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-800 shadow-2xl shadow-slate-200 transition-all transform hover:-translate-y-1 active:scale-95 border border-slate-700"
              >
                Access Dashboard
              </button>
              <button 
                onClick={onNetworkClick}
                className="px-12 py-5 bg-white text-slate-900 rounded-full font-black text-sm uppercase tracking-widest border border-slate-200 hover:bg-slate-50 hover:border-[#dec52d] transition-all active:scale-95"
              >
                Explore Network
              </button>
            </div>
            
            <div className="mt-20 flex items-center space-x-6">
              <div className="flex -space-x-3">
                {[12, 15, 22, 45].map(i => (
                  <img 
                    key={i} 
                    className="w-12 h-12 rounded-full border-4 border-white shadow-xl hover:scale-110 transition-transform cursor-pointer" 
                    src={`https://i.pravatar.cc/150?u=${i + 100}`} 
                    alt="Partner" 
                  />
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-[#dec52d] flex items-center justify-center text-slate-900 text-[10px] font-black shadow-xl">
                  +10K
                </div>
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span className="text-slate-900 font-black block text-sm mb-0.5">Premier Partners</span>
                Leading global hotel clusters
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative group">
             {/* Animated Background Elements */}
             <div className="absolute top-0 -left-12 w-72 h-72 bg-[#dec52d]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
             <div className="absolute top-0 -right-4 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
             
             <div className="relative z-10">
               <div className="absolute inset-0 bg-[#dec52d]/5 rounded-3xl -rotate-1 scale-105 transition-transform duration-500"></div>
               <img 
                src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Luxury Hotel" 
                className="relative z-10 rounded-[40px] shadow-3xl transform lg:rotate-2 group-hover:rotate-0 transition-all duration-700 object-cover aspect-[4/5] lg:aspect-auto"
              />
              <div className="absolute -bottom-10 -right-10 bg-[#0f172a] p-8 rounded-[32px] shadow-2xl z-20 hidden md:block border border-slate-800 transition-all duration-500 group-hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#dec52d] rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Growth Index</div>
                    <div className="text-3xl font-black text-white">+41%</div>
                  </div>
                </div>
              </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
