
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Megaphone } from 'lucide-react';
import Link from 'next/link';
import type { Series } from '@/types';
import { cn } from '@/lib/utils';

interface AnnouncementBarProps {
  featuredSeries: Series[];
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ featuredSeries }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredSeries.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredSeries.length);
    }, 5000); // Change series every 5 seconds

    return () => clearInterval(interval);
  }, [featuredSeries.length]);

  if (!featuredSeries || featuredSeries.length === 0) {
    return null;
  }

  return (
    <div className="md:hidden bg-gradient-to-r from-primary to-blue-500 text-primary-foreground p-3 text-center overflow-hidden h-12 flex items-center">
      <div className="relative w-full h-full">
        {featuredSeries.map((series, index) => (
          <div
            key={series.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 flex items-center justify-center",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Link href={`/series/${series.id}`} className="group w-full">
              <div className="flex items-center justify-center gap-2 animate-in fade-in duration-500">
                <Megaphone className="h-5 w-5 animate-pulse" />
                <div className="text-sm font-semibold">
                  <span className="uppercase opacity-80 mr-1.5">New Series:</span>
                  <span className="font-bold group-hover:underline">{series.title}</span>
                </div>
                <ArrowRight className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
