
'use client';

import Image from 'next/image';
import type { Episode } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, Heart, Eye } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/general/share-button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { incrementLikeCount } from '@/app/actions/analytics-actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';


interface EpisodeCardProps {
  episode: Episode;
  className?: string;
  layout?: 'vertical' | 'horizontal';
  isLoading?: boolean;
}

const formatStat = (num?: number): string => {
    if (num === undefined) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
};


const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, className, layout = 'vertical', isLoading }) => {
  const { playEpisode, currentEpisode, isPlaying } = usePlayer();
  const { toast } = useToast();
  const isActive = currentEpisode?.id === episode.id;
  const [isLiked, setIsLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(episode.likes || 0);
  const [localViewCount, setLocalViewCount] = useState(episode.views || 0);

  useEffect(() => {
    setLocalLikeCount(episode.likes || 0);
    setLocalViewCount(episode.views || 0);
  }, [episode.likes, episode.views]);


  const getShareTitle = () => {
    if (episode.seriesTitle && episode.episodeNumber) {
      return `${episode.title} - ${episode.seriesTitle} Ep. ${episode.episodeNumber}`;
    }
    return episode.title;
  };

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    if (!isLiked) {
      setIsLiked(true);
      setLocalLikeCount(prev => prev + 1);
      incrementLikeCount(episode.id, 'episode');
      toast({
        title: "Liked!",
        description: `You liked "${episode.title}".`,
      });
    } else {
      toast({
        title: "Already Liked",
        description: `You've already liked this episode.`,
      });
    }
  };

  if (layout === 'vertical') {
    return (
      <Card className={cn(
          "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full w-full", 
          isActive && isPlaying ? "border-primary ring-2 ring-primary" : "",
          className
        )}>
        <div className="flex flex-row items-start gap-4 p-4">
          <div className="relative w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={episode.thumbnailUrl}
              alt={episode.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 96px, 80px"
              data-ai-hint={episode.seriesId === 'series-focus-bites' ? "podcast series art" : "podcast episode thumbnail"}
            />
          </div>
          <div className="flex-grow min-w-0">
             <Link href={`/episode/${episode.id}`} passHref legacyBehavior>
              <a>
                <CardTitle
                  className="text-lg sm:text-base font-semibold leading-tight hover:text-primary transition-colors" 
                >
                  {episode.title}
                </CardTitle>
              </a>
            </Link>
            {episode.seriesId && episode.seriesTitle && (
              <Link href={`/series/${episode.seriesId}`} passHref legacyBehavior>
                <a className="text-sm sm:text-xs text-primary/90 hover:text-primary transition-colors line-clamp-1 block mt-0.5">
                  {episode.seriesTitle}
                </a>
              </Link>
            )}
            <div className="flex flex-wrap gap-1 mt-2">
              {episode.episodeNumber && (
                <Badge variant="outline" className="text-xs w-fit">
                  Episode {episode.episodeNumber}
                </Badge>
              )}
              {episode.seriesId === 'series-grow-optom' && episode.showName && (
                  <Badge variant="outline" className="text-xs w-fit">
                      By {episode.showName.replace('Grow Optom by ', '')} 
                  </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 pb-1 pt-0 text-left">
          <CardDescription className="line-clamp-1 text-sm sm:text-xs text-muted-foreground">
            {episode.showName}
          </CardDescription>
        </div>

        <CardContent className="text-sm flex-grow px-4 pb-3 pt-1 text-left">
          <p className="text-muted-foreground line-clamp-3 text-sm sm:text-xs">
            {episode.description}
          </p>
          <div className="flex items-center text-sm sm:text-xs text-muted-foreground mt-2">
            <Clock size={14} className="mr-1.5" />
            <span>{episode.duration}</span>
            <span className="mx-1.5">•</span>
            <span>{episode.releaseDate}</span>
          </div>
           <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                    <Eye size={14} />
                    {isLoading ? <Skeleton className="h-4 w-8" /> : <span>{formatStat(localViewCount)}</span>}
                </div>
                <div className="flex items-center gap-1">
                    <Heart size={14} className={cn(isLiked ? "text-red-500 fill-current" : "")} />
                    {isLoading ? <Skeleton className="h-4 w-8" /> : <span>{formatStat(localLikeCount)}</span>}
                </div>
            </div>
        </CardContent>

        <CardFooter className="flex gap-2 p-4 pt-0 mt-auto">
          <Button
            size="lg" sm-size="sm"
            onClick={() => playEpisode(episode)}
            variant={isActive && isPlaying ? "default" : "outline"}
            className="flex-1"
            aria-label={`Play ${episode.title}`}
          >
            <PlayCircle size={18} sm-size={16} className="mr-1 md:mr-2" />
            {isActive && isPlaying ? 'Playing' : (isActive ? 'Paused' : 'Play')}
          </Button>
           <Button
            variant="outline"
            size="lg" sm-size="icon"
            className="h-10 w-10"
            onClick={handleLikeClick}
            aria-label="Like episode"
            >
                <Heart size={18} className={cn("transition-colors", isLiked ? "text-red-500 fill-current" : "")} />
            </Button>
          <ShareButton
            shareTitle={getShareTitle()}
            shareUrl={`/episode/${episode.id}`}
            size="lg" sm-size="sm"
            className="flex-1"
            aria-label={`Share ${episode.title}`}
          />
        </CardFooter>
      </Card>
    );
  }

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
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
                <div className="flex items-center gap-1">
                    <Eye size={14} />
                    {isLoading ? <Skeleton className="h-4 w-8" /> : <span>{formatStat(localViewCount)}</span>}
                </div>
                <div className="flex items-center gap-1">
                    <Heart size={14} className={cn(isLiked ? "text-red-500 fill-current" : "")}/>
                    {isLoading ? <Skeleton className="h-4 w-8" /> : <span>{formatStat(localLikeCount)}</span>}
                </div>
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
           <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0"
            onClick={handleLikeClick}
            aria-label="Like episode"
            >
             <Heart size={16} className={cn("transition-colors", isLiked ? "text-red-500 fill-current" : "")} />
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
