'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Loader2, MapPin } from 'lucide-react';

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
        <div className="max-w-md mx-auto px-4 py-12">
        <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-primary-700" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
          <p className="text-text-secondary text-lg">
            We've sent a verification code to <span className="font-medium text-text">{email}</span>
          </p>
        </div>

        <button
          onClick={() => router.push('/auth/verify')}
          className="btn-primary text-lg w-full"
        >
          Verify OTP
        </button>

        <div className="mt-8 text-center">
          <button
            onClick={() => setOtpSent(false)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-12">
        <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold">Neighbourly</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="text-text-secondary text-lg">
            Enter your email to receive a verification code
          </p>
        </div>

        <form onSubmit={handleSendOtp} className="space-y-6">
          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="input-label">
              Email Address
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
              'Send Verification Code'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-border-light text-center">
          <p className="text-text-secondary">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary-600 hover:text-primary-700 font-medium">
              Join Neighbourly
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
