
import type { Episode } from '@/types';
import EpisodeCard from '@/components/episodes/episode-card';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface FeaturedEpisodesProps {
  episodes: Episode[];
}

const FeaturedEpisodes: React.FC<FeaturedEpisodesProps> = ({ episodes }) => {
  if (!episodes || episodes.length === 0) {
    return (
      <section
        id="featured-episodes"
        className="py-12 md:border-y md:border-border/30 md:bg-muted/20 dark:bg-muted/10"
      >
        <div className="container mx-auto">
          <div className="flex items-end gap-3 justify-center md:justify-start mb-8 px-4 md:px-0">
            <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
              Featured Episodes
            </h2>
          </div>
          <p className="text-center text-muted-foreground py-8">No featured episodes available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="featured-episodes"
      className="py-12 md:border-y md:border-border/30 md:bg-muted/20 dark:bg-muted/10"
    >
      <div className="container mx-auto px-0 md:px-4">
        <div className="flex items-end gap-3 justify-center md:justify-start mb-8 px-4 md:px-0">
           <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
            Featured Episodes
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 px-4 md:px-0">
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id + '-featured-desktop'}
              episode={episode}
              className="w-full bg-background border border-border/70 shadow-sm hover:shadow-md"
              layout="vertical"
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
            <div className="flex overflow-x-auto snap-x snap-mandatory py-4 space-x-4 pl-4 no-scrollbar">
              {episodes.map((episode) => (
                <div key={episode.id + '-featured-mobile'} className="snap-center shrink-0 w-[85vw]">
                      <EpisodeCard
                        episode={episode}
                        className="w-full h-full bg-background border border-border/70 shadow-sm"
                        layout="vertical"
                    />
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEpisodes;
