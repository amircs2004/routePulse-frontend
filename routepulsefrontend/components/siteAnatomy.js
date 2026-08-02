'use client';
import { useState } from 'react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-4 sm:py-6 px-4 sm:px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3 md:gap-0">
      <p>2026 RoutePulse & Smart Supermarket System. All rights reserved.</p>
      <div className="flex flex-wrap justify-center gap-4 sm:space-x-6">
        <a href="#" className="hover:text-gray-900 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-gray-900 transition-colors">
          Terms of Service
        </a>
        <a href="#" className="hover:text-gray-900 transition-colors">
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
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container (Responsive Drawer for mobile, sticky flex for desktop) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white p-4 sm:p-6 flex flex-col min-h-screen shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:min-h-[calc(100vh-4rem)]
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        {/* Mobile Close Button Header */}
        <div className="flex items-center justify-between md:hidden mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
              RP
            </div>
            <span className="font-bold text-gray-900">Navigation</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Menu
          </p>
          <a
            href="/dashboard"
            onClick={onClose}
            className="flex items-center space-x-3 rounded-lg bg-indigo-50 px-3.5 py-2.5 text-sm font-medium text-indigo-600 transition-colors"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </a>
          <a
            href="/dashboard/ordersAndRoutes"
            onClick={onClose}
            className="flex items-center space-x-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <span>📦</span>
            <span>Orders & Routes</span>
          </a>

          <a
            href="/dashboard/settings"
            onClick={onClose}
            className="flex items-center space-x-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <span>⚙️</span>
            <span>Settings</span>
          </a>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="rounded-xl bg-gray-50 p-4 border border-gray-200/60">
            <p className="text-xs font-semibold text-gray-900">Need Help?</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Check system documentation or dispatcher support.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger Menu Trigger */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors focus:outline-hidden"
          aria-label="Open Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-sm shrink-0">
          RP
        </div>
        <span className="text-base sm:text-lg font-bold tracking-tight text-gray-900 truncate">
          RoutePulse
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
          System Online
        </span>
      </div>
    </header>
  );
}