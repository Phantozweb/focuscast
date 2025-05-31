
import type { Episode } from '@/types';
import EpisodeCard from '@/components/episodes/episode-card';

interface TrendingContentProps {
  episodes: Episode[];
}

const TrendingContent: React.FC<TrendingContentProps> = ({ episodes }) => {
  if (!episodes || episodes.length === 0) {
    return (
      <section id="trending-content" className="py-8">
        <div className="container mx-auto">
          <div className="flex items-end gap-3 justify-start mb-6 px-4 md:px-0">
            <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
              Trending Now
            </h2>
          </div>
          <p className="text-center text-muted-foreground py-8">No trending content available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="trending-content" className="py-8">
      <div className="container mx-auto">
        <div className="flex items-end gap-3 justify-start mb-6 px-4 md:px-0">
          <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
            Trending Now
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 px-4 md:px-0">
          {episodes.map((episode) => ( 
            <EpisodeCard 
              key={episode.id + "-trending"} 
              episode={episode} 
              layout="vertical" // Changed to vertical for full-width stacking
              className="w-full bg-background border border-border/70 shadow-sm hover:shadow-md"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingContent;
