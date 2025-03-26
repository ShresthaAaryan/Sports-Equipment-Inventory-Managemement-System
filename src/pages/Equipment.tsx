
import { useState } from 'react';
import { Search, Filter, PlusCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import EquipmentCard from '@/components/equipment/EquipmentCard';
import EquipmentDetailModal from '@/components/equipment/EquipmentDetailModal';
import EquipmentEditForm from '@/components/equipment/EquipmentEditForm';
import DeleteConfirmationDialog from '@/components/equipment/DeleteConfirmationDialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Dialog } from '@/components/ui/dialog';

// Mock data
const mockEquipment = [
  {
    id: '1',
    name: 'Professional Basketball',
    description: 'Official size professional basketball for indoor use.',
    category: 'Basketball',
    status: 'Available' as const,
    quantity: 15,
    purchaseDate: '2023-03-15',
    purchasePrice: 45.99,
    supplier: 'Sports Direct',
    location: 'Main Storage',
    imageUrl: 'https://images.unsplash.com/photo-1612118745058-ff61a5f8a148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1392&q=80',
    maintenanceHistory: [],
  },
  {
    id: '2',
    name: 'Tennis Racket Set',
    description: 'Professional grade tennis rackets with carbon fiber frame.',
    category: 'Tennis',
    status: 'In Use' as const,
    quantity: 8,
    purchaseDate: '2023-02-10',
    purchasePrice: 120.50,
    supplier: 'Tennis Gear Inc.',
    location: 'Tennis Court Storage',
    imageUrl: 'https://images.unsplash.com/photo-1617175581263-d950068bed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    maintenanceHistory: [
      { date: '2023-04-15', description: 'String tension adjustment' },
      { date: '2023-05-10', description: 'Grip replacement' },
    ],
  },
  {
    id: '3',
    name: 'Soccer Ball Set',
    description: 'FIFA approved soccer balls for professional matches.',
    category: 'Soccer',
    status: 'Available' as const,
    quantity: 20,
    purchaseDate: '2023-01-20',
    purchasePrice: 35.75,
    supplier: 'Global Sports',
    location: 'Field Equipment Room',
    imageUrl: 'https://images.unsplash.com/photo-1614632537423-5e1c1fc44951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    maintenanceHistory: [],
  },
  {
    id: '4',
    name: 'Volleyball Net',
    description: 'Regulation height volleyball net with steel cables.',
    category: 'Volleyball',
    status: 'Maintenance' as const,
    quantity: 3,
    purchaseDate: '2022-12-05',
    purchasePrice: 85.99,
    supplier: 'Sports Equipment Pro',
    location: 'Gym Storage',
    imageUrl: 'https://images.unsplash.com/photo-1562552476-8ac59b2a2e46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    maintenanceHistory: [
      { date: '2023-05-20', description: 'Net tension adjustment' },
      { date: '2023-06-01', description: 'Replace support poles' },
    ],
  },
  {
    id: '5',
    name: 'Swimming Goggles',
    description: 'Anti-fog competition swimming goggles.',
    category: 'Swimming',
    status: 'Available' as const,
    quantity: 25,
    purchaseDate: '2023-04-10',
    purchasePrice: 18.25,
    supplier: 'Aquatic Supplies',
    location: 'Pool Storage',
    imageUrl: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    maintenanceHistory: [],
  },
  {
    id: '6',
    name: 'Badminton Rackets',
    description: 'Lightweight carbon fiber badminton rackets.',
    category: 'Badminton',
    status: 'In Use' as const,
    quantity: 12,
    purchaseDate: '2023-02-28',
    purchasePrice: 45.00,
    supplier: 'Sports Direct',
    location: 'Gym Storage',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    maintenanceHistory: [],
  },
  {
    id: '7',
    name: 'Table Tennis Set',
    description: 'Complete table tennis set with paddles and balls.',
    category: 'Table Tennis',
    status: 'Available' as const,
    quantity: 5,
    purchaseDate: '2023-05-05',
    purchasePrice: 65.50,
    supplier: 'Indoor Sports Inc.',
    location: 'Recreation Room',
    imageUrl: 'https://images.unsplash.com/photo-1611251135345-18c56206b863?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    maintenanceHistory: [],
  },
  {
    id: '8',
    name: 'Gym Exercise Mats',
    description: 'Thick padded exercise mats for floor workouts.',
    category: 'Fitness',
    status: 'Available' as const,
    quantity: 18,
    purchaseDate: '2023-03-25',
    purchasePrice: 28.99,
    supplier: 'Fitness World',
    location: 'Fitness Center',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    maintenanceHistory: [],
  },
];

// Type for a single equipment item
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

// Form values type
interface FormValues {
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
}

const Equipment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isNewEquipment, setIsNewEquipment] = useState(false);
  const { toast } = useToast();

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(equipment.map(item => item.category)));
  
  const handleViewDetails = (id: string) => {
    const equipmentItem = equipment.find(item => item.id === id);
    if (equipmentItem) {
      setSelectedEquipment(equipmentItem);
      setModalOpen(true);
    }
  };

  const handleEdit = (id: string) => {
    const equipmentItem = equipment.find(item => item.id === id);
    if (equipmentItem) {
      setSelectedEquipment(equipmentItem);
      setIsNewEquipment(false);
      setEditModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const equipmentItem = equipment.find(item => item.id === id);
    if (equipmentItem) {
      setSelectedEquipment(equipmentItem);
      setDeleteDialogOpen(true);
    }
  };

  const handleAddNew = () => {
    setSelectedEquipment(null);
    setIsNewEquipment(true);
    setEditModalOpen(true);
  };

  const handleSaveEquipment = (values: FormValues) => {
    // For adding new equipment
    if (isNewEquipment) {
      const newEquipment = {
        ...values,
        id: `${equipment.length + 1}`,
        maintenanceHistory: []
      };
      setEquipment([...equipment, newEquipment]);
      toast({
        title: "Equipment added",
        description: `${values.name} has been added to inventory.`,
      });
    } 
    // For updating existing equipment
    else if (selectedEquipment) {
      setEquipment(equipment.map(item => 
        item.id === selectedEquipment.id 
          ? { ...item, ...values } 
          : item
      ));
      toast({
        title: "Equipment updated",
        description: `${values.name} has been updated.`,
      });
    }
    setEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedEquipment) {
      setEquipment(equipment.filter(item => item.id !== selectedEquipment.id));
      toast({
        title: "Equipment deleted",
        description: `${selectedEquipment.name} has been removed from inventory.`,
      });
      setDeleteDialogOpen(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Equipment Inventory</h1>
          <p className="text-muted-foreground">Manage your sports equipment catalog</p>
        </div>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Equipment
        </Button>
      </div>

      <div className="glass-card p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search equipment..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-muted-foreground h-4 w-4" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="In Use">In Use</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-muted-foreground h-4 w-4" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredEquipment.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              id={equipment.id}
              name={equipment.name}
              category={equipment.category}
              status={equipment.status}
              quantity={equipment.quantity}
              imageUrl={equipment.imageUrl}
              onView={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <h3 className="text-xl font-medium">No equipment found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSearchQuery('');
            setStatusFilter('all');
            setCategoryFilter('all');
          }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* View Equipment Details Modal */}
      <EquipmentDetailModal
        equipment={selectedEquipment}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
      
      {/* Edit Equipment Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <EquipmentEditForm
          equipment={selectedEquipment}
          onSave={handleSaveEquipment}
          onCancel={() => setEditModalOpen(false)}
          isNew={isNewEquipment}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedEquipment?.name || "this equipment"}
      />
    </Layout>
  );
};

export default Equipment;
