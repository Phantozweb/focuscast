
import type { Episode } from '@/types';
import EpisodeCard from '@/components/episodes/episode-card';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

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
      <div className="container mx-auto px-0 md:px-4">
        <div className="flex items-end gap-3 justify-start mb-6 px-4 md:px-0">
          <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
            Trending Now
          </h2>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => ( 
            <EpisodeCard 
              key={episode.id + "-trending-desktop"} 
              episode={episode} 
              layout="vertical"
              className="w-full bg-background border border-border/70 shadow-sm hover:shadow-md"
            />
          ))}
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-4 px-4">
              {episodes.map((episode) => ( 
                <div key={episode.id + "-trending-mobile"} className="w-72">
                  <EpisodeCard 
                    episode={episode} 
                    layout="vertical"
                    className="w-full h-full bg-background border border-border/70 shadow-sm"
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default TrendingContent;

