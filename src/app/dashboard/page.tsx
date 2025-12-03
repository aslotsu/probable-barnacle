"use client";

import { useAuthStore } from "@/lib/authStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HorizontalNav from "@/components/HorizontalNav";

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalForms: 0,
    totalPreorders: 0,
    totalContacts: 0,
    isLoading: true,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('https://api.monkreflections.com/api/forms');
        if (response.ok) {
          const allForms = await response.json();
          const preorders = allForms.filter((form: any) => form.title.includes('Preorder'));
          const contacts = allForms.filter((form: any) => form.title.includes('Contact'));

          setStats({
            totalForms: allForms.length,
            totalPreorders: preorders.length,
            totalContacts: contacts.length,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    }

    fetchStats();
  }, []);

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
    { id: 'forms', label: 'Forms', href: '/dashboard/forms' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <div className="flex items-center gap-2 md:gap-4">
              <span className="hidden sm:inline text-xs md:text-sm text-muted-foreground">Welcome, {user?.name || user?.email}</span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-destructive px-3 py-2 text-xs md:text-sm md:px-4 text-destructive-foreground hover:bg-destructive/90"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <HorizontalNav items={navItems} />

      <main className="p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-card border border-border p-4 md:p-6 shadow-sm"
        >
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Dashboard Overview</h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Welcome to the admin panel. Here you can manage your website content,
            monitor analytics, and control user access.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Total Submissions",
                count: stats.isLoading ? "..." : stats.totalForms.toString(),
                change: "All form submissions",
                link: "/dashboard/forms"
              },
              {
                title: "Preorders",
                count: stats.isLoading ? "..." : stats.totalPreorders.toString(),
                change: "Book preorder requests",
                link: "/dashboard/preorders"
              },
              {
                title: "Contact Forms",
                count: stats.isLoading ? "..." : stats.totalContacts.toString(),
                change: "Customer inquiries",
                link: "/dashboard/forms"
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(item.link)}
              >
                <h3 className="text-base md:text-lg font-medium text-muted-foreground">{item.title}</h3>
                <p className="mt-2 text-xl md:text-2xl font-bold text-foreground">{item.count}</p>
                <p className="mt-1 text-xs md:text-sm text-muted-foreground">{item.change}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}