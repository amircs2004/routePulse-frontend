'use client';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SignupPage() {
  
  const handleGoogleAuth = async (roleSelection) => {
    // 1. Store the role using sessionStorage
    sessionStorage.setItem('pendingRole', roleSelection);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("OAuth error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <button onClick={() => handleGoogleAuth('Customer')} className="px-4 py-2 bg-blue-600 text-white rounded">
        Sign up as Customer
      </button>
      <button onClick={() => handleGoogleAuth('Driver')} className="px-4 py-2 bg-green-600 text-white rounded">
        Sign up as Driver
      </button>
    </div>
  );
}