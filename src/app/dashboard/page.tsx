"use client";

import { useAuthStore } from "@/lib/authStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import HorizontalNav from "@/components/HorizontalNav";

export default function Dashboard() {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-white p-4 md:p-6 shadow-lg"
        >
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">Dashboard Overview</h2>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Welcome to the admin panel. Here you can manage your website content,
            monitor analytics, and control user access.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Users", count: "1,234", change: "+12%" },
              { title: "Orders", count: "567", change: "+5%" },
              { title: "Revenue", count: "$32,450", change: "+8.2%" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <h3 className="text-base md:text-lg font-medium text-gray-700">{item.title}</h3>
                <p className="mt-2 text-xl md:text-2xl font-bold text-indigo-600">{item.count}</p>
                <p className="mt-1 text-xs md:text-sm text-green-500">{item.change} from last month</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}