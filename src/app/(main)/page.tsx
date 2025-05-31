
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
  const focusBitesEp2 = placeholderEpisodes.find(ep => ep.id === '8');
  const diabeticRetinopathyEpisode = placeholderEpisodes.find(ep => ep.id === 'dod-ep1');

  const featured: Episode[] = [];
  if (focusBitesEp2) {
    featured.push(focusBitesEp2);
  }
  if (diabeticRetinopathyEpisode) {
    featured.push(diabeticRetinopathyEpisode);
  }
  
  const trendingEpisodes = [
    placeholderEpisodes.find(ep => ep.id === '8'), // Stiles-Crawford
    placeholderEpisodes.find(ep => ep.id === 'dod-ep1'), // Diabetic Retinopathy
    placeholderEpisodes.find(ep => ep.id === '6') // Phosphene Phenomena
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
