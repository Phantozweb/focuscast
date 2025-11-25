
import React from 'react';
import { placeholderEpisodes as placeholderEpisodes1, placeholderSeries as placeholderSeries1 } from '@/lib/placeholder-data';
import { placeholderEpisodes2, placeholderSeries2 } from '@/lib/placeholder-2data';
import HeroSection from '@/components/home/hero-section';
import FeaturedEpisodes from '@/components/home/featured-episodes';
import SeriesSection from '@/components/home/series-section';
import type { Episode, Series } from '@/types';
import TrendingContent from '@/components/home/trending-content';
import { parseDurationToSeconds, formatTotalSeconds } from '@/lib/utils';
import StatsBanner from '@/components/home/stats-banner';
import AnnouncementBar from '@/components/home/announcement-bar';
import PaginatedEpisodeList from '@/components/episodes/paginated-episode-list';
import FeaturedNewEpisodes from '@/components/home/featured-new-episodes';

export default function HomePage() {
  const allEpisodes: Episode[] = [...placeholderEpisodes1, ...placeholderEpisodes2];
  const allSeries: Series[] = [...placeholderSeries1, ...placeholderSeries2];

  // Logic for Featured Episodes (e.g., first 4)
  const featuredEpisodes = allEpisodes
    .filter(ep => ep.seriesId !== 'series-focus-bites')
    .slice(0, 4);

  const featuredNewEpisodes = allEpisodes
    .filter(ep => ep.seriesId === 'series-focus-bites')
    .slice(0, 3);
  
  const trendingEpisodes = allEpisodes.slice(0, 10);
  const featuredSeries = allSeries.slice(0, 1);

  const newestSeries: (Series | { id: string; title: string; shortDescription: string; thumbnailUrl: string; isAnnouncement: boolean; })[] = [
      ...allSeries.filter(s => s.id === 'series-low-vision-living'),
      {
        id: 'announcement-1',
        title: 'Fresh Content Added!',
        shortDescription: '10 new episodes have just been added to the Focus Bites series. Perfect for quick learning on the go!',
        thumbnailUrl: 'https://raw.githubusercontent.com/Phantozweb/focuscastaudios/main/Cover/logo.png',
        isAnnouncement: true
      }
  ];

  const totalDurationInSeconds = allEpisodes.reduce((total, episode) => {
    return total + parseDurationToSeconds(episode.duration);
  }, 0);

  const totalHours = (totalDurationInSeconds / 3600).toFixed(1);

  return (
    <>
      <AnnouncementBar featuredSeries={featuredSeries} />
      <HeroSection />
      <div className="container mx-auto px-4 md:px-6 space-y-12">
        <StatsBanner
          totalEpisodes={allEpisodes.length}
          totalSeries={allSeries.length}
          totalHours={`${totalHours}h`}
          newestSeries={newestSeries}
        />
        <TrendingContent episodes={trendingEpisodes} />
      </div>
      <FeaturedNewEpisodes episodes={featuredNewEpisodes} />
      <SeriesSection series={allSeries} allEpisodes={allEpisodes} />
      <FeaturedEpisodes episodes={featuredEpisodes} />
      <section id="all-episodes" className="py-12">
        <div className="container mx-auto">
          <div className="flex items-end gap-3 justify-center md:justify-start mb-8 px-4 md:px-0">
             <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
                All Episodes
             </h2>
          </div>
          <PaginatedEpisodeList initialEpisodes={allEpisodes} />
        </div>
      </section>
    </>
  );
}
