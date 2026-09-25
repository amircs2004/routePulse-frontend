'use client';
import { useState } from 'react';

export function Footer() {
  return (
    <footer className="border-t border-stone-200/60 bg-white/50 backdrop-blur-md py-5 px-6 sm:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 gap-4">
      <p className="font-medium">
        © 2026 <span className="text-stone-700 font-semibold">RoutePulse</span> & Smart Supermarket System. All rights reserved.
      </p>
      <div className="flex items-center space-x-6 font-medium">
        <a href="#" className="hover:text-orange-600 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-orange-600 transition-colors">
          Terms of Service
        </a>
        <a href="#" className="hover:text-orange-600 transition-colors">
          Support
        </a>
      </div>
    </footer>
  );
}

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-68 border-r border-stone-200/80 bg-white/95 backdrop-blur-xl p-5 sm:p-6 flex flex-col min-h-screen shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:min-h-[calc(100vh-4rem)] shadow-xl md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Close Header */}
        <div className="flex items-center justify-between md:hidden mb-6 pb-4 border-b border-stone-100">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/20">
              RP
            </div>
            <span className="font-bold text-stone-900 text-sm tracking-tight">Navigation</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Navigation Menu Links */}
        <div className="space-y-1.5">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
            Platform Menu
          </p>
          
          <a
            href="/dashboard"
            onClick={onClose}
            className="group relative flex items-center space-x-3 rounded-xl bg-orange-50/80 px-3.5 py-2.5 text-sm font-semibold text-orange-950 transition-all border border-orange-200/50 shadow-xs"
          >
            <span className="text-base">📊</span>
            <span>Dashboard</span>
            <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-orange-500" />
          </a>

          <a
            href="/dashboard/ordersAndRoutes"
            onClick={onClose}
            className="group flex items-center space-x-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100/70 hover:text-stone-900 transition-all"
          >
            <span className="text-base group-hover:scale-110 transition-transform">📦</span>
            <span>Orders & Routes</span>
          </a>

          <a
            href="/dashboard/settings"
            onClick={onClose}
            className="group flex items-center space-x-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100/70 hover:text-stone-900 transition-all"
          >
            <span className="text-base group-hover:scale-110 transition-transform">⚙️</span>
            <span>Settings</span>
          </a>
        </div>

        {/* Bottom Help Card */}
        <div className="mt-auto pt-6 border-t border-stone-100">
          <div className="rounded-2xl bg-gradient-to-br from-stone-50 to-orange-50/30 p-4 border border-stone-200/60 shadow-xs">
            <p className="text-xs font-bold text-stone-900">Dispatcher Support</p>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              Need assistance with live route tracking? Check the docs.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-200/80 bg-white/80 px-4 sm:px-8 backdrop-blur-xl shadow-xs">
      <div className="flex items-center space-x-3.5">
        {/* Mobile Hamburger Trigger */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors focus:outline-none"
          aria-label="Open Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-bold text-sm shadow-md shadow-orange-500/20">
            RP
          </div>
          <div>
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-stone-900 block leading-tight">
              RoutePulse
            </span>
            <span className="text-[10px] font-medium text-stone-400 tracking-wider uppercase block">
              Logistics & Fleet
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Online Status Pill */}
        <div className="inline-flex items-center rounded-full bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/70 shadow-2xs backdrop-blur-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse shadow-xs shadow-emerald-500/50"></span>
          System Online
        </div>
      </div>
    </header>
  );
}