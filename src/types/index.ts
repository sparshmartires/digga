export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  genre: string; // Added genre field
  price: number;
  currency: string;
  imageUrl: string;
  organizerId: string;
  organizerName: string;
  organizerAvatar: string;
  attendees: number;
  isSponsored: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  isOrganizer: boolean;
  hasPaidPlan: boolean;
  followers: number;
  following: number;
  preferredGenres?: string[];
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  eventId?: string;
  eventTitle?: string;
  eventImage?: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export type Language = 'en' | 'sv';

export interface Translations {
  en: Record<string, string>;
  sv: Record<string, string>;
}