'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Mail, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
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
        setOtpSent(true);
        sessionStorage.setItem('loginEmail', email);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (otpSent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar isLoggedIn={false} />
        <main className="max-w-2xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-primaryLight rounded-full flex items-center justify-center mx-auto mb-8">
              <Mail className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-text mb-4">Check Your Email</h1>
            <p className="text-lg text-text-secondary mb-8">
              We've sent a verification code to <strong className="text-text">{email}</strong>
            </p>
            <button
              onClick={() => router.push('/auth/verify')}
              className="btn-primary text-lg px-10"
            >
              Verify OTP
            </button>
            <div className="mt-8">
              <button
                onClick={() => setOtpSent(false)}
                className="text-primary hover:text-primaryHover font-medium"
              >
                Use a different email
              </button>
            </div>
          </div>
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
          <h1 className="text-3xl font-bold text-text mb-3">Welcome back</h1>
          <p className="text-text-secondary">Enter your email to receive a verification code</p>
        </div>
        <form onSubmit={handleSendOtp} className="space-y-6">
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
              'Send verification code'
            )}
          </button>
        </form>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-text-secondary">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary font-medium hover:text-primaryHover">
              Join Neighbourly
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
