
'use client';

import React, { useState } from 'react';
import type { Episode, Series } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Clock, ListMusic, MessageSquareQuote } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import ShareButton from '@/components/general/share-button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import EpisodeCard from '@/components/episodes/episode-card';
import { Separator } from '@/components/ui/separator';
import FeedbackForm from '@/components/general/feedback-form';


interface EpisodeDetailClientPageProps {
  episode: Episode;
  series?: Series;
  relatedEpisodes: Episode[];
}

export default function EpisodeDetailClientPage({ episode, series, relatedEpisodes }: EpisodeDetailClientPageProps) {
  const { playEpisode, currentEpisode, isPlaying } = usePlayer();
  const isActive = currentEpisode?.id === episode.id;


  const getShareTitle = () => {
    if (episode.seriesTitle && episode.episodeNumber) {
      return `${episode.title} - ${episode.seriesTitle} Ep. ${episode.episodeNumber}`;
    }
    return episode.title;
  };

  const episodeUrl = typeof window !== 'undefined' ? `${window.location.origin}/episode/${episode.id}` : '';

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 px-4 sm:px-0">
        <Button asChild variant="outline" className="mb-6 text-sm">
          {series ? (
            <Link href={`/series/${series.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to {series.title}
            </Link>
          ) : (
            <Link href="/episodes">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Episodes
            </Link>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-0 sm:px-0 md:px-0">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-0 sm:p-6 rounded-lg sm:shadow-lg sm:border">
            <div className="flex flex-col md:flex-row gap-6 items-start p-4 sm:p-0">
              <div className="relative w-full md:w-48 aspect-[1/1] flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={episode.thumbnailUrl}
                  alt={episode.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 200px"
                  data-ai-hint={episode.seriesId === 'series-focus-bites' ? "podcast series art" : "podcast episode thumbnail"}
                  priority
                />
              </div>
              <div className="flex-grow">
                <h1 className="text-3xl sm:text-3xl font-bold mb-2 font-headline">{episode.title}</h1>
                {series && (
                  <Link href={`/series/${series.id}`} passHref legacyBehavior>
                    <Badge variant="secondary" className="hover:bg-accent cursor-pointer mb-3 text-base sm:text-sm">{series.title}</Badge>
                  </Link>
                )}
                {episode.episodeNumber && <Badge variant="outline" className="mb-3 ml-1 text-base sm:text-sm">Episode {episode.episodeNumber}</Badge>}
                
                <div className="flex items-center text-sm text-muted-foreground mt-2 mb-4">
                  <Clock size={16} className="mr-1.5" />
                  <span>{episode.duration}</span>
                  <span className="mx-2">•</span>
                  <span>{episode.releaseDate}</span>
                </div>
              </div>
            </div>
            
            <Separator className="my-6 hidden sm:block" />

            <div className="flex flex-col sm:flex-row gap-3 mb-4 p-4 sm:p-0">
              <Button
                size="lg"
                onClick={() => playEpisode(episode)}
                variant={isActive && isPlaying ? "default" : "outline"}
                className="flex-1 text-lg py-6 sm:py-2 sm:text-sm"
              >
                <PlayCircle size={20} className="mr-2" />
                {isActive && isPlaying ? 'Playing' : (isActive ? 'Paused' : 'Play Episode')}
              </Button>
              <ShareButton
                shareTitle={getShareTitle()}
                shareUrl={`/episode/${episode.id}`}
                buttonText="Share"
                size="lg"
                className="flex-1 text-lg py-6 sm:py-2 sm:text-sm"
              />
            </div>
            
            <div className="p-4 sm:p-0">
                <h2 className="text-2xl font-semibold mb-3 mt-8 font-headline">Episode Description</h2>
                <p className="text-foreground/80 leading-relaxed text-base sm:text-base whitespace-pre-line">{episode.description}</p>

                {episode.keywords && episode.keywords.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-3 font-headline">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {episode.keywords.map(keyword => (
                        <Badge key={keyword} variant="secondary" className="text-sm sm:text-xs">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {episode.transcript && (
                  <Accordion type="single" collapsible className="w-full mt-6">
                    <AccordionItem value="transcript-item">
                      <AccordionTrigger className="text-lg hover:no-underline">
                        <div className="flex items-center">
                          <ListMusic className="mr-2 h-5 w-5" />
                          View Transcript
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="prose prose-base dark:prose-invert max-w-none text-foreground/80 p-1 leading-relaxed sm:prose-sm sm:leading-normal">
                          {episode.transcript.split('\n').map((line, index) => {
                            if (line.trim() === '') return <div key={index} className="h-4" />;
                            
                            const parts = line.split(/(:)/);
                            if (parts.length > 1 && (
                                line.toLowerCase().includes('welcome back') ||
                                line.toLowerCase().includes('concept & explanation') ||
                                line.toLowerCase().includes('clinical pearls') ||
                                line.toLowerCase().includes('wrap-up & takeaway') ||
                                line.toLowerCase().startsWith('i am john') ||
                                line.toLowerCase().startsWith('hey, this is jennifer') ||
                                line.toLowerCase().includes('thanks for tuning in')
                              )
                            ) {
                              return (
                                <p key={index} className="mb-3">
                                  <strong>{parts[0]}{parts[1]}</strong>
                                  {parts.slice(2).join('')}
                                </p>
                              );
                            }
                            
                            return <p key={index} className="mb-3">{line}</p>;
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
                 <Separator className="my-8" />

                {/* Feedback Section */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4 font-headline flex items-center">
                        <MessageSquareQuote className="mr-3 h-6 w-6" />
                        Leave a Review
                    </h2>
                    <FeedbackForm
                        sourceTitle={episode.title}
                        sourceType="Episode"
                        sourceUrl={episodeUrl}
                        sourceThumbnailUrl={episode.thumbnailUrl}
                    />
                </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column - Related Episodes (Desktop) */}
        {relatedEpisodes.length > 0 && (
           <div className="lg:col-span-1 space-y-5 px-4 sm:px-0">
            <h2 className="text-2xl font-bold font-headline">Related Episodes</h2>
            <div className="space-y-4">
                {relatedEpisodes.map(relatedEp => (
                    <EpisodeCard key={`related-${relatedEp.id}`} episode={relatedEp} layout="vertical" className="bg-card shadow-md border"/>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
