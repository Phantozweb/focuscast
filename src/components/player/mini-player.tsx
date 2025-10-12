
'use client';

import Image from 'next/image';
import { usePlayer } from '@/contexts/player-context';
import PlayerControls from './player-controls';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const MiniPlayer: React.FC = () => {
  const { currentEpisode, toggleExpandPlayer, closePlayer, isLoading, progress, duration, seek } = usePlayer();

  if (!currentEpisode) return null;
  
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-20 bg-background/90 backdrop-blur-md border-t border-border/60 p-2 flex items-center justify-between shadow-lg md:hidden animate-slide-up"
      role="button"
      tabIndex={0}
      aria-label={`Now playing: ${currentEpisode.title}. Tap to expand player.`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleExpandPlayer()}}
    >
      {/* Progress bar at the top */}
      <div className="absolute top-0 left-0 right-0 h-1" onClick={handleSliderClick}>
        <Slider
          defaultValue={[0]}
          value={[progress]}
          max={duration || 100}
          step={1}
          onValueChange={(value) => seek(value[0])}
          className="w-full h-1 [&>span:first-child]:h-1 [&>span:last-child]:h-3 [&>span:last-child]:w-3"
          aria-label="Episode progress"
          disabled={isLoading || !currentEpisode}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div 
        className="flex items-center gap-3 overflow-hidden flex-shrink min-w-0 h-full w-full"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('[role="slider"]')) {
            return;
          }
          toggleExpandPlayer();
        }}
      >
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
      
      <div 
        className="flex items-center gap-1 flex-shrink-0 ml-auto pr-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <PlayerControls isExpandedView={false} />
      </div>

      <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 transform hover:bg-destructive/20 h-8 w-8" onClick={(e) => {e.stopPropagation(); closePlayer();}}>
          <X size={20} className="text-muted-foreground hover:text-destructive" />
          <span className="sr-only">Close player</span>
      </Button>
    </div>
  );
};

export default MiniPlayer;

    