
'use client';

import React, { useState, useEffect } from 'react'; 
import type { Episode, Series } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Clock, Play, MessageSquareQuote, List, Info, Eye, Heart } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/general/share-button';
import FeedbackForm from '@/components/general/feedback-form';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from '@/hooks/use-mobile';
import { incrementLikeCount } from '@/app/actions/analytics-actions';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/use-analytics';
import { Skeleton } from '@/components/ui/skeleton';


interface SeriesClientPageProps {
  initialSeries: Series; 
  initialEpisodesInSeries: Episode[];
  totalDuration: string;
}

const StatItem: React.FC<{ icon: React.ElementType; value: string; label: string; isLoading?: boolean }> = ({ icon: Icon, value, label, isLoading }) => (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <p className="text-sm">
        {isLoading ? <Skeleton className="h-5 w-10 inline-block" /> : <span className="font-semibold">{value}</span>}
        <span className="text-muted-foreground ml-1">{label}</span>
      </p>
    </div>
);

const formatStat = (num?: number): string => {
    if (num === undefined) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
};


export default function SeriesClientPage({ initialSeries, initialEpisodesInSeries, totalDuration }: SeriesClientPageProps) {
  const { currentEpisode, isPlaying, startSeriesPlayback } = usePlayer();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isLiked, setIsLiked] = useState(false);
  
  const { analytics, isLoading: isAnalyticsLoading } = useAnalytics();

  const [seriesStats, setSeriesStats] = useState({
      views: initialSeries.views || 0,
      likes: initialSeries.likes || 0,
  });

  const [episodes, setEpisodes] = useState(initialEpisodesInSeries);

  useEffect(() => {
    if (!isAnalyticsLoading) {
      let totalViews = 0;
      let totalLikes = 0;

      const updatedEpisodes = initialEpisodesInSeries.map(ep => {
        const episodeAnalytics = analytics[ep.id];
        if (episodeAnalytics) {
          totalViews += episodeAnalytics.views;
          totalLikes += episodeAnalytics.likes;
          return { ...ep, views: episodeAnalytics.views, likes: episodeAnalytics.likes };
        }
        totalViews += ep.views || 0;
        totalLikes += ep.likes || 0;
        return ep;
      });

      setEpisodes(updatedEpisodes);
      setSeriesStats({ views: totalViews, likes: totalLikes });
    }
  }, [analytics, isAnalyticsLoading, initialEpisodesInSeries]);


  const handlePlayAll = () => {
    if (episodes.length > 0) {
      startSeriesPlayback(episodes);
    }
  };
  
  const getEpisodeShareTitle = (episode: Episode) => {
    if (episode.seriesTitle && episode.episodeNumber) {
      return `${episode.title} - ${episode.seriesTitle} Ep. ${episode.episodeNumber}`;
    }
    return episode.title;
  };
  
  const seriesUrl = typeof window !== 'undefined' ? `${window.location.origin}/series/${initialSeries.id}` : '';
  
  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isLiked) {
        setIsLiked(true);
        setSeriesStats(prev => ({ ...prev, likes: prev.likes + 1 }));
        incrementLikeCount(initialSeries.id, 'series');
        toast({
          title: "Liked!",
          description: `You liked the "${initialSeries.title}" series.`,
        });
      } else {
        toast({
          title: "Already Liked",
          description: `You've already liked this series.`,
        });
      }
  };

  const SeriesHero = () => (
    <div className="bg-card dark:bg-muted/10 sm:border sm:border-border/50 sm:rounded-xl p-4 sm:p-6 sm:shadow-sm sm:mb-12 group">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
            {/* Image Column */}
            <div className="md:col-span-1 flex justify-center">
                <Image
                    src={initialSeries.thumbnailUrl}
                    alt={initialSeries.title}
                    width={400}
                    height={400}
                    className="rounded-lg shadow-xl aspect-square object-cover w-40 h-40 sm:w-48 sm:h-48 md:w-full md:h-auto transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={initialSeries.dataAiHint || "podcast series cover"}
                    priority
                />
            </div>

            {/* Info & Stats Column */}
            <div className="md:col-span-2 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 font-headline">{initialSeries.title}</h1>
                <p className="text-sm text-muted-foreground mb-6">{initialSeries.description}</p>
                
                <div className="flex justify-center md:justify-start flex-wrap gap-4 sm:gap-6 mb-6">
                    <StatItem icon={List} value={episodes.length.toString()} label="Episodes" />
                    {totalDuration && (
                        <StatItem icon={Clock} value={totalDuration} label="Total Time" />
                    )}
                     <StatItem icon={Eye} value={formatStat(seriesStats.views)} label="Views" isLoading={isAnalyticsLoading} />
                     <StatItem icon={Heart} value={formatStat(seriesStats.likes)} label="Likes" isLoading={isAnalyticsLoading}/>
                </div>

                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-2">
                  {episodes.length > 0 && (
                    <Button size="lg" onClick={handlePlayAll} className="w-full sm:w-auto">
                      <Play className="mr-2 h-5 w-5" /> Play All
                    </Button>
                  )}
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={handleLikeClick}
                        className="w-full sm:w-auto"
                        aria-label="Like series"
                    >
                        <Heart size={20} className={cn("mr-2 transition-colors", isLiked ? "text-red-500 fill-current" : "")} />
                        {isLiked ? 'Liked' : 'Like Series'}
                    </Button>
                  <ShareButton 
                      shareTitle={initialSeries.title}
                      shareUrl={`/series/${initialSeries.id}`}
                      buttonText="Share Series"
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto"
                    />
                </div>
            </div>
        </div>
      </div>
  );

  const EpisodeItems = () => (
     <>
        {episodes.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 px-4">No episodes found for this series yet.</p>
        ) : (
          <div className="space-y-4 px-4 md:px-0">
            {episodes.map((episode, index) => {
              const isActive = currentEpisode?.id === episode.id;
              return (
                <div 
                  key={episode.id} 
                  className={cn(
                    "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg shadow-sm bg-card",
                    "transform hover:-translate-y-0.5 transition-all duration-200 ease-out hover:shadow-md",
                    isActive ? "border-primary ring-1 ring-primary" : ""
                  )}
                >
                  <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0 flex-grow">
                    <span className="text-xl sm:text-2xl font-bold text-muted-foreground w-10 sm:w-12 text-center pt-1 sm:pt-0">
                      {episode.episodeNumber !== undefined ? `${episode.episodeNumber}` : `${index + 1}`}
                    </span>
                    <div className="flex-grow">
                      <h3 
                        className="text-lg font-semibold"
                      >
                        <Link href={`/episode/${episode.id}`} className="hover:text-primary transition-colors">{episode.title}</Link>
                      </h3>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <Clock size={14} className="mr-1.5" />
                        <span>{episode.duration}</span>
                        <span className="mx-1.5">•</span>
                        <span>{episode.releaseDate}</span>
                      </div>
                       <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
                            <div className="flex items-center gap-1">
                                <Eye size={14} />
                                 {isAnalyticsLoading ? <Skeleton className="h-4 w-8" /> : <span>{formatStat(episode.views)}</span>}
                            </div>
                            <div className="flex items-center gap-1">
                                <Heart size={14} />
                                {isAnalyticsLoading ? <Skeleton className="h-4 w-8" /> : <span>{formatStat(episode.likes)}</span>}
                            </div>
                        </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
                    <Button 
                      size="sm" 
                      variant={isActive && isPlaying ? "default" : "outline"}
                      onClick={() => startSeriesPlayback(episodes, index)}
                      className="flex-1 sm:flex-none"
                      aria-label={`Play ${episode.title}`}
                    >
                      <PlayCircle size={16} className="mr-2" /> 
                      {isActive && isPlaying ? 'Playing' : (isActive ? 'Paused' : 'Play')}
                    </Button>
                    <ShareButton
                      shareTitle={getEpisodeShareTitle(episode)}
                      shareUrl={`/episode/${episode.id}`}
                      size="sm"
                      className="flex-1 sm:flex-none"
                      aria-label={`Share ${episode.title}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
     </>
  );

  return (
    <div className="sm:container sm:mx-auto py-8">
      <div className="mb-8 px-4 sm:px-0">
        <Button asChild variant="outline" className="mb-6 text-sm">
          <Link href="/#series">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Series
          </Link>
        </Button>
      </div>

      {isMobile ? (
        <Tabs defaultValue="overview" className="w-full">
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="overview"><Info className="mr-2 h-4 w-4"/>Overview</TabsTrigger>
              <TabsTrigger value="episodes"><List className="mr-2 h-4 w-4"/>Episodes ({episodes.length})</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview">
              <SeriesHero />
          </TabsContent>
          <TabsContent value="episodes" className="px-0">
              <EpisodeItems />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <SeriesHero />
          <h2 className="text-3xl font-bold mb-8 px-4 md:px-0 font-headline">Episodes in This Series</h2>
          <EpisodeItems />
        </>
      )}
      
      <Separator className="my-12" />

      {/* Feedback Section */}
      <div className="mt-6 px-4 md:px-0">
          <h2 className="text-3xl font-bold mb-6 font-headline flex items-center">
              <MessageSquareQuote className="mr-3 h-6 w-6" />
              Review this Series
          </h2>
          <div className="max-w-2xl">
            <FeedbackForm
                sourceTitle={initialSeries.title}
                sourceType="Series"
                sourceUrl={seriesUrl}
                sourceThumbnailUrl={initialSeries.thumbnailUrl}
            />
          </div>
      </div>
    </div>
  );
}
