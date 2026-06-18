'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageSquare, ShoppingBag, Users, Shield, Heart, MapPin } from 'lucide-react';
import { supabase, useLocations } from '@repo/utils';
import { User } from '@repo/types';
import { Navbar } from '@/components/Navbar';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { cities, areas } = useLocations();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push('/auth/login');
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!data) {
        router.push('/auth/complete-profile');
      } else {
        setUser(data);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }

  const features = [
    {
      icon: MessageSquare,
      title: 'Community Feed',
      description: 'Share and discuss with neighbors',
      link: '/feed',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: ShoppingBag,
      title: 'Local Marketplace',
      description: 'Buy and sell items locally',
      link: '/marketplace',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Users,
      title: 'Neighborhood Groups',
      description: 'Join local community groups',
      link: '/groups',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Shield,
      title: 'Safety Alerts',
      description: 'Stay informed about local safety',
      link: '/safety',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Heart,
      title: 'Events',
      description: 'Find local events and activities',
      link: '/events',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: MapPin,
      title: 'Explore',
      description: 'Discover local services',
      link: '/explore',
      color: 'bg-teal-100 text-teal-600',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-text mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-text-secondary">
            Let's check what's happening in your neighborhood today
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.link}
              className="card card-hover p-8 flex items-start gap-6 group"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold text-text mb-6">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="btn-primary">
              Create Post
            </button>
            <button className="btn-secondary">
              Add Listing
            </button>
            <Link href="/profile" className="btn-secondary flex items-center justify-center">
              View Profile
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-red-600 font-medium hover:bg-red-50 py-3 px-6 rounded-xl transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
