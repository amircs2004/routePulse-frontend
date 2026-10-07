import Link from 'next/link';
import OrangeIllustration from '../../components/customerDrawings/OrangeIllustration';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-[#FF6B35]/20 font-sans relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Soft Organic Glows (Unified Olive & Terracotta Palette) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#162B22]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Navigation Bar */}
      <nav className="max-w-7xl w-full mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/20">
            RP
          </div>
          <span className="text-xl font-extrabold tracking-tight text-stone-900">RoutePulse</span>
        </div>
        
        <Link 
          href="/dashboard"
          className="px-6 py-2.5 rounded-full bg-[#162B22] hover:bg-[#1e3b2f] text-white text-sm font-semibold shadow-lg shadow-emerald-900/10 transition-all flex items-center gap-2 group"
        >
          <span>Enter Dashboard</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl w-full mx-auto px-6 pt-8 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        
        {/* Left Editorial Content (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#162B22]/10 border border-[#162B22]/15 text-[#162B22] text-xs font-bold tracking-wide uppercase">
            <span>Next-Gen Fleet & Logistics</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-stone-900 leading-[1.1]">
            Do you want an <span className="text-[#FF6B35]">Optimized E-Commerce</span> culture & workflow?
          </h1>

          <p className="text-lg text-stone-600 max-w-xl leading-relaxed font-normal">
            Without taking away the joy of smooth operations 🍊. Seamlessly browse products and add items to your cart without an account, then create an account when you are ready to checkout and track!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link 
              href="/dashboard"
              className="px-8 py-4 rounded-2xl bg-[#FF6B35] hover:bg-[#e0531e] text-white font-bold text-base shadow-xl shadow-orange-500/25 transition-all flex items-center gap-3 group"
            >
              <span>Get Started Now</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/85 backdrop-blur-md border border-stone-200/80 shadow-sm">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#162B22] text-white flex items-center justify-center text-xs font-bold border-2 border-white">AM</div>
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] text-white flex items-center justify-center text-xs font-bold border-2 border-white">RP</div>
              </div>
              <div className="text-xs">
                <p className="font-bold text-stone-900">Synchronized Fleet</p>
                <p className="text-stone-500">Live operational status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty right column placeholder to keep text balanced */}
        <div className="lg:col-span-5 hidden lg:block" />

      </main>

      {/* Large Floating Orange Anchored at Right Bottom */}
      <div className="absolute -bottom-16 -right-12 pointer-events-none z-0 opacity-95">
        <div className="absolute inset-0 bg-[#162B22]/10 rounded-full blur-3xl" />
        <OrangeIllustration className="w-96 h-96 lg:w-[460px] lg:h-[460px] drop-shadow-2xl rotate-[-10deg]" />
      </div>

    </div>
  );
}