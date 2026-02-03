
import React, { useState } from 'react';
import { Hotel } from '../types';

interface HomeViewProps {
  hotels: Hotel[];
  onViewDetails: (hotel: Hotel) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ hotels, onViewDetails }) => {
  const [destination, setDestination] = useState('');
  const [searchName, setSearchName] = useState('');

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchName.toLowerCase()) &&
    hotel.location.toLowerCase().includes(destination.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-950 pt-20 pb-28 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#dec52d]/5 blur-3xl rounded-full"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-12 text-center tracking-tighter">Featured Property Inventory</h1>
          
          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-2 shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#dec52d] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </span>
              <input 
                type="text" 
                placeholder="Global City or Region" 
                className="w-full pl-14 pr-6 py-6 rounded-[32px] bg-transparent text-white outline-none placeholder:text-slate-500 font-bold"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="flex-1 relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#dec52d] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </span>
              <input 
                type="text" 
                placeholder="Specific Property Name" 
                className="w-full pl-14 pr-6 py-6 rounded-[32px] bg-transparent text-white outline-none placeholder:text-slate-500 font-bold"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <button className="bg-[#dec52d] hover:bg-[#c9b226] text-slate-900 px-12 py-6 rounded-[32px] font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95">
              Search Data
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#dec52d] font-black text-xs uppercase tracking-widest mb-3">Performance Metrics</p>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Properties with Highest Visitor Engagement</h2>
            </div>
            <div className="text-slate-900 font-black text-xs uppercase tracking-widest cursor-pointer hover:text-[#dec52d] transition-colors border-b-2 border-slate-900 pb-1">
              View Detailed Index
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredHotels.length > 0 ? filteredHotels.map(hotel => (
              <div key={hotel.id} className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 group border border-slate-100 flex flex-col">
                <div className="relative h-72 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-[#dec52d] uppercase tracking-widest">
                    Top Tier Rating
                  </div>
                  <div className="absolute bottom-6 left-6 bg-[#dec52d] text-slate-900 px-4 py-2 rounded-xl text-xs font-black shadow-xl">
                    ADR: AED {hotel.price}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-[#dec52d] transition-colors leading-none tracking-tight">{hotel.name}</h3>
                  <p className="text-slate-400 font-bold text-sm flex items-center mb-8">
                    <svg className="w-4 h-4 mr-1.5 text-[#dec52d]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2.5"></path></svg>
                    {hotel.location}
                  </p>
                  <button 
                    onClick={() => onViewDetails(hotel)}
                    className="mt-auto w-full py-5 bg-slate-50 group-hover:bg-slate-950 group-hover:text-[#dec52d] text-slate-900 rounded-[20px] font-black uppercase text-xs tracking-widest transition-all border border-slate-100 group-hover:border-slate-950"
                  >
                    Manage Data Profile
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-24 text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5"></path></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No matching inventory</h3>
                <p className="text-slate-400 font-medium">Try refining your search parameters</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
