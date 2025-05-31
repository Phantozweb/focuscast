
import type { Series, Episode } from '@/types';
import SeriesCard from '@/components/series/series-card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface SeriesSectionProps {
  series: Series[];
  allEpisodes: Episode[]; 
}

const SeriesSection: React.FC<SeriesSectionProps> = ({ series, allEpisodes }) => {
  if (!series || series.length === 0) {
    return (
      <section id="series" className="py-12 bg-background">
        <div className="container mx-auto">
          <div className="flex items-end gap-3 justify-center md:justify-start mb-8 px-4 md:px-0">
            <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
              Explore Our Series
            </h2>
          </div>
          <p className="text-center text-muted-foreground py-8">No series available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="series" className="py-12 bg-background">
      <div className="container mx-auto">
        <div className="flex items-end gap-3 justify-center md:justify-start mb-8 px-4 md:px-0">
          <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
            Explore Our Series
          </h2>
        </div>
        <div className="relative">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4 px-4 md:px-0">
              {series.map((s) => {
                const episodeCount = allEpisodes.filter(ep => ep.seriesId === s.id).length;
                return (
                  <SeriesCard
                    key={s.id}
                    series={s}
                    episodeCount={episodeCount}
                    className="w-[300px] flex-shrink-0" // Fixed width for carousel items
                  />
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default SeriesSection;
