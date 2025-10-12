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

export const metadata: Metadata = {
  title: 'FocusCast: Optometry Insights, Clearly Delivered',
  description: 'Explore insightful optometry podcasts, expert series, and trending episodes. Your source for clear, concise, and professional optometry knowledge, updated daily.',
};

export default function HomePage() {
  const featured: Episode[] = [
    placeholderEpisodes.find(ep => ep.id === 'csc-ep15'),
    placeholderEpisodes.find(ep => ep.id === 'csc-ep16'),
  ].filter(ep => ep) as Episode[];
  
  const trendingEpisodes = [
    placeholderEpisodes.find(ep => ep.id === 'csc-ep17'),
    placeholderEpisodes.find(ep => ep.id === 'dod-ep1'),
    placeholderEpisodes.find(ep => ep.id === 'fb-ep11'),
  ].filter(ep => ep !== undefined) as Episode[];

  const seriesData = placeholderSeries;

  const totalEpisodes = placeholderEpisodes.length;
  const totalSeries = placeholderSeries.length;
  const totalDurationInSeconds = placeholderEpisodes.reduce((total, episode) => {
    return total + parseDurationToSeconds(episode.duration);
  }, 0);
  const totalDurationFormatted = formatTotalSeconds(totalDurationInSeconds, true);
  
  const clinicalSkillsSeries = placeholderSeries.find(s => s.id === 'series-clinical-skills');

  return (
    <div className="flex flex-col">
      <AnnouncementBar featuredSeries={clinicalSkillsSeries} />
      <HeroSection />
      <div className="container mx-auto py-8 space-y-12 px-0 md:px-2">
        <div className="hidden md:block px-2">
            <StatsBanner 
              totalEpisodes={totalEpisodes}
              totalSeries={totalSeries}
              totalHours={totalDurationFormatted}
              featuredSeries={clinicalSkillsSeries}
            />
        </div>
        <FeaturedEpisodes episodes={featured} />
        <SeriesSection series={seriesData} allEpisodes={placeholderEpisodes} />
        <TrendingContent episodes={trendingEpisodes} />
      </div>
    </div>
  );
}