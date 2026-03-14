import { Bell, Search, Menu, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ onMenuToggle, sidebarCollapsed }) => {
  const [showUser, setShowUser] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 flex items-center justify-between px-4 h-14 flex-shrink-0 z-10">
      {/* Left: hamburger + search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties, fixtures…"
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUser((v) => !v)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </button>

          {showUser && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
              {['Profile', 'Settings', 'Sign out'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowUser(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
