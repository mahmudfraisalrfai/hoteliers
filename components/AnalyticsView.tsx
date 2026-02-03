
import React, { useMemo } from 'react';
import { HotelData } from '../types';

interface AnalyticsViewProps {
  data: HotelData;
  onBack: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ data, onBack }) => {
  // Generate some realistic mock data based on the property name as a seed
  const stats = useMemo(() => {
    return {
      totalViews: 12450 + Math.floor(Math.random() * 5000),
      conversionRate: (2.4 + Math.random() * 1.5).toFixed(1),
      avgDailyRate: data.rooms[0]?.basePrice || 450,
      syncHealth: 98,
      marketPosition: "Top 15%",
      topChannel: "Booking.com",
      weeklyTrends: Array.from({ length: 7 }, () => Math.floor(Math.random() * 400 + 200)),
      geographicInterest: [
        { region: "Domestic", value: 65 },
        { region: "Europe", value: 15 },
        { region: "Asia", value: 12 },
        { region: "Americas", value: 8 }
      ],
      channels: [
        { name: "Booking.com", status: "Synced", lastSync: "2 mins ago", health: 100 },
        { name: "Expedia", status: "Synced", lastSync: "15 mins ago", health: 96 },
        { name: "Airbnb", status: "Synced", lastSync: "1 hr ago", health: 99 },
        { name: "Direct Site", status: "Active", lastSync: "Instant", health: 100 }
      ]
    };
  }, [data.id]);

  const StatCard = ({ label, value, sub, icon, trend }: any) => (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        {trend && (
          <span className={`px-2 py-1 rounded-lg text-xs font-black ${trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-3xl font-black text-slate-900 mb-1">{value}</h4>
      <p className="text-slate-400 text-sm">{sub}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-12">
        <div>
          <button 
            onClick={onBack}
            className="text-slate-500 hover:text-slate-800 font-bold mb-4 flex items-center group transition-all"
          >
            <span className="text-xl mr-2 group-hover:-translate-x-1 transition-transform">‹</span> 
            Back to Property Management
          </button>
          <h1 className="text-4xl font-black text-slate-900">Performance Analytics</h1>
          <p className="text-slate-500 mt-2">Insights and synchronization data for <span className="font-bold text-indigo-600">{data.name}</span></p>
        </div>
        <div className="flex space-x-2">
           <div className="bg-white border border-slate-200 rounded-2xl p-2 flex space-x-1">
              {['7D', '30D', '90D', '1Y'].map(t => (
                <button key={t} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${t === '30D' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}>{t}</button>
              ))}
           </div>
           <button className="bg-white border border-slate-200 text-slate-900 px-6 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center">
             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
             Export Report
           </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          label="Profile Views" 
          value={stats.totalViews.toLocaleString()} 
          sub="Across all channels" 
          trend={12}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"></path><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2"></path></svg>}
        />
        <StatCard 
          label="Conv. Rate" 
          value={`${stats.conversionRate}%`} 
          sub="Look-to-book ratio" 
          trend={3}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth="2"></path></svg>}
        />
        <StatCard 
          label="Sync Health" 
          value={`${stats.syncHealth}%`} 
          sub="Real-time data status" 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
        />
        <StatCard 
          label="ADR (Est.)" 
          value={`AED ${stats.avgDailyRate}`} 
          sub="Average Daily Rate" 
          trend={-2}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"></path></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CHART SECTION */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-slate-900">Weekly Traffic Trend</h3>
              <div className="flex items-center space-x-4">
                 <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-indigo-600 rounded-full"></span>
                    <span className="text-xs font-bold text-slate-500 uppercase">Visits</span>
                 </div>
              </div>
           </div>
           
           <div className="h-64 flex items-end justify-between space-x-2">
              {stats.weeklyTrends.map((val, i) => (
                <div key={i} className="flex-1 group relative">
                  <div 
                    style={{ height: `${(val / 600) * 100}%` }} 
                    className="w-full bg-slate-50 group-hover:bg-indigo-600 rounded-xl transition-all duration-500 relative flex items-end overflow-hidden"
                  >
                     <div className="absolute inset-x-0 bottom-0 bg-indigo-100 group-hover:bg-indigo-400 opacity-20 h-full"></div>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    {val}
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4 text-center">Day {i+1}</p>
                </div>
              ))}
           </div>
        </div>

        {/* GEOGRAPHIC INTEREST */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
           <h3 className="text-2xl font-black text-slate-900 mb-8">Visitor Origin</h3>
           <div className="space-y-6">
              {stats.geographicInterest.map(item => (
                <div key={item.region}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">{item.region}</span>
                    <span className="text-sm font-black text-indigo-600">{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="mt-12 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
              <div className="flex items-center space-x-3 mb-2 text-indigo-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"></path></svg>
                <span className="text-sm font-black uppercase tracking-widest">AI Market Insight</span>
              </div>
              <p className="text-sm text-indigo-900/70 leading-relaxed font-medium">
                Domestic interest is up 15%. Consider adding local "Staycation" offers to boost weekend occupancy.
              </p>
           </div>
        </div>

        {/* CHANNEL STATUS */}
        <div className="lg:col-span-full bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
           <h3 className="text-2xl font-black text-slate-900 mb-8">Channel Synchronization</h3>
           <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-slate-100">
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Partner Channel</th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Last Sync</th>
                    <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Data Integrity</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.channels.map(ch => (
                    <tr key={ch.name} className="border-b border-slate-50 last:border-0">
                      <td className="py-6">
                         <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-500">
                               {ch.name.substring(0,2).toUpperCase()}
                            </div>
                            <span className="font-bold text-slate-900">{ch.name}</span>
                         </div>
                      </td>
                      <td className="py-6">
                        <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                           <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                           {ch.status}
                        </span>
                      </td>
                      <td className="py-6 text-sm text-slate-500 font-medium">{ch.lastSync}</td>
                      <td className="py-6 text-right">
                         <div className="flex items-center justify-end space-x-2">
                            <span className="text-sm font-black text-slate-900">{ch.health}%</span>
                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <div className="h-full bg-green-500" style={{ width: `${ch.health}%` }}></div>
                            </div>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};
