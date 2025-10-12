
'use client';

import Image from 'next/image';
import type { Series } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/general/share-button';

interface SeriesCardProps {
  series: Series;
  episodeCount: number;
  totalDuration?: string;
  className?: string;
}

const SeriesCard: React.FC<SeriesCardProps> = ({ series, episodeCount, totalDuration, className }) => {
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
            </a>
          </Link>
        </CardContent>
        <div className="mt-auto flex gap-2">
          <Button asChild size="lg" sm-size="sm" className="flex-1">
            <Link href={`/series/${series.id}`}>
              View Series <ArrowRight size={16} className="ml-2" />
            </Link>
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
