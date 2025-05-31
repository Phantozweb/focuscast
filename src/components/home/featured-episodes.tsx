
import type { Episode } from '@/types';
import EpisodeCard from '@/components/episodes/episode-card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FeaturedEpisodesProps {
  episodes: Episode[];
}

const FeaturedEpisodes: React.FC<FeaturedEpisodesProps> = ({ episodes }) => {
  if (!episodes || episodes.length === 0) {
    return <p>No featured episodes available.</p>;
  }

  return (
    <section id="featured-episodes" className="py-8">
      <h2 className="text-3xl font-bold mb-6 px-4 md:px-0 font-headline">Featured Episodes</h2>
      <div className="relative">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4 px-4 md:px-0">
            {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                className="w-[300px] md:w-[350px] flex-shrink-0"
                layout="vertical"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default FeaturedEpisodes;
