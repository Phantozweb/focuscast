
import type { Series } from '@/types';
import SeriesCard from '@/components/series/series-card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface SeriesSectionProps {
  series: Series[];
}

const SeriesSection: React.FC<SeriesSectionProps> = ({ series }) => {
  if (!series || series.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No series available yet.</p>;
  }

  return (
    <section id="series" className="py-12 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 px-4 md:px-0 font-headline text-center md:text-left">
          Explore Our Series
        </h2>
        <div className="relative">
           <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-6 pb-4 px-4 md:px-0">
              {series.map((s) => (
                <SeriesCard
                  key={s.id}
                  series={s}
                  className="w-[320px] md:w-[360px] flex-shrink-0"
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

export default SeriesSection;
