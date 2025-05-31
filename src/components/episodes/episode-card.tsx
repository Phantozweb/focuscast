
'use client';

import Image from 'next/image';
import type { Episode } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlayCircle, Download, Clock, Share2 } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/general/share-button';

interface EpisodeCardProps {
  episode: Episode;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, className, layout = 'vertical' }) => {
  const { playEpisode, downloadEpisode, currentEpisode, isPlaying } = usePlayer();
  const isActive = currentEpisode?.id === episode.id;
  const isFocusBitesEpisode = episode.seriesId === 'series-focus-bites' && episode.episodeNumber;

  return (
    <Card className={cn(
        "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex",
        layout === 'vertical' ? "flex-col" : "flex-row items-center",
        isActive && isPlaying ? "border-primary ring-2 ring-primary" : "",
        className
      )}>
      <div className={cn(
        "relative",
        layout === 'vertical' ? "w-full aspect-square" : "w-28 h-28 md:w-32 md:h-32 flex-shrink-0" 
      )}>
        <Image
          src={episode.thumbnailUrl}
          alt={episode.title}
          fill
          className="object-cover"
          sizes={layout === 'vertical' ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : "(max-width: 768px) 30vw, 20vw"}
          data-ai-hint={isFocusBitesEpisode ? "podcast series art" : "podcast episode thumbnail"}
        />
      </div>
      <div className={cn("flex flex-col flex-grow", layout === 'vertical' ? "" : "p-4")}>
        {layout === 'vertical' && (
            <CardHeader>
                <CardTitle className="text-lg leading-tight hover:text-primary transition-colors cursor-pointer" onClick={() => playEpisode(episode)}>
                    {episode.title}
                </CardTitle>
                <CardDescription className="text-xs">{episode.showName}</CardDescription>
            </CardHeader>
        )}
         {layout === 'horizontal' && (
            <div className="mb-2">
                <h3 className="text-lg font-semibold leading-tight hover:text-primary transition-colors cursor-pointer" onClick={() => playEpisode(episode)}>
                    {episode.title}
                </h3>
                <p className="text-sm text-muted-foreground">{episode.showName}</p>
            </div>
        )}
        <CardContent className={cn(layout === 'vertical' ? "flex-grow" : "")}>
          {isFocusBitesEpisode ? (
            <p className="text-lg font-semibold text-primary mt-2">Episode {episode.episodeNumber}</p>
          ) : (
            <p className={cn("text-sm text-muted-foreground", layout === 'vertical' ? "line-clamp-3" : "line-clamp-2")}>
              {episode.description}
            </p>
          )}
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <Clock size={14} className="mr-1.5" />
            <span>{episode.duration}</span>
            <span className="mx-1.5">•</span>
            <span>{episode.releaseDate}</span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 p-4">
          <Button 
            size="sm" 
            onClick={() => playEpisode(episode)} 
            variant={isActive && isPlaying ? "default" : "outline"}
            className="flex-1"
            aria-label={`Play ${episode.title}`}
          >
            <PlayCircle size={16} className="mr-2" />
            {isActive && isPlaying ? 'Playing' : (isActive ? 'Paused' : 'Play')}
          </Button>
          <Button size="sm" variant="outline" onClick={() => downloadEpisode(episode)} className="flex-1" aria-label={`Download ${episode.title}`}>
            <Download size={16} className="mr-2" />
            Download
          </Button>
          <ShareButton 
            shareTitle={episode.title}
            size="sm"
            className="flex-1"
          />
        </CardFooter>
      </div>
    </Card>
  );
};

export default EpisodeCard;
