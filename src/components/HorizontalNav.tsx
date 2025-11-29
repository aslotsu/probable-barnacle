'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface HorizontalNavProps {
  items: NavItem[];
}

export default function HorizontalNav({ items }: HorizontalNavProps) {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <nav className="flex overflow-x-auto scrollbar-hide px-4 md:px-6" aria-label="Tabs">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`relative whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium transition-colors flex-shrink-0 ${
              pathname === item.href
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {item.label}
            {pathname === item.href && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
              />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
