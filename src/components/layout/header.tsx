
import Link from 'next/link';
import FocusCastLogo from '@/components/icons/focus-cast-logo';
import NavigationMenu from './navigation-menu';
import { Button } from '@/components/ui/button';
import { Menu, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Input } from "@/components/ui/input";

const Header: React.FC = () => {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/episodes', label: 'Episodes' },
    { href: '/#series', label: 'Series' },
    { href: '/#featured-episodes', label: 'Featured' },
    { href: '/#trending-content', label: 'Trending' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <FocusCastLogo />
        </Link>
        
        <div className="hidden md:flex flex-1 items-center justify-end gap-4">
          <NavigationMenu items={navItems} />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search episodes..." 
              className="h-9 w-48 lg:w-64 pl-9" 
            />
          </div>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Link href="/" className="mb-6 flex items-center flex-shrink-0">
                <FocusCastLogo />
              </Link>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search episodes..." className="h-9 w-full pl-9" />
              </div>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label + item.href}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
