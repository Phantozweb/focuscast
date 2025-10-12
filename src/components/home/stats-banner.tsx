'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Podcast, List, Clock } from 'lucide-react';
import Link from 'next/link';
import type { Series } from '@/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  label: string;
}

const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 1500; // ms
        if (value === 0) {
            setCount(0);
            return;
        }
        const stepTime = Math.max(1, Math.floor(duration / value));
        let currentCount = 0;
        
        const timer = setInterval(() => {
            currentCount += 1;
            if (currentCount >= value) {
                clearInterval(timer);
                setCount(value);
            } else {
                setCount(currentCount);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [value]);

    return <span className="font-bold">{count}</span>;
};


const StatItem: React.FC<StatItemProps & { isHours?: boolean, hourValue?: string }> = ({ icon: Icon, value, label, isHours = false, hourValue }) => (
  <div className="flex items-center gap-3">
    <div className="bg-primary/10 text-primary p-2.5 rounded-full">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xl sm:text-2xl font-bold">
        {isHours ? <span className="font-bold">{hourValue}</span> : <AnimatedCounter value={value} />}
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
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (!featuredSeries) return;

    const interval = setInterval(() => {
      setShowImage(prev => !prev);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, [featuredSeries]);

  return (
    <section className="bg-card dark:bg-muted/10 border border-border/50 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Stats */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold font-headline mb-6 text-center md:text-left">Your Knowledge Hub</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left w-full">
            <StatItem icon={Podcast} value={totalEpisodes} label="Episodes" />
            <StatItem icon={List} value={totalSeries} label="Series" />
            <StatItem icon={Clock} value={0} label="Listening Time" isHours={true} hourValue={totalHours} />
          </div>
        </div>
        
        {/* Right Side: Featured Series */}
        {featuredSeries && (
           <div className="bg-muted/30 dark:bg-background/50 p-6 rounded-lg border border-primary/20 shadow-lg text-center md:text-left flex flex-col items-center min-h-[200px] justify-center relative overflow-hidden">
              <div className={cn("transition-opacity duration-1000", showImage ? 'opacity-0' : 'opacity-100')}>
                <div className="flex-grow">
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
              </div>
              
              <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-1000 p-4", showImage ? 'opacity-100' : 'opacity-0')}>
                  <Image
                      src={featuredSeries.thumbnailUrl}
                      alt={featuredSeries.title}
                      width={180}
                      height={180}
                      className="object-contain"
                      data-ai-hint={featuredSeries.dataAiHint || "podcast series art"}
                      sizes="180px"
                  />
              </div>
           </div>
        )}
      </div>
    </section>
  );
};

export default StatsBanner;
