
import FeaturedEpisodes from '@/components/home/featured-episodes';
import CategoriesSection from '@/components/home/categories-section';
import TrendingContent from '@/components/home/trending-content';
import HeroSection from '@/components/home/hero-section';
import SeriesSection from '@/components/home/series-section';
import { placeholderEpisodes, placeholderCategories, placeholderSeries } from '@/lib/placeholder-data';

export default function HomePage() {
  const featured = placeholderEpisodes.filter(ep => !ep.seriesId).slice(0, 3); // Feature standalone episodes
  const trending = placeholderEpisodes.slice(1, 5).reverse(); 
  const categories = placeholderCategories;
  const series = placeholderSeries;

  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="container mx-auto py-8 space-y-12">
        <FeaturedEpisodes episodes={featured} />
        <SeriesSection series={series} />
        <CategoriesSection categories={categories} />
        <TrendingContent episodes={trending} />
      </div>
    </div>
  );
}
