import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/auth/reset-password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, action, otp, newPassword } = body;

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Action 1: Send password reset OTP
    if (action === 'send-reset-otp') {
      if (!email) {
        return NextResponse.json(
          { error: 'Email is required' },
          { status: 400 }
        );
      }

      // Use Supabase's password recovery OTP
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/verify-reset`,
      });

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: 'Password reset OTP sent to email' },
        { status: 200 }
      );
    }

    // Action 2: Verify reset OTP and update password
    if (action === 'verify-reset-otp') {
      if (!email || !otp) {
        return NextResponse.json(
          { error: 'Email and OTP are required' },
          { status: 400 }
        );
      }

      // Create a session with the recovery token
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'recovery',
      });

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      // If new password provided, update it
      if (newPassword) {
        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (updateError) {
          return NextResponse.json(
            { error: updateError.message },
            { status: 400 }
          );
        }
      }

      return NextResponse.json(
        {
          data,
          message: 'Password reset successful. You can now login with new password.',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
