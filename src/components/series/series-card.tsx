
'use client';

import Image from 'next/image';
import type { Series } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/general/share-button';

interface SeriesCardProps {
  series: Series;
  episodeCount: number;
  className?: string;
}

const SeriesCard: React.FC<SeriesCardProps> = ({ series, episodeCount, className }) => {
  return (
    <Card className={cn(
      "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-card group border border-border", 
      className
    )}>
      <Link href={`/series/${series.id}`} legacyBehavior passHref>
        <a className="block">
          <div className="relative w-full aspect-square">
            <Image
              src={series.thumbnailUrl}
              alt={series.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={series.dataAiHint || "podcast series art"}
            />
          </div>
        </a>
      </Link>
      <div className="flex flex-col flex-grow p-5">
        <CardHeader className="p-0 mb-2">
          <Link href={`/series/${series.id}`} legacyBehavior passHref>
            <a className="block">
              <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                {series.title}
              </CardTitle>
            </a>
          </Link>
        </CardHeader>
        <CardContent className="p-0 flex-grow mb-3">
           <Link href={`/series/${series.id}`} legacyBehavior passHref>
            <a className="block">
              <CardDescription className="text-sm line-clamp-2">
                {series.shortDescription || series.description}
              </CardDescription>
              <p className="text-xs text-muted-foreground mt-2">
                {episodeCount} episode{episodeCount === 1 ? '' : 's'}
              </p>
            </a>
          </Link>
        </CardContent>
        <div className="mt-auto flex gap-2">
          <Button asChild variant="default" size="sm" className="flex-1">
            <Link href={`/series/${series.id}`}>
              View Series <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
          <ShareButton
            shareTitle={series.title}
            shareUrl={`/series/${series.id}`}
            size="sm"
            className="flex-shrink-0"
          />
        </div>
      </div>
    </Card>
  );
};

export default SeriesCard;
