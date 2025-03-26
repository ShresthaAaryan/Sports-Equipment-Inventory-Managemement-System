
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const location = useLocation();
  const [notifications] = useState(3);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border h-16 flex items-center px-6 animate-fade-in">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-primary text-white font-bold rounded-lg h-8 w-8 flex items-center justify-center">SE</span>
            <span className="text-lg font-semibold tracking-tight">SEIMS</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to="/equipment" className={`nav-item ${location.pathname === '/equipment' ? 'active' : ''}`}>
            Equipment
          </Link>
          <Link to="/procurement" className={`nav-item ${location.pathname === '/procurement' ? 'active' : ''}`}>
            Procurement
          </Link>
          <Link to="/sales" className={`nav-item ${location.pathname === '/sales' ? 'active' : ''}`}>
            Sales
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                {notifications}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
