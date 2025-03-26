
import { useState } from 'react';
import { ShoppingCart, Plus, FileText, TrendingUp, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Mock data
const pendingOrders = [
  {
    id: 'PO-2023-001',
    supplier: 'Sports Direct',
    items: [
      { name: 'Basketball', quantity: 10, price: 25.99 },
      { name: 'Basketball Net', quantity: 2, price: 35.50 },
    ],
    total: 330.90,
    status: 'Pending Approval',
    requestedBy: 'John Smith',
    requestDate: '2023-06-15',
  },
  {
    id: 'PO-2023-002',
    supplier: 'Athletic Equipment Co.',
    items: [
      { name: 'Tennis Rackets', quantity: 5, price: 75.99 },
      { name: 'Tennis Balls (Set of 3)', quantity: 20, price: 12.50 },
    ],
    total: 629.95,
    status: 'Processing',
    requestedBy: 'Jane Doe',
    requestDate: '2023-06-18',
  },
  {
    id: 'PO-2023-003',
    supplier: 'Fitness World',
    items: [
      { name: 'Yoga Mats', quantity: 15, price: 22.99 },
      { name: 'Resistance Bands', quantity: 10, price: 15.75 },
    ],
    total: 502.35,
    status: 'Pending Approval',
    requestedBy: 'Mike Johnson',
    requestDate: '2023-06-20',
  },
];

const recentOrders = [
  {
    id: 'PO-2023-004',
    supplier: 'Global Sports',
    items: [
      { name: 'Soccer Balls', quantity: 8, price: 32.99 },
      { name: 'Goal Nets', quantity: 1, price: 129.50 },
    ],
    total: 393.42,
    status: 'Delivered',
    requestedBy: 'Sarah Wilson',
    requestDate: '2023-06-10',
    deliveryDate: '2023-06-17',
  },
  {
    id: 'PO-2023-005',
    supplier: 'Swimming Supplies Inc.',
    items: [
      { name: 'Swim Goggles', quantity: 25, price: 15.99 },
      { name: 'Swim Caps', quantity: 25, price: 8.50 },
    ],
    total: 611.25,
    status: 'Shipped',
    requestedBy: 'Tom Brown',
    requestDate: '2023-06-12',
    deliveryDate: '2023-06-19',
  },
];

const vendors = [
  {
    id: 'V001',
    name: 'Sports Direct',
    contactPerson: 'Robert Johnson',
    email: 'robert@sportsdirect.com',
    phone: '(555) 123-4567',
    address: '123 Sports Ave, New York, NY',
    categories: ['Basketball', 'Soccer', 'Tennis'],
  },
  {
    id: 'V002',
    name: 'Athletic Equipment Co.',
    contactPerson: 'Amanda Smith',
    email: 'amanda@athleticequip.com',
    phone: '(555) 987-6543',
    address: '456 Athletic Blvd, Chicago, IL',
    categories: ['Tennis', 'Badminton', 'Table Tennis'],
  },
  {
    id: 'V003',
    name: 'Fitness World',
    contactPerson: 'Michael Lee',
    email: 'michael@fitnessworld.com',
    phone: '(555) 456-7890',
    address: '789 Fitness St, Los Angeles, CA',
    categories: ['Fitness', 'Yoga', 'Training'],
  },
  {
    id: 'V004',
    name: 'Global Sports',
    contactPerson: 'Jessica Brown',
    email: 'jessica@globalsports.com',
    phone: '(555) 234-5678',
    address: '321 Global Rd, Austin, TX',
    categories: ['Soccer', 'Rugby', 'Cricket'],
  },
  {
    id: 'V005',
    name: 'Swimming Supplies Inc.',
    contactPerson: 'David Wilson',
    email: 'david@swimmingsupplies.com',
    phone: '(555) 876-5432',
    address: '654 Aquatic Dr, Miami, FL',
    categories: ['Swimming', 'Diving', 'Water Sports'],
  },
];

const Procurement = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending Approval':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Approval</Badge>;
      case 'Processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>;
      case 'Shipped':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Shipped</Badge>;
      case 'Delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending Approval':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Processing':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'Shipped':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'Delivered':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleCreateOrder = () => {
    toast({
      title: "Create New Order",
      description: "You selected to create a new procurement order",
    });
  };

  const handleViewOrder = (orderId: string) => {
    toast({
      title: "View Order Details",
      description: `You selected to view details for order: ${orderId}`,
    });
  };

  const handleAddVendor = () => {
    toast({
      title: "Add New Vendor",
      description: "You selected to add a new vendor",
    });
  };

  const handleViewVendor = (vendorId: string) => {
    toast({
      title: "View Vendor Details",
      description: `You selected to view details for vendor: ${vendorId}`,
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Procurement Management</h1>
          <p className="text-muted-foreground">Manage orders, vendors, and procurement processes</p>
        </div>
        <Button onClick={handleCreateOrder}>
          <Plus className="mr-2 h-4 w-4" /> Create Order
        </Button>
      </div>

      <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="orders" className="text-sm">Orders</TabsTrigger>
          <TabsTrigger value="vendors" className="text-sm">Vendors</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-8 animate-fade-in">
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Orders</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingOrders.map((order) => (
                <Card key={order.id} className="transition-all duration-300 hover:shadow-md hover:border-primary/50">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl">{order.id}</CardTitle>
                      <CardDescription>{order.supplier}</CardDescription>
                    </div>
                    {getStatusBadge(order.status)}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-border flex justify-between font-medium">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-muted-foreground">
                      Requested by {order.requestedBy} on {order.requestDate}
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleViewOrder(order.id)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentOrders.map((order) => (
                <Card key={order.id} className="transition-all duration-300 hover:shadow-md hover:border-primary/50">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl">{order.id}</CardTitle>
                      <CardDescription>{order.supplier}</CardDescription>
                    </div>
                    {getStatusBadge(order.status)}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-border flex justify-between font-medium">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-muted-foreground">
                      {order.status === 'Delivered' ? 'Delivered' : 'Expected'} on {order.deliveryDate}
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleViewOrder(order.id)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Vendor Directory</h2>
            <Button size="sm" onClick={handleAddVendor}>
              <Plus className="mr-2 h-4 w-4" /> Add Vendor
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <Card key={vendor.id} className="transition-all duration-300 hover:shadow-md hover:border-primary/50">
                <CardHeader>
                  <CardTitle>{vendor.name}</CardTitle>
                  <CardDescription>ID: {vendor.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start text-sm">
                    <span className="font-medium w-28">Contact Person:</span>
                    <span>{vendor.contactPerson}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <span className="font-medium w-28">Email:</span>
                    <span>{vendor.email}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <span className="font-medium w-28">Phone:</span>
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <span className="font-medium w-28">Address:</span>
                    <span>{vendor.address}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-sm font-medium">Categories:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {vendor.categories.map((category, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => handleViewVendor(vendor.id)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Procurement;
