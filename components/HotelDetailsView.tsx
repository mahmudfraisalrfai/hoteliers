import React from 'react';
import { Hotel } from '../types';

interface HotelDetailsViewProps {
  hotel: Hotel;
  onBack: () => void;
  onEdit: (hotel: Hotel) => void;
  onViewAnalytics: (hotel: Hotel) => void;
  isAlreadyAdded: boolean;
  onAdd: (hotel: Hotel) => void;
}

export const HotelDetailsView: React.FC<HotelDetailsViewProps> = ({ 
  hotel, 
  onBack, 
  onEdit, 
  onViewAnalytics, 
  isAlreadyAdded,
  onAdd
}) => {
  const images = hotel.images || [
    hotel.image, 
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800", 
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
  ];
  const amenities = hotel.amenities || [
    "Free Wi-Fi", "Swimming Pool", "Spa & Wellness", "Fitness Center", "Restaurant", "Airport Shuttle", "24-hour Front Desk"
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white">
      {/* Hero Gallery */}
      <div className="relative h-[60vh] overflow-hidden group">
        <div className="flex h-full w-full">
          <div className="w-2/3 h-full pr-1">
            <img src={images[0]} alt={hotel.name} className="w-full h-full object-cover" />
          </div>
          <div className="w-1/3 h-full flex flex-col gap-1">
            <img src={images[1]} alt={hotel.name} className="w-full h-1/2 object-cover" />
            <img src={images[2]} alt={hotel.name} className="w-full h-1/2 object-cover" />
          </div>
        </div>
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 bg-[#0f172a] text-[#dec52d] p-4 rounded-2xl shadow-2xl hover:bg-slate-800 transition-all border border-slate-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-16">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <span className="bg-slate-50 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 flex items-center">
                  <span className="w-2 h-2 bg-[#dec52d] rounded-full mr-2"></span>
                  Verified Asset
                </span>
                <div className="text-[#dec52d] tracking-[0.2em] text-sm">{'★'.repeat(hotel.rating)}</div>
              </div>
              <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none">{hotel.name}</h1>
              <p className="text-xl text-slate-400 font-medium flex items-center">
                <svg className="w-6 h-6 mr-3 text-[#dec52d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                {hotel.location}
              </p>
            </div>

            <div className="prose prose-xl text-slate-500 max-w-none">
              <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight flex items-center">
                Property Narrative
                <div className="ml-4 h-[2px] flex-grow bg-slate-50"></div>
              </h2>
              <p className="leading-relaxed">
                {hotel.description || "This premier hospitality asset delivers an exceptional guest experience through meticulously curated environments and institutional-grade service standards. Strategically positioned within a high-engagement trade zone, the property maintains peak performance metrics and superior market visibility."}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight flex items-center">
                Service Inventory
                <div className="ml-4 h-[2px] flex-grow bg-slate-50"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {amenities.map(item => (
                  <div key={item} className="flex items-center space-x-4 p-6 bg-slate-50 rounded-[24px] border border-slate-100 group hover:border-[#dec52d]/30 transition-all">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#dec52d] shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <span className="font-black text-slate-900 text-xs uppercase tracking-widest">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Management Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 bg-white border border-slate-100 rounded-[48px] p-10 shadow-3xl">
              <div className="mb-10 text-center">
                <p className="text-[#dec52d] text-[10px] font-black uppercase tracking-[0.2em] mb-2">Current Market Index</p>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">AED {hotel.price}</span>
                  <span className="text-slate-400 font-bold text-sm tracking-tight">/ Night</span>
                </div>
              </div>

              <div className="space-y-4">
                {isAlreadyAdded ? (
                  <>
                    <button 
                      onClick={() => onEdit(hotel)}
                      className="w-full py-6 bg-[#0f172a] text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center border border-slate-700"
                    >
                      <svg className="w-5 h-5 mr-3 text-[#dec52d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Property Details
                    </button>
                    
                    <button 
                      onClick={() => onViewAnalytics(hotel)}
                      className="w-full py-6 bg-white text-slate-900 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] border-2 border-slate-100 hover:border-[#dec52d] hover:bg-slate-50 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center shadow-xl shadow-slate-100"
                    >
                      <svg className="w-5 h-5 mr-3 text-[#dec52d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      View Statistics
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => onAdd(hotel)}
                    className="w-full py-6 bg-[#dec52d] text-slate-900 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-[#c9b226] shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center"
                  >
                    Claim & Manage Property
                  </button>
                )}
                
                <div className="bg-slate-50 rounded-[24px] p-6 mt-8 border border-slate-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-2 h-2 bg-[#dec52d] rounded-full"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Asset Status</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Owner management provides priority access to global syndication tools and institutional intelligence metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};