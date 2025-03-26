
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, Package, ShoppingCart, 
  DollarSign, Users, Settings, BarChart, HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

const Sidebar = ({ onToggle }: SidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    if (onToggle) {
      onToggle(newCollapsedState);
    }
  };

  useEffect(() => {
    // Call onToggle on initial render to sync state
    if (onToggle) {
      onToggle(collapsed);
    }
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Equipment', icon: Package, path: '/equipment' },
    { name: 'Procurement', icon: ShoppingCart, path: '/procurement' },
    { name: 'Sales', icon: DollarSign, path: '/sales' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Reports', icon: BarChart, path: '/reports' },
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Help', icon: HelpCircle, path: '/help' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 bottom-0 bg-background border-r border-border transition-all duration-300 z-30",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex flex-col h-full py-4">
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "sidebar-item",
                  location.pathname === item.path && "active"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="px-2 mt-auto">
          <button
            onClick={toggleSidebar}
            className="sidebar-item w-full justify-center"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
