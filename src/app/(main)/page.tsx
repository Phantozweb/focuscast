
import type { Metadata } from 'next';
import FeaturedEpisodes from '@/components/home/featured-episodes';
import TrendingContent from '@/components/home/trending-content';
import HeroSection from '@/components/home/hero-section';
import SeriesSection from '@/components/home/series-section';
import { placeholderEpisodes, placeholderSeries } from '@/lib/placeholder-data';
import type { Episode } from '@/types';

export const metadata: Metadata = {
  title: 'FocusCast: Optometry Insights, Clearly Delivered', 
  description: 'Explore optometry podcasts, series, and trending episodes on FocusCast, your source for optometry insights clearly delivered.',
};

export default function HomePage() {
  const diabeticRetinopathyEpisode = placeholderEpisodes.find(ep => ep.id === 'dod-ep1');
  const featured: Episode[] = diabeticRetinopathyEpisode ? [diabeticRetinopathyEpisode] : []; 
  const trending: Episode[] = []; 
  const seriesData = placeholderSeries;

  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="container mx-auto py-8 space-y-12">
        <FeaturedEpisodes episodes={featured} />
        <SeriesSection series={seriesData} allEpisodes={placeholderEpisodes} />
        <TrendingContent episodes={trending} />
      </div>
    </div>
  );
}
