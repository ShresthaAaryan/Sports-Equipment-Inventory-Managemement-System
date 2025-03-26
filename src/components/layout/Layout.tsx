
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Sidebar />
      <main className="pt-16 ml-[240px] flex-1 transition-all duration-300">
        <div className="px-6 py-6 max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
      <div className="ml-[240px] transition-all duration-300">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
