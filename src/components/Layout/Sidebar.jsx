import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Building2, ClipboardCheck, Wrench,
  BarChart2, ClipboardList, Settings, ChevronLeft, ChevronRight, Droplets
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/',            label: 'Dashboard',       icon: LayoutDashboard,  end: true },
  { to: '/properties',  label: 'Properties',       icon: Building2 },
  { to: '/fixtures',    label: 'Fixtures Library', icon: Wrench },
  { to: '/work-orders', label: 'Work Orders',       icon: ClipboardList },
  { to: '/reports',     label: 'Reports',          icon: BarChart2 },
  { to: '/settings',    label: 'Settings',         icon: Settings },
];

const Sidebar = ({ collapsed, onToggle }) => {
  return (
    <aside
      className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out flex-shrink-0
        ${collapsed ? 'w-16' : 'w-60'}`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-700/60 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Droplets className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold tracking-tight">
            Plumber<span className="text-indigo-400">AI</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-150
              ${isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }
              ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-gray-700/60 p-2">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="ml-2 text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
