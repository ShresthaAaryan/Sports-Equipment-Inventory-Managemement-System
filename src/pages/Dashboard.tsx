
import { Package, Users, DollarSign, ShoppingCart, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Mock data for charts - in a real app this would come from an API
const recentActivities = [
  { id: 1, action: 'Equipment Check-in', user: 'John Doe', timestamp: '2 hours ago', item: 'Basketball Set' },
  { id: 2, action: 'New Order Placed', user: 'Jane Smith', timestamp: '3 hours ago', item: 'Tennis Rackets' },
  { id: 3, action: 'Maintenance Scheduled', user: 'Mike Johnson', timestamp: '5 hours ago', item: 'Gym Equipment' },
  { id: 4, action: 'Equipment Check-out', user: 'Sarah Wilson', timestamp: '1 day ago', item: 'Football Gear' },
  { id: 5, action: 'Inventory Update', user: 'Admin User', timestamp: '1 day ago', item: 'Multiple Items' },
];

const lowStockItems = [
  { id: 1, name: 'Tennis Balls', currentStock: 5, minimumStock: 10 },
  { id: 2, name: 'Basketball Jerseys', currentStock: 3, minimumStock: 15 },
  { id: 3, name: 'Swimming Goggles', currentStock: 7, minimumStock: 20 },
];

const pendingOrders = [
  { id: 1, orderNumber: 'ORD-2023-001', supplier: 'Sports Gear Inc.', date: '2023-06-15', status: 'Pending Approval' },
  { id: 2, orderNumber: 'ORD-2023-002', supplier: 'Athletic Equipment Co.', date: '2023-06-18', status: 'Processing' },
];

const Dashboard = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action triggered",
      description: `You clicked on "${action}"`,
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your sports equipment management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Equipment"
          value="1,234"
          icon={<Package className="h-6 w-6 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value="56"
          icon={<Users className="h-6 w-6 text-primary" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Monthly Sales"
          value="$12,345"
          icon={<DollarSign className="h-6 w-6 text-primary" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Pending Orders"
          value="8"
          icon={<ShoppingCart className="h-6 w-6 text-primary" />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Low Stock Alert" 
          className="lg:col-span-1"
          action={
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleAction("View all low stock items")}
            >
              View All
            </Button>
          }
        >
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 rounded-full p-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Current: {item.currentStock}, Min: {item.minimumStock}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleAction(`Order more ${item.name}`)}
                >
                  Order
                </Button>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard 
          title="Pending Orders" 
          className="lg:col-span-1"
          action={
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleAction("View all pending orders")}
            >
              View All
            </Button>
          }
        >
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 rounded-full p-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">{order.supplier} - {order.status}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAction(`View order ${order.orderNumber}`)}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard 
          title="Recent Activity" 
          className="lg:col-span-1"
          action={
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleAction("View all activity")}
            >
              View All
            </Button>
          }
        >
          <div className="space-y-4">
            {recentActivities.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="bg-blue-100 rounded-full p-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm">{activity.item}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.user}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </Layout>
  );
};

export default Dashboard;
