'use client';
import { getUser } from '../../lib/api';
import { useState, useEffect, useTransition } from 'react'; 
import { useRouter } from 'next/navigation';
import { Sidebar, Header, Footer } from '../../components/siteAnatomy';
import CustomerDashboard from '../../components/CustomerView';

export default function DashBOARD() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Added mobile sidebar state

  useEffect(() => {
    startTransition(async () => {
      const responce = await getUser();
      
      console.log("Full API Response:", responce);

      if (responce && responce.data) {
        setUser(responce.data);
      } else {
        router.push('/auth');
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

  const userRole = user?.role?.trim();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Pass the menu toggle handler to the Header */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 relative">
        {/* Pass the open state and close handler to the Sidebar drawer */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-8 w-full">
          {/* User Welcome Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-200/80">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Welcome back, {user?.name} 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Role: <span className="font-semibold text-indigo-600">{user?.role}</span>
              </p>
            </div>
            <button 
              onClick={() => {
                sessionStorage.removeItem('token');
                router.push('/auth/log');
              }}
              className="rounded-xl bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors border border-red-100 shrink-0"
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