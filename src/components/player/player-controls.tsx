
'use client';

import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/contexts/player-context';
import { formatTime } from '@/lib/utils';

interface PlayerControlsProps {
  isExpandedView: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ isExpandedView }) => {
  const {
    currentEpisode,
    isPlaying,
    progress,
    duration,
    volume,
    togglePlayPause,
    seek,
    setVolume,
    toggleExpandPlayer,
    isLoading,
    playNextInPlaylist,
    playPreviousInPlaylist,
    currentPlaylist,
    currentPlaylistEpisodeIndex,
  } = usePlayer();

  if (!currentEpisode) return null;

  const handleSeek = (value: number[]) => {
    seek(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const iconSize = isExpandedView ? 24 : 20;
  
  const canPlayPrev = currentPlaylist.length > 0 && currentPlaylistEpisodeIndex > 0;
  const canPlayNext = currentPlaylist.length > 0 && currentPlaylistEpisodeIndex < currentPlaylist.length - 1;

  return (
    <div className={`flex flex-col w-full ${isExpandedView ? 'p-4 gap-4' : 'gap-2'}`}>
      {isExpandedView && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      )}
      <Slider
        defaultValue={[0]}
        value={[progress]}
        max={duration || 100} 
        step={1}
        onValueChange={handleSeek}
        className="w-full h-2 data-[disabled]:opacity-50"
        aria-label="Episode progress"
        disabled={isLoading || !currentEpisode}
      />
      <div className={`flex items-center ${isExpandedView ? 'justify-around' : 'justify-center'} gap-2`}>
        {isExpandedView && (
           <Button variant="ghost" size="icon" onClick={playPreviousInPlaylist} disabled={isLoading || !canPlayPrev}>
            <SkipBack size={iconSize} />
          </Button>
        )}
        <Button 
          variant="ghost" 
          size={isExpandedView ? "lg" : "icon"} 
          onClick={togglePlayPause}
          className={isExpandedView ? "w-16 h-16 rounded-full" : "w-10 h-10"}
          disabled={isLoading}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={isExpandedView ? 32 : iconSize} /> : <Play size={isExpandedView ? 32 : iconSize} />}
        </Button>
        {isExpandedView && (
          <Button variant="ghost" size="icon" onClick={playNextInPlaylist} disabled={isLoading || !canPlayNext}>
            <SkipForward size={iconSize} />
          </Button>
        )}
      </div>
      {isExpandedView && (
        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-2 w-1/3">
            {volume > 0 ? <Volume2 size={iconSize} /> : <VolumeX size={iconSize} />}
            <Slider
              defaultValue={[1]}
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-full h-2"
              aria-label="Volume control"
            />
          </div>
        </div>
      )}
       {!isExpandedView && (
         <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={toggleExpandPlayer}>
            <ExternalLink size={16} />
            <span className="sr-only">Expand Player</span>
          </Button>
       )}
    </div>
  );
};

export default PlayerControls;
