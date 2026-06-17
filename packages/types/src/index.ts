// User types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  location: Location;
  verified: boolean;
  joined_date: string;
  updated_at: string;
}

export interface Location {
  city: 'Ghaziabad' | 'Delhi' | 'Noida';
  area: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
}

// Post types
export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: PostCategory;
  location: Location;
  images?: string[];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  updated_at: string;
}

export type PostCategory =
  | 'discussion'
  | 'safety_alert'
  | 'lost_found'
  | 'recommendation'
  | 'event'
  | 'marketplace';

// Listing types (Marketplace)
export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: ListingCategory;
  price?: number;
  images: string[];
  location: Location;
  status: 'active' | 'sold' | 'archived';
  views_count: number;
  created_at: string;
  updated_at: string;
}

export type ListingCategory =
  | 'electronics'
  | 'furniture'
  | 'clothing'
  | 'books'
  | 'services'
  | 'other';

// Message types
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
  participant_ids: [string, string];
  last_message?: Message;
  updated_at: string;
}

// Group/Event types
export interface Group {
  id: string;
  name: string;
  description: string;
  category: GroupCategory;
  location: Location;
  members_count: number;
  image_url?: string;
  created_by: string;
  created_at: string;
}

export type GroupCategory =
  | 'sports'
  | 'hobbies'
  | 'parenting'
  | 'professional'
  | 'social'
  | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  location: Location;
  date: string;
  time: string;
  organizer_id: string;
  group_id?: string;
  attendees: string[];
  image_url?: string;
  created_at: string;
}

// Notification types
export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  related_id?: string;
  read: boolean;
  created_at: string;
}

export type NotificationType =
  | 'like'
  | 'comment'
  | 'message'
  | 'follow'
  | 'event_reminder'
  | 'safety_alert';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}
