
'use client';

import type { Episode } from '@/types';
import EpisodeCard from '@/components/episodes/episode-card';
import { useAnalytics } from '@/hooks/use-analytics';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

interface TrendingContentProps {
  episodes: Episode[];
}

const TrendingContent: React.FC<TrendingContentProps> = ({ episodes: initialEpisodes }) => {
  const { analytics, isLoading } = useAnalytics();
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    if (!isLoading && Object.keys(analytics).length > 0) {
      const updatedEpisodes = initialEpisodes.map(ep => {
        const episodeAnalytics = analytics[ep.id];
        if (episodeAnalytics) {
          return { ...ep, ...episodeAnalytics };
        }
        return ep;
      });

      // Sort by a combination of views and likes for trending
      updatedEpisodes.sort((a, b) => ((b.views || 0) + (b.likes || 0)) - ((a.views || 0) + (a.likes || 0)));
      
      setEpisodes(updatedEpisodes.slice(0, 3)); // Keep it to top 3 trending
    } else if (!isLoading) {
      // Handle case where analytics might be empty but not loading
      setEpisodes(initialEpisodes.slice(0, 3));
    }
  }, [analytics, isLoading, initialEpisodes]);
  
  const LoadingSkeleton = () => (
    <div className="w-full bg-background border border-border/70 shadow-sm p-4 rounded-lg">
      <div className="flex flex-row items-start gap-4">
        <Skeleton className="w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0 rounded-md" />
        <div className="flex-grow min-w-0 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex gap-2 p-0 pt-4 mt-auto">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );


  return (
    <section id="trending-content" className="py-8">
      <div className="container mx-auto px-0 md:px-4">
        <div className="flex items-end gap-3 justify-start mb-6 px-4 md:px-0">
          <h2 className="text-3xl font-bold font-headline border-b-[3px] border-primary pb-1 leading-none">
            Trending Now
          </h2>
        </div>
        
        {isLoading && (
            <>
                 {/* Desktop Skeleton */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
                    {[...Array(3)].map((_, i) => <LoadingSkeleton key={`trending-skel-d-${i}`} />)}
                </div>
                {/* Mobile Skeleton */}
                <div className="md:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory py-4 space-x-4 pl-4 no-scrollbar">
                        {[...Array(2)].map((_, i) => (
                            <div key={`trending-skel-m-${i}`} className="snap-center shrink-0 w-[85vw]">
                                <LoadingSkeleton />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )}

        {!isLoading && episodes.length === 0 && (
             <p className="text-center text-muted-foreground py-8">No trending content available at the moment.</p>
        )}

        {!isLoading && episodes.length > 0 && (
          <>
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
              {episodes.map((episode) => ( 
                <EpisodeCard 
                  key={episode.id + "-trending-desktop"} 
                  episode={episode} 
                  layout="vertical"
                  className="w-full bg-background border border-border/70 shadow-sm hover:shadow-md"
                  isLoading={isLoading}
                />
              ))}
            </div>
            
            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="flex overflow-x-auto snap-x snap-mandatory py-4 space-x-4 pl-4 no-scrollbar">
                  {episodes.map((episode) => ( 
                    <div key={episode.id + "-trending-mobile"} className="snap-center shrink-0 w-[85vw]">
                      <EpisodeCard 
                        episode={episode} 
                        layout="vertical"
                        className="w-full h-full bg-background border border-border/70 shadow-sm"
                        isLoading={isLoading}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TrendingContent;
