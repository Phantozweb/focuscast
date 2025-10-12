
'use client';

import React from 'react';
import type { Episode, Series } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Download, Clock, ListMusic } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import ShareButton from '@/components/general/share-button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import EpisodeCard from '@/components/episodes/episode-card';
import { Separator } from '@/components/ui/separator';

interface EpisodeDetailClientPageProps {
  episode: Episode;
  series?: Series;
  relatedEpisodes: Episode[];
}

export default function EpisodeDetailClientPage({ episode, series, relatedEpisodes }: EpisodeDetailClientPageProps) {
  const { playEpisode, downloadEpisode, currentEpisode, isPlaying } = usePlayer();
  const isActive = currentEpisode?.id === episode.id;

  const getShareTitle = () => {
    if (episode.seriesTitle && episode.episodeNumber) {
      return `${episode.title} - ${episode.seriesTitle} Ep. ${episode.episodeNumber}`;
    }
    return episode.title;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 px-4 md:px-0">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-4 md:px-0">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card p-4 sm:p-6 rounded-lg shadow-lg border">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              <div className="relative w-full md:w-48 h-48 md:h-auto md:aspect-square flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={episode.thumbnailUrl}
                  alt={episode.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 200px"
                  data-ai-hint={episode.seriesId === 'series-focus-bites' ? "podcast series art" : "podcast episode thumbnail"}
                  priority
                />
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1.5 font-headline">{episode.title}</h1>
                {series && (
                  <Link href={`/series/${series.id}`} passHref legacyBehavior>
                    <Badge variant="secondary" className="hover:bg-accent cursor-pointer mb-2 text-xs sm:text-sm">{series.title}</Badge>
                  </Link>
                )}
                {episode.episodeNumber && <Badge variant="outline" className="mb-2 ml-1 text-xs sm:text-sm">Episode {episode.episodeNumber}</Badge>}
                
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground mt-1 mb-3">
                  <Clock size={14} className="mr-1.5" />
                  <span>{episode.duration}</span>
                  <span className="mx-1.5">•</span>
                  <span>{episode.releaseDate}</span>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <Button
                size="lg"
                onClick={() => playEpisode(episode)}
                variant={isActive && isPlaying ? "default" : "outline"}
                className="flex-1"
              >
                <PlayCircle size={18} className="mr-2" />
                {isActive && isPlaying ? 'Playing' : (isActive ? 'Paused' : 'Play Episode')}
              </Button>
              <Button size="lg" variant="outline" onClick={() => downloadEpisode(episode)} className="flex-1">
                <Download size={18} className="mr-2" />
                Download
              </Button>
              <ShareButton
                shareTitle={getShareTitle()}
                shareUrl={`/episode/${episode.id}`}
                buttonText="Share"
                size="lg"
                className="flex-1"
              />
            </div>
            
            <h2 className="text-xl font-semibold mb-2 mt-6 font-headline">Episode Description</h2>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base whitespace-pre-line">{episode.description}</p>

            {episode.keywords && episode.keywords.length > 0 && (
              <div className="mt-6">
                <h3 className="text-base font-semibold mb-2 font-headline">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {episode.keywords.map(keyword => (
                    <Badge key={keyword} variant="secondary">{keyword}</Badge>
                  ))}
                </div>
              </div>
            )}

            {episode.transcript && (
              <Accordion type="single" collapsible className="w-full mt-6">
                <AccordionItem value="transcript-item">
                  <AccordionTrigger className="text-base hover:no-underline">
                    <div className="flex items-center">
                      <ListMusic className="mr-2 h-5 w-5" />
                      View Transcript
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line text-foreground/80 p-1 leading-normal">
                      {episode.transcript.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-3">{paragraph}</p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </div>

        {/* Sidebar Column - Related Episodes (Desktop) */}
        {relatedEpisodes.length > 0 && (
           <div className="lg:col-span-1 space-y-5">
            <h2 className="text-xl font-bold font-headline px-4 md:px-0">Related Episodes</h2>
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
