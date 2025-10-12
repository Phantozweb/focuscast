
'use client';

import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, Volume2, VolumeX, Gauge, ListMusic, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/contexts/player-context';
import { formatTime } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from '@/hooks/use-mobile';


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
    playbackRate,
    togglePlayPause,
    seek,
    setVolume,
    isLoading,
    playNextInPlaylist,
    playPreviousInPlaylist,
    currentPlaylist,
    currentPlaylistEpisodeIndex,
    setPlaybackRate,
    skipForward,
    skipBackward,
    toggleExpandPlayer,
    cyclePlaybackRate,
  } = usePlayer();
  const isMobile = useIsMobile();

  if (!currentEpisode) return null;

  const handleSeek = (value: number[]) => {
    seek(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const iconSize = isExpandedView ? 24 : 20;
  
  const canPlayPrev = currentPlaylist.length > 0 && currentPlaylistEpisodeIndex > 0;
  // The 'Next' button should always be active to allow finding the next recommended episode.
  const canPlayNext = true;

  if (isExpandedView) {
    return (
      <div className="flex flex-col w-full p-4 gap-3">
        {/* Progress Bar */}
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
        <div className="flex items-center justify-between text-xs text-muted-foreground -mt-1">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon" onClick={playPreviousInPlaylist} disabled={isLoading || !canPlayPrev} className="w-12 h-12">
            <SkipBack size={iconSize} />
            <span className="sr-only">Previous Episode</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={skipBackward} disabled={isLoading} className="w-12 h-12">
            <Rewind size={iconSize} />
            <span className="sr-only">Skip back 10 seconds</span>
          </Button>

          <Button 
            variant="default" 
            size="lg"
            onClick={togglePlayPause}
            className="w-16 h-16 rounded-full shadow-lg"
            disabled={isLoading}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isLoading ? 
              <div className="w-6 h-6 border-4 border-primary-foreground border-t-transparent rounded-full animate-spin"></div> :
              (isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1"/>)
            }
          </Button>
          
          <Button variant="ghost" size="icon" onClick={skipForward} disabled={isLoading} className="w-12 h-12">
            <FastForward size={iconSize} />
            <span className="sr-only">Skip forward 10 seconds</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={playNextInPlaylist} disabled={isLoading || !canPlayNext} className="w-12 h-12">
            <SkipForward size={iconSize} />
            <span className="sr-only">Next Episode</span>
          </Button>
        </div>

        {/* Volume and Speed Controls */}
        <div className="flex items-center justify-between gap-4 mt-4">
            {isMobile ? (
                 <Button variant="ghost" className="flex gap-2 text-muted-foreground" onClick={cyclePlaybackRate}>
                  <Gauge size={18} />
                  <span>{playbackRate}x</span>
                </Button>
            ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex gap-2 text-muted-foreground">
                      <Gauge size={18} />
                      <span>{playbackRate}x</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-24">
                    <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={playbackRate.toString()} onValueChange={(val) => setPlaybackRate(parseFloat(val))}>
                      <DropdownMenuRadioItem value="0.75">0.75x</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="1">1x (Normal)</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="1.5">1.5x</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="2">2x</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
            )}

            <div className="flex items-center gap-2 w-1/2 max-w-xs">
              <Button variant="ghost" size="icon" onClick={() => setVolume(volume > 0 ? 0 : 1)} className="w-8 h-8">
                {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
                <span className="sr-only">Mute</span>
              </Button>
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
      </div>
    );
  }

  // Mini Player Controls
  return (
    <div className="flex items-center justify-center gap-1">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={togglePlayPause}
        className="w-10 h-10"
        disabled={isLoading}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isLoading ? 
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> :
          (isPlaying ? <Pause size={iconSize} /> : <Play size={iconSize} />)
        }
      </Button>
      <Button variant="ghost" size="icon" className="w-10 h-10" onClick={toggleExpandPlayer}>
          <ExternalLink size={16} />
          <span className="sr-only">Expand Player</span>
      </Button>
    </div>
  )
};

export default PlayerControls;

    
