
import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Features } from './components/Features.tsx';
import { RegistrationFlow } from './components/RegistrationFlow.tsx';
import { AuthView } from './components/AuthView.tsx';
import { HomeView } from './components/HomeView.tsx';
import { HotelDetailsView } from './components/HotelDetailsView.tsx';
import { MyPropertiesView } from './components/MyPropertiesView.tsx';
import { ManagePropertyView } from './components/ManagePropertyView.tsx';
import { AnalyticsView } from './components/AnalyticsView.tsx';
import { NetworkView } from './components/NetworkView.tsx';
import { HotelierAssistant } from './components/HotelierAssistant.tsx';
import { AppView, Hotel, HotelData } from './types.ts';

const MOCK_HOTELS: Hotel[] = [
  { id: 1, name: "The Atlantis Palm", location: "Dubai, UAE", price: 1200, rating: 5, engagement: 94, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800", description: "The Atlantis Palm is a majestic 5-star resort located on the iconic Palm Jumeirah in Dubai. It features breathtaking views, world-class dining, and the famous Aquaventure Waterpark.", amenities: ["Water Park", "Beach", "Spa", "Private Pools", "Fine Dining"] },
  { id: 2, name: "Burj Al Arab", location: "Dubai, UAE", price: 2500, rating: 5, engagement: 98, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800", description: "An architectural masterpiece and a global icon of Arabian luxury, the Burj Al Arab stands on its own artificial island, offering unparalleled 7-star service and opulence.", amenities: ["Personal Butler", "Helipad", "Underwater Restaurant", "Full Service Spa"] },
  { id: 3, name: "Marriott Marquis", location: "Doha, Qatar", price: 800, rating: 4, engagement: 82, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800", description: "Located in the heart of West Bay, the Marriott Marquis City Center Doha Hotel offers modern luxury with stunning skyline views and award-winning dining options.", amenities: ["City View", "Outdoor Pool", "Executive Lounge", "Business Center"] },
  { id: 4, name: "Emirates Palace", location: "Abu Dhabi, UAE", price: 1800, rating: 5, engagement: 89, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800", description: "A landmark of luxury in the capital of the UAE, Emirates Palace Mandarin Oriental is a palace-style hotel offering regal hospitality and 1.3km of private beach.", amenities: ["Gold Spa", "Private Beach", "Luxury Suites", "Marinas"] },
  { id: 5, name: "Rosewood Jaddaf", location: "Dubai, UAE", price: 650, rating: 4, engagement: 76, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800", description: "Rosewood Jaddaf offers a sophisticated urban retreat with impeccable service, contemporary design, and panoramic views of Dubai Creek.", amenities: ["Rooftop Pool", "Artisan Dining", "Boutique Experience", "Creek Views"] },
  { id: 6, name: "W Muscat", location: "Muscat, Oman", price: 950, rating: 5, engagement: 81, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=800", description: "Stepping into W Muscat is like stepping into a bold new world of design and energy. Located on the beachfront, it brings an edgy twist to Omani hospitality.", amenities: ["WET Deck", "Beach Access", "Mixology", "Designer Rooms"] },
];

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('LANDING');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [myProperties, setMyProperties] = useState<HotelData[]>([]);
  const [editingHotelData, setEditingHotelData] = useState<HotelData | undefined>(undefined);
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);

  const handleStartAuth = () => {
    setView('AUTH');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setView('HOME');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProperty = (data: HotelData) => {
    const exists = myProperties.find(p => p.id === data.id);
    if (exists) {
      setMyProperties(prev => prev.map(p => p.id === data.id ? data : p));
    } else {
      setMyProperties(prev => [...prev, data]);
    }
    setEditingHotelData(undefined);
    setActivePropertyId(data.id);
    setView('MANAGE_PROPERTY');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('LANDING');
    setMyProperties([]);
  };

  const handleNavigate = (targetView: AppView) => {
    setEditingHotelData(undefined);
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewHotelDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setView('HOTEL_DETAILS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToMyProperties = (hotel: Hotel) => {
    const existing = myProperties.find(p => p.name === hotel.name);
    if (!existing) {
      const newProperty: HotelData = {
        id: `prop-${hotel.id}-${Date.now()}`,
        name: hotel.name,
        address: hotel.location,
        country: 'United Arab Emirates',
        city: hotel.location.split(',')[0].trim(),
        postalCode: '',
        category: 'Boutique',
        starRating: hotel.rating,
        isPartOfChain: false,
        description: hotel.description || '',
        amenities: hotel.amenities || [],
        breakfastAvailable: 'No',
        parking: 'No',
        languages: ['English'],
        checkInFrom: '14:00',
        checkInTo: '23:00',
        checkOutFrom: '06:00',
        checkOutTo: '11:00',
        allowChildren: true,
        allowPets: 'No',
        rooms: [
          {
            id: 'r1',
            name: 'Standard Room',
            type: 'Double',
            quantity: 10,
            basePrice: hotel.price,
            guests: 2,
            beds: { single: 0, double: 1, king: 0, superKing: 0 },
            size: 30,
            sizeUnit: 'sqm',
            isSmokingAllowed: false,
            isBathroomPrivate: true,
            bathroomAmenities: [],
            generalAmenities: [],
            outdoorAmenities: [],
            foodAmenities: [],
            commissionRate: 0.15,
            plans: { standard: true, nonRefundable: false, weekly: false }
          }
        ],
        photos: [hotel.image, ...(hotel.images || [])],
        isBasicInfoComplete: true,
        isRoomsComplete: true,
        isPhotosComplete: true,
        isFinalStepsComplete: false,
      };
      setMyProperties(prev => [...prev, newProperty]);
      setActivePropertyId(newProperty.id);
      setView('MANAGE_PROPERTY');
    } else {
      setActivePropertyId(existing.id);
      setView('MANAGE_PROPERTY');
    }
  };

  const isAlreadyInMyProperties = () => {
    return !!myProperties.find(p => p.name === selectedHotel?.name);
  };

  const handleManageFromDetails = (hotel: Hotel) => {
    const existing = myProperties.find(p => p.name === hotel.name);
    if (existing) {
      setActivePropertyId(existing.id);
      setView('MANAGE_PROPERTY');
    } else {
      handleAddToMyProperties(hotel);
    }
  };

  const handleAnalyticsFromDetails = (hotel: Hotel) => {
    const existing = myProperties.find(p => p.name === hotel.name);
    if (existing) {
      setActivePropertyId(existing.id);
      setView('ANALYTICS');
    }
  };

  const handleManageProperty = (propId: string) => {
    const isMock = MOCK_HOTELS.find(h => String(h.id) === propId);
    const existingInState = myProperties.find(p => p.id === propId || (isMock && p.name === isMock.name));
    
    if (existingInState) {
      setActivePropertyId(existingInState.id);
      setView('MANAGE_PROPERTY');
    } else if (isMock) {
      handleAddToMyProperties(isMock);
    } else {
      setActivePropertyId(propId);
      setView('MANAGE_PROPERTY');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartEdit = () => {
    const prop = myProperties.find(p => p.id === activePropertyId);
    if (prop) {
      setEditingHotelData(prop);
      setView('REGISTRATION');
    }
  };

  const handleUpdateProperty = (data: HotelData) => {
    setMyProperties(prev => prev.map(p => p.id === data.id ? data : p));
  };

  const handleViewAnalytics = (propId: string) => {
    const isMock = MOCK_HOTELS.find(h => String(h.id) === propId);
    const existingInState = myProperties.find(p => p.id === propId || (isMock && p.name === isMock.name));

    if (existingInState) {
      setActivePropertyId(existingInState.id);
      setView('ANALYTICS');
    } else if (isMock) {
      handleAddToMyProperties(isMock);
      setView('ANALYTICS');
    } else {
      setActivePropertyId(propId);
      setView('ANALYTICS');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const marketplaceProperties = useMemo(() => {
    const userProps: Hotel[] = myProperties.map(p => ({
      id: p.id,
      name: p.name,
      location: p.address,
      price: p.rooms[0]?.basePrice || 0,
      rating: p.starRating,
      image: p.photos[0] || '',
      engagement: 45 + (p.name.length % 50),
      description: p.description,
      amenities: p.amenities,
      images: p.photos
    }));

    const unclaimedFeatured = MOCK_HOTELS.filter(fh => 
      !userProps.find(up => up.name.toLowerCase() === fh.name.toLowerCase())
    );

    return [...userProps, ...unclaimedFeatured];
  }, [myProperties]);

  const activePropData = myProperties.find(p => p.id === activePropertyId);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        onNavClick={handleNavigate}
        onAuthClick={handleStartAuth} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout}
        currentView={view}
      />
      
      <main className="flex-grow">
        {view === 'LANDING' && (
          <>
            <Hero onCtaClick={handleStartAuth} onNetworkClick={() => setView('NETWORK')} />
            <Features />
          </>
        )}

        {view === 'NETWORK' && (
          <NetworkView onAuthClick={handleStartAuth} onBack={() => setView('LANDING')} />
        )}

        {view === 'HOME' && (
          <HomeView hotels={MOCK_HOTELS} onViewDetails={handleViewHotelDetails} />
        )}

        {view === 'HOTEL_DETAILS' && selectedHotel && (
          <HotelDetailsView 
            hotel={selectedHotel} 
            onBack={() => setView('HOME')} 
            onEdit={handleManageFromDetails}
            onViewAnalytics={handleAnalyticsFromDetails}
            onAdd={handleAddToMyProperties}
            isAlreadyAdded={isAlreadyInMyProperties()}
          />
        )}

        {view === 'MY_PROPERTIES' && (
          <MyPropertiesView 
            properties={marketplaceProperties} 
            onViewDetails={(h) => handleManageProperty(String(h.id))}
            onViewAnalytics={(id) => handleViewAnalytics(id)}
          />
        )}

        {view === 'MANAGE_PROPERTY' && activePropData && (
          <ManagePropertyView 
            data={activePropData} 
            onBack={() => setView('MY_PROPERTIES')} 
            onEdit={handleStartEdit}
            onUpdate={handleUpdateProperty}
            onViewAnalytics={() => handleViewAnalytics(activePropData.id)}
          />
        )}

        {view === 'ANALYTICS' && activePropData && (
          <AnalyticsView 
            data={activePropData} 
            onBack={() => setView('MANAGE_PROPERTY')} 
          />
        )}

        {view === 'AUTH' && (
          <div className="container mx-auto px-4 py-12">
            <AuthView 
              onSuccess={handleAuthSuccess} 
              onCancel={() => setView('LANDING')} 
            />
          </div>
        )}

        {view === 'REGISTRATION' && (
          <div className="container mx-auto px-4 py-12">
            <RegistrationFlow 
              initialData={editingHotelData}
              onFinish={handleSaveProperty} 
              onCancel={() => setView(activePropertyId ? 'MANAGE_PROPERTY' : 'MY_PROPERTIES')} 
            />
          </div>
        )}
      </main>

      <HotelierAssistant 
        currentView={view} 
        hotelData={activePropData}
      />

      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-[#dec52d] rounded flex items-center justify-center">
               <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
               </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Britrip <span className="text-[#dec52d] text-sm font-medium">(hoteliers)</span></span>
          </div>
          <p className="text-sm">© 2026 Britrip (hoteliers). Elevating global hospitality data standards.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
