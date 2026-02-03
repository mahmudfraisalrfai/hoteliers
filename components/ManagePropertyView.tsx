
import React, { useState, useEffect } from 'react';
import { HotelData } from '../types';

interface ManagePropertyViewProps {
  data: HotelData;
  onBack: () => void;
  onEdit: () => void;
  onUpdate: (data: HotelData) => void;
  onViewAnalytics: () => void;
}

const CATEGORIES = ['Luxury', 'Boutique', 'Budget', 'Resort', 'Apartment'];
const AMENITY_LIST = [
  "Restaurant", "Room Service", "Bar", "24-Hour Front Desk", "Sauna",
  "Fitness Center", "Garden", "Terrace", "Non-smoking Rooms", "Airport Shuttle",
  "Family Rooms", "Spa & Wellness Center", "Hot Tub/Jacuzzi", "Free Wi-Fi",
  "Air Conditioning", "Water Park", "Electric Vehicle Charging Station", "Swimming Pool", "Beach"
];

interface SectionProps {
  title: string;
  id: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  editContent: React.ReactNode;
}

export const ManagePropertyView: React.FC<ManagePropertyViewProps> = ({ data, onBack, onEdit, onUpdate, onViewAnalytics }) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [localData, setLocalData] = useState<HotelData>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleSave = () => {
    onUpdate(localData);
    setEditingSection(null);
  };

  const handleCancel = () => {
    setLocalData(data);
    setEditingSection(null);
  };

  const Section: React.FC<SectionProps> = ({ title, id, icon, children, editContent }) => {
    const isEditing = editingSection === id;
    
    return (
      <div className={`bg-white rounded-3xl border ${isEditing ? 'border-indigo-500 ring-4 ring-indigo-500/10 shadow-xl' : 'border-slate-200'} p-8 shadow-sm mb-8 transition-all group`}>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isEditing ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'}`}>
              {icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
          </div>
          {!isEditing ? (
            <button 
              onClick={() => setEditingSection(id)}
              className="text-indigo-600 font-bold text-sm hover:underline flex items-center bg-indigo-50 px-4 py-2 rounded-xl transition-colors hover:bg-indigo-100"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              Edit
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button onClick={handleCancel} className="text-slate-500 font-bold text-sm hover:text-slate-700 px-4 py-2">Cancel</button>
              <button onClick={handleSave} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-700 transition-all">Save</button>
            </div>
          )}
        </div>
        
        {isEditing ? (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">{editContent}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{children}</div>
        )}
      </div>
    );
  };

  const InfoItem = ({ label, value }: { label: string, value: string | number | boolean }) => (
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-slate-800 font-bold">{value === true ? 'Yes' : value === false ? 'No' : value || 'N/A'}</p>
    </div>
  );

  const Input = ({ label, value, onChange, type = "text" }: any) => (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
      <input 
        type={type}
        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all bg-slate-50 text-slate-900 font-bold"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-6">
        <div>
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center group transition-all">
            <span className="text-xl mr-2 group-hover:-translate-x-1 transition-transform">‹</span> Back to Portfolio
          </button>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{data.name}</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your listing and synchronization nodes</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button onClick={onViewAnalytics} className="px-8 py-4 bg-slate-100 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200">
            Analytics
          </button>
          <button onClick={onEdit} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-indigo-700 transition-all shadow-indigo-100">
            Advanced Editor
          </button>
        </div>
      </div>

      <Section 
        id="identity"
        title="Identity & Location" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
        editContent={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Name" value={localData.name} onChange={(v: string) => setLocalData({...localData, name: v})} />
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</label>
              <select className="w-full p-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none bg-slate-50 text-slate-900 font-bold" value={localData.category} onChange={(e) => setLocalData({...localData, category: e.target.value as any})}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Input label="Stars" type="number" value={localData.starRating} onChange={(v: string) => setLocalData({...localData, starRating: parseInt(v)})} />
            <Input label="Address" value={localData.address} onChange={(v: string) => setLocalData({...localData, address: v})} />
          </div>
        }
      >
        <InfoItem label="Name" value={data.name} />
        <InfoItem label="Category" value={data.category} />
        <InfoItem label="Rating" value={`${data.starRating} Stars`} />
        <InfoItem label="Address" value={data.address} />
      </Section>

      <Section 
        id="amenities"
        title="Service Profile" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
        editContent={
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AMENITY_LIST.map(a => (
                <button key={a} onClick={() => setLocalData({...localData, amenities: localData.amenities.includes(a) ? localData.amenities.filter(x => x !== a) : [...localData.amenities, a]})}
                        className={`text-left px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight border transition-all ${localData.amenities.includes(a) ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="col-span-full">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Enabled Services</p>
          <div className="flex flex-wrap gap-2">
            {data.amenities.map(a => <span key={a} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">{a}</span>)}
          </div>
        </div>
      </Section>
    </div>
  );
};
