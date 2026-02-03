
import React, { useState, useMemo } from 'react';
import { Hotel } from '../types';

interface MyPropertiesViewProps {
  properties: Hotel[];
  onViewDetails: (hotel: Hotel) => void;
  onViewAnalytics: (propId: string) => void;
}

type SortOption = 'visits-desc' | 'visits-asc' | 'price-desc' | 'price-asc' | 'name-asc';

export const MyPropertiesView: React.FC<MyPropertiesViewProps> = ({ properties, onViewDetails, onViewAnalytics }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('visits-desc');

  const stats = useMemo(() => {
    if (properties.length === 0) return { avgEngagement: 0, totalValue: 0, syncHealth: 0 };
    const avgEng = properties.reduce((acc, p) => acc + p.engagement, 0) / properties.length;
    const totalVal = properties.reduce((acc, p) => acc + p.price, 0);
    return {
      avgEngagement: Math.round(avgEng),
      totalValue: totalVal,
      syncHealth: 98 // Simulated platform-wide health
    };
  }, [properties]);

  const filteredAndSortedProperties = useMemo(() => {
    let result = properties.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      switch (sortBy) {
        case 'visits-desc': return b.engagement - a.engagement;
        case 'visits-asc': return a.engagement - b.engagement;
        case 'price-desc': return b.price - a.price;
        case 'price-asc': return a.price - b.price;
        case 'name-asc': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    return result;
  }, [properties, searchTerm, sortBy]);

  return (
    <div className="container mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">My Marketplace Portfolio</h1>
          <p className="text-slate-500 mt-2 font-medium">Search through your synchronized hospitality assets and monitor engagement metrics.</p>
        </div>
      </div>

      {/* Portfolio Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#0f172a] p-8 rounded-[32px] border border-slate-800 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#dec52d]/5 blur-2xl group-hover:bg-[#dec52d]/10 transition-all"></div>
          <p className="text-[#dec52d] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Managed Assets</p>
          <div className="text-4xl font-black text-white tracking-tighter">{properties.length} <span className="text-sm font-bold text-slate-500 ml-2 uppercase">Properties</span></div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Portfolio Performance</p>
          <div className="text-4xl font-black text-slate-900 tracking-tighter">{stats.avgEngagement}% <span className="text-sm font-bold text-green-500 ml-2 uppercase">Avg Visit Rate</span></div>
          <div className="mt-4 w-full h-1 bg-slate-50 rounded-full overflow-hidden">
            <div className="h-full bg-[#dec52d]" style={{ width: `${stats.avgEngagement}%` }}></div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Sync Health</p>
          <div className="text-4xl font-black text-slate-900 tracking-tighter">{stats.syncHealth}% <span className="text-sm font-bold text-[#dec52d] ml-2 uppercase">Operational</span></div>
          <div className="mt-4 flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Nodes Active</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-4 mb-12 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative group">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#dec52d] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search portfolio by name or location..." 
            className="w-full pl-14 pr-6 py-4 rounded-[20px] bg-slate-50 text-slate-900 outline-none border border-transparent focus:border-[#dec52d]/30 font-bold transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap ml-2">Sort By</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-slate-950 text-white px-6 py-4 rounded-[20px] font-black text-[10px] uppercase tracking-widest outline-none border border-slate-800 cursor-pointer focus:ring-2 focus:ring-[#dec52d]/20 transition-all"
          >
            <option value="visits-desc">Highest Visits</option>
            <option value="visits-asc">Lowest Visits</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white border-4 border-dashed border-slate-100 rounded-[48px] py-24 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
             <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeWidth="2.5"></path></svg>
          </div>
          <p className="text-slate-400 mb-2 font-black uppercase tracking-widest text-xs">No assets registered in your portfolio.</p>
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]">Use the "Add New Property" tab to expand your marketplace.</p>
        </div>
      ) : filteredAndSortedProperties.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No properties match your search criteria.</p>
          <button onClick={() => setSearchTerm('')} className="mt-4 text-[#dec52d] font-bold underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredAndSortedProperties.map(property => (
            <div key={property.id} className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 group border border-slate-100 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-[#dec52d] uppercase tracking-widest border border-white/10">
                  {property.engagement > 80 ? '🔥 High Traffic' : '★'.repeat(property.rating)}
                </div>
                <div className="absolute bottom-6 left-6 bg-[#dec52d] text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black shadow-xl">
                  {property.engagement}% Visit Rate
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-[#dec52d] transition-colors leading-none tracking-tight">{property.name}</h3>
                <p className="text-slate-400 font-bold text-sm flex items-center mb-4">
                  <svg className="w-4 h-4 mr-1.5 text-[#dec52d]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  {property.location}
                </p>
                <div className="mb-8">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Market Value</span>
                    <span className="text-xl font-black text-slate-900">AED {property.price}</span>
                  </div>
                  <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#dec52d] transition-all duration-1000" style={{ width: `${(property.price / 3000) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-3 mt-auto">
                  <button 
                    onClick={() => onViewDetails(property)}
                    className="w-full py-4 bg-[#0f172a] text-white rounded-[20px] font-black text-xs uppercase tracking-widest transition-all hover:bg-slate-800 shadow-xl border border-slate-700"
                  >
                    Manage Asset Data
                  </button>
                  <button 
                    onClick={() => onViewAnalytics(property.id as string)}
                    className="w-full py-4 bg-slate-50 text-slate-900 rounded-[20px] font-black text-xs uppercase tracking-widest transition-all hover:bg-slate-100 border border-slate-100"
                  >
                    Performance Dashboard
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
