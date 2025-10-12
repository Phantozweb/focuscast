
'use client';

import React, { useState } from 'react'; 
import type { Episode, Series } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Clock, Play, MessageSquareQuote } from 'lucide-react';
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

export default function SeriesClientPage({ initialSeries, initialEpisodesInSeries, totalDuration }: SeriesClientPageProps) {
  const [series] = useState<Series>(initialSeries); 
  const [episodesInSeries] = useState<Episode[]>(initialEpisodesInSeries);
  const { playEpisode, currentEpisode, isPlaying, startSeriesPlayback } = usePlayer();

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
      <div className="mb-12 p-4 md:p-0">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/#series">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Series
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <Image
              src={series.thumbnailUrl}
              alt={series.title}
              width={400}
              height={400}
              className="rounded-lg shadow-xl aspect-square object-cover w-full"
              data-ai-hint={series.dataAiHint || "podcast series cover"}
            />
          </div>
          <div className="flex-grow">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 font-headline">{series.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{series.description}</p>
            <div className="text-sm text-muted-foreground mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>
                {episodesInSeries.length} episode{episodesInSeries.length === 1 ? '' : 's'}
              </span>
              {totalDuration && (
                <>
                  <span className="text-muted-foreground/50 hidden sm:inline">|</span>
                  <div className="flex items-center">
                    <Clock className="mr-1.5 h-4 w-4" />
                    <span>{totalDuration} total</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-2 items-center">
              {episodesInSeries.length > 0 && (
                <Button size="lg" onClick={handlePlayAll}>
                  <Play className="mr-2 h-5 w-5" /> Play All Episodes
                </Button>
              )}
               <ShareButton 
                  shareTitle={series.title}
                  shareUrl={`/series/${series.id}`}
                  buttonText="Share Series"
                  size="lg"
                />
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-8 px-4 md:px-0 font-headline">Episodes in {series.title}</h2>
      
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
                  "transform hover:-translate-y-0.5 transition-all duration-200 ease-out hover:shadow-md"
                )}
              >
                <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0 flex-grow">
                  <span className="text-xl sm:text-2xl font-bold text-muted-foreground w-10 sm:w-12 text-center pt-1 sm:pt-0">
                    {episode.episodeNumber !== undefined ? `${episode.episodeNumber}` : `${index + 1}`}
                  </span>
                  <div className="flex-grow">
                    <h3 
                      className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer"
                    >
                       <Link href={`/episode/${episode.id}`}>{episode.title}</Link>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      From the "{series.title}" series
                    </p>
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
                    onClick={() => playEpisode(episode, episodesInSeries, index)}
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
