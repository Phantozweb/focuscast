
import type { Metadata } from 'next';
import FeaturedEpisodes from '@/components/home/featured-episodes';
import TrendingContent from '@/components/home/trending-content';
import HeroSection from '@/components/home/hero-section';
import SeriesSection from '@/components/home/series-section';
import { placeholderEpisodes, placeholderSeries } from '@/lib/placeholder-data';
import type { Episode } from '@/types';

export const metadata: Metadata = {
  title: 'FocusCast: Optometry Insights, Clearly Delivered',
  description: 'Explore insightful optometry podcasts, expert series, and trending episodes. Your source for clear, concise, and professional optometry knowledge, updated daily.',
};

export default function HomePage() {
  const featured: Episode[] = [
    placeholderEpisodes.find(ep => ep.id === 'csc-ep1'),
    placeholderEpisodes.find(ep => ep.id === 'csc-ep2'),
  ].filter(ep => ep) as Episode[];
  
  const trendingEpisodes = [
    placeholderEpisodes.find(ep => ep.id === 'csc-ep3'),
    placeholderEpisodes.find(ep => ep.id === 'dod-ep1'),
    placeholderEpisodes.find(ep => ep.id === 'fb-ep11'),
  ].filter(ep => ep !== undefined) as Episode[];

  const seriesData = placeholderSeries;

  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="container mx-auto py-8 space-y-12">
        <FeaturedEpisodes episodes={featured} />
        <SeriesSection series={seriesData} allEpisodes={placeholderEpisodes} />
        <TrendingContent episodes={trendingEpisodes} />
      </div>
    </div>
  );
}

    