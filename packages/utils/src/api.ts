import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// API utility functions
export async function apiCall<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: any,
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`/api${endpoint}`, {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}

// Auth utilities
export async function signUpWithEmail(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function sendOTP(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) throw error;
}

export async function verifyOTP(email: string, otp: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: 'email',
  });

  if (error) throw error;
  return data;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// Post utilities
export async function getPosts(city?: string, limit = 20, offset = 0) {
  let query = supabase.from('posts').select('*', { count: 'exact' });

  if (city) {
    query = query.eq('city', city);
  }

  return query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);
}

export async function createPost(postData: any) {
  return supabase.from('posts').insert([postData]).select();
}

// Marketplace utilities
export async function getListings(city?: string, category?: string, limit = 20, offset = 0) {
  let query = supabase.from('listings').select('*', { count: 'exact' });

  if (city) query = query.eq('city', city);
  if (category) query = query.eq('category', category);

  return query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);
}

export async function createListing(listingData: any) {
  return supabase.from('listings').insert([listingData]).select();
}

// Location utilities
export async function getAreasByCity(city: string) {
  return supabase
    .from('areas')
    .select('*')
    .eq('city_id', (await supabase.from('cities').select('id').eq('name', city)).data?.[0]?.id);
}

export async function getNeighborhoodsByArea(areaId: string) {
  return supabase.from('neighborhoods').select('*').eq('area_id', areaId);
}
