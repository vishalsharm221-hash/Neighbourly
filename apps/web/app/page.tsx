'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Heart, MessageSquare, ShoppingBag, Users, Bell, CheckCircle2, Shield, Sparkles, Menu } from 'lucide-react';
import { supabase, useLocations } from '@repo/utils';
import { User } from '@repo/types';
import { Navbar } from '@/components/Navbar';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCityId, setSelectedCityId] = useState<string>('');
  
  const { cities, areas, fetchAreasByCity } = useLocations();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (cities.length > 0 && !selectedCityId) {
      setSelectedCityId(cities[0].id);
    }
  }, [cities]);

  useEffect(() => {
    if (selectedCityId) {
      fetchAreasByCity(selectedCityId);
    }
  }, [selectedCityId, fetchAreasByCity]);

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
    { 
      icon: MessageSquare, 
      title: 'Community Feed', 
      description: 'Stay connected with neighbors',
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      icon: ShoppingBag, 
      title: 'Local Marketplace', 
      description: 'Buy & sell nearby',
      color: 'bg-green-100 text-green-600'
    },
    { 
      icon: Users, 
      title: 'Neighborhood Groups', 
      description: 'Join local communities',
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      icon: Shield, 
      title: 'Safety Alerts', 
      description: 'Stay safe together',
      color: 'bg-orange-100 text-orange-600'
    },
    { 
      icon: Heart, 
      title: 'Local Events', 
      description: 'Discover what\'s happening',
      color: 'bg-pink-100 text-pink-600'
    },
    { 
      icon: MapPin, 
      title: 'Local Services', 
      description: 'Find help nearby',
      color: 'bg-teal-100 text-teal-600'
    },
  ];

  const benefits = [
    { icon: CheckCircle2, text: 'Trusted neighbors only' },
    { icon: CheckCircle2, text: 'Verified profiles' },
    { icon: CheckCircle2, text: 'Hyperlocal focus' },
    { icon: CheckCircle2, text: 'Safe & secure' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading Neighbourly...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar isLoggedIn={false} />

        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 pill bg-primaryLight text-primary px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">For Delhi • Noida • Ghaziabad</span>
                </div>
                <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold text-text leading-tight text-balance">
                  Your <span className="text-primary">Neighborhood</span>,
                  <br />All in One Place
                </h1>
                <p className="mt-6 text-xl text-text-secondary max-w-xl mx-auto lg:mx-0">
                  Neighbourly connects you with your local community for sharing, helping, and growing together.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/auth/signup" className="btn-primary text-lg px-8">
                    Join Neighbourly
                  </Link>
                  <Link href="/auth/login" className="btn-secondary text-lg px-8">
                    Log In
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start gap-x-6">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-text-secondary">
                      <benefit.icon className="w-5 h-5 text-primary" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="card p-6 h-48 bg-gradient-to-br from-primaryLight to-primary rounded-xl"></div>
                    <div className="card p-6 h-32 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl"></div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="card p-6 h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"></div>
                    <div className="card p-6 h-48 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-text">Everything Your Neighborhood Needs</h2>
              <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
                Built for local connection, safety, and convenience right where you live
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Link key={feature.title} href="#" className="card card-hover p-8 group">
                  <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cities & Areas Preview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-text">Now Live in Your City</h2>
              <p className="mt-4 text-lg text-text-secondary">
                Explore neighborhoods across Delhi, Noida, and Ghaziabad
              </p>
            </div>
            
            {/* City Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCityId(city.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    selectedCityId === city.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-text border border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>

            {/* Areas Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {areas.map((area) => (
                <div
                  key={area.id}
                  className="card card-hover p-6 text-center cursor-pointer"
                >
                  <div className="w-10 h-10 bg-primaryLight rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-semibold">{area.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primaryLight">
          <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-text mb-6">Ready to join your neighborhood?</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Thousands of neighbors are already connecting on Neighbourly. Join today and start discovering your local community.
          </p>
          <Link href="/auth/signup" className="btn-primary text-lg px-10">
            Get Started for Free
          </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Neighbourly</span>
              </div>
              <div className="flex gap-8 text-sm">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">About</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Help</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">Terms</Link>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              <p>&copy; 2024 Neighbourly. Building communities one neighborhood at a time.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-text-secondary">What's happening in your neighborhood today?</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={`/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="card card-hover p-8 group"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
