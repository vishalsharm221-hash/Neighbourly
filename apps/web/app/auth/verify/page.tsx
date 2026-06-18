'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { verifyOtp } from '@repo/utils';
import { Navbar } from '@/components/Navbar';

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
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={false} />
      <main className="max-w-md mx-auto px-4 py-20">
        <Link href="/auth/login" className="inline-flex items-center text-text-secondary hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to login
        </Link>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-text mb-4">Verify OTP</h1>
          <p className="text-text-secondary">
            We've sent a verification code to <strong className="text-text">{email}</strong>
          </p>
        </div>
        <form onSubmit={handleVerify} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-text mb-2">
              Enter 6-digit code
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              required
              className="input-field text-center text-2xl tracking-widest"
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
                Verifying...
              </span>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-text-secondary text-sm">
            Didn't receive the code?{' '}
            <button className="text-primary font-medium hover:text-primaryHover">
              Resend code
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
