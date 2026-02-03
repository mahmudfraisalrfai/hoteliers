
export interface BedConfig {
  single: number;
  double: number;
  king: number;
  superKing: number;
}

export interface Room {
  id: string;
  type: string;
  quantity: number;
  beds: BedConfig;
  guests: number;
  size: number;
  sizeUnit: 'sqm' | 'sqft';
  isSmokingAllowed: boolean;
  
  // Bathroom
  isBathroomPrivate: boolean;
  bathroomAmenities: string[];
  
  // Amenities
  generalAmenities: string[];
  outdoorAmenities: string[];
  foodAmenities: string[];
  
  // Pricing
  name: string;
  basePrice: number;
  commissionRate: number;
  plans: {
    standard: boolean;
    nonRefundable: boolean;
    weekly: boolean;
  };
}

export interface Hotel {
  id: number | string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  engagement: number; // Visit rate / performance metric
  description?: string;
  amenities?: string[];
  images?: string[];
}

export interface HotelData {
  id: string; // Unique identifier for the registered property
  // Step 1: Identity & Location
  name: string;
  address: string;
  apartmentNumber?: string;
  country: string;
  city: string;
  postalCode: string;
  category: 'Luxury' | 'Boutique' | 'Budget' | 'Resort' | 'Apartment';
  starRating: number;
  isPartOfChain: boolean;

  // Step 1: Details & Amenities
  description: string;
  amenities: string[];
  breakfastAvailable: 'Yes' | 'No';
  parking: 'No' | 'Yes, Free' | 'Yes, Paid';
  languages: string[];

  // Step 1: Rules
  checkInFrom: string;
  checkInTo: string;
  checkOutFrom: string;
  checkOutTo: string;
  allowChildren: boolean;
  allowPets: 'Yes' | 'No' | 'Upon Request';

  // System State
  rooms: Room[];
  photos: string[];
  
  // Progress Tracking
  isBasicInfoComplete: boolean;
  isRoomsComplete: boolean;
  isPhotosComplete: boolean;
  isFinalStepsComplete: boolean;
}

export enum RegistrationStep {
  DASHBOARD = 'DASHBOARD',
  FLOW_BASIC = 'FLOW_BASIC',
  FLOW_ROOMS = 'FLOW_ROOMS',
  FLOW_PHOTOS = 'FLOW_PHOTOS',
  FLOW_FINAL = 'FLOW_FINAL'
}

export enum BasicInfoSubStep {
  LOCATION = 'LOCATION',
  IDENTITY = 'IDENTITY',
  AMENITIES = 'AMENITIES',
  SERVICES = 'SERVICES',
  LANGUAGES = 'LANGUAGES',
  RULES = 'RULES'
}

export enum RoomSubStep {
  DETAILS = 'DETAILS',
  BATHROOM = 'BATHROOM',
  AMENITIES = 'AMENITIES',
  NAME = 'NAME',
  PRICING = 'PRICING',
  PLANS = 'PLANS'
}

export enum FinalSubStep {
  PAYMENTS = 'PAYMENTS',
  CREDIT_CARDS = 'CREDIT_CARDS',
  INVOICES = 'INVOICES',
  LICENSE = 'LICENSE',
  IMPORTANT_INFO = 'IMPORTANT_INFO'
}

export type AppView = 'LANDING' | 'AUTH' | 'HOME' | 'REGISTRATION' | 'HOTEL_DETAILS' | 'MY_PROPERTIES' | 'MANAGE_PROPERTY' | 'ANALYTICS' | 'NETWORK';
