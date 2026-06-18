'use client';

import { useEffect, useState } from 'react';

export interface City {
  id: string;
  name: string;
}

export interface Area {
  id: string;
  name: string;
  city_id: string;
  latitude?: number;
  longitude?: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  area_id: string;
  postal_code?: string;
}

export function useLocations() {
  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all cities
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cities');
      if (!response.ok) throw new Error('Failed to fetch cities');
      const data = await response.json();
      setCities(data.data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching cities:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch areas by city
  const fetchAreasByCity = async (cityId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/areas?cityId=${cityId}`);
      if (!response.ok) throw new Error('Failed to fetch areas');
      const data = await response.json();
      setAreas(data.data || []);
      setNeighborhoods([]); // Reset neighborhoods
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching areas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch neighborhoods by area
  const fetchNeighborhoodsByArea = async (areaId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/neighborhoods?areaId=${areaId}`);
      if (!response.ok) throw new Error('Failed to fetch neighborhoods');
      const data = await response.json();
      setNeighborhoods(data.data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching neighborhoods:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    cities,
    areas,
    neighborhoods,
    loading,
    error,
    fetchCities,
    fetchAreasByCity,
    fetchNeighborhoodsByArea,
  };
}
