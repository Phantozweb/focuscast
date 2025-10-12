import Link from 'next/link';
import { Copyright } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 mt-auto border-t border-border/40 bg-background">
      <div className="container mx-auto text-center text-sm text-muted-foreground flex items-center justify-center gap-1.5">
        <Copyright className="h-4 w-4" />
        <p>
          2025 FocusCast
        </p>
      </div>
    </footer>
  );
};

export default Footer;
