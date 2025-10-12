'use client';

import React from 'react'; 
import type { Episode, Series } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Clock, Play, MessageSquareQuote, List } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import { cn } from '@/lib/utils';
import ShareButton from '@/components/general/share-button';
import FeedbackForm from '@/components/general/feedback-form';
import { Separator } from '@/components/ui/separator';

interface SeriesClientPageProps {
  initialSeries: Series; 
  initialEpisodesInSeries: Episode[];
  totalDuration: string;
}

const StatItem: React.FC<{ icon: React.ElementType; value: string; label: string; }> = ({ icon: Icon, value, label }) => (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <p className="text-sm">
        <span className="font-semibold">{value}</span>
        <span className="text-muted-foreground ml-1">{label}</span>
      </p>
    </div>
);


export default function SeriesClientPage({ initialSeries: series, initialEpisodesInSeries: episodesInSeries, totalDuration }: SeriesClientPageProps) {
  const { currentEpisode, isPlaying, startSeriesPlayback } = usePlayer();

  const handlePlayAll = () => {
    if (episodesInSeries.length > 0) {
      startSeriesPlayback(episodesInSeries);
    }
  };
  
  const getEpisodeShareTitle = (episode: Episode) => {
    if (episode.seriesTitle && episode.episodeNumber) {
      return `${episode.title} - ${episode.seriesTitle} Ep. ${episode.episodeNumber}`;
    }
    return episode.title;
  };
  
  const seriesUrl = typeof window !== 'undefined' ? `${window.location.origin}/series/${series.id}` : '';

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 px-4 md:px-0">
        <Button asChild variant="outline" className="mb-6 text-sm">
          <Link href="/#series">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Series
          </Link>
        </Button>
      </div>
      
      {/* Redesigned Hero Section */}
      <div className="bg-card dark:bg-muted/10 border border-border/50 rounded-xl p-4 sm:p-6 shadow-sm mb-12 group">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
            {/* Image Column */}
            <div className="col-span-1 flex justify-center items-start">
                <Image
                    src={series.thumbnailUrl}
                    alt={series.title}
                    width={400}
                    height={400}
                    className="rounded-lg shadow-xl aspect-square object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={series.dataAiHint || "podcast series cover"}
                    priority
                />
            </div>

            {/* Info & Stats Column */}
            <div className="col-span-2">
                <h1 className="text-xl md:text-4xl font-bold mb-2 font-headline">{series.title}</h1>
                <p className="text-xs sm:text-md text-muted-foreground mb-4 sm:mb-6">{series.description}</p>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center mb-4 sm:mb-6">
                    <StatItem icon={List} value={episodesInSeries.length.toString()} label="Episodes" />
                    {totalDuration && (
                        <StatItem icon={Clock} value={totalDuration.replace(' total','')} label="Total Time" />
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  {episodesInSeries.length > 0 && (
                    <Button size="lg" onClick={handlePlayAll} className="flex-1 w-full sm:w-auto">
                      <Play className="mr-2 h-5 w-5" /> Play All
                    </Button>
                  )}
                  <ShareButton 
                      shareTitle={series.title}
                      shareUrl={`/series/${series.id}`}
                      buttonText="Share Series"
                      size="lg"
                      variant="outline"
                      className="flex-1 w-full sm:w-auto"
                    />
                </div>
            </div>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-8 px-4 md:px-0 font-headline">Episodes in This Series</h2>
      
      {episodesInSeries.length === 0 ? (
        <p className="text-center text-muted-foreground py-8 px-4 md:px-0">No episodes found for this series yet.</p>
      ) : (
        <div className="space-y-4 px-4 md:px-0">
          {episodesInSeries.map((episode, index) => {
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
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto flex-shrink-0">
                  <Button 
                    size="sm" 
                    variant={isActive && isPlaying ? "default" : "outline"}
                    onClick={() => startSeriesPlayback(episodesInSeries, index)}
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

      <Separator className="my-12" />

      {/* Feedback Section */}
      <div className="mt-6 px-4 md:px-0">
          <h2 className="text-3xl font-bold mb-6 font-headline flex items-center">
              <MessageSquareQuote className="mr-3 h-6 w-6" />
              Review this Series
          </h2>
          <div className="max-w-2xl">
            <FeedbackForm
                sourceTitle={series.title}
                sourceType="Series"
                sourceUrl={seriesUrl}
                sourceThumbnailUrl={series.thumbnailUrl}
            />
          </div>
      </div>
    </div>
  );
}
