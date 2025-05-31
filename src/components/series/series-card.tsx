
import Image from 'next/image';
import type { Series } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SeriesCardProps {
  series: Series;
  className?: string;
}

const SeriesCard: React.FC<SeriesCardProps> = ({ series, className }) => {
  return (
    <Link href={`/series/${series.id}`} legacyBehavior>
      <a className="block group">
        <Card className={cn(
          "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-card",
          className
        )}>
          <div className="relative w-full aspect-square"> {/* Ensure square aspect ratio */}
            <Image
              src={series.thumbnailUrl}
              alt={series.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={series.dataAiHint || "podcast series art"}
            />
          </div>
          <div className="flex flex-col flex-grow p-5">
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                {series.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow mb-4">
              <CardDescription className="text-sm line-clamp-3">
                {series.description}
              </CardDescription>
            </CardContent>
            <div className="mt-auto">
               <Button variant="outline" size="sm" className="w-full group-hover:bg-accent transition-colors">
                View Series <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </a>
    </Link>
  );
};

export default SeriesCard;
