import FeaturedEpisodes from '@/components/home/featured-episodes';
import CategoriesSection from '@/components/home/categories-section';
import TrendingContent from '@/components/home/trending-content';
import { placeholderEpisodes, placeholderCategories } from '@/lib/placeholder-data';

export default function HomePage() {
  const featured = placeholderEpisodes.slice(0, 3);
  const trending = placeholderEpisodes.slice(1, 5).reverse(); // Different set for trending
  const categories = placeholderCategories;

  return (
    <div className="container mx-auto py-8 space-y-12">
      <FeaturedEpisodes episodes={featured} />
      <CategoriesSection categories={categories} />
      <TrendingContent episodes={trending} />
    </div>
  );
}
