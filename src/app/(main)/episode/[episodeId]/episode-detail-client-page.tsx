
'use client';

import React, { useState, useEffect } from 'react';
import type { Episode, Series } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Clock, ListMusic, MessageSquareQuote, Heart, Eye, Lock } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import ShareButton from '@/components/general/share-button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import EpisodeCard from '@/components/episodes/episode-card';
import { Separator } from '@/components/ui/separator';
import FeedbackForm from '@/components/general/feedback-form';
import { cn } from '@/lib/utils';
import { incrementLikeCount } from '@/app/actions/analytics-actions';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/use-analytics';
import { isEpisodeLocked } from '@/lib/release-dates';


interface EpisodeDetailClientPageProps {
  episode: Episode;
  series?: Series;
  relatedEpisodes: Episode[];
}

const formatStat = (num?: number): string => {
    if (num === undefined) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
};

export default function EpisodeDetailClientPage({ episode: initialEpisode, series, relatedEpisodes: initialRelatedEpisodes }: EpisodeDetailClientPageProps) {
  const { playEpisode, currentEpisode, isPlaying } = usePlayer();
  const { toast } = useToast();
  const { analytics, isLoading: isAnalyticsLoading } = useAnalytics();
  
  const [episode, setEpisode] = useState(initialEpisode);
  const [relatedEpisodes, setRelatedEpisodes] = useState(initialRelatedEpisodes);

  const isLocked = isEpisodeLocked(episode);
  const isActive = currentEpisode?.id === episode.id;
  const [isLiked, setIsLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(episode.likes || 0);

  useEffect(() => {
    if (!isAnalyticsLoading && Object.keys(analytics).length > 0) {
      const mainEpisodeAnalytics = analytics[initialEpisode.id];
      if (mainEpisodeAnalytics) {
        const updatedEpisode = { ...initialEpisode, ...mainEpisodeAnalytics };
        setEpisode(updatedEpisode);
        setLocalLikeCount(updatedEpisode.likes || 0);
      }

      const updatedRelatedEpisodes = initialRelatedEpisodes.map(ep => {
        const relatedEpisodeAnalytics = analytics[ep.id];
        return relatedEpisodeAnalytics ? { ...ep, ...relatedEpisodeAnalytics } : ep;
      });
      setRelatedEpisodes(updatedRelatedEpisodes);
    }
  }, [analytics, isAnalyticsLoading, initialEpisode, initialRelatedEpisodes]);


  const getShareTitle = () => {
    if (episode.seriesTitle && episode.episodeNumber) {
      return `${episode.title} - ${episode.seriesTitle} Ep. ${episode.episodeNumber}`;
    }
    return episode.title;
  };
  
  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isLiked) {
      setIsLiked(true);
      setLocalLikeCount(prev => prev + 1);
      incrementLikeCount(episode.id, 'episode');
      toast({
        title: "Liked!",
        description: `You liked "${episode.title}".`,
      });
    } else {
      toast({
        title: "Already Liked",
        description: `You've already liked this episode.`,
      });
    }
  };

  const episodeUrl = typeof window !== 'undefined' ? `${window.location.origin}/episode/${episode.id}` : '';
  const releaseDate = new Date(episode.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

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
                  className={cn("object-cover", isLocked && "grayscale")}
                  sizes="(max-width: 768px) 100vw, 200px"
                  data-ai-hint={episode.seriesId === 'series-focus-bites' ? "podcast series art" : "podcast episode thumbnail"}
                  priority
                />
                 {isLocked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="h-12 w-12 text-white" />
                    </div>
                )}
              </div>
              <div className="flex-grow">
                <h1 className="text-3xl sm:text-3xl font-bold mb-2 font-headline">{episode.title}</h1>
                 {isLocked && <Badge variant="destructive" className="mb-3 text-base sm:text-sm">Coming Soon: {releaseDate}</Badge>}
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
                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Eye size={16} />
                        <span className="font-medium">{formatStat(episode.views)}</span>
                        <span className="hidden sm:inline">Views</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Heart size={16} className={cn(isLiked ? "text-red-500 fill-current" : "")} />
                        <span className="font-medium">{formatStat(localLikeCount)}</span>
                         <span className="hidden sm:inline">Likes</span>
                    </div>
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
                disabled={isLocked}
              >
                {isLocked ? <Lock size={20} className="mr-2"/> : <PlayCircle size={20} className="mr-2" />}
                {isLocked ? 'Locked' : (isActive && isPlaying ? 'Playing' : (isActive ? 'Paused' : 'Play Episode'))}
              </Button>
               <Button
                size="lg"
                variant="outline"
                onClick={handleLikeClick}
                className="flex-1 text-lg py-6 sm:py-2 sm:text-sm"
                aria-label="Like episode"
                disabled={isLiked}
                >
                    <Heart size={20} className={cn("mr-2 transition-colors", isLiked ? "text-red-500 fill-current" : "")} />
                    {isLiked ? 'Liked' : 'Like'}
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
                
                <Separator className="my-8" />

                {/* Feedback Section */}
                <div className="mt-6 mb-8">
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

                <Accordion type="single" collapsible className="w-full" disabled={isLocked}>
                    <AccordionItem value="transcript-item">
                      <AccordionTrigger className="text-lg hover:no-underline disabled:opacity-50 disabled:cursor-not-allowed">
                        <div className="flex items-center">
                          <ListMusic className="mr-2 h-5 w-5" />
                          View Transcript
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                         {isLocked ? (
                            <p className="text-center text-muted-foreground py-4">Transcript will be available on {releaseDate}.</p>
                         ) : (
                            <div className="prose prose-base dark:prose-invert max-w-none text-foreground/80 p-1 leading-relaxed sm:prose-sm sm:leading-normal">
                              {episode.transcript && episode.transcript.split('\n').map((line, index) => {
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
                         )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
            </div>
          </div>
        </div>

        {/* Sidebar Column - Related Episodes (Desktop) */}
        {relatedEpisodes.length > 0 && (
           <div className="lg:col-span-1 space-y-5 px-4 sm:px-0">
            <h2 className="text-2xl font-bold font-headline">Related Episodes</h2>
            <div className="space-y-4">
                {relatedEpisodes.map(relatedEp => (
                    <EpisodeCard key={`related-${relatedEp.id}`} episode={relatedEp} layout="vertical" className="bg-card shadow-md border" isLoading={isAnalyticsLoading}/>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

    