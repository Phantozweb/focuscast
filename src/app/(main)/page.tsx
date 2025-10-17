
import type { Metadata } from 'next';
import FeaturedEpisodes from '@/components/home/featured-episodes';
import TrendingContent from '@/components/home/trending-content';
import HeroSection from '@/components/home/hero-section';
import SeriesSection from '@/components/home/series-section';
import { placeholderEpisodes, placeholderSeries } from '@/lib/placeholder-data';
import type { Episode } from '@/types';
import StatsBanner from '@/components/home/stats-banner';
import { parseDurationToSeconds, formatTotalSeconds } from '@/lib/utils';
import AnnouncementBar from '@/components/home/announcement-bar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FocusCast: Optometry Insights, Clearly Delivered',
  description: 'Explore insightful optometry podcasts, expert series, and trending episodes. Your source for clear, concise, and professional optometry knowledge, updated daily.',
};

export default function HomePage() {
  const featured: Episode[] = [
    placeholderEpisodes.find(ep => ep.id === 'ou-ep1'),
    placeholderEpisodes.find(ep => ep.id === 'csc-ep16'),
  ].filter(ep => ep) as Episode[];
  
  const seriesData = placeholderSeries;

  const totalEpisodes = placeholderEpisodes.length;
  const totalSeries = placeholderSeries.length;
  const totalDurationInSeconds = placeholderEpisodes.reduce((total, episode) => {
    return total + parseDurationToSeconds(episode.duration);
  }, 0);
  const totalDurationFormatted = formatTotalSeconds(totalDurationInSeconds, true);
  
  const opticsUnveiledSeries = placeholderSeries.find(s => s.id === 'series-optics-unveiled');

  return (
    <div className="flex flex-col">
      <AnnouncementBar featuredSeries={opticsUnveiledSeries} />
      <HeroSection />
      <div className="container mx-auto py-8 space-y-12 px-0 md:px-2">
        <div className="px-2">
            <StatsBanner 
              totalEpisodes={totalEpisodes}
              totalSeries={totalSeries}
              totalHours={totalDurationFormatted}
              featuredSeries={opticsUnveiledSeries}
            />
        </div>
        <div className="hidden md:block px-2 -mt-8">
            <Tabs defaultValue="episodes" className="w-full">
                <TabsList>
                    <TabsTrigger value="episodes" asChild><Link href="#featured-episodes">Featured Episodes</Link></TabsTrigger>
                    <TabsTrigger value="series" asChild><Link href="#series">Explore Series</Link></TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
        <FeaturedEpisodes episodes={featured} />
        <SeriesSection series={seriesData} allEpisodes={placeholderEpisodes} />
        <TrendingContent episodes={placeholderEpisodes} />
      </div>
    </div>
  );
}
