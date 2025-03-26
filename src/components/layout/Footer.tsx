
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-6 px-6 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Sports Equipment Inventory Management System. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground flex items-center">
            Made with <Heart className="h-3 w-3 mx-1 text-primary" /> for sports enthusiasts
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
