
'use client';

import Image from 'next/image';
import type { Episode } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  const isFocusBitesEpisode = episode.seriesId === 'series-focus-bites' && episode.episodeNumber !== undefined;

  return (
    <Card className={cn(
        "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex",
        layout === 'vertical' ? "flex-col" : "flex-row items-start", // Horizontal items-start for better alignment
        isActive && isPlaying ? "border-primary ring-2 ring-primary" : "",
        className
      )}>
      <div className={cn(
        "relative flex-shrink-0",
        layout === 'vertical'
          ? "w-20 h-20 mx-auto mt-4 rounded-md overflow-hidden" // Compact vertical image
          : "w-20 h-20" // Fixed small image for horizontal
      )}>
        <Image
          src={episode.thumbnailUrl}
          alt={episode.title}
          fill
          className="object-cover" // Removed rounded-md here, parent div handles rounding for vertical
          sizes={
            layout === 'vertical'
              ? "80px" // Size for the small vertical image
              : "80px" // Size for horizontal image
          }
          data-ai-hint={isFocusBitesEpisode ? "podcast series art" : "podcast episode thumbnail"}
        />
      </div>
      <div className={cn(
        "flex flex-col flex-grow",
        layout === 'vertical' ? "text-center" : "p-2 sm:p-3" // Centered text for vertical
      )}>
        <CardHeader className={cn(
          layout === 'vertical'
            ? "p-3 pt-2" // Compact padding for vertical
            : "p-0 mb-1 md:mb-1.5" // Compact padding for horizontal
        )}>
            <CardTitle
              className={cn(
                "hover:text-primary transition-colors cursor-pointer",
                layout === 'vertical'
                  ? "text-base font-semibold leading-tight line-clamp-2" // Compact vertical title
                  : "text-base md:text-lg font-semibold leading-tight" // Horizontal title (no clamp)
              )}
              onClick={() => playEpisode(episode)}
            >
                {episode.title}
            </CardTitle>
            {isFocusBitesEpisode && episode.episodeNumber && layout === 'vertical' && (
              <Badge variant="outline" className="mt-1 text-xs mx-auto w-fit">
                Episode {episode.episodeNumber}
              </Badge>
            )}
            <CardDescription className={cn(
              "line-clamp-1 mt-0.5",
               layout === 'vertical' ? "text-xs" : "text-xs md:text-sm text-muted-foreground"
            )}>
                {episode.showName}
            </CardDescription>
        </CardHeader>

        <CardContent className={cn(
          "text-sm",
          layout === 'vertical'
            ? "flex-grow px-3 pb-2 pt-1" // Compact vertical content
            : "pt-1 pb-1 sm:pb-1.5 md:pb-2 flex-grow"
        )}>
          <p className={cn(
            "text-muted-foreground",
            layout === 'vertical' ? "line-clamp-3 text-xs" : "line-clamp-2 text-xs sm:text-sm"
          )}>
            {episode.description}
          </p>
          <div className={cn(
            "flex items-center text-xs text-muted-foreground",
            layout === 'vertical' ? "mt-2 justify-center" : "mt-1.5"
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
            ? "p-3 pt-0" // Compact vertical footer
            : "p-0 pt-1.5 sm:pt-2 mt-auto"
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
