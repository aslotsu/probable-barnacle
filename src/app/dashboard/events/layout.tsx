'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';
import HorizontalNav from '@/components/HorizontalNav';

interface DashboardSectionLayoutProps {
  children: ReactNode;
}

export default function DashboardSectionLayout({ children }: DashboardSectionLayoutProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', href: '/dashboard' },
    { id: 'sales', label: 'Sales', href: '/dashboard/sales' },
    { id: 'preorders', label: 'Preorders', href: '/dashboard/preorders' },
    { id: 'events', label: 'Events', href: '/dashboard/events' },
    { id: 'books', label: 'Books', href: '/dashboard/books' },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <header className="border-b bg-white">
          <div className="px-4 py-3 md:py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl md:text-2xl font-bold text-indigo-800">Admin Dashboard</h1>
              <div className="flex items-center gap-2 md:gap-4">
                <span className="hidden sm:inline text-xs md:text-sm text-gray-700">Welcome, {user?.name || user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-red-500 px-3 py-2 text-xs md:text-sm md:px-4 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <HorizontalNav items={navItems} />

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
