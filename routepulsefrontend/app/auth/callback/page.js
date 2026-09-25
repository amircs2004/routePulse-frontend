//the callback page that google needs it grabs pendingRole from sessionstorage and send it to the backend 

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 1. Extract session from Supabase token hash parser
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          console.error("Session error:", error?.message);
          router.push('/auth');
          return;
        }

        const token = session.access_token;
        
        // 2. Read the role stored during click initialization
        const role = sessionStorage.getItem('pendingRole') || 'Customer';

        // 3. Dispatch POST request to your backend controller route
        const urlBase = process.env.url_base || 'https://newhopoe.vercel.app';
       
        const response = await fetch(`${urlBase}/api/google-auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ role })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.msg || 'Failed to sync user on backend');
        }

        // 4. Save the authorization token to sessionStorage for all subsequent API requests
        const jwtToken = result.token || result.data?.token || token;
        if (jwtToken) {
          sessionStorage.setItem('token', jwtToken);
        }

        // 5. Cleanup pending role in session storage
        sessionStorage.removeItem('pendingRole');

        // 6. Navigate to unified dashboard page (which handles roles dynamically)
        router.push('/dashboard');

      } catch (err) {
        console.error("Callback execution error:", err);
        router.push('/auth');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      <p className="text-gray-600 font-medium">Authenticating and synchronizing your profile...</p>
    </div>
  );
}