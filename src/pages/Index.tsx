
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Package, DollarSign, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: <Package className="h-10 w-10 text-primary" />,
      title: 'Inventory Management',
      description: 'Track all your sports equipment in real-time with detailed information and status monitoring.',
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-primary" />,
      title: 'Procurement Process',
      description: 'Streamline equipment ordering with requisition workflows, approvals, and vendor management.',
    },
    {
      icon: <DollarSign className="h-10 w-10 text-primary" />,
      title: 'Sales Tracking',
      description: 'Record sales transactions and generate comprehensive reports on sales performance.',
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: 'Advanced Analytics',
      description: 'Gain insights with data visualization and reporting tools for informed decision-making.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white font-bold rounded-lg h-8 w-8 flex items-center justify-center">SE</span>
            <span className="text-lg font-semibold tracking-tight">SEIMS</span>
          </div>
          <div className="hidden sm:flex">
            <Button variant="link" onClick={() => navigate('/dashboard')}>
              About
            </Button>
            <Button variant="link" onClick={() => navigate('/dashboard')}>
              Features
            </Button>
            <Button variant="link" onClick={() => navigate('/dashboard')}>
              Contact
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-8 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Sports Equipment Inventory Management System
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground">
                Streamline your sports equipment management with our comprehensive inventory system. 
                Track, procure, and sell equipment with ease.
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" onClick={() => navigate('/dashboard')}>
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')}>
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto w-full max-w-md"
            >
              <LoginForm />
            </motion.div>
          </div>
        </section>

        <section className="py-8 md:py-16 px-4 md:px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Key Features</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Our system provides all the tools you need to efficiently manage your sports equipment inventory
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sports Equipment Inventory Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
