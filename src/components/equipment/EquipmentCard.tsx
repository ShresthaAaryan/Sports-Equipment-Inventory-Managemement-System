
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, TrashIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EquipmentCardProps {
  id: string;
  name: string;
  category: string;
  status: 'Available' | 'In Use' | 'Maintenance' | 'Retired';
  quantity: number;
  imageUrl: string;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const EquipmentCard = ({
  id,
  name,
  category,
  status,
  quantity,
  imageUrl,
  onView,
  onEdit,
  onDelete,
}: EquipmentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = () => {
    switch (status) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg border border-border/50">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <div className="absolute top-2 right-2">
            <Badge className={getStatusColor()}>
              {status}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{category}</p>
          <p className="text-sm font-medium">
            Quantity: <span className="font-normal">{quantity}</span>
          </p>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(id)}
            className="flex-1 mr-2"
          >
            <Eye className="h-4 w-4 mr-1" /> View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(id)}
            className="flex-1 mr-2"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(id)}
            className="flex-1"
          >
            <TrashIcon className="h-4 w-4 mr-1" /> Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EquipmentCard;
