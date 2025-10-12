
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Podcast, List, Clock } from 'lucide-react';
import Link from 'next/link';
import type { Series } from '@/types';
import Image from 'next/image';

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-3">
    <div className="bg-primary/10 text-primary p-2.5 rounded-full">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xl sm:text-2xl font-bold">
        {value}
      </p>
      <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);

interface StatsBannerProps {
  totalEpisodes: number;
  totalSeries: number;
  totalHours: string;
  featuredSeries?: Series;
}

const StatsBanner: React.FC<StatsBannerProps> = ({ totalEpisodes, totalSeries, totalHours, featuredSeries }) => {
  return (
    <section className="bg-card dark:bg-muted/10 border border-border/50 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Stats */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold font-headline mb-6 text-center md:text-left">Your Knowledge Hub</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left w-full">
            <StatItem icon={Podcast} value={totalEpisodes.toString()} label="Episodes" />
            <StatItem icon={List} value={totalSeries.toString()} label="Series" />
            <StatItem icon={Clock} value={totalHours} label="Listening Time" />
          </div>
        </div>
        
        {/* Right Side: Featured Series */}
        {featuredSeries && (
           <div className="bg-muted/30 dark:bg-background/50 p-6 rounded-lg border border-primary/20 shadow-lg flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-grow text-center sm:text-left">
                    <p className="text-sm font-semibold text-primary mb-1">NEW SERIES DROP</p>
                    <h3 className="text-2xl font-bold font-headline mb-2">{featuredSeries.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                     {featuredSeries.shortDescription}
                    </p>
                    <Button asChild>
                      <Link href={`/series/${featuredSeries.id}`}>
                        Start Learning <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                </div>
                <div className="flex-shrink-0">
                    <Image
                        src={featuredSeries.thumbnailUrl}
                        alt={featuredSeries.title}
                        width={150}
                        height={150}
                        className="object-contain rounded-md"
                        data-ai-hint={featuredSeries.dataAiHint || "podcast series art"}
                        sizes="150px"
                    />
                </div>
           </div>
        )}
      </div>
    </section>
  );
};

export default StatsBanner;
