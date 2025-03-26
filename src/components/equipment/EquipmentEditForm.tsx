
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  status: z.enum(["Available", "In Use", "Maintenance", "Retired"]),
  quantity: z.coerce.number().min(0, { message: "Quantity cannot be negative" }),
  purchaseDate: z.string(),
  purchasePrice: z.coerce.number().min(0, { message: "Price cannot be negative" }),
  supplier: z.string(),
  location: z.string(),
  imageUrl: z.string().url({ message: "Must be a valid URL" }),
});

// Define types based on the schema
type FormValues = z.infer<typeof formSchema>;

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

interface EquipmentEditFormProps {
  equipment: Equipment | null;
  onSave: (values: FormValues) => void;
  onCancel: () => void;
  isNew?: boolean;
}

export default function EquipmentEditForm({ 
  equipment, 
  onSave, 
  onCancel, 
  isNew = false 
}: EquipmentEditFormProps) {
  const { toast } = useToast();
  
  // Initialize form with equipment data or empty values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: equipment ? {
      name: equipment.name,
      description: equipment.description,
      category: equipment.category,
      status: equipment.status,
      quantity: equipment.quantity,
      purchaseDate: equipment.purchaseDate,
      purchasePrice: equipment.purchasePrice,
      supplier: equipment.supplier,
      location: equipment.location,
      imageUrl: equipment.imageUrl,
    } : {
      name: "",
      description: "",
      category: "",
      status: "Available",
      quantity: 0,
      purchaseDate: new Date().toISOString().split('T')[0],
      purchasePrice: 0,
      supplier: "",
      location: "",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    }
  });

  function onSubmit(values: FormValues) {
    try {
      onSave(values);
      toast({
        title: isNew ? "Equipment added" : "Equipment updated",
        description: `Successfully ${isNew ? "added" : "updated"} ${values.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{isNew ? "Add New Equipment" : "Edit Equipment"}</DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equipment Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Basketball" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Basketball" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="In Use">In Use</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="purchaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="purchasePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <FormControl>
                    <Input placeholder="Sports Store Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Main Storage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormDescription>Enter a URL for the equipment image</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Provide a detailed description of the equipment" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{isNew ? "Add Equipment" : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
