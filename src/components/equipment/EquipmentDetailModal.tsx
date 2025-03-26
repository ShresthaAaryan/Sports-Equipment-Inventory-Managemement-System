
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Box, Clipboard, DollarSign, BarChart } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'Available' | 'In Use' | 'Maintenance' | 'Retired';
  quantity: number;
  purchaseDate: string;
  purchasePrice: number;
  supplier: string;
  location: string;
  imageUrl: string;
  maintenanceHistory: Array<{
    date: string;
    description: string;
  }>;
}

interface EquipmentDetailModalProps {
  equipment: Equipment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EquipmentDetailModal = ({ equipment, open, onOpenChange }: EquipmentDetailModalProps) => {
  if (!equipment) return null;

  const getStatusColor = () => {
    switch (equipment.status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'In Use':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Retired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{equipment.name}</span>
            <Badge className={getStatusColor()}>{equipment.status}</Badge>
          </DialogTitle>
          <DialogDescription>
            Equipment ID: {equipment.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="md:col-span-2">
            <div className="rounded-lg overflow-hidden h-[200px] w-full">
              <img 
                src={equipment.imageUrl} 
                alt={equipment.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Details</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <Box className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">{equipment.category}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clipboard className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">{equipment.description}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Purchase Date</p>
                  <p className="text-sm text-muted-foreground">{formatDate(equipment.purchaseDate)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Inventory Information</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <BarChart className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Quantity</p>
                  <p className="text-sm text-muted-foreground">{equipment.quantity} units</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Purchase Price</p>
                  <p className="text-sm text-muted-foreground">{formatCurrency(equipment.purchasePrice)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Box className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Supplier</p>
                  <p className="text-sm text-muted-foreground">{equipment.supplier}</p>
                </div>
              </div>
            </div>
          </div>
          
          {equipment.maintenanceHistory.length > 0 && (
            <div className="md:col-span-2">
              <h4 className="text-sm font-medium mb-2">Maintenance History</h4>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipment.maintenanceHistory.map((maintenance, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2 text-sm">{formatDate(maintenance.date)}</td>
                        <td className="px-4 py-2 text-sm">{maintenance.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EquipmentDetailModal;
