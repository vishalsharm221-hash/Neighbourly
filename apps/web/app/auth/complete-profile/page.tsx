'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Phone, User } from 'lucide-react';

interface City {
  id: string;
  name: string;
}

interface Area {
  id: string;
  name: string;
}

interface Neighborhood {
  id: string;
  name: string;
}

export default function CompleteProfilePage() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    area: '',
    neighborhood: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch cities on mount
  useEffect(() => {
    fetchCities();
  }, []);

  // Fetch areas when city changes
  useEffect(() => {
    if (formData.city) {
      fetchAreas(formData.city);
      setFormData((prev) => ({ ...prev, area: '', neighborhood: '' }));
    }
  }, [formData.city]);

  // Fetch neighborhoods when area changes
  useEffect(() => {
    if (formData.area) {
      fetchNeighborhoods(formData.area);
      setFormData((prev) => ({ ...prev, neighborhood: '' }));
    }
  }, [formData.area]);

  async function fetchCities() {
    try {
      const response = await fetch('/api/cities');
      const data = await response.json();
      setCities(data.data || []);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  }

  async function fetchAreas(cityId: string) {
    try {
      const response = await fetch(`/api/areas?cityId=${cityId}`);
      const data = await response.json();
      setAreas(data.data || []);
    } catch (err) {
      console.error('Error fetching areas:', err);
    }
  }

  async function fetchNeighborhoods(areaId: string) {
    try {
      const response = await fetch(`/api/neighborhoods?areaId=${areaId}`);
      const data = await response.json();
      setNeighborhoods(data.data || []);
    } catch (err) {
      console.error('Error fetching neighborhoods:', err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          city_id: formData.city,
          area_id: formData.area,
          neighborhood_id: formData.neighborhood,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to complete profile');
      }

      // Profile completed successfully
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Complete Your Profile</h1>
            <p className="text-gray-600">Help us connect you with your neighborhood</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 font-bold ${
                    step <= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                <p className="text-sm text-gray-600">
                  {step === 1 && 'Personal'}
                  {step === 2 && 'Location'}
                  {step === 3 && 'Neighborhood'}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Personal Information</h2>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Selection */}
            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Location</h2>

              <div className="space-y-4">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area */}
                {formData.city && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area *
                    </label>
                    <select
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading || areas.length === 0}
                    >
                      <option value="">Select an area</option>
                      {areas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Neighborhood */}
                {formData.area && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Neighborhood *
                    </label>
                    <select
                      required
                      value={formData.neighborhood}
                      onChange={(e) =>
                        setFormData({ ...formData, neighborhood: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading || neighborhoods.length === 0}
                    >
                      <option value="">Select a neighborhood</option>
                      {neighborhoods.map((neighborhood) => (
                        <option key={neighborhood.id} value={neighborhood.id}>
                          {neighborhood.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                loading ||
                !formData.name ||
                !formData.city ||
                !formData.area ||
                !formData.neighborhood
              }
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Completing Profile...' : 'Complete Profile & Enter App'}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-semibold mb-1">📍 Why location matters?</p>
            <p>
              We use this information to show you relevant posts, events, and marketplace
              listings from your neighborhood.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
