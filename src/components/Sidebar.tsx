'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-gray-50">
      <nav className="p-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                <span>{item.label}</span>
                {pathname === item.href && (
                  <motion.div
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600"
                    layoutId="sidebarIndicator"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}