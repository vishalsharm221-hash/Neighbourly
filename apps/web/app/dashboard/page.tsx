'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Plus,
  MessageSquare,
  ShoppingBag,
  Users,
  Calendar,
  MapPin,
  User,
  Heart,
  Share2,
  MessageCircle,
  BookMarked,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { supabase } from '@repo/utils';
import { User as UserType } from '@repo/types';
import { Sidebar } from '@/components/Sidebar';

const mockPosts = [
  {
    id: 1,
    user: {
      name: 'Rahul Sharma',
      avatar: null,
      neighborhood: 'Sector 24, Rohini'
    },
    time: '2 hours ago',
    content: 'Is anyone interested in a neighborhood potluck this weekend? Let me know if you can make it!',
    likes: 12,
    comments: 8,
    shares: 2,
    type: 'discussion'
  },
  {
    id: 2,
    user: {
      name: 'Priya Singh',
      avatar: null,
      neighborhood: 'Rohini Sector 23'
    },
    time: '4 hours ago',
    content: 'Lost my dog near the park! If anyone sees a golden retriever named Max, please contact me immediately.',
    likes: 34,
    comments: 15,
    shares: 10,
    type: 'safety'
  },
  {
    id: 3,
    user: {
      name: 'Amit Verma',
      avatar: null,
      neighborhood: 'Pitampura'
    },
    time: 'Yesterday',
    content: 'Selling a used sofa in great condition. Asking ₹5000. DM me for more details and photos.',
    likes: 8,
    comments: 3,
    shares: 1,
    type: 'marketplace'
  }
];

const suggestedCommunities = [
  { id: 1, name: 'Rohini Sector 24 Residents', members: '2.5K' },
  { id: 2, name: 'Delhi Dog Lovers', members: '12K' },
  { id: 3, name: 'Rohini Parents Group', members: '5.2K' },
];

const trendingNearby = [
  { id: 1, title: 'Local Market on Sunday', location: 'Rohini Central Market', time: 'This Sunday' },
  { id: 2, title: 'Yoga in the Park', location: 'Central Park, Sector 24', time: 'Every morning' },
  { id: 3, title: 'Book Exchange Drive', location: 'Community Center', time: 'Next Saturday' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background md:pl-72">
      <Sidebar />
      
      <main className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Create Post Card */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-primary-700" />
            </div>
            <Link href="/create-post" className="flex-1">
              <div className="bg-surface border border-border-light rounded-xl px-5 py-3 text-text-secondary hover:text-text hover:border-primary-300 transition-all">
                What's on your mind, {user?.name?.split(' ')[0]}?
              </div>
            </Link>
            <button className="btn-primary p-3">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* AI Neighborhood Summary */}
        <div className="card p-6 mb-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Today's Neighborhood Summary</h3>
              <ul className="text-text-secondary space-y-1">
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success-600" />
                  <span>12 New Posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-600" />
                  <span>2 Events Happening</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-accent-600" />
                  <span>3 Local Deals</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-error-600" />
                  <span>1 Safety Alert</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-6">
            {mockPosts.map((post) => (
              <div key={post.id} className="card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{post.user.name}</p>
                        <p className="text-sm text-text-secondary flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {post.user.neighborhood} • {post.time}
                        </p>
                      </div>
                      <div className={`pill text-xs
                        ${post.type === 'safety' ? 'bg-error-100 text-error-700' :
                          post.type === 'marketplace' ? 'bg-accent-100 text-accent-700' :
                          'bg-primary-100 text-primary-700'
                        }`}
                      >
                        {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-text mb-4">{post.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-text-secondary hover:text-primary-700 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-text-secondary hover:text-primary-700 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-text-secondary hover:text-primary-700 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-text-secondary hover:text-primary-700 transition-colors">
                    <BookMarked className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Suggested Communities */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Suggested Communities</h3>
              <div className="space-y-4">
                {suggestedCommunities.map((community) => (
                  <div key={community.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-secondary-700" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{community.name}</p>
                        <p className="text-xs text-text-secondary">{community.members} members</p>
                      </div>
                    </div>
                    <button className="btn-outline py-2 px-4 text-sm">Join</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Nearby */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Trending Nearby</h3>
              <div className="space-y-4">
                {trendingNearby.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-accent-700" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-text-secondary">{item.location} • {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
