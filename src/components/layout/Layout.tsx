
import { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar onToggle={(collapsed) => setSidebarCollapsed(collapsed)} />
        <main className={`pt-16 flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-0 md:ml-[240px]'}`}>
          <div className="px-4 md:px-6 py-6 max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-[70px]' : 'ml-0 md:ml-[240px]'}`}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
