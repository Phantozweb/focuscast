
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
    <nav>
        <div className="nav-container">
            <Link href="/" passHref>
              <FocusCastLogo />
            </Link>
            <div className="nav-links">
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
    </nav>
  );
};

export default Header;
