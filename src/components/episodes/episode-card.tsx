
'use client';

import Image from 'next/image';
import type { Episode } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/general/share-button';
import Link from 'next/link';

interface EpisodeCardProps {
  episode: Episode;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, className, layout = 'vertical' }) => {
  const { playEpisode, currentEpisode, isPlaying } = usePlayer();
  const isActive = currentEpisode?.id === episode.id;

  const getShareTitle = () => {
    if (episode.seriesTitle && episode.episodeNumber) {
      return `${episode.title} - ${episode.seriesTitle} Ep. ${episode.episodeNumber}`;
    }
    return episode.title;
  };

  if (layout === 'vertical') {
    // This is the full-width, stacked vertical layout
    return (
      <Card className={cn(
          "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full w-full", 
          isActive && isPlaying ? "border-primary ring-2 ring-primary" : "",
          className
        )}>
        <div className="flex flex-row items-start gap-3 p-3">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={episode.thumbnailUrl}
              alt={episode.title}
              fill
              className="object-cover"
              sizes="80px"
              data-ai-hint={episode.seriesId === 'series-focus-bites' ? "podcast series art" : "podcast episode thumbnail"}
            />
          </div>
          <div className="flex-grow min-w-0">
             <Link href={`/episode/${episode.id}`} passHref legacyBehavior>
              <a>
                <CardTitle
                  className="text-base font-semibold leading-tight hover:text-primary transition-colors" 
                >
                  {episode.title}
                </CardTitle>
              </a>
            </Link>
            {episode.seriesId && episode.seriesTitle && (
              <Link href={`/series/${episode.seriesId}`} passHref legacyBehavior>
                <a className="text-xs text-primary/90 hover:text-primary transition-colors line-clamp-1 block mt-0.5">
                  {episode.seriesTitle}
                </a>
              </Link>
            )}
            {episode.episodeNumber && (
              <Badge variant="outline" className="mt-1 text-xs w-fit">
                Episode {episode.episodeNumber}
              </Badge>
            )}
             {episode.seriesId === 'series-grow-optom' && episode.showName && (
                <Badge variant="outline" className="mt-1 text-xs w-fit">
                    By {episode.showName.replace('Grow Optom by ', '')} 
                </Badge>
            )}
          </div>
        </div>

        <div className="px-3 pb-1 pt-0 text-left">
          <CardDescription className="line-clamp-1 text-xs text-muted-foreground">
            {episode.showName}
          </CardDescription>
        </div>

        <CardContent className="text-sm flex-grow px-3 pb-2 pt-1 text-left">
          <p className="text-muted-foreground line-clamp-3 text-xs">
            {episode.description}
          </p>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <Clock size={14} className="mr-1.5" />
            <span>{episode.duration}</span>
            <span className="mx-1.5">•</span>
            <span>{episode.releaseDate}</span>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 p-3 pt-0 mt-auto">
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
          <ShareButton
            shareTitle={getShareTitle()}
            shareUrl={`/episode/${episode.id}`}
            size="sm"
            className="flex-1"
            aria-label={`Share ${episode.title}`}
          />
        </CardFooter>
      </Card>
    );
  }

  // Horizontal layout (used in Hero search suggestions, SeriesClientPage episode list, and potentially other places)
  return (
    <Card className={cn(
        "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-row items-start",
        isActive && isPlaying ? "border-primary ring-2 ring-primary" : "",
        className
      )}>
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={episode.thumbnailUrl}
          alt={episode.title}
          fill
          className="object-cover"
          sizes="80px"
          data-ai-hint={episode.seriesId === 'series-focus-bites' || episode.seriesId === 'series-grow-optom' ? "podcast series art" : "podcast episode thumbnail"}
        />
      </div>
      <div className="flex flex-col flex-grow p-2 sm:p-3 min-w-0">
        <CardHeader className="p-0 mb-1 md:mb-1.5">
            <Link href={`/episode/${episode.id}`} passHref legacyBehavior>
              <a>
                <CardTitle
                  className="text-base md:text-lg font-semibold leading-tight hover:text-primary transition-colors"
                >
                    {episode.title}
                </CardTitle>
              </a>
            </Link>
            <CardDescription className="line-clamp-1 mt-0.5 text-xs md:text-sm text-muted-foreground">
                {episode.showName}
            </CardDescription>
        </CardHeader>

        <CardContent className="text-sm pt-1 pb-1 sm:pb-1.5 md:pb-2 flex-grow">
          <p className="text-muted-foreground line-clamp-2 text-xs sm:text-sm">
            {episode.description}
          </p>
          <div className="flex items-center text-xs text-muted-foreground mt-1.5">
            <Clock size={14} className="mr-1.5" />
            <span>{episode.duration}</span>
            <span className="mx-1.5">•</span>
            <span>{episode.releaseDate}</span>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 p-0 pt-1.5 sm:pt-2 mt-auto">
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
          <ShareButton
            shareTitle={getShareTitle()}
            shareUrl={`/episode/${episode.id}`}
            size="sm"
            className="flex-1"
            aria-label={`Share ${episode.title}`}
          />
        </CardFooter>
      </div>
    </Card>
  );
};

export default EpisodeCard;
