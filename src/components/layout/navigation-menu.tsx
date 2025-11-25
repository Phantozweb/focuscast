
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
    <>{items.map((item) => {
        const isActive =
          (pathname === '/' && item.href === '/') ||
          (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn( isActive && "active" )}
          >
            {item.label}
          </Link>
        )
      })}
    </>
  );
};

export default NavigationMenu;
