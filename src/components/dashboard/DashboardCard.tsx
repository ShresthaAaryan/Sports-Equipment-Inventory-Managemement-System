
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

const DashboardCard = ({ title, children, className, action }: DashboardCardProps) => {
  return (
    <div className={cn("glass-card overflow-hidden", className)}>
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <h3 className="font-medium">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
