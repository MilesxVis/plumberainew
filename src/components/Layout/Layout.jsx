import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Navbar onMenuToggle={() => setCollapsed((v) => !v)} sidebarCollapsed={collapsed} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
