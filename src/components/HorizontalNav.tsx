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
    <div className="border-b border-border bg-card sticky top-0 z-10">
      <nav className="flex overflow-x-auto scrollbar-hide px-4 md:px-6" aria-label="Tabs">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`relative whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium transition-colors flex-shrink-0 ${
              pathname === item.href
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
            }`}
          >
            {item.label}
            {pathname === item.href && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
