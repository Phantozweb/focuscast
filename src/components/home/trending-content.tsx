
import type { Episode } from '@/types';
import EpisodeCard from '@/components/episodes/episode-card';

interface TrendingContentProps {
  episodes: Episode[];
}

const TrendingContent: React.FC<TrendingContentProps> = ({ episodes }) => {
  if (!episodes || episodes.length === 0) {
    return (
      <section id="trending-content" className="py-8">
        <h2 className="text-3xl font-bold mb-6 px-4 md:px-0 font-headline">Trending Now</h2>
        <p className="text-center text-muted-foreground py-8">No trending content available at the moment.</p>
      </section>
    );
  }

  return (
    <section id="trending-content" className="py-8">
      <h2 className="text-3xl font-bold mb-6 px-4 md:px-0 font-headline">Trending Now</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
        {episodes.slice(0, 4).map((episode) => ( 
          <EpisodeCard key={episode.id} episode={episode} layout="horizontal" />
        ))}
      </div>
    </section>
  );
};

export default TrendingContent;
