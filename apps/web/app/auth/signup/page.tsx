'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Phone, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase, useLocations } from '@repo/utils';
import { Navbar } from '@/components/Navbar';

export default function SignupPage() {
  const router = useRouter();
  const { cities, areas, fetchAreasByCity, loading: locLoading } = useLocations();
  const [step, setStep] = useState<'email' | 'profile'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedAreaId, setSelectedAreaId] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch areas when city changes
  useEffect(() => {
    if (selectedCityId) {
      fetchAreasByCity(selectedCityId);
      setSelectedAreaId('');
    }
  }, [selectedCityId, fetchAreasByCity]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send OTP');
      } else {
        sessionStorage.setItem('signupEmail', email);
        setStep('profile');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!selectedAreaId) {
      setError('Please select an area');
      setLoading(false);
      return;
    }

    try {
      // First create the user profile
      const selectedArea = areas.find((a) => a.id === selectedAreaId);
      if (!selectedArea) {
        setError('Invalid area selected');
        setLoading(false);
        return;
      }

      // Create profile record
      const { error: profileError } = await supabase.from('profiles').insert({
        email,
        name,
        phone,
        city: selectedArea.city_id,
        area_id: selectedArea.id,
        address,
        verified: false,
      });

      if (profileError) {
        setError(profileError.message);
      } else {
        sessionStorage.removeItem('signupEmail');
        router.push('/auth/verify?signup=true');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'profile') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar isLoggedIn={false} />
        <main className="max-w-2xl mx-auto px-4 py-16">
          <Link href="/" className="inline-flex items-center text-text-secondary hover:text-primary mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-text mb-3">Complete your profile</h1>
            <p className="text-text-secondary">Tell us a little about yourself to get started</p>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                Phone number (optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="input-field pl-12"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-text mb-2">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <select
                  id="city"
                  value={selectedCityId}
                  onChange={(e) => setSelectedCityId(e.target.value)}
                  required
                  className="input-field pl-12 appearance-none bg-white"
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Area */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-text mb-2">
                Area
              </label>
              <select
                id="area"
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                required
                disabled={!selectedCityId || areas.length === 0}
                className="input-field disabled:opacity-50"
              >
                <option value="">Select an area</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-text mb-2">
                Address (optional)
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your address"
                className="input-field"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="btn-secondary flex-1"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={false} />
      <main className="max-w-md mx-auto px-4 py-20">
        <Link href="/" className="inline-flex items-center text-text-secondary hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-3">Create your account</h1>
          <p className="text-text-secondary">Enter your email to get started</p>
        </div>
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="input-field"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending code...
              </span>
            ) : (
              'Get started'
            )}
          </button>
        </form>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-text-secondary">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-medium hover:text-primaryHover">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
