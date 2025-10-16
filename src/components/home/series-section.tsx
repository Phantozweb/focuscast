
'use client';

import type { Series, Episode } from '@/types';
import SeriesCard from '@/components/series/series-card';
import { useAnalytics } from '@/hooks/use-analytics';
import { isEpisodeLocked } from '@/lib/release-dates';

interface SeriesSectionProps {
  series: Series[];
  allEpisodes: Episode[]; 
}

const SeriesSection: React.FC<SeriesSectionProps> = ({ series, allEpisodes }) => {
  const { analytics, isLoading } = useAnalytics();

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

  const getSeriesStats = (seriesId: string) => {
    const episodesInSeries = allEpisodes.filter(ep => ep.seriesId === seriesId);
    let totalViews = 0;
    let totalLikes = 0;
    
    episodesInSeries.forEach(ep => {
        const episodeAnalytics = analytics[ep.id];
        if (episodeAnalytics) {
            totalViews += episodeAnalytics.views;
            totalLikes += episodeAnalytics.likes;
        } else {
            totalViews += ep.views || 0;
            totalLikes += ep.likes || 0;
        }
    });

    return { totalViews, totalLikes };
  };

  return (
    <section id="series" className="py-12 bg-background">
      <div className="container mx-auto px-0 md:px-4">
        <div className="flex items-end gap-3 justify-center md:justify-start mb-8 px-4 md:px-0">
          <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
            Explore Our Series
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 gap-6 px-4 md:px-0">
          {series.map((s) => {
            const { totalViews, totalLikes } = getSeriesStats(s.id);
            const updatedSeries = { ...s, views: totalViews, likes: totalLikes };
            const episodesInSeries = allEpisodes.filter(ep => ep.seriesId === s.id);
            const episodeCount = episodesInSeries.length;
            const isLocked = episodesInSeries.some(isEpisodeLocked);

            return (
              <SeriesCard
                key={s.id + '-desktop'}
                series={updatedSeries}
                episodeCount={episodeCount}
                isLoading={isLoading}
                isLocked={isLocked}
              />
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory py-4 space-x-4 pl-4 no-scrollbar">
            {series.map((s) => {
                const { totalViews, totalLikes } = getSeriesStats(s.id);
                const updatedSeries = { ...s, views: totalViews, likes: totalLikes };
                const episodesInSeries = allEpisodes.filter(ep => ep.seriesId === s.id);
                const episodeCount = episodesInSeries.length;
                const isLocked = episodesInSeries.some(isEpisodeLocked);

                return (
                    <div key={s.id + '-mobile'} className="snap-center shrink-0 w-[90vw] max-w-sm">
                        <SeriesCard
                            series={updatedSeries}
                            episodeCount={episodeCount}
                            className="h-full"
                            isLoading={isLoading}
                            isLocked={isLocked}
                        />
                    </div>
                );
            })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default SeriesSection;
