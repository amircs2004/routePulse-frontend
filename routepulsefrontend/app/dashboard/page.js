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
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/70 text-slate-600 font-sans">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs sm:text-sm font-bold text-slate-700">Loading your dashboard...</p>
      </div>
    );
  } 

  const userRole = user?.role?.trim();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 font-sans text-slate-800 relative overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Pass the menu toggle handler to the Header */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 relative">
        {/* Pass the open state and close handler to the Sidebar drawer */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 w-full">
          {/* User Welcome Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-white/80 backdrop-blur-xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 border border-slate-200/70 transition-all">
            <div className="flex items-center gap-4">
              {/* Profile Avatar Badge */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0 uppercase">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                  Welcome back, {user?.name} <span className="inline-block animate-bounce">👋</span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400 font-medium">Role:</span>
                  <span className="px-2.5 py-0.5 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100/80 capitalize">
                    {user?.role || "User"}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                sessionStorage.removeItem('token');
                router.push('/auth/log');
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-rose-50/80 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-all border border-rose-100 shrink-0 active:scale-95 shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          </div>

          {/* Customer View Component */}
          {userRole?.toLowerCase() === 'customer' && <CustomerDashboard />}

          {/* Driver View Component Placeholder */}
          {userRole?.toLowerCase() === 'driver' && (
            <div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-200/70">
              <div className="flex items-start gap-4">
                <span className="p-3 bg-amber-50 rounded-2xl text-amber-600 border border-amber-100/80 text-xl shrink-0">
                  🚚
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">Driver Delivery Workspace</h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    Driver specific routes and controls go here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}