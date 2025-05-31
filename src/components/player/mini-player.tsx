'use client';

import Image from 'next/image';
import { usePlayer } from '@/contexts/player-context';
import PlayerControls from './player-controls';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MiniPlayer: React.FC = () => {
  const { currentEpisode, toggleExpandPlayer, closePlayer, isLoading } = usePlayer();

  if (!currentEpisode) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-20 bg-background/90 backdrop-blur-md border-t border-border/60 p-2 flex items-center justify-between shadow-lg md:hidden animate-slide-up"
      onClick={(e) => {
        // Prevent expansion if clicking on controls or close button
        if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('[role="slider"]')) {
          return;
        }
        toggleExpandPlayer();
      }}
      role="button"
      tabIndex={0}
      aria-label={`Now playing: ${currentEpisode.title}. Tap to expand player.`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleExpandPlayer()}}
    >
      <div className="flex items-center gap-3 overflow-hidden flex-shrink min-w-0">
        <Image
          src={currentEpisode.thumbnailUrl}
          alt={currentEpisode.title}
          width={56}
          height={56}
          className="rounded-md aspect-square object-cover"
          data-ai-hint="podcast cover"
        />
        <div className="flex flex-col overflow-hidden">
          <h3 className="text-sm font-medium truncate">{currentEpisode.title}</h3>
          <p className="text-xs text-muted-foreground truncate">{currentEpisode.showName}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0 ml-auto pr-10 relative"> {/* Added pr-10 for close button space */}
         {isLoading && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>}
        <PlayerControls isExpandedView={false} />
      </div>
      <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 transform hover:bg-destructive/20" onClick={(e) => {e.stopPropagation(); closePlayer();}}>
          <X size={20} className="text-muted-foreground hover:text-destructive" />
          <span className="sr-only">Close player</span>
      </Button>
    </div>
  );
};

export default MiniPlayer;
