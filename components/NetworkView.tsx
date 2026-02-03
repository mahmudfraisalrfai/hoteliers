import React from 'react';

interface NetworkViewProps {
  onAuthClick: () => void;
  onBack: () => void;
}

export const NetworkView: React.FC<NetworkViewProps> = ({ onAuthClick, onBack }) => {
  const stats = [
    { label: "Active Global Nodes", value: "2,400+", icon: "🌐" },
    { label: "Countries Covered", value: "158", icon: "🗺️" },
    { label: "Daily Sync Actions", value: "4.2M", icon: "⚡" },
    { label: "Partner Trust Index", value: "99.9%", icon: "💎" }
  ];

  const connectivityTypes = [
    {
      category: "Global Distribution Systems",
      nodes: ["Amadeus", "Sabre", "Travelport", "Worldspan"],
      description: "Direct-to-GDS pipelines ensuring your property is visible to over 500,000 professional travel agents worldwide.",
      tag: "INSTITUTIONAL"
    },
    {
      category: "Online Travel Marketplaces",
      nodes: ["Booking.com", "Expedia Group", "Airbnb Luxe", "Trip.com"],
      description: "Automated inventory syndication across high-traffic consumer nodes with real-time rate parity management.",
      tag: "CONSUMER REACH"
    },
    {
      category: "Corporate & Government",
      nodes: ["HRG", "CWT", "American Express GBT", "SAP Concur"],
      description: "Strategic placement in institutional procurement portals for high-yield business travelers.",
      tag: "PREMIUM YIELD"
    }
  ];

  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-700">
      {/* Institutional Hero */}
      <section className="bg-slate-950 pt-32 pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#dec52d]/5 blur-[120px] rounded-full -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#dec52d]/5 blur-[120px] rounded-full translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <button 
            onClick={onBack}
            className="mb-12 text-[#dec52d] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center mx-auto hover:opacity-70 transition-opacity"
          >
            <span className="text-lg mr-2">‹</span> Return to Home
          </button>
          
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
            The Britrip <br />
            <span className="text-[#dec52d]">Global Network.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-20">
            A unified data architecture connecting independent hospitality assets to the world's most powerful distribution engines.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] text-left group hover:border-[#dec52d]/30 transition-all">
                <div className="text-3xl mb-6">{stat.icon}</div>
                <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connectivity Map Section */}
      <section className="py-32 -mt-24 relative z-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-[#dec52d] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Unified Connectivity</h2>
            <p className="text-4xl font-black text-slate-900 max-w-2xl mx-auto tracking-tight">One Entry Point. Universal Visibility.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {connectivityTypes.map((type, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-[48px] p-12 shadow-3xl flex flex-col hover:-translate-y-2 transition-transform duration-500">
                <div className="inline-flex px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black text-slate-500 tracking-widest mb-8 self-start">
                  {type.tag}
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">{type.category}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-10 flex-grow">
                  {type.description}
                </p>
                
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-[#dec52d] uppercase tracking-widest">Premium Channels</p>
                  <div className="flex flex-wrap gap-2">
                    {type.nodes.map((node, ni) => (
                      <span key={ni} className="px-5 py-2.5 bg-slate-50 text-slate-900 font-bold text-xs rounded-2xl border border-slate-100">
                        {node}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Quote */}
      <section className="py-32 bg-slate-50 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-[#0f172a] rounded-[64px] p-12 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center gap-16 shadow-4xl shadow-slate-900/20">
             <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                  alt="Mazen Nasr" 
                  className="w-48 h-48 rounded-[32px] object-cover border-4 border-[#dec52d]/20 shadow-2xl"
                />
             </div>
             <div className="md:w-2/3">
                <svg className="w-16 h-16 text-[#dec52d]/20 mb-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H14.017V5H22.017V16C22.017 18.7614 19.7784 21 17.017 21H14.017ZM2.01697 21L2.01697 18C2.01697 16.8954 2.91241 16 4.01697 16H7.01697V14H2.01697V5H10.017V16C10.017 18.7614 7.77839 21 5.01697 21H2.01697Z"></path></svg>
                <p className="text-2xl md:text-3xl font-bold text-white leading-tight mb-8 tracking-tight">
                  "Britrip isn't just a collector; it's a bridge. We give independent owners the same institutional reach as global hotel chains."
                </p>
                <div>
                  <div className="text-white font-black text-lg tracking-tight">Mazen Nasr</div>
                  <div className="text-[#dec52d] text-xs font-black uppercase tracking-[0.2em] mt-1">CEO and CO Founder Britrip Global Group</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-12">Ready to expand your reach?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button 
              onClick={onAuthClick}
              className="px-16 py-6 bg-[#0f172a] text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-slate-800 shadow-3xl transition-all transform hover:-translate-y-1"
             >
               Onboard Property
             </button>
             <button className="px-16 py-6 bg-white text-slate-900 rounded-full font-black text-sm uppercase tracking-widest border-2 border-slate-100 hover:border-[#dec52d] transition-all">
               Request Audit
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};