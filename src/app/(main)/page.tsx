
import type { Metadata } from 'next';
import FeaturedEpisodes from '@/components/home/featured-episodes';
import TrendingContent from '@/components/home/trending-content';
import HeroSection from '@/components/home/hero-section';
import SeriesSection from '@/components/home/series-section';
import { placeholderEpisodes as placeholderEpisodes1, placeholderSeries as placeholderSeries1 } from '@/lib/placeholder-data';
import { placeholderEpisodes2, placeholderSeries2 } from '@/lib/placeholder-2data';
import type { Episode, Series } from '@/types';
import StatsBanner from '@/components/home/stats-banner';
import { parseDurationToSeconds, formatTotalSeconds } from '@/lib/utils';
import AnnouncementBar from '@/components/home/announcement-bar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import SeriesCard from '@/components/series/series-card';
import { isEpisodeLocked } from '@/lib/release-dates';
import PaginatedEpisodeList from '@/components/episodes/paginated-episode-list';

export const metadata: Metadata = {
  title: 'FocusCast: Optometry Insights, Clearly Delivered',
  description: 'Explore insightful optometry podcasts, expert series, and trending episodes. Your source for clear, concise, and professional optometry knowledge, updated daily.',
};

export default function HomePage() {
  const allEpisodes = [...placeholderEpisodes1, ...placeholderEpisodes2];
  const allSeries = [...placeholderSeries1, ...placeholderSeries2];

  const featured: Episode[] = [
    allEpisodes.find(ep => ep.id === 'ou-ep1'),
    allEpisodes.find(ep => ep.id === 'csc-ep16'),
  ].filter(ep => ep) as Episode[];
  
  const totalEpisodes = allEpisodes.length;
  const totalSeries = allSeries.length;
  const totalDurationInSeconds = allEpisodes.reduce((total, episode) => {
    return total + parseDurationToSeconds(episode.duration);
  }, 0);
  const totalDurationFormatted = formatTotalSeconds(totalDurationInSeconds, true);
  
  const newSeries = [
    allSeries.find(s => s.id === 'series-pediatric-eye-care'),
    allSeries.find(s => s.id === 'series-low-vision-living'),
    allSeries.find(s => s.id === 'series-ocular-pharmacology'),
  ].filter(s => s) as Series[];

  return (
    <div className="flex flex-col">
      <AnnouncementBar featuredSeries={newSeries} />
      <HeroSection />
      <div className="container mx-auto py-8 space-y-12 px-0 md:px-2">
        <div className="px-2">
            <StatsBanner 
              totalEpisodes={totalEpisodes}
              totalSeries={totalSeries}
              totalHours={totalDurationFormatted}
              newestSeries={newSeries}
            />
        </div>
        
        {/* Desktop Tabs */}
        <div className="hidden md:block px-2">
            <Tabs defaultValue="episodes" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="episodes">All Episodes</TabsTrigger>
                    <TabsTrigger value="series">Explore Series</TabsTrigger>
                </TabsList>
                <TabsContent value="episodes" className="mt-6">
                   <PaginatedEpisodeList initialEpisodes={allEpisodes} />
                </TabsContent>
                 <TabsContent value="series" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {allSeries.map((s) => {
                            const episodesInSeries = allEpisodes.filter(ep => ep.seriesId === s.id);
                            const episodeCount = episodesInSeries.length;
                            const isLocked = episodesInSeries.some(isEpisodeLocked);
                            const totalDuration = formatTotalSeconds(episodesInSeries.reduce((total, ep) => total + parseDurationToSeconds(ep.duration), 0));

                            return (
                                <SeriesCard
                                    key={s.id + '-desktop-tab'}
                                    series={s}
                                    episodeCount={episodeCount}
                                    totalDuration={totalDuration}
                                    isLocked={isLocked}
                                />
                            );
                        })}
                    </div>
                </TabsContent>
            </Tabs>
        </div>

        {/* Mobile Sections */}
        <div className="md:hidden space-y-12">
            <FeaturedEpisodes episodes={featured} />
            <SeriesSection series={allSeries} allEpisodes={allEpisodes} />
            <TrendingContent episodes={allEpisodes} />
        </div>
      </div>
    </div>
  );
}
