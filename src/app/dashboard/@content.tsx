import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

interface DashboardContentLayoutProps {
  children: ReactNode;
}

export default function DashboardContentLayout({ children }: DashboardContentLayoutProps) {
  const pathname = usePathname();

  const sidebarItems = [
    { id: 'overview', label: 'Overview', href: '/dashboard' },
    { id: 'sales', label: 'Sales', href: '/dashboard/sales' },
    { id: 'preorders', label: 'Preorders', href: '/dashboard/preorders' },
    { id: 'events', label: 'Events', href: '/dashboard/events' },
    { id: 'books', label: 'Books', href: '/dashboard/books' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Sidebar items={sidebarItems} />
      
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}