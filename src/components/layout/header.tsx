
import Link from 'next/link';
import FocusCastLogo from '@/components/icons/focus-cast-logo';
import NavigationMenu from './navigation-menu';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import InteractiveSearch from '../general/interactive-search';

const Header: React.FC = () => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/episodes', label: 'Episodes' },
    { href: '/#series', label: 'Series' },
  ];

  return (
    <header className="z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 flex-shrink-0 mr-6"
        >
          <FocusCastLogo className="h-8 text-2xl" />
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-end gap-4">
          <NavigationMenu items={navItems} />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Search className="h-6 w-6" />
                <span className="sr-only">Search</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-2xl mt-4 mb-2">Search</SheetTitle>
              </SheetHeader>
              <InteractiveSearch />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
