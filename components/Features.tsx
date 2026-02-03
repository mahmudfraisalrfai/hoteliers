import React from 'react';

const FEATURE_LIST = [
  {
    title: "Global Syndication",
    description: "Your property data is automatically optimized and distributed across every major travel node and booking engine.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Gemini AI Core",
    description: "Harness the power of high-order intelligence to draft high-converting descriptions and localized marketing content.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Precision Analytics",
    description: "Deep-dive into look-to-book ratios and channel performance with institutional-grade data visualization.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-[#dec52d] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Institutional Partners</h2>
          <p className="text-4xl font-black text-slate-900 max-w-2xl mx-auto tracking-tight">The ultimate dashboard for high-performance hospitality assets.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {FEATURE_LIST.map((feature, idx) => (
            <div key={idx} className="group relative">
              <div className="w-16 h-16 bg-[#0f172a] text-[#dec52d] rounded-2xl flex items-center justify-center mb-8 shadow-xl transition-all group-hover:-translate-y-2 group-hover:shadow-[#dec52d]/20">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};