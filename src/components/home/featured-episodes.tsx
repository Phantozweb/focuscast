
import type { Episode } from '@/types';
import EpisodeCard from '@/components/episodes/episode-card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FeaturedEpisodesProps {
  episodes: Episode[];
}

const FeaturedEpisodes: React.FC<FeaturedEpisodesProps> = ({ episodes }) => {
  if (!episodes || episodes.length === 0) {
    return (
      <section 
        id="featured-episodes" 
        className="py-12 border-y border-border/30 bg-muted/20 dark:bg-muted/10"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 px-4 md:px-0 font-headline text-center md:text-left">Featured Episodes</h2>
          <p className="text-center text-muted-foreground py-8">No featured episodes available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="featured-episodes" 
      className="py-12 border-y border-border/30 bg-muted/20 dark:bg-muted/10"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 px-4 md:px-0 font-headline text-center md:text-left">
          Featured Episodes
        </h2>

        {/* Mobile: Vertical Stack - uses layout="vertical" for EpisodeCard */}
        <div className="md:hidden grid grid-cols-1 gap-6 px-4">
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id + '-mobile-featured'}
              episode={episode}
              className="w-full bg-background border border-border/70 shadow-sm hover:shadow-md"
              layout="vertical" 
            />
          ))}
        </div>

        {/* Desktop: Horizontal Scroll - uses layout="horizontal" for EpisodeCard */}
        <div className="hidden md:block relative">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-6 pb-4 px-4 md:px-0">
              {episodes.map((episode) => (
                <EpisodeCard
                  key={episode.id + '-desktop-featured'}
                  episode={episode}
                  className="w-[340px] sm:w-[400px] md:w-[460px] flex-shrink-0 bg-background border border-border/70 shadow-sm hover:shadow-md"
                  layout="horizontal"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEpisodes;
