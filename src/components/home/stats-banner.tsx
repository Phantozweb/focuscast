
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Podcast, List, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import type { Series } from '@/types';
import Image from 'next/image';
import { useAnalytics } from '@/hooks/use-analytics';
import { Skeleton } from '../ui/skeleton';

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
  isLoading?: boolean;
  href?: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, value, label, isLoading, href }) => {
  const content = (
    <div className="flex items-center gap-3">
      <div className="bg-primary/10 text-primary p-2.5 rounded-full">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        {isLoading ? (
          <Skeleton className="h-7 w-16 mb-1" />
        ) : (
          <p className="text-xl sm:text-2xl font-bold">{value}</p>
        )}
        <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="transition-transform hover:-translate-y-1 block">
        {content}
      </a>
    );
  }

  return content;
};


interface StatsBannerProps {
  totalEpisodes: number;
  totalSeries: number;
  totalHours: string;
  featuredSeries?: Series;
}

const formatStat = (num?: number): string => {
    if (num === undefined) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
};


const StatsBanner: React.FC<StatsBannerProps> = ({ totalEpisodes, totalSeries, totalHours, featuredSeries }) => {
  const { analytics, isLoading: isAnalyticsLoading } = useAnalytics();

  const totalListeners = React.useMemo(() => {
    if (isAnalyticsLoading || Object.keys(analytics).length === 0) return 0;
    return Object.values(analytics).reduce((acc, curr) => acc + (curr.views || 0), 0);
  }, [analytics, isAnalyticsLoading]);


  return (
    <section className="bg-card dark:bg-muted/10 border border-border/50 rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Left Side: Stats */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl sm:text-3xl font-bold font-headline mb-6 text-center md:text-left">Your Knowledge Hub</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full">
            <StatItem icon={Podcast} value={totalEpisodes.toString()} label="Episodes" href="#featured-episodes"/>
            <StatItem icon={List} value={totalSeries.toString()} label="Series" href="#series" />
            <StatItem icon={Clock} value={totalHours} label="Listening Time" />
            <StatItem icon={Users} value={formatStat(totalListeners)} label="Listeners" isLoading={isAnalyticsLoading} />
          </div>
        </div>
        
        {/* Right Side: Featured Series */}
        {featuredSeries && (
           <div className="bg-muted/30 dark:bg-background/50 p-4 sm:p-6 rounded-lg border border-primary/20 shadow-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex-grow text-center sm:text-left">
                    <p className="text-sm font-semibold text-primary mb-1">NEW SERIES DROP</p>
                    <h3 className="text-xl sm:text-2xl font-bold font-headline mb-2">{featuredSeries.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                     {featuredSeries.shortDescription}
                    </p>
                    <Button asChild size="sm" sm-size="default">
                      <Link href={`/series/${featuredSeries.id}`}>
                        Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                </div>
                <div className="flex-shrink-0 order-first sm:order-last">
                    <Image
                        src={featuredSeries.thumbnailUrl}
                        alt={featuredSeries.title}
                        width={120}
                        height={120}
                        className="object-contain rounded-md w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
                        data-ai-hint={featuredSeries.dataAiHint || "podcast series art"}
                        sizes="(max-width: 640px) 96px, (max-width: 1024px) 112px, 128px"
                    />
                </div>
           </div>
        )}
      </div>
    </section>
  );
};

export default StatsBanner;
