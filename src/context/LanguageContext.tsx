import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    events: 'Events',
    profile: 'Profile',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    feed: 'Feed',
    pricing: 'Pricing',
    dashboard: 'Dashboard',
    
    // Landing Page
    heroTitle: 'Discover Amazing Events',
    heroSubtitle: 'Find and attend the best events happening around you',
    searchPlaceholder: 'Search events, locations, or categories...',
    sponsoredEvents: 'Sponsored Events',
    popularEvents: 'Popular Events',
    categories: 'Categories',
    
    // Categories
    allCategories: 'All Categories',
    theater: 'Theater',
    ballet: 'Ballet',
    opera: 'Opera',
    arts: 'Arts',
    music: 'Music',
    comedy: 'Comedy',
    
    // Genres
    drama: 'Drama',
    klassisk: 'Classical',
    fotografi: 'Photography',
    skulptur: 'Sculpture',
    samtidskonst: 'Contemporary Art',
    jazz: 'Jazz',
    standup: 'Stand-up',
    musikal: 'Musical',
    
    // Locations
    allLocations: 'All Locations',
    genre: 'Genre',
    allGenres: 'All Genres',
    
    // Event Details
    eventDetails: 'Event Details',
    date: 'Date',
    time: 'Time',
    location: 'Location',
    price: 'Price',
    free: 'Free',
    organizer: 'Organizer',
    attendees: 'Attendees',
    saveEvent: 'Save Event',
    unsaveEvent: 'Unsaved',
    shareEvent: 'Share',
    
    // Search
    searchResults: 'Search Results',
    filters: 'Filters',
    allCategories: 'All Categories',
    priceRange: 'Price Range',
    dateRange: 'Date Range',
    
    // Profile
    editProfile: 'Edit Profile',
    savedEvents: 'Saved Events',
    createdEvents: 'Created Events',
    followers: 'Followers',
    following: 'Following',
    
    // Organizer Dashboard
    myEvents: 'My Events',
    createEvent: 'Create Event',
    editEvent: 'Edit Event',
    deleteEvent: 'Delete Event',
    sponsored: 'Sponsored',
    selectAll: 'Select All',
    bulkActions: 'Bulk Actions',
    noPaidPlan: 'Editing events requires a paid plan',
    upgradeNow: 'Upgrade Now',
    eventDetails: 'Event Details',
    eventTitle: 'Event Title',
    castOfCharacters: 'Cast of Characters',
    selectCategory: 'Select Category',
    selectGenre: 'Select Genre',
    eventImage: 'Event Image',
    titleRequired: 'Title is required',
    descriptionRequired: 'Description is required',
    genreRequired: 'Genre is required',
    categoryRequired: 'Category is required',
    locationRequired: 'Location is required',
    dateRequired: 'Date is required',
    timeRequired: 'Time is required',
    priceRequired: 'Price is required',
    backToDashboard: 'Back to Dashboard',
    creating: 'Creating...',
    cancel: 'Cancel',
    
    // Payment Plans
    paymentPlans: 'Payment Plans',
    free: 'Free',
    pro: 'Pro',
    selectPlan: 'Select Plan',
    currentPlan: 'Current Plan',
    signInToSubscribe: 'Sign In to Subscribe',
    
    // Social Feed
    whatsHappening: "What's happening?",
    post: 'Post',
    like: 'Like',
    comment: 'Comment',
    previouslyAttended: 'Previously Attended Events',
    recentActivity: 'Recent Activity',
    
    // Auth
    email: 'Email',
    password: 'Password',
    name: 'Name',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    loadMore: 'Load More',
    description: 'Description',
    filterByGenre: 'Filter by Genre',
    upgradeToPro: 'Upgrade to Pro',
    deleteSelected: 'Delete Selected',
    allDates: 'All Dates',
    today: 'Today',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
  },
  sv: {
    // Navigation
    home: 'Hem',
    about: 'Om oss',
    events: 'Evenemang',
    profile: 'Profil',
    signIn: 'Logga in',
    signUp: 'Registrera',
    signOut: 'Logga ut',
    feed: 'Flöde',
    pricing: 'Priser',
    dashboard: 'Dashboard',
    
    // Landing Page
    heroTitle: 'Upptäck Fantastiska Event',
    heroSubtitle: 'Hitta och delta i de bästa evenemangen runt dig',
    searchPlaceholder: 'Sök evenemang, platser eller kategorier...',
    sponsoredEvents: 'Sponsrade Evenemang',
    popularEvents: 'Populära Evenemang',
    categories: 'Kategorier',
    
    // Categories
    allCategories: 'Alla kategorier',
    theater: 'Teater',
    ballet: 'Ballet',
    opera: 'Oper',
    arts: 'Konst',
    music: 'Musik',
    comedy: 'Komedi',
    
    // Genres
    drama: 'Drama',
    klassisk: 'Klassisk',
    fotografi: 'Fotografi',
    skulptur: 'Skulptur',
    samtidskonst: 'Samtidskonst',
    jazz: 'Jazz',
    standup: 'Stand-up',
    musikal: 'Musikal',
    
    // Locations
    allLocations: 'Alla platser',
    genre: 'Genre',
    allGenres: 'Alla genrer',
    
    // Event Details
    eventDetails: 'Eventdetaljer',
    date: 'Datum',
    time: 'Tid',
    location: 'Plats',
    price: 'Pris',
    free: 'Gratis',
    organizer: 'Arrangör',
    attendees: 'Deltagare',
    saveEvent: 'Spara Event',
    unsaveEvent: 'Ej sparad',
    shareEvent: 'Dela',
    
    // Search
    searchResults: 'Sökresultat',
    filters: 'Filter',
    allCategories: 'Alla Kategorier',
    priceRange: 'Prisintervall',
    dateRange: 'Datumintervall',
    
    // Profile
    editProfile: 'Redigera Profil',
    savedEvents: 'Sparade Evenemang',
    createdEvents: 'Skapade Evenemang',
    followers: 'Följare',
    following: 'Följer',
    
    // Organizer Dashboard
    myEvents: 'Mina Evenemang',
    createEvent: 'Skapa Event',
    editEvent: 'Redigera Event',
    deleteEvent: 'Ta bort Event',
    sponsored: 'Sponsrade',
    selectAll: 'Välj alla',
    bulkActions: 'Massåtgärder',
    noPaidPlan: 'Redigera evenemang kräver en betald plan',
    upgradeNow: 'Uppgradera Nu',
    eventDetails: 'Eventdetaljer',
    eventTitle: 'Eventtitel',
    castOfCharacters: 'Rollista',
    selectCategory: 'Välj Kategori',
    selectGenre: 'Välj Genre',
    eventImage: 'Eventbild',
    titleRequired: 'Titel krävs',
    descriptionRequired: 'Beskrivning krävs',
    genreRequired: 'Genre krävs',
    categoryRequired: 'Kategori krävs',
    locationRequired: 'Plats krävs',
    dateRequired: 'Datum krävs',
    timeRequired: 'Tid krävs',
    priceRequired: 'Pris krävs',
    backToDashboard: 'Tillbaka till Dashboard',
    creating: 'Skapar...',
    cancel: 'Avbryt',
    
    // Payment Plans
    paymentPlans: 'Betalplaner',
    free: 'Gratis',
    pro: 'Pro',
    selectPlan: 'Välj Plan',
    currentPlan: 'Nuvarande Plan',
    signInToSubscribe: 'Logga in för att prenumerera',
    
    // Social Feed
    whatsHappening: 'Vad händer?',
    post: 'Posta',
    like: 'Gilla',
    comment: 'Kommentera',
    previouslyAttended: 'Tidigare deltaga evenemang',
    recentActivity: 'Nylig aktivitet',
    
    // Auth
    email: 'E-post',
    password: 'Lösenord',
    name: 'Namn',
    noAccount: 'Har du inget konto?',
    haveAccount: 'Har du redan ett konto?',
    
    // Common
    save: 'Spara',
    cancel: 'Avbryt',
    delete: 'Ta bort',
    edit: 'Redigera',
    view: 'Visa',
    loadMore: 'Ladda mer',
    description: 'Beskrivning',
    filterByGenre: 'Filtrera efter Genre',
    upgradeToPro: 'Uppgradera till Pro',
    deleteSelected: 'Ta bort markerade',
    allDates: 'Alla datum',
    today: 'Idag',
    thisWeek: 'Denna vecka',
    thisMonth: 'Denna månad',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('sv'); // Changed default to Swedish

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}