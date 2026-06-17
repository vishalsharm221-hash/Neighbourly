'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, MapPin, User, Mail, Phone } from 'lucide-react';

interface City {
  id: string;
  name: string;
}

interface Area {
  id: string;
  name: string;
  city_id: string;
}

interface Neighborhood {
  id: string;
  name: string;
  area_id: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: City, 2: Area, 3: Neighborhood, 4: Profile
  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

  // Form state
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch cities on mount
  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch('/api/cities');
        const { data } = await res.json();
        setCities(data);
        if (data.length > 0) setSelectedCity(data[0].id);
      } catch (err) {
        setError('Failed to load cities');
      }
    }
    fetchCities();
  }, []);

  // Fetch areas when city changes
  useEffect(() => {
    async function fetchAreas() {
      if (!selectedCity) return;
      try {
        const res = await fetch(`/api/areas?cityId=${selectedCity}`);
        const { data } = await res.json();
        setAreas(data);
        if (data.length > 0) setSelectedArea(data[0].id);
      } catch (err) {
        setError('Failed to load areas');
      }
    }
    fetchAreas();
  }, [selectedCity]);

  // Fetch neighborhoods when area changes
  useEffect(() => {
    async function fetchNeighborhoods() {
      if (!selectedArea) return;
      try {
        const res = await fetch(`/api/neighborhoods?areaId=${selectedArea}`);
        const { data } = await res.json();
        setNeighborhoods(data);
        if (data.length > 0) setSelectedNeighborhood(data[0].id);
      } catch (err) {
        setError('Failed to load neighborhoods');
      }
    }
    fetchNeighborhoods();
  }, [selectedArea]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Send OTP first
      const otpRes = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!otpRes.ok) {
        const data = await otpRes.json();
        throw new Error(data.error || 'Failed to send OTP');
      }

      // Store onboarding data in session
      sessionStorage.setItem(
        'onboardingData',
        JSON.stringify({
          email,
          name,
          phone,
          city_id: selectedCity,
          area_id: selectedArea,
          neighborhood_id: selectedNeighborhood,
        })
      );

      // Redirect to OTP verification
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getCityName = () => cities.find((c) => c.id === selectedCity)?.name || '';
  const getAreaName = () => areas.find((a) => a.id === selectedArea)?.name || '';
  const getNeighborhoodName = () =>
    neighborhoods.find((n) => n.id === selectedNeighborhood)?.name || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4">
        <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 text-sm">
          ← Back to Login
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 mx-1 rounded-full ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Step {step} of 4
          </p>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Step 1: City Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Where do you live?</h2>
              <p className="text-gray-600 mb-6">Select your city to get started</p>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city.id)}
                    className={`p-4 border-2 rounded-lg text-left transition ${
                      selectedCity === city.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <MapPin className="w-5 h-5 mb-2 inline-block mr-2 text-blue-600" />
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Area Selection */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Select your area</h2>
              <p className="text-gray-600 mb-6">
                {getCityName()} • {areas.length} areas available
              </p>

              <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
                {areas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`w-full p-3 border-2 rounded-lg text-left transition ${
                      selectedArea === area.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {area.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Neighborhood Selection */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose your neighborhood</h2>
              <p className="text-gray-600 mb-6">
                {getAreaName()} • {neighborhoods.length} neighborhoods
              </p>

              <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
                {neighborhoods.map((neighborhood) => (
                  <button
                    key={neighborhood.id}
                    onClick={() => setSelectedNeighborhood(neighborhood.id)}
                    className={`w-full p-3 border-2 rounded-lg text-left transition ${
                      selectedNeighborhood === neighborhood.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {neighborhood.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Profile Setup */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Complete your profile</h2>
              <p className="text-gray-600 mb-6">
                Located in {getNeighborhoodName()}, {getAreaName()}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 inline-block mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline-block mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline-block mr-2" />
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Privacy:</strong> Your location is shared with neighbors in your area. You can adjust privacy settings after signup.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
          >
            Back
          </button>

          <button
            onClick={step === 4 ? handleSubmit : handleNext}
            disabled={loading || (step === 4 && (!name || !email))}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : step === 4 ? 'Create Account' : 'Next'}
            {step < 4 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
