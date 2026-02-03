import React, { useState, useRef } from 'react';
import { RegistrationStep, BasicInfoSubStep, RoomSubStep, FinalSubStep, HotelData, Room } from '../types';

const AMENITY_LIST = [
  "Restaurant", "Room Service", "Bar", "24-Hour Front Desk", "Sauna",
  "Fitness Center", "Garden", "Terrace", "Non-smoking Rooms", "Airport Shuttle",
  "Family Rooms", "Spa & Wellness Center", "Hot Tub/Jacuzzi", "Free Wi-Fi",
  "Air Conditioning", "Water Park", "Electric Vehicle Charging Station", "Swimming Pool", "Beach"
];

const LANGUAGE_LIST = ["English", "Russian", "Arabic", "Hindi", "French", "German", "Spanish", "Chinese"];

const BATHROOM_TOILETRIES = ["Toilet Paper", "Shower", "Toilet", "Hairdryer", "Bathtub", "Free Toiletries", "Bidet", "Slippers", "Bathrobe", "Spa Tub"];
const ROOM_GENERAL = ["Clothes Rack", "Flat-screen TV", "Air Conditioning", "Linens", "Desk", "Wake-up Service", "Towels", "Wardrobe", "Heating", "Fan", "Safe", "Towels/Linens (extra fee)", "Entire Unit on Ground Floor"];

const ROOM_NAMES = [
  "Double Room with Private Bathroom",
  "Twin Room with Shared Bathroom",
  "Suite with City View",
  "Deluxe King Room",
  "Standard Single Room",
  "Family Suite"
];

interface RegistrationFlowProps {
  initialData?: HotelData;
  onFinish: (data: HotelData) => void;
  onCancel: () => void;
}

const Counter = ({ value, onChange, label, sublabel, icon }: any) => (
  <div className="flex items-center justify-between p-5 border-b border-slate-100 last:border-0">
    <div className="flex items-center space-x-4">
      {icon && <div className="text-slate-400">{icon}</div>}
      <div>
        <div className="font-black text-sm text-slate-800 uppercase tracking-wider">{label}</div>
        {sublabel && <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{sublabel}</div>}
      </div>
    </div>
    <div className="flex items-center space-x-4 border border-slate-200 rounded-2xl p-1 bg-white">
      <button onClick={() => onChange(Math.max(0, value - 1))} className="w-10 h-10 flex items-center justify-center text-slate-900 hover:bg-slate-50 rounded-xl transition-colors font-bold">-</button>
      <span className="w-8 text-center font-black text-slate-900">{value}</span>
      <button onClick={() => onChange(value + 1)} className="w-10 h-10 flex items-center justify-center text-[#dec52d] hover:bg-slate-50 rounded-xl transition-colors font-bold">+</button>
    </div>
  </div>
);

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ initialData, onFinish, onCancel }) => {
  const [activeStep, setActiveStep] = useState<RegistrationStep>(RegistrationStep.DASHBOARD);
  const [subStepBasic, setSubStepBasic] = useState<BasicInfoSubStep>(BasicInfoSubStep.LOCATION);
  const [subStepRoom, setSubStepRoom] = useState<RoomSubStep>(RoomSubStep.DETAILS);
  const [subStepFinal, setSubStepFinal] = useState<FinalSubStep>(FinalSubStep.PAYMENTS);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [hotelData, setHotelData] = useState<HotelData>(initialData || {
    id: `hotel-${Date.now()}`,
    name: '', address: '', apartmentNumber: '', country: 'United Arab Emirates', city: '', postalCode: '',
    category: 'Boutique', starRating: 0, isPartOfChain: false,
    description: '', amenities: [], breakfastAvailable: 'No', parking: 'No', languages: ['English'],
    checkInFrom: '14:00', checkInTo: '23:00', checkOutFrom: '06:00', checkOutTo: '11:00',
    allowChildren: true, allowPets: 'No',
    rooms: [], photos: [],
    isBasicInfoComplete: false, isRoomsComplete: false, isPhotosComplete: false, isFinalStepsComplete: false,
  });

  const [tempRoom, setTempRoom] = useState<Room>({
    id: '', type: 'Double Room', quantity: 1, 
    beds: { single: 0, double: 1, king: 0, superKing: 0 },
    guests: 2, size: 25, sizeUnit: 'sqm', isSmokingAllowed: false,
    isBathroomPrivate: true, bathroomAmenities: [],
    generalAmenities: [], outdoorAmenities: [], foodAmenities: ['Tea/Coffee Maker'],
    name: 'Double Room with Private Bathroom', basePrice: 400, commissionRate: 0.15,
    plans: { standard: true, nonRefundable: true, weekly: true }
  });

  const [editingRoomIndex, setEditingRoomIndex] = useState<number | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Fix: Explicitly type 'file' as 'File' to ensure it's assignable to 'Blob' in reader.readAsDataURL
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          if (typeof result === 'string') {
            setHotelData(prev => ({
              ...prev,
              photos: [...prev.photos, result],
              isPhotosComplete: true
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleBasicFlowNext = () => {
    const sequence = [BasicInfoSubStep.LOCATION, BasicInfoSubStep.IDENTITY, BasicInfoSubStep.AMENITIES, BasicInfoSubStep.SERVICES, BasicInfoSubStep.LANGUAGES, BasicInfoSubStep.RULES];
    const idx = sequence.indexOf(subStepBasic);
    if (idx < sequence.length - 1) {
      setSubStepBasic(sequence[idx + 1]);
    } else {
      setHotelData({ ...hotelData, isBasicInfoComplete: true });
      setActiveStep(RegistrationStep.DASHBOARD);
    }
  };

  const handleRoomFlowNext = () => {
    const sequence = [RoomSubStep.DETAILS, RoomSubStep.BATHROOM, RoomSubStep.AMENITIES, RoomSubStep.NAME, RoomSubStep.PRICING, RoomSubStep.PLANS];
    const idx = sequence.indexOf(subStepRoom);
    if (idx < sequence.length - 1) {
      setSubStepRoom(sequence[idx + 1]);
    } else {
      // Save room - either update existing or add new
      if (editingRoomIndex !== null) {
        // Update existing room
        setHotelData(prev => ({
          ...prev,
          rooms: prev.rooms.map((r, i) => i === editingRoomIndex ? { ...tempRoom } : r),
          isRoomsComplete: true
        }));
        setEditingRoomIndex(null);
      } else {
        // Add new room
        setHotelData(prev => ({ 
          ...prev, 
          rooms: [...prev.rooms, { ...tempRoom, id: Date.now().toString() }], 
          isRoomsComplete: true 
        }));
      }
      // Go back to room list instead of dashboard
      setSubStepRoom(RoomSubStep.ROOM_LIST);
    }
  };

  const handleEditRoom = (index: number) => {
    setEditingRoomIndex(index);
    setTempRoom({ ...hotelData.rooms[index] });
    setSubStepRoom(RoomSubStep.DETAILS);
  };

  const handleDeleteRoom = (index: number) => {
    setHotelData(prev => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index),
      isRoomsComplete: prev.rooms.length > 1
    }));
  };

  const handleAddNewRoom = () => {
    setEditingRoomIndex(null);
    setTempRoom({
      id: '', type: 'Double Room', quantity: 1,
      beds: { single: 0, double: 1, king: 0, superKing: 0 },
      guests: 2, size: 25, sizeUnit: 'sqm', isSmokingAllowed: false,
      isBathroomPrivate: true, bathroomAmenities: [],
      generalAmenities: [], outdoorAmenities: [], foodAmenities: ['Tea/Coffee Maker'],
      name: 'Double Room with Private Bathroom', basePrice: 400, commissionRate: 0.15,
      plans: { standard: true, nonRefundable: true, weekly: true }
    });
    setSubStepRoom(RoomSubStep.DETAILS);
  };

  const handleFinalFlowNext = () => {
    const sequence = [FinalSubStep.PAYMENTS, FinalSubStep.IMPORTANT_INFO];
    const idx = sequence.indexOf(subStepFinal);
    if (idx < sequence.length - 1) {
      setSubStepFinal(sequence[idx + 1]);
    } else {
      setHotelData({ ...hotelData, isFinalStepsComplete: true });
      setActiveStep(RegistrationStep.DASHBOARD);
    }
  };

  const renderBasicInfoFlow = () => {
    const btnNextClass = "flex items-center justify-between w-full bg-[#0f172a] hover:bg-slate-800 text-white py-5 px-8 rounded-[20px] font-black uppercase text-xs tracking-widest mt-12 shadow-2xl transition-all border border-slate-700";
    const cardClass = "bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8";
    const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3";
    const inputClass = "w-full p-5 border border-slate-200 rounded-[20px] outline-none focus:border-[#dec52d] focus:ring-4 focus:ring-[#dec52d]/5 transition-all bg-slate-50 text-slate-900 font-bold";

    switch(subStepBasic) {
      case BasicInfoSubStep.LOCATION:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Property Geolocation</h2>
            <div className={cardClass}>
              <div>
                <label className={labelClass}>Verified Address</label>
                <input type="text" placeholder="e.g. Dubai Marina, United Arab Emirates" className={inputClass} value={hotelData.address} onChange={e => setHotelData({...hotelData, address: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}>Apartment or Floor Number <span className="text-slate-300 font-normal normal-case tracking-normal">(optional)</span></label>
                <input type="text" placeholder="e.g. 2022" className={inputClass} value={hotelData.apartmentNumber || ''} onChange={e => setHotelData({...hotelData, apartmentNumber: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Jurisdiction</label>
                  <select className={inputClass} value={hotelData.country} onChange={e => setHotelData({...hotelData, country: e.target.value})}>
                    <option>United Arab Emirates</option><option>Saudi Arabia</option><option>Qatar</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>City Hub</label>
                  <input type="text" placeholder="Dubai" className={inputClass} value={hotelData.city} onChange={e => setHotelData({...hotelData, city: e.target.value})} />
                </div>
              </div>
            </div>
            <button onClick={handleBasicFlowNext} className={btnNextClass}>
              <span>Continue Registration</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case BasicInfoSubStep.IDENTITY:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Asset Identity</h2>
            <div className={cardClass}>
              <div>
                <label className={labelClass}>Commercial Trade Name</label>
                <input type="text" placeholder="e.g. Grand Britrip Suite" className={inputClass} value={hotelData.name} onChange={e => setHotelData({...hotelData, name: e.target.value})} />
              </div>
              <div className="pt-8 border-t border-slate-100">
                <label className={labelClass}>Official Star Classification</label>
                <div className="grid grid-cols-1 gap-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <label key={s} className="flex items-center space-x-4 p-5 border border-slate-100 rounded-[20px] hover:border-[#dec52d] cursor-pointer transition group">
                      <input type="radio" name="star" checked={hotelData.starRating === s} onChange={() => setHotelData({...hotelData, starRating: s})} className="w-5 h-5 text-[#dec52d] focus:ring-[#dec52d]" />
                      <span className="text-slate-900 font-bold uppercase text-xs tracking-widest">{s} Star Property</span>
                      <span className="ml-auto text-[#dec52d]">{'★'.repeat(s)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleBasicFlowNext} className={btnNextClass}>
              <span>Validate Identity</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case BasicInfoSubStep.AMENITIES:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Service Profile</h2>
            <div className={cardClass}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                {AMENITY_LIST.map(a => (
                  <label key={a} className="flex items-center justify-between p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 cursor-pointer transition rounded-2xl group">
                    <span className="text-slate-700 font-bold text-sm tracking-tight">{a}</span>
                    <input type="checkbox" className="w-6 h-6 rounded-lg border-slate-200 text-[#dec52d] focus:ring-[#dec52d]" checked={hotelData.amenities.includes(a)} onChange={() => {
                      const next = hotelData.amenities.includes(a) ? hotelData.amenities.filter(x => x !== a) : [...hotelData.amenities, a];
                      setHotelData({...hotelData, amenities: next});
                    }} />
                  </label>
                ))}
              </div>
            </div>
            <button onClick={handleBasicFlowNext} className={btnNextClass}>
              <span>Confirm Services</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case BasicInfoSubStep.SERVICES:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Hospitality Services</h2>
            <div className={cardClass}>
              <div>
                <label className={labelClass}>Breakfast Availability</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Yes', 'No'].map(v => (
                    <button key={v} onClick={() => setHotelData({...hotelData, breakfastAvailable: v as any})} className={`py-4 px-6 rounded-2xl font-bold border transition-all ${hotelData.breakfastAvailable === v ? 'bg-[#dec52d] text-slate-900 border-[#dec52d]' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Parking Facilities</label>
                <select className={inputClass} value={hotelData.parking} onChange={e => setHotelData({...hotelData, parking: e.target.value as any})}>
                  <option value="No">No Parking</option>
                  <option value="Yes, Free">Yes, Free</option>
                  <option value="Yes, Paid">Yes, Paid</option>
                </select>
              </div>
            </div>
            <button onClick={handleBasicFlowNext} className={btnNextClass}>
              <span>Continue Registration</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case BasicInfoSubStep.LANGUAGES:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Communication</h2>
            <div className={cardClass}>
              <label className={labelClass}>Staff Spoken Languages</label>
              <div className="grid grid-cols-2 gap-4">
                {LANGUAGE_LIST.map(lang => (
                  <label key={lang} className="flex items-center space-x-4 p-4 border border-slate-100 rounded-[20px] hover:border-[#dec52d] cursor-pointer transition">
                    <input type="checkbox" checked={hotelData.languages.includes(lang)} onChange={() => {
                      const next = hotelData.languages.includes(lang) ? hotelData.languages.filter(l => l !== lang) : [...hotelData.languages, lang];
                      setHotelData({...hotelData, languages: next});
                    }} className="w-5 h-5 text-[#dec52d]" />
                    <span className="text-slate-900 font-bold text-sm">{lang}</span>
                  </label>
                ))}
              </div>
            </div>
            <button onClick={handleBasicFlowNext} className={btnNextClass}>
              <span>Next Step</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case BasicInfoSubStep.RULES:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Operational Protocols</h2>
            <div className={cardClass}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <label className={labelClass}>Check-in Window</label>
                  <select className={inputClass} value={hotelData.checkInFrom} onChange={e => setHotelData({...hotelData, checkInFrom: e.target.value})}>
                    {Array.from({length: 24}).map((_, i) => <option key={i}>{String(i).padStart(2, '0')}:00</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Check-out Deadline</label>
                  <select className={inputClass} value={hotelData.checkOutTo} onChange={e => setHotelData({...hotelData, checkOutTo: e.target.value})}>
                    {Array.from({length: 24}).map((_, i) => <option key={i}>{String(i).padStart(2, '0')}:00</option>)}
                  </select>
                </div>
              </div>
            </div>
            <button onClick={handleBasicFlowNext} className={btnNextClass}>
              <span>Complete Step 1</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      default: return <div className="p-20 text-center text-slate-400">Section details loading...</div>;
    }
  };

  const renderRoomFlow = () => {
    const btnNextClass = "flex items-center justify-between w-full bg-[#0f172a] hover:bg-slate-800 text-white py-5 px-8 rounded-[20px] font-black uppercase text-xs tracking-widest mt-12 shadow-2xl transition-all border border-slate-700";
    const cardClass = "bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8";
    const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3";
    const inputClass = "w-full p-5 border border-slate-200 rounded-[20px] outline-none focus:border-[#dec52d] focus:ring-4 focus:ring-[#dec52d]/5 transition-all bg-slate-50 text-slate-900 font-bold";

    switch(subStepRoom) {
      case RoomSubStep.ROOM_LIST:
   return (
  <div className="space-y-8 animate-in slide-in-from-right duration-500">
    <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Your Rooms</h2>
    
    {hotelData.rooms.length === 0 ? (
      <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">No rooms configured yet</h3>
        <p className="text-slate-500 font-medium mb-8">Add your first room to get started.</p>
        <button 
          onClick={handleAddNewRoom}
          className="bg-[#0f172a] hover:bg-slate-800 text-white py-5 px-8 rounded-[20px] font-black uppercase text-xs tracking-widest shadow-2xl transition-all border border-slate-700"
        >
          + Add Your First Room
        </button>
      </div>
    ) : (
      <div className="space-y-4">
        {hotelData.rooms.map((room, index) => (
          <div key={room.id || index} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <h3 className="text-lg font-black text-slate-900">{room.name}</h3>
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-bold">{room.type}</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-bold">{room.quantity} units</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-bold">{room.guests} guests</span>
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-bold">AED {room.basePrice}/night</span>
                </div>
                <div className="flex gap-2 mt-3 text-xs text-slate-500 font-medium">
                  {room.beds.single > 0 && <span>{room.beds.single} Single</span>}
                  {room.beds.double > 0 && <span>• {room.beds.double} Double</span>}
                  {room.beds.king > 0 && <span>• {room.beds.king} King</span>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleEditRoom(index)}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all"
                  title="Edit Room"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => handleDeleteRoom(index)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                  title="Delete Room"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={handleAddNewRoom}
          className="w-full border-2 border-dashed border-slate-300 text-slate-500 py-6 rounded-[24px] font-bold text-sm hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
        >
          + Add Another Room
        </button>
      </div>
    )}
    
    {hotelData.rooms.length > 0 && (
      <button 
        onClick={() => setActiveStep(RegistrationStep.DASHBOARD)} 
        className="flex items-center justify-between w-full bg-[#0f172a] hover:bg-slate-800 text-white py-5 px-8 rounded-[20px] font-black uppercase text-xs tracking-widest mt-8 shadow-2xl transition-all border border-slate-700"
      >
        <span>Save & Continue</span>
        <span className="text-lg text-[#dec52d]">›</span>
      </button>
    )}
  </div>
);
      case RoomSubStep.DETAILS:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Unit Configuration</h2>
            <div className={cardClass}>
              
              <div>
                <label className={labelClass}>What type of unit is this?</label>
                <select 
                  className={inputClass} 
                  value={tempRoom.type} 
                  onChange={e => setTempRoom({...tempRoom, type: e.target.value})}
                >
                  {["Double Room", "Suite", "Single Room", "Deluxe King Room", "Family Suite"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>How many rooms of this type do you have?</label>
                <input 
                  type="number" 
                  className={inputClass} 
                  value={tempRoom.quantity} 
                  onChange={e => setTempRoom({...tempRoom, quantity: parseInt(e.target.value) || 0})}
                />
              </div>

              <div>
                <label className={labelClass}>What beds are available in this room?</label>
                <div className="space-y-2 mt-4">
                  <Counter 
                    label="Single" 
                    sublabel="90-130cm wide" 
                    icon={<svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 10v11M21 10v11M3 14h18M3 10a2 2 0 012-2h14a2 2 0 012 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    value={tempRoom.beds.single} 
                    onChange={(v: number) => setTempRoom({...tempRoom, beds: {...tempRoom.beds, single: v}})} 
                  />
                  <Counter 
                    label="Double" 
                    sublabel="131-150cm wide" 
                    value={tempRoom.beds.double} 
                    onChange={(v: number) => setTempRoom({...tempRoom, beds: {...tempRoom.beds, double: v}})} 
                  />
                  <Counter 
                    label="King" 
                    sublabel="151-180cm wide" 
                    value={tempRoom.beds.king} 
                    onChange={(v: number) => setTempRoom({...tempRoom, beds: {...tempRoom.beds, king: v}})} 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className={labelClass}>How many guests can stay in this room?</label>
                <div className="mt-4">
                  <Counter 
                    label="" 
                    value={tempRoom.guests} 
                    onChange={(v: number) => setTempRoom({...tempRoom, guests: v})} 
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Room Size</label>
                <div className="flex space-x-2">
                  <select className="px-4 py-2 bg-slate-100 rounded-2xl font-bold text-xs outline-none focus:ring-2 focus:ring-[#dec52d]" value={tempRoom.sizeUnit} onChange={e => setTempRoom({...tempRoom, sizeUnit: e.target.value as any})}>
                    <option value="sqm">sqm</option>
                    <option value="sqft">sqft</option>
                  </select>
                  <input type="number" className={inputClass} value={tempRoom.size} onChange={e => setTempRoom({...tempRoom, size: parseInt(e.target.value) || 0})} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Smoking allowed?</label>
                <div className="flex items-center space-x-6 mt-3">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                       <input 
                        type="radio" 
                        name="smoking" 
                        checked={tempRoom.isSmokingAllowed} 
                        onChange={() => setTempRoom({...tempRoom, isSmokingAllowed: true})} 
                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-[#dec52d] checked:bg-[#dec52d] transition-all" 
                       />
                       <div className="absolute w-2 h-2 bg-slate-900 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="font-bold text-slate-900 text-sm group-hover:text-[#dec52d] transition-colors">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer group">
                     <div className="relative flex items-center justify-center">
                       <input 
                        type="radio" 
                        name="smoking" 
                        checked={!tempRoom.isSmokingAllowed} 
                        onChange={() => setTempRoom({...tempRoom, isSmokingAllowed: false})} 
                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-full checked:border-[#dec52d] checked:bg-[#dec52d] transition-all" 
                       />
                       <div className="absolute w-2 h-2 bg-slate-900 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="font-bold text-slate-900 text-sm group-hover:text-[#dec52d] transition-colors">No</span>
                  </label>
                </div>
              </div>

            </div>
            <button onClick={handleRoomFlowNext} className={btnNextClass}>
              <span>Continue to Bathroom Details</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case RoomSubStep.BATHROOM:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Bathroom Facilities</h2>
            <div className={cardClass}>
              <div className="grid grid-cols-2 gap-4">
                {BATHROOM_TOILETRIES.map(item => (
                  <label key={item} className="flex items-center space-x-4 p-4 border border-slate-100 rounded-[20px] hover:border-[#dec52d] cursor-pointer transition">
                    <input type="checkbox" checked={tempRoom.bathroomAmenities.includes(item)} onChange={() => {
                      const next = tempRoom.bathroomAmenities.includes(item) ? tempRoom.bathroomAmenities.filter(i => i !== item) : [...tempRoom.bathroomAmenities, item];
                      setTempRoom({...tempRoom, bathroomAmenities: next});
                    }} className="w-5 h-5 text-[#dec52d]" />
                    <span className="text-slate-900 font-bold text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <button onClick={handleRoomFlowNext} className={btnNextClass}>
              <span>Continue to Amenities</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case RoomSubStep.AMENITIES:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">In-Room Amenities</h2>
            <div className={cardClass}>
              <div className="grid grid-cols-2 gap-4">
                {ROOM_GENERAL.map(item => (
                  <label key={item} className="flex items-center space-x-4 p-4 border border-slate-100 rounded-[20px] hover:border-[#dec52d] cursor-pointer transition">
                    <input type="checkbox" checked={tempRoom.generalAmenities.includes(item)} onChange={() => {
                      const next = tempRoom.generalAmenities.includes(item) ? tempRoom.generalAmenities.filter(i => i !== item) : [...tempRoom.generalAmenities, item];
                      setTempRoom({...tempRoom, generalAmenities: next});
                    }} className="w-5 h-5 text-[#dec52d]" />
                    <span className="text-slate-900 font-bold text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <button onClick={handleRoomFlowNext} className={btnNextClass}>
              <span>Set Room Name</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case RoomSubStep.NAME:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Select Designation</h2>
            <div className={cardClass}>
              <label className={labelClass}>Official Room Name</label>
              <div className="grid grid-cols-1 gap-3">
                {ROOM_NAMES.map(name => (
                  <label key={name} className="flex items-center space-x-4 p-5 border border-slate-100 rounded-[20px] hover:border-[#dec52d] cursor-pointer transition">
                    <input type="radio" checked={tempRoom.name === name} onChange={() => setTempRoom({...tempRoom, name})} className="w-5 h-5 text-[#dec52d]" />
                    <span className="text-slate-900 font-bold text-sm">{name}</span>
                  </label>
                ))}
              </div>
            </div>
            <button onClick={handleRoomFlowNext} className={btnNextClass}>
              <span>Set Base Pricing</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case RoomSubStep.PRICING:
        const commission = (tempRoom.basePrice || 0) * 0.15;
        const earnings = (tempRoom.basePrice || 0) - commission;

        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Price Per Night</h2>
            
            {/* Competitive Insight Banner */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                <div className="space-y-2">
                    <p className="text-slate-700 font-bold text-sm">Make your price competitive to increase your chances of getting more bookings.</p>
                    <p className="text-slate-400 text-xs font-medium">This is the price range for similar properties in your area. <span className="text-blue-600 cursor-pointer hover:underline">Learn more</span></p>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-8 relative h-32 flex items-center justify-center select-none">
                    <div className="absolute inset-x-16 h-2 bg-slate-200 rounded-full top-1/2 -translate-y-1/2"></div>
                    
                    {/* Low */}
                    <div className="absolute left-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
                        <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg mb-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">AED 97.30</div>
                        <div className="w-3 h-3 bg-slate-300 rounded-full border-2 border-white shadow-md"></div>
                        <div className="absolute top-6 text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Low</div>
                    </div>

                    {/* Average */}
                    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10 cursor-pointer">
                        <div className="bg-[#003b95] text-white text-xs font-bold px-4 py-2 rounded-lg mb-3 shadow-xl scale-110 tracking-tight">Average: AED 260.67</div>
                        <div className="w-5 h-5 bg-[#003b95] rounded-full border-4 border-white shadow-lg"></div>
                    </div>

                     {/* High */}
                     <div className="absolute right-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
                        <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg mb-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">AED 424.03</div>
                        <div className="w-3 h-3 bg-slate-300 rounded-full border-2 border-white shadow-md"></div>
                        <div className="absolute top-6 text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">High</div>
                    </div>
                </div>
            </div>

            {/* Price Input Card */}
            <div className={cardClass}>
              <h3 className="text-xl font-black text-slate-900">What price would you like to offer per night?</h3>
              
              <div className="max-w-xl">
                 <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Price guests pay</label>
                 <div className="relative group">
                    <input 
                        type="number" 
                        className="w-full bg-[#1e293b] text-white p-5 rounded-2xl font-bold text-2xl outline-none focus:ring-4 focus:ring-[#dec52d]/20 border border-transparent focus:border-[#dec52d] pl-6 pr-20 transition-all placeholder:text-slate-600" 
                        value={tempRoom.basePrice || ''} 
                        onChange={e => setTempRoom({...tempRoom, basePrice: parseFloat(e.target.value) || 0})}
                        placeholder="0"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-l border-slate-600 pl-4 h-6 flex items-center">AED</div>
                 </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-slate-100">
                 <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                    <span>15.00% Britrip Commission</span>
                    <span>AED {commission.toFixed(2)}</span>
                 </div>
                 
                 <div className="flex justify-between items-center pt-2">
                    <span className="font-extrabold text-slate-900 text-lg">Your earnings (incl. taxes)</span>
                    <span className="font-black text-[#22c55e] text-3xl tracking-tight">AED {earnings.toFixed(2)}</span>
                 </div>
              </div>

            </div>
            <button onClick={handleRoomFlowNext} className={btnNextClass}>
              <span>Set Rate Plans</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case RoomSubStep.PLANS:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Rate Plans</h2>
            <div className={cardClass}>
              <label className="flex items-center space-x-4 p-5 border border-slate-100 rounded-[20px] cursor-pointer">
                <input type="checkbox" checked={tempRoom.plans.standard} onChange={() => setTempRoom({...tempRoom, plans: {...tempRoom.plans, standard: !tempRoom.plans.standard}})} className="w-6 h-6 text-[#dec52d]" />
                <div className="flex-grow">
                   <div className="text-slate-900 font-black uppercase text-xs">Standard Flexible Rate</div>
                   <div className="text-[10px] text-slate-400">Free cancellation up to 24h</div>
                </div>
              </label>
              <label className="flex items-center space-x-4 p-5 border border-slate-100 rounded-[20px] cursor-pointer">
                <input type="checkbox" checked={tempRoom.plans.nonRefundable} onChange={() => setTempRoom({...tempRoom, plans: {...tempRoom.plans, nonRefundable: !tempRoom.plans.nonRefundable}})} className="w-6 h-6 text-[#dec52d]" />
                <div className="flex-grow">
                   <div className="text-slate-900 font-black uppercase text-xs">Non-Refundable (10% Off)</div>
                   <div className="text-[10px] text-slate-400">Pre-payment required</div>
                </div>
              </label>
            </div>
            <button onClick={handleRoomFlowNext} className={btnNextClass}>
              <span>Complete Unit Configuration</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      default: return <div className="p-20 text-center text-slate-400">Section details loading...</div>;
    }
  };

  const renderFinalFlow = () => {
    const btnNextClass = "flex items-center justify-between w-full bg-[#0f172a] hover:bg-slate-800 text-white py-5 px-8 rounded-[20px] font-black uppercase text-xs tracking-widest mt-12 shadow-2xl transition-all border border-slate-700";
    const cardClass = "bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8";
    
    switch(subStepFinal) {
      case FinalSubStep.PAYMENTS:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Financial Settlement</h2>
            <div className={cardClass}>
              <p className="text-slate-500 font-medium leading-relaxed">Britrip (hoteliers) uses institutional-grade billing. Select your preferred commission settlement method.</p>
              <div className="space-y-4">
                 {['Direct Bank Transfer', 'Centralized Invoicing', 'Automatic CC Debiting'].map(method => (
                   <label key={method} className="flex items-center space-x-4 p-5 border border-slate-100 rounded-[20px] hover:border-[#dec52d] cursor-pointer transition">
                      <input type="radio" name="payment" className="w-5 h-5 text-[#dec52d]" defaultChecked={method === 'Centralized Invoicing'} />
                      <span className="text-slate-900 font-bold uppercase text-xs tracking-widest">{method}</span>
                   </label>
                 ))}
              </div>
            </div>
            <button onClick={handleFinalFlowNext} className={btnNextClass}>
              <span>Review Policies</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      case FinalSubStep.IMPORTANT_INFO:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Legal Affirmation</h2>
            <div className={cardClass}>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Terms of Syndication</p>
                <div className="text-xs text-slate-600 space-y-4 font-medium h-48 overflow-y-auto pr-4 custom-scrollbar">
                  <p>1. By finalizing, you authorize Britrip Global Group to distribute your property data across GDS and OTA nodes.</p>
                  <p>2. Rate parity must be maintained across all synchronized channels.</p>
                  <p>3. Information accuracy is the sole responsibility of the registered property owner.</p>
                  <p>4. Britrip reserves the right to audit asset information for quality assurance.</p>
                </div>
              </div>
              <label className="flex items-center space-x-4 p-4">
                <input type="checkbox" required className="w-6 h-6 text-[#dec52d] rounded" />
                <span className="text-xs font-black text-slate-900 uppercase tracking-widest">I accept the Global Syndication Agreement</span>
              </label>
            </div>
            <button onClick={handleFinalFlowNext} className={btnNextClass}>
              <span>Review & Sync</span>
              <span className="text-lg text-[#dec52d]">›</span>
            </button>
          </div>
        );
      default: return <div className="p-20 text-center text-slate-400">Section details loading...</div>;
    }
  };

  if (activeStep === RegistrationStep.DASHBOARD) {
    const SuccessIcon = () => (
      <div className="w-10 h-10 bg-[#22c55e] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 flex-shrink-0">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
    );
    
    const cardClass = "bg-white rounded-[32px] shadow-sm border border-slate-100 p-10 relative group transition-all hover:shadow-2xl hover:border-[#dec52d]/30 mb-6";
    const lockedCardClass = "bg-slate-50 rounded-[32px] border border-slate-200 p-10 relative opacity-50 pointer-events-none mb-6 grayscale";
    
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter leading-none">Onboarding Hub</h1>
        <p className="text-slate-500 font-medium mb-12">Managed Asset: <span className="font-black text-[#dec52d]">{hotelData.name || 'Untitled Property'}</span></p>
        
        {/* Phase 01 */}
        <div className={cardClass}>
          <div className="flex justify-between items-center">
            <div className="flex-grow pr-12">
              <p className="text-[10px] font-black text-[#dec52d] uppercase tracking-[0.2em] mb-2">Phase 01</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Accommodation Fundamentals</h3>
              <p className="text-sm text-slate-400 mt-2 font-medium">Core identity, physical location, and protocols.</p>
            </div>
            <div className="flex items-center space-x-4">
              {hotelData.isBasicInfoComplete && <SuccessIcon />}
              <button onClick={() => { setSubStepBasic(BasicInfoSubStep.LOCATION); setActiveStep(RegistrationStep.FLOW_BASIC); }} className="bg-slate-950 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#dec52d] hover:text-slate-950 transition-all border border-slate-800">
                {hotelData.isBasicInfoComplete ? 'Amend' : 'Initialize'}
              </button>
            </div>
          </div>
        </div>

        {/* Phase 02 */}
        <div className={hotelData.isBasicInfoComplete ? cardClass : lockedCardClass}>
          <div className="flex justify-between items-center">
            <div className="flex-grow pr-12">
              <p className="text-[10px] font-black text-[#dec52d] uppercase tracking-[0.2em] mb-2">Phase 02</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Unit Configuration</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {hotelData.rooms.map((r, i) => (
                  <span key={i} className="text-[10px] font-black text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 uppercase tracking-widest">{r.name}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {hotelData.isRoomsComplete && <SuccessIcon />}
              <button onClick={() => { setSubStepRoom(RoomSubStep.ROOM_LIST); setActiveStep(RegistrationStep.FLOW_ROOMS); }} className="bg-slate-950 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#dec52d] hover:text-slate-950 transition-all border border-slate-800">
                Configure Units
              </button>
            </div>
          </div>
        </div>

        {/* Phase 03 */}
        <div className={hotelData.isRoomsComplete ? cardClass : lockedCardClass}>
          <div className="flex justify-between items-center">
            <div className="flex-grow pr-12">
              <p className="text-[10px] font-black text-[#dec52d] uppercase tracking-[0.2em] mb-2">Phase 03</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Visual Documentation</h3>
              <p className="text-sm text-slate-400 mt-2 font-medium">{hotelData.photos.length} High-resolution assets synced.</p>
            </div>
            <div className="flex items-center space-x-4">
              {hotelData.isPhotosComplete && <SuccessIcon />}
              <button onClick={() => setActiveStep(RegistrationStep.FLOW_PHOTOS)} className="bg-slate-950 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#dec52d] hover:text-slate-950 transition-all border border-slate-800">
                Media Manager
              </button>
            </div>
          </div>
        </div>

        {/* Phase 04 */}
        <div className={hotelData.isPhotosComplete ? cardClass : lockedCardClass}>
          <div className="flex justify-between items-center">
            <div className="flex-grow pr-12">
              <p className="text-[10px] font-black text-[#dec52d] uppercase tracking-[0.2em] mb-2">Phase 04</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Legal & Completion</h3>
              <p className="text-sm text-slate-400 mt-2 font-medium">Agreement terms and final syndication audit.</p>
            </div>
            <div className="flex items-center space-x-4">
              {hotelData.isFinalStepsComplete && <SuccessIcon />}
              <button onClick={() => { setSubStepFinal(FinalSubStep.PAYMENTS); setActiveStep(RegistrationStep.FLOW_FINAL); }} className="bg-slate-950 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#dec52d] hover:text-slate-950 transition-all border border-slate-800">
                Finalize Hub
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-end space-x-6 items-center">
          <button onClick={onCancel} className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-slate-900 transition-all">Suspend</button>
          <button 
            disabled={!hotelData.isBasicInfoComplete || !hotelData.isRoomsComplete || !hotelData.isPhotosComplete || !hotelData.isFinalStepsComplete}
            onClick={() => onFinish(hotelData)} 
            className="px-12 py-5 bg-[#dec52d] text-slate-950 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-[#dec52d]/20 transition-all transform hover:-translate-y-1 active:scale-95 disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none disabled:transform-none"
          >
            Confirm Global Sync
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button onClick={() => setActiveStep(RegistrationStep.DASHBOARD)} className="flex items-center text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest mb-12 transition-all group">
        <span className="text-2xl mr-3 group-hover:-translate-x-1 transition-transform text-[#dec52d]">‹</span> 
        Return to Onboarding Hub
      </button>

      {activeStep === RegistrationStep.FLOW_BASIC && renderBasicInfoFlow()}
      {activeStep === RegistrationStep.FLOW_ROOMS && renderRoomFlow()}
      {activeStep === RegistrationStep.FLOW_PHOTOS && (
        <div className="space-y-12 animate-in fade-in duration-500">
           <div className="text-center space-y-4">
             <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">Visual Identity</h2>
             <p className="text-slate-500 font-medium max-w-lg mx-auto">Upload high-fidelity imagery to define your property's market positioning.</p>
           </div>
           <div onClick={() => fileInputRef.current?.click()} className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[40px] p-24 text-center hover:border-[#dec52d] hover:bg-[#dec52d]/5 transition-all cursor-pointer group">
             <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} multiple accept="image/*" className="hidden" />
             <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Ingest Asset Imagery</h3>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">CLICK TO BROWSE OR DRAG AND DROP</p>
           </div>
           {hotelData.photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotelData.photos.map((p, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group">
                    <img src={p} className="w-full h-full object-cover" alt="Property asset" />
                    <button onClick={(e) => { e.stopPropagation(); setHotelData({...hotelData, photos: hotelData.photos.filter((_, idx) => idx !== i)}); }} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5"></path></svg>
                    </button>
                  </div>
                ))}
              </div>
           )}
           <div className="mt-12">
             <button onClick={() => setActiveStep(RegistrationStep.DASHBOARD)} className="w-full bg-slate-950 text-white py-6 rounded-[24px] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-[#dec52d] hover:text-slate-950 transition-all border border-slate-800">Save and Continue</button>
           </div>
        </div>
      )}
      {activeStep === RegistrationStep.FLOW_FINAL && renderFinalFlow()}
    </div>
  );
};