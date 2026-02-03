import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  onNavClick: (view: AppView) => void;
  onAuthClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  currentView: AppView;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick, onAuthClick, isLoggedIn, onLogout, currentView }) => {
  return (
    <nav className="sticky top-0 z-50 glass-nav border-b border-slate-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer group" 
          onClick={() => onNavClick('LANDING')}
        >
          <div className="w-10 h-10 bg-[#0f172a] rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
            <svg className="w-6 h-6 text-[#dec52d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-black tracking-tighter text-slate-900">Britrip</span>
            <span className="text-[10px] font-bold text-[#dec52d] tracking-widest uppercase">(hoteliers)</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {isLoggedIn ? (
            <>
              <button 
                onClick={() => onNavClick('MY_PROPERTIES')}
                className={`text-xs font-black uppercase tracking-widest transition ${currentView === 'MY_PROPERTIES' || currentView === 'MANAGE_PROPERTY' || currentView === 'ANALYTICS' ? 'text-slate-900 border-b-2 border-[#dec52d] pb-1' : 'text-slate-500 hover:text-slate-900'}`}
              >
                My Marketplace
              </button>
              <button 
                onClick={() => onNavClick('REGISTRATION')}
                className={`text-xs font-black uppercase tracking-widest transition ${currentView === 'REGISTRATION' ? 'text-slate-900 border-b-2 border-[#dec52d] pb-1' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Add New Property
              </button>
              <button 
                onClick={() => onNavClick('HOME')}
                className={`text-xs font-black uppercase tracking-widest transition ${currentView === 'HOME' ? 'text-slate-900 border-b-2 border-[#dec52d] pb-1' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Featured Properties
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavClick('NETWORK')}
                className={`text-xs font-black uppercase tracking-widest transition ${currentView === 'NETWORK' ? 'text-slate-900 border-b-2 border-[#dec52d] pb-1' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Network
              </button>
              <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition">Benefits</a>
              <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition">Support</a>
            </>
          )}
        </div>

        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <button 
                onClick={onLogout}
                className="text-slate-400 hover:text-red-500 font-bold transition text-xs uppercase tracking-wider"
              >
                Logout
              </button>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-black border border-slate-200 text-sm">
                BM
              </div>
            </>
          ) : (
            <button 
              onClick={onAuthClick}
              className="bg-[#0f172a] text-white px-8 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-xl hover:shadow-[#dec52d]/10 active:scale-95 border border-slate-700"
            >
              Partner Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};