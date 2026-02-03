
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

      {/* Rooms Section */}
      <Section 
        id="rooms"
        title="Room Inventory" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
        editContent={
          <div className="space-y-6">
            {localData.rooms.map((room, index) => (
              <div key={room.id || index} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-black text-slate-900">{room.name || `Room ${index + 1}`}</h4>
                  <button 
                    onClick={() => setLocalData({...localData, rooms: localData.rooms.filter((_, i) => i !== index)})}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input label="Room Name" value={room.name} onChange={(v: string) => {
                    const updated = [...localData.rooms];
                    updated[index] = {...room, name: v};
                    setLocalData({...localData, rooms: updated});
                  }} />
                  <Input label="Quantity" type="number" value={room.quantity} onChange={(v: string) => {
                    const updated = [...localData.rooms];
                    updated[index] = {...room, quantity: parseInt(v) || 1};
                    setLocalData({...localData, rooms: updated});
                  }} />
                  <Input label="Max Guests" type="number" value={room.guests} onChange={(v: string) => {
                    const updated = [...localData.rooms];
                    updated[index] = {...room, guests: parseInt(v) || 2};
                    setLocalData({...localData, rooms: updated});
                  }} />
                  <Input label="Price (AED)" type="number" value={room.basePrice} onChange={(v: string) => {
                    const updated = [...localData.rooms];
                    updated[index] = {...room, basePrice: parseFloat(v) || 0};
                    setLocalData({...localData, rooms: updated});
                  }} />
                </div>
              </div>
            ))}
            <button 
              onClick={() => setLocalData({...localData, rooms: [...localData.rooms, {
                id: `room-${Date.now()}`, type: 'Double Room', quantity: 1,
                beds: { single: 0, double: 1, king: 0, superKing: 0 },
                guests: 2, size: 25, sizeUnit: 'sqm', isSmokingAllowed: false,
                isBathroomPrivate: true, bathroomAmenities: [],
                generalAmenities: [], outdoorAmenities: [], foodAmenities: [],
                name: 'New Room', basePrice: 200, commissionRate: 0.15,
                plans: { standard: true, nonRefundable: false, weekly: false }
              }]})}
              className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-500 rounded-xl font-bold text-sm hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              + Add New Room
            </button>
          </div>
        }
      >
        {data.rooms.length === 0 ? (
          <div className="col-span-full text-center py-8 text-slate-400">
            <p className="font-medium">No rooms configured yet</p>
          </div>
        ) : (
          data.rooms.map((room, i) => (
            <div key={i} className="bg-slate-50 p-4 rounded-xl">
              <p className="font-bold text-slate-900">{room.name}</p>
              <p className="text-sm text-slate-500">{room.quantity} units • {room.guests} guests • AED {room.basePrice}/night</p>
            </div>
          ))
        )}
      </Section>

      {/* Photos Section */}
      <Section 
        id="photos"
        title="Visual Assets" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
        editContent={
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {localData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-32 object-cover rounded-xl" />
                  <button 
                    onClick={() => setLocalData({...localData, photos: localData.photos.filter((_, i) => i !== index)})}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-medium">To add new photos, use the Photos flow from the registration wizard.</p>
          </div>
        }
      >
        {data.photos.length === 0 ? (
          <div className="col-span-full text-center py-8 text-slate-400">
            <p className="font-medium">No photos uploaded yet</p>
          </div>
        ) : (
          <div className="col-span-full">
            <div className="grid grid-cols-4 gap-4">
              {data.photos.slice(0, 4).map((photo, i) => (
                <img key={i} src={photo} alt={`Photo ${i + 1}`} className="w-full h-24 object-cover rounded-xl" />
              ))}
            </div>
            {data.photos.length > 4 && (
              <p className="text-xs text-slate-500 font-medium mt-2">+{data.photos.length - 4} more photos</p>
            )}
          </div>
        )}
      </Section>

      {/* Policies Section */}
      <Section 
        id="policies"
        title="Policies & Rules" 
        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
        editContent={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Check-in From" type="time" value={localData.checkInFrom} onChange={(v: string) => setLocalData({...localData, checkInFrom: v})} />
            <Input label="Check-in To" type="time" value={localData.checkInTo} onChange={(v: string) => setLocalData({...localData, checkInTo: v})} />
            <Input label="Check-out From" type="time" value={localData.checkOutFrom} onChange={(v: string) => setLocalData({...localData, checkOutFrom: v})} />
            <Input label="Check-out To" type="time" value={localData.checkOutTo} onChange={(v: string) => setLocalData({...localData, checkOutTo: v})} />
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Children Allowed</label>
              <select className="w-full p-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none bg-slate-50 text-slate-900 font-bold" 
                      value={localData.allowChildren ? 'Yes' : 'No'} 
                      onChange={(e) => setLocalData({...localData, allowChildren: e.target.value === 'Yes'})}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pets Allowed</label>
              <select className="w-full p-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none bg-slate-50 text-slate-900 font-bold" 
                      value={localData.allowPets} 
                      onChange={(e) => setLocalData({...localData, allowPets: e.target.value as any})}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        }
      >
        <InfoItem label="Check-in" value={`${data.checkInFrom} - ${data.checkInTo}`} />
        <InfoItem label="Check-out" value={`${data.checkOutFrom} - ${data.checkOutTo}`} />
        <InfoItem label="Children" value={data.allowChildren ? 'Allowed' : 'Not Allowed'} />
        <InfoItem label="Pets" value={data.allowPets === 'No' ? 'Not Allowed' : 'Allowed'} />
      </Section>
    </div>
  );
};
