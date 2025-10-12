
'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { usePlayer } from '@/contexts/player-context';
import { cn } from '@/lib/utils';

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { currentEpisode } = usePlayer();
  return (
    <div className={cn("relative flex min-h-screen flex-col bg-background transition-all duration-300", 
        "md:pr-0",
        currentEpisode ? "md:mr-96" : "md:mr-0"
      )}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
