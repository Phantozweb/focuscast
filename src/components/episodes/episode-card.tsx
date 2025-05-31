
'use client';

import Image from 'next/image';
import type { Episode } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlayCircle, Download, Clock } from 'lucide-react';
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
        layout === 'vertical' ? "flex-col" : "flex-row items-start",
        isActive && isPlaying ? "border-primary ring-2 ring-primary" : "",
        className
      )}>
      <div className={cn(
        "relative",
        layout === 'vertical' 
          ? "w-full aspect-square" 
          : "w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 flex-shrink-0" // Adjusted for compactness
      )}>
        <Image
          src={episode.thumbnailUrl}
          alt={episode.title}
          fill
          className="object-cover"
          sizes={
            layout === 'vertical' 
              ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
              : "(max-width: 640px) 20vw, (max-width: 768px) 18vw, 15vw" // Adjusted sizes prop for smaller image
          }
          data-ai-hint={isFocusBitesEpisode ? "podcast series art" : "podcast episode thumbnail"}
        />
      </div>
      <div className={cn(
        "flex flex-col flex-grow", 
        layout === 'vertical' ? "" : "p-2 sm:p-3" // Reduced outer padding for text block in horizontal
      )}>
        {layout === 'vertical' && (
            <CardHeader className="p-3 md:p-4"> 
                <CardTitle className="text-lg leading-tight hover:text-primary transition-colors cursor-pointer line-clamp-2" onClick={() => playEpisode(episode)}>
                    {episode.title}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-1 mt-0.5">
                    {episode.showName}
                </CardDescription>
            </CardHeader>
        )}
         {layout === 'horizontal' && (
            <div className="mb-1 md:mb-1.5"> {/* Reduced bottom margin */}
                <h3 
                  className="text-base md:text-lg font-semibold leading-tight hover:text-primary transition-colors cursor-pointer" 
                  onClick={() => playEpisode(episode)}
                >
                    {episode.title} {/* No line clamp for horizontal title */}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 mt-0.5">
                    {episode.showName}
                </p>
            </div>
        )}
        <CardContent className={cn(
          layout === 'vertical' 
            ? "flex-grow px-4 pb-3 pt-1" 
            : "pt-1 pb-1 sm:pb-1.5 md:pb-2 flex-grow", // Reduced internal padding for description area in horizontal
          "text-sm"
        )}>
          {isFocusBitesEpisode && layout === 'vertical' && episode.episodeNumber ? (
            <p className="text-lg font-semibold text-primary mt-1">Episode {episode.episodeNumber}</p>
          ) : (
            <p className={cn(
              "text-muted-foreground",
              layout === 'vertical' ? "line-clamp-3" : "line-clamp-2 text-xs sm:text-sm" 
            )}>
              {episode.description}
            </p>
          )}
          <div className={cn(
            "flex items-center text-xs text-muted-foreground",
            layout === 'vertical' ? "mt-2" : "mt-1.5" // Reduced top margin for metadata in horizontal
            )}>
            <Clock size={14} className="mr-1.5" />
            <span>{episode.duration}</span>
            <span className="mx-1.5">•</span>
            <span>{episode.releaseDate}</span>
          </div>
        </CardContent>
        <CardFooter className={cn(
          "flex gap-2",
          layout === 'vertical' 
            ? "p-3 mt-auto" 
            : "p-0 pt-1.5 sm:pt-2 mt-auto" // Reduced top padding for footer in horizontal
        )}>
          <Button
            size="sm"
            onClick={() => playEpisode(episode)}
            variant={isActive && isPlaying ? "default" : "outline"}
            className="flex-1"
            aria-label={`Play ${episode.title}`}
          >
            <PlayCircle size={16} className="mr-1 md:mr-2" />
            {isActive && isPlaying ? 'Playing' : (isActive ? 'Paused' : 'Play')}
          </Button>
          <Button size="sm" variant="outline" onClick={() => downloadEpisode(episode)} className="flex-1" aria-label={`Download ${episode.title}`}>
            <Download size={16} className="mr-1 md:mr-2" />
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
