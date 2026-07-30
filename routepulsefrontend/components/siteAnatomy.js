export   function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
      <p>2026 RoutePulse & Smart Supermarket System. All rights reserved.</p>
      <div className="flex space-x-6 mt-3 md:mt-0">
        <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
      </div>
    </footer>
  );
} 


export  function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white p-6 min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Menu</p>
        <a 
          href="/dashboard" 
          className="flex items-center space-x-3 rounded-lg bg-indigo-50 px-3.5 py-2.5 text-sm font-medium text-indigo-600 transition-colors"
        >
          <span>📊</span>
          <span>Dashboard</span>
        </a>
        <a 
          href="/dashboard" 
          className="flex items-center space-x-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <span>📦</span>
          <span>Orders & Routes</span>
        </a>
        <a 
          href="/dashboard" 
          className="flex items-center space-x-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <span>⚙️</span>
          <span>Settings</span>
        </a>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="rounded-xl bg-gray-50 p-4 border border-gray-200/60">
          <p className="text-xs font-semibold text-gray-900">Need Help?</p>
          <p className="text-xs text-gray-500 mt-0.5">Check system documentation or dispatcher support.</p>
        </div>
      </div>
    </aside>
  );
}

export  function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-sm">
          RP
        </div>
        <span className="text-lg font-bold tracking-tight text-gray-900">RoutePulse</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
          System Online
        </span>
      </div>
    </header>
  );
}