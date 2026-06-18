'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, Camera, Edit2, Save, X, Loader2 } from 'lucide-react';
import { supabase } from '@repo/utils';
import { Navbar } from '@/components/Navbar';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  verified: boolean;
  joined_date: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        router.push('/auth/login');
        return;
      }
      const data = await response.json();
      setProfile(data.data);
      setFormData({
        name: data.data.name,
        phone: data.data.phone || '',
        bio: data.data.bio || '',
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update profile');
      }

      const data = await response.json();
      setProfile(data.data);
      setEditing(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/dashboard" className="inline-flex items-center text-text-secondary hover:text-primary mb-8">
          <X className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="card overflow-hidden">
          {/* Cover */}
          <div className="h-40 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-20 mb-8">
              <div className="flex items-end gap-6">
                <div className="w-36 h-36 bg-white border-4 border-white rounded-full shadow-lg flex items-center justify-center overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-text-muted" />
                  )}
                </div>
                <div className="pb-4">
                  <h1 className="text-3xl font-bold text-text">{profile?.name}</h1>
                  {profile?.verified && (
                    <p className="text-primary font-medium flex items-center gap-2 mt-1">
                      ✓ Verified Member
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 sm:mt-0">
                <button
                  onClick={() => (editing ? handleSave() : setEditing(true))}
                  disabled={saving}
                  className={`btn-primary flex items-center gap-2 disabled:opacity-50`}
                >
                  {editing ? (
                    <>
                      {saving ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Save Changes
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-5 h-5" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-8">
                {error}
              </div>
            )}

            <div className="space-y-8">
              {/* Email */}
              <div className="flex gap-4 pb-8 border-b border-border">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-text-muted" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-text-muted uppercase mb-1">Email</p>
                  <p className="text-text">{profile?.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 pb-8 border-b border-border">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-text-muted" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-text-muted uppercase mb-1">Phone</p>
                  {editing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                      placeholder="Add phone number"
                    />
                  ) : (
                    <p className="text-text">{profile?.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="flex gap-4 pb-8 border-b border-border">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-text-muted" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-text-muted uppercase mb-1">Name</p>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      placeholder="Your name"
                    />
                  ) : (
                    <p className="text-text">{profile?.name}</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="flex gap-4 pb-8 border-b border-border">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Edit2 className="w-5 h-5 text-text-muted" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-text-muted uppercase mb-1">Bio</p>
                  {editing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="input-field resize-none"
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  ) : (
                    <p className="text-text">{profile?.bio || 'No bio provided'}</p>
                  )}
                </div>
              </div>

              {/* Member Since */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-text-muted" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-text-muted uppercase mb-1">Member Since</p>
                  <p className="text-text">
                    {profile?.joined_date ? new Date(profile.joined_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>

            {editing && (
              <div className="mt-10 flex gap-4">
                <button
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: profile?.name || '',
                      phone: profile?.phone || '',
                      bio: profile?.bio || '',
                    });
                  }}
                  className="btn-secondary flex-1"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary flex-1"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
