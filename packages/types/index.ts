// User & Auth Types
export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  city: 'Delhi' | 'Noida' | 'Ghaziabad';
  area: string;
  address?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Post & Feed Types
export interface Post {
  id: string;
  user_id: string;
  area_id: string;
  content: string;
  images?: string[];
  category: 'recommendation' | 'question' | 'alert' | 'lost_pet' | 'event';
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

// Marketplace Types
export interface Listing {
  id: string;
  user_id: string;
  area_id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  status: 'active' | 'sold' | 'removed';
  created_at: string;
  updated_at: string;
}

// Group Types
export interface Group {
  id: string;
  area_id: string;
  name: string;
  description: string;
  image_url?: string;
  members_count: number;
  created_by: string;
  created_at: string;
}

// Alert Types
export interface Alert {
  id: string;
  area_id: string;
  title: string;
  description: string;
  type: 'safety' | 'event' | 'announcement' | 'weather';
  severity: 'low' | 'medium' | 'high';
  created_at: string;
}

// Event Types
export interface Event {
  id: string;
  area_id: string;
  user_id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url?: string;
  attendees_count: number;
  created_at: string;
}

// Area & City Types
export interface Area {
  id: string;
  city: string;
  name: string;
  pincode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface City {
  id: string;
  name: 'Delhi' | 'Noida' | 'Ghaziabad';
  areas: Area[];
}

// Message Types
export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  user1_id: string;
  user2_id: string;
  last_message?: Message;
  updated_at: string;
}
