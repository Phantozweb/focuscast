
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Megaphone } from 'lucide-react';
import Link from 'next/link';
import type { Series } from '@/types';

interface AnnouncementBarProps {
  featuredSeries?: Series;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ featuredSeries }) => {
  if (!featuredSeries) {
    return null;
  }

  return (
    <div className="md:hidden bg-gradient-to-r from-primary to-blue-500 text-primary-foreground p-3 text-center animate-in slide-in-from-top-4 duration-500">
      <Link href={`/series/${featuredSeries.id}`} className="group">
        <div className="flex items-center justify-center gap-2">
          <Megaphone className="h-5 w-5 animate-pulse" />
          <div className="text-sm font-semibold">
            <span className="uppercase opacity-80 mr-1.5">New Series Drop:</span>
            <span className="font-bold group-hover:underline">{featuredSeries.title}</span>
          </div>
          <ArrowRight className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  );
};

export default AnnouncementBar;
