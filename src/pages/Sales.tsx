
import { useState } from 'react';
import { DollarSign, Plus, BarChart2, PieChart, Users, ShoppingBag, CalendarDays, ArrowUpRight, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Mock data
const recentSales = [
  {
    id: 'S001',
    date: '2023-06-20',
    time: '14:30',
    customer: 'Community Center',
    items: [
      { name: 'Basketball (Size 7)', quantity: 5, price: 35.99 },
      { name: 'Jerseys (Set of 10)', quantity: 2, price: 249.99 },
    ],
    total: 679.93,
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
  {
    id: 'S002',
    date: '2023-06-19',
    time: '10:15',
    customer: 'Lincoln High School',
    items: [
      { name: 'Soccer Balls', quantity: 10, price: 29.99 },
      { name: 'Training Cones', quantity: 20, price: 3.99 },
    ],
    total: 379.70,
    paymentMethod: 'Purchase Order',
    status: 'Completed',
  },
  {
    id: 'S003',
    date: '2023-06-18',
    time: '16:45',
    customer: 'Sarah Johnson',
    items: [
      { name: 'Tennis Racket', quantity: 1, price: 89.99 },
      { name: 'Tennis Balls (Can of 3)', quantity: 2, price: 12.99 },
    ],
    total: 115.97,
    paymentMethod: 'Cash',
    status: 'Completed',
  },
  {
    id: 'S004',
    date: '2023-06-17',
    time: '09:30',
    customer: 'Westside Gym',
    items: [
      { name: 'Yoga Mats', quantity: 15, price: 24.99 },
      { name: 'Resistance Bands (Set)', quantity: 10, price: 18.99 },
    ],
    total: 564.75,
    paymentMethod: 'Bank Transfer',
    status: 'Pending',
  },
];

const topSellingItems = [
  { name: 'Basketball', category: 'Basketball', sold: 45, revenue: 1619.55 },
  { name: 'Soccer Ball', category: 'Soccer', sold: 38, revenue: 1139.62 },
  { name: 'Tennis Racket', category: 'Tennis', sold: 25, revenue: 2249.75 },
  { name: 'Yoga Mat', category: 'Fitness', sold: 52, revenue: 1299.48 },
  { name: 'Swimming Goggles', category: 'Swimming', sold: 63, revenue: 1133.97 },
];

const monthlyRevenue = [
  { month: 'Jan', revenue: 3250 },
  { month: 'Feb', revenue: 3750 },
  { month: 'Mar', revenue: 5200 },
  { month: 'Apr', revenue: 4800 },
  { month: 'May', revenue: 6300 },
  { month: 'Jun', revenue: 7840 },
];

const Sales = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
  const totalItemsSold = topSellingItems.reduce((sum, item) => sum + item.sold, 0);
  
  const handleNewSale = () => {
    toast({
      title: "Create New Sale",
      description: "You selected to create a new sale record",
    });
  };

  const handleViewSale = (saleId: string) => {
    toast({
      title: "View Sale Details",
      description: `You selected to view details for sale: ${saleId}`,
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Export Report",
      description: "You selected to export the sales report",
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Sales Management</h1>
          <p className="text-muted-foreground">Manage sales transactions and view reports</p>
        </div>
        <Button onClick={handleNewSale}>
          <Plus className="mr-2 h-4 w-4" /> New Sale
        </Button>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="transactions" className="text-sm">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Revenue"
              value={`$${totalRevenue.toLocaleString()}`}
              icon={<DollarSign className="h-6 w-6 text-primary" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Items Sold"
              value={totalItemsSold}
              icon={<ShoppingBag className="h-6 w-6 text-primary" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Unique Customers"
              value="28"
              icon={<Users className="h-6 w-6 text-primary" />}
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard
              title="Average Order Value"
              value={`$${(totalRevenue / recentSales.length).toFixed(2)}`}
              icon={<BarChart2 className="h-6 w-6 text-primary" />}
              trend={{ value: 2, isPositive: false }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DashboardCard 
              title="Monthly Revenue (2023)" 
              action={
                <Button variant="ghost" size="sm" onClick={handleExportReport}>
                  Export
                </Button>
              }
            >
              <div className="h-80 flex items-center justify-center">
                <div className="w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Revenue</span>
                    <span className="text-sm font-medium">Month</span>
                  </div>
                  <div className="space-y-2">
                    {monthlyRevenue.map((month) => (
                      <div key={month.month} className="relative pt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>${month.revenue.toLocaleString()}</span>
                          <span>{month.month}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${(month.revenue / 8000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Top Selling Items">
              <div className="space-y-4">
                {topSellingItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.sold} units</p>
                      <p className="text-xs text-muted-foreground">${item.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <Button variant="link" className="p-0 h-auto" onClick={() => setActiveTab('transactions')}>
                  View all transactions <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </DashboardCard>
          </div>

          <DashboardCard 
            title="Recent Sales" 
            action={
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('transactions')}>
                View All
              </Button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Customer</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.slice(0, 3).map((sale) => (
                    <tr key={sale.id} className="border-b border-border">
                      <td className="px-4 py-3 text-sm font-medium">{sale.id}</td>
                      <td className="px-4 py-3 text-sm">{sale.date}</td>
                      <td className="px-4 py-3 text-sm">{sale.customer}</td>
                      <td className="px-4 py-3 text-sm">${sale.total.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <Badge 
                          variant="outline" 
                          className={sale.status === 'Completed' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          }
                        >
                          {sale.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewSale(sale.id)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </TabsContent>

        <TabsContent value="transactions" className="animate-fade-in">
          <DashboardCard 
            title="All Sales Transactions" 
            action={
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportReport}
              >
                Export <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Sale ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date & Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Items</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Payment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale) => (
                    <tr key={sale.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-medium">{sale.id}</td>
                      <td className="px-4 py-3 text-sm">
                        <div>{sale.date}</div>
                        <div className="text-xs text-muted-foreground">{sale.time}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">{sale.customer}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-col gap-1">
                          {sale.items.map((item, idx) => (
                            <div key={idx} className="text-xs">
                              {item.quantity} × {item.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">${sale.total.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">{sale.paymentMethod}</td>
                      <td className="px-4 py-3">
                        <Badge 
                          variant="outline" 
                          className={sale.status === 'Completed' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          }
                        >
                          {sale.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewSale(sale.id)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Sales;
