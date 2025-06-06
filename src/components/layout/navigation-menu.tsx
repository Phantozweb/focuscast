'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
}

interface NavigationMenuProps {
  items: NavItem[];
  className?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ items, className }) => {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary" : "text-foreground/60"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;
