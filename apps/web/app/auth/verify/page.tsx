'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { verifyOtp } from '@repo/utils';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignup = searchParams.get('signup') === 'true';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const signupEmail = sessionStorage.getItem('signupEmail');
    const loginEmail = sessionStorage.getItem('loginEmail');
    setEmail(signupEmail || loginEmail || '');
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!otp || otp.length < 6) {
      setError('Please enter a valid OTP');
      setLoading(false);
      return;
    }

    try {
      const result = await verifyOtp(email, otp);

      if (result.error) {
        setError(result.error.message || 'Invalid OTP');
      } else {
        sessionStorage.removeItem('signupEmail');
        sessionStorage.removeItem('loginEmail');
        router.push(isSignup ? '/feed' : '/feed');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <Link href="/auth/login" className="flex items-center text-blue-600 mb-6 hover:text-blue-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <h1 className="text-3xl font-bold mb-2">Verify OTP</h1>
        <p className="text-gray-600 mb-6">
          We've sent a verification code to <strong>{email}</strong>
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Didn't receive the code?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
