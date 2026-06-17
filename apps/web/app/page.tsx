'use client';

import { useState, useEffect } from 'react';
import { MapPin, Heart, MessageSquare, ShoppingBag, Users, Bell } from 'lucide-react';
import { supabase, getAreasByCity } from '@repo/utils';
import { User } from '@repo/types';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<'Delhi' | 'Noida' | 'Ghaziabad'>('Delhi');

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Fetch profile data
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUser(data);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  }

  const features = [
    { icon: MessageSquare, title: 'Feed', description: 'Share and discuss with neighbors' },
    { icon: ShoppingBag, title: 'Marketplace', description: 'Buy and sell locally' },
    { icon: Users, title: 'Groups', description: 'Join local communities' },
    { icon: Bell, title: 'Alerts', description: 'Stay updated with neighborhood news' },
    { icon: Heart, title: 'Events', description: 'Discover local events' },
    { icon: MapPin, title: 'Explore', description: 'Find services around you' },
  ];

  const cities = ['Delhi', 'Noida', 'Ghaziabad'] as const;
  const areas = getAreasByCity(selectedCity);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">Neighbourly</div>
            <a
              href="/auth/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Connect with Your Neighbors
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Welcome to Neighbourly - Your community hub for sharing, discovering, and growing together in your neighborhood.
          </p>
          <a
            href="/auth/signup"
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 inline-block"
          >
            Get Started
          </a>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cities & Areas Preview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Available in 3 Cities</h2>
            
            {/* City Tabs */}
            <div className="flex justify-center gap-4 mb-8">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-6 py-2 rounded-lg font-semibold transition ${
                    selectedCity === city
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Areas Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {areas.map((area) => (
                <div
                  key={area.id}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition text-center"
                >
                  <MapPin className="w-5 h-5 mx-auto mb-2 text-green-600" />
                  <p className="font-semibold text-sm">{area.name}</p>
                  {area.pincode && <p className="text-xs text-gray-500">{area.pincode}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2024 Neighbourly. Building communities one neighborhood at a time.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Neighbourly</div>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.name}!</span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-red-600 hover:text-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to Neighbourly Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <a
              key={feature.title}
              href={`/${feature.title.toLowerCase()}`}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <feature.icon className="w-8 h-8 mb-4 text-blue-600" />
              <h2 className="font-semibold text-lg">{feature.title}</h2>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
