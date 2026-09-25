import React from 'react';
import Link from 'next/link';


export default function PromoBanner({ onExplore }) {
 
 
    return (
    <div className="relative w-full rounded-3xl bg-[#162B22] text-white p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl border border-emerald-900/40">
      {/* todays  task is gonna make this componnant dynamic */ }
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-lime-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left Content Side */}
        <div className="flex-1 max-w-xl space-y-4 sm:space-y-5 text-left">
          
          {/* Limited Time Badge */}
          <span className="inline-block px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 rounded-full border border-emerald-800/60">
            Limited Time Only
          </span>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Shop More, <span className="text-[#FF6B35]">Save More!</span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-emerald-100/80 font-normal leading-relaxed">
            Discover amazing deals on your favorite supermarket products and lifestyle essentials.
          </p>

          {/* Feature Badges Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2.5 bg-emerald-900/40 backdrop-blur-md px-3 py-2 rounded-xl border border-emerald-800/40">
              <span className="text-base">🏷️</span>
              <span className="text-xs font-medium text-emerald-200">Best Prices Guaranteed</span>
            </div>
            <div className="flex items-center gap-2.5 bg-emerald-900/40 backdrop-blur-md px-3 py-2 rounded-xl border border-emerald-800/40">
              <span className="text-base">🔒</span>
              <span className="text-xs font-medium text-emerald-200">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2.5 bg-emerald-900/40 backdrop-blur-md px-3 py-2 rounded-xl border border-emerald-800/40">
              <span className="text-base">🚀</span>
              <span className="text-xs font-medium text-emerald-200">Fast Delivery Worldwide</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Link href = "/explore"  onClick={onExplore}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6B35] hover:bg-[#e85b24] text-white text-sm font-bold tracking-wide shadow-lg shadow-orange-900/20 transition-all duration-300 active:scale-[0.98]"
            > EXPLORE COLLECTION </Link>
          </div>
        </div>

        {/* Right Image & Floating Badge Side */}
        <div className="relative w-full lg:w-auto flex items-center justify-center">
          
          {/* Circular Floating Discount Badge */}
          <div className="absolute -top-4 -right-2 sm:right-4 z-20 w-24 h-24 sm:w-28 sm:h-28 bg-[#FF6B35] rounded-full flex flex-col items-center justify-center text-white shadow-xl border-4 border-[#162B22] animate-bounce-slow">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-90">Up to</span>
            <span className="text-xl sm:text-2xl font-extrabold leading-none">50%</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-90">Off</span>
          </div>

          {/* Promotional Image Container */}
          <div className="relative w-full max-w-md h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden bg-emerald-950/50 border border-emerald-800/40 flex items-center justify-center p-4">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800"
              alt="Promo Collection"
              className="w-full h-full object-cover rounded-xl opacity-90 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </div>
  );
}