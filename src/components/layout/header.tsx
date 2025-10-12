
import Link from 'next/link';
import FocusCastLogo from '@/components/icons/focus-cast-logo';
import NavigationMenu from './navigation-menu';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

const Header: React.FC = () => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/episodes', label: 'Episodes' },
    { href: '/#series', label: 'Series' },
  ];

  return (
    <header className="z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            <SheetContent side="top">
              <SheetTitle className="sr-only">Search</SheetTitle>
              <div className="relative mt-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search episodes..."
                  className="h-10 w-full pl-9"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
