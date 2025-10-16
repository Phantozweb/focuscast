
'use client';

import Image from 'next/image';
import type { Series } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Clock, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/general/share-button';
import { Skeleton } from '../ui/skeleton';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { incrementLikeCount } from '@/app/actions/analytics-actions';

interface SeriesCardProps {
  series: Series;
  episodeCount: number;
  totalDuration?: string;
  className?: string;
  isLoading?: boolean;
}

const formatStat = (num?: number): string => {
    if (num === undefined) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
};

const SeriesCard: React.FC<SeriesCardProps> = ({ series, episodeCount, totalDuration, className, isLoading }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLiked) {
      setIsLiked(true); // Visually update immediately and disable button
      incrementLikeCount(series.id, 'series');
      toast({
        title: "Liked!",
        description: `You liked the "${series.title}" series.`,
      });
    }
  };


  return (
    <Card className={cn(
      "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row h-full bg-card group border border-border", 
      className
    )}>
      <Link href={`/series/${series.id}`} legacyBehavior passHref>
        <a className="relative w-full sm:w-1/3 aspect-square sm:aspect-auto flex-shrink-0 bg-muted/30">
          <Image
            src={series.thumbnailUrl}
            alt={series.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105 p-2"
            sizes="(max-width: 640px) 100vw, 33vw"
            data-ai-hint={series.dataAiHint || "podcast series art"}
          />
        </a>
      </Link>
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        <CardHeader className="p-0 mb-2">
          <Link href={`/series/${series.id}`} legacyBehavior passHref>
            <a className="block">
              <CardTitle className="text-xl sm:text-2xl leading-tight group-hover:text-primary transition-colors">
                {series.title}
              </CardTitle>
            </a>
          </Link>
        </CardHeader>
        <CardContent className="p-0 flex-grow mb-3">
           <Link href={`/series/${series.id}`} legacyBehavior passHref>
            <a className="block">
              <CardDescription className="text-base sm:text-sm text-foreground/80 line-clamp-2">
                {series.shortDescription || series.description}
              </CardDescription>
              <div className="text-sm sm:text-xs text-muted-foreground mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  {episodeCount} episode{episodeCount === 1 ? '' : 's'}
                </span>
                {totalDuration && (
                  <div className="flex items-center">
                    <Clock className="mr-1.5 h-3 w-3" />
                    <span>{totalDuration}</span>
                  </div>
                )}
              </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                        <Eye size={14} />
                         {isLoading ? <Skeleton className="w-12 h-4" /> : <span>{formatStat(series.views)} Views</span>}
                    </div>
                    <div className="flex items-center gap-1">
                        <Heart size={14} />
                        {isLoading ? <Skeleton className="w-12 h-4" /> : <span>{formatStat(series.likes)} Likes</span>}
                    </div>
                </div>
            </a>
          </Link>
        </CardContent>
        <div className="mt-auto flex gap-2">
          <Button asChild size="lg" sm-size="sm" className="flex-1">
            <Link href={`/series/${series.id}`}>
              View Series <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
           <Button
            variant="outline"
            size="lg" sm-size="icon"
            className="h-10 w-10 flex-shrink-0"
            onClick={handleLikeClick}
            disabled={isLiked}
            aria-label="Like series"
            >
                <Heart size={18} className={cn("transition-colors", isLiked ? "text-red-500 fill-current" : "")} />
            </Button>
          <ShareButton
            shareTitle={series.title}
            shareUrl={`/series/${series.id}`}
            size="lg" sm-size="sm"
            className="flex-shrink-0"
          />
        </div>
      </div>
    </Card>
  );
};

export default SeriesCard;
