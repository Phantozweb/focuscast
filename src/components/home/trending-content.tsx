
import type { Episode } from '@/types';
import EpisodeCard from '@/components/episodes/episode-card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { Flame } from 'lucide-react'; // Icon removed

interface TrendingContentProps {
  episodes: Episode[];
}

const TrendingContent: React.FC<TrendingContentProps> = ({ episodes }) => {
  if (!episodes || episodes.length === 0) {
    return (
      <section id="trending-content" className="py-8">
        <div className="container mx-auto">
          <div className="flex items-end gap-3 justify-start mb-6 px-4 md:px-0">
            {/* <Flame className="h-7 w-7 text-primary flex-shrink-0" /> */}
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
          {/* <Flame className="h-7 w-7 text-primary flex-shrink-0" /> */}
          <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
            Trending Now
          </h2>
        </div>
        <div className="relative">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-6 pb-4 px-4 md:px-0">
              {episodes.slice(0, 4).map((episode) => ( 
                <EpisodeCard 
                  key={episode.id + "-trending"} 
                  episode={episode} 
                  layout="horizontal"
                  className="w-[340px] sm:w-[400px] md:w-[460px] flex-shrink-0 bg-background border border-border/70 shadow-sm hover:shadow-md"
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

export default TrendingContent;
