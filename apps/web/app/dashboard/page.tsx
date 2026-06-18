'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Plus, MapPin, LogOut } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  users?: { name: string; avatar_url?: string };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchUserAndPosts();
  }, []);

  useEffect(() => {
    if (selectedCity || selectedCategory !== 'all') {
      fetchPosts();
    }
  }, [selectedCity, selectedCategory]);

  async function fetchUserAndPosts() {
    try {
      const userRes = await fetch('/api/users');
      if (!userRes.ok) {
        router.push('/auth/login');
        return;
      }
      const userData = await userRes.json();
      setUser(userData.data);
      setSelectedCity(userData.data?.city || '');

      // Fetch posts
      fetchPosts(userData.data?.city);
    } catch (err) {
      console.error('Error fetching user:', err);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }

  async function fetchPosts(city?: string) {
    try {
      const params = new URLSearchParams();
      if (city) params.append('city', city);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      params.append('limit', '20');

      const response = await fetch(`/api/posts?${params}`);
      const data = await response.json();
      setPosts(data.data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Neighbourly</h1>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'discussion', label: 'Discussion', icon: '💬' },
    { id: 'safety_alert', label: 'Safety', icon: '🚨' },
    { id: 'lost_found', label: 'Lost & Found', icon: '🔍' },
    { id: 'recommendation', label: 'Recommendations', icon: '⭐' },
    { id: 'event', label: 'Events', icon: '🎉' },
    { id: 'marketplace', label: 'Marketplace', icon: '🛍️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Neighbourly</h1>
            {user && (
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {user.name}
              </p>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/profile" className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Profile
            </Link>
            <Link href="/messages" className="px-4 py-2 text-gray-700 hover:text-blue-600">
              Messages
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2">
          {/* Create Post Button */}
          <Link
            href="/create-post"
            className="bg-white rounded-lg shadow p-4 mb-6 flex items-center gap-3 hover:shadow-md transition cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-600">What's happening in your neighborhood?</p>
            </div>
          </Link>

          {/* Posts */}
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                  <div className="flex gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="font-semibold">{post.users?.name || 'Anonymous'}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">{post.content}</p>

                  <div className="flex justify-between pt-3 border-t text-gray-600">
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{post.likes_count}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{post.comments_count}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">No posts yet. Be the first to share!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Categories */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedCategory === cat.id
                      ? 'bg-blue-100 text-blue-600 font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link href="/marketplace" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
                🛍️ Browse Marketplace
              </Link>
              <Link href="/groups" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
                👥 Join Groups
              </Link>
              <Link href="/events" className="block px-4 py-2 rounded-lg hover:bg-gray-100">
                🎉 Local Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
