'use client';
import { getUser } from '../../lib/api';
import { useState, useEffect, useTransition } from 'react'; 
import { useRouter } from 'next/navigation';
import { Sidebar , Header ,  Footer} from '../../components/siteAnatomy'

import CustomerDashboard from '../../components/CustomerView'

export default function DashBOARD() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const responce = await getUser();
      
      // DEBUG: Check what your API is actually returning in the browser console
      console.log("Full API Response:", responce);

      if (responce && responce.data) {
        setUser(responce.data);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
  }, [router]);

  if (loading || isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading your dashboard...</p>
      </div>
    );
  } 

  // Normalize role string to handle capitalization mismatches (e.g., "customer" vs "Customer")
  const userRole = user?.role?.trim();

  return (
  <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8 w-full">
          {/* User Welcome Banner */}
          <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm border border-gray-200/80">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Welcome back, {user?.name} 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Role: <span className="font-semibold text-indigo-600">{user?.role}</span>
              </p>
            </div>
            <button 
              onClick={() => {
                sessionStorage.removeItem('token');
                router.push('/login');
              }}
              className="rounded-xl bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors border border-red-100"
            >
              Log Out
            </button>
          </div>

          {/* Customer View Component */}
          {userRole?.toLowerCase() === 'customer' && <CustomerDashboard />}

          {/* Driver View Component Placeholder */}
          {userRole?.toLowerCase() === 'driver' && (
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200/80">
              <h2 className="text-lg font-bold text-gray-900 mb-2">🚚 Driver Delivery Workspace</h2>
              <p className="text-sm text-gray-500">Driver specific routes and controls go here.</p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  
  );
}