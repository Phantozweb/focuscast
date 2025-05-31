
'use client';

import { placeholderEpisodes, placeholderSeries } from '@/lib/placeholder-data';
import type { Episode, Series } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircle, Download, Clock } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import { useEffect, useState } from 'react';
import type { Metadata } from 'next';

interface SeriesPageProps {
  params: { seriesId: string };
}

// Note: generateMetadata remains a server-side function.
// We need to handle fetching data for it separately if it can't access client-side state.
// For this example, we'll assume placeholderSeries is available, but in a real app,
// you'd fetch this data in a way accessible by generateMetadata.

// export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
//   const series = placeholderSeries.find(s => s.id === params.seriesId);
//   if (!series) {
//     return {
//       title: 'Series Not Found - FocusCast',
//     };
//   }
//   return {
//     title: `${series.title} - Series - FocusCast`,
//     description: series.description,
//   };
// }

export default function SeriesPage({ params }: SeriesPageProps) {
  const [series, setSeries] = useState<Series | undefined>(undefined);
  const [episodesInSeries, setEpisodesInSeries] = useState<Episode[]>([]);
  const { playEpisode, downloadEpisode, currentEpisode, isPlaying } = usePlayer();

  useEffect(() => {
    const foundSeries = placeholderSeries.find(s => s.id === params.seriesId);
    setSeries(foundSeries);
    if (foundSeries) {
      const filteredEpisodes = placeholderEpisodes
        .filter(ep => ep.seriesId === foundSeries.id)
        .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0));
      setEpisodesInSeries(filteredEpisodes);
    }
  }, [params.seriesId]);

  if (!series) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Series Not Found</h1>
        <p className="text-muted-foreground mb-8">The series you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back Home
          </Link>
        </Button>
      </div>
    );
  }

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
            <p className="text-lg text-muted-foreground mb-6">{series.description}</p>
            <p className="text-sm text-muted-foreground">
              {episodesInSeries.length} episode{episodesInSeries.length === 1 ? '' : 's'} in this series.
            </p>
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
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card"
              >
                <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0 flex-grow">
                  <span className="text-xl sm:text-2xl font-bold text-muted-foreground w-10 sm:w-12 text-center pt-1 sm:pt-0">
                    {episode.episodeNumber !== undefined ? `${episode.episodeNumber}` : `${index + 1}`}
                  </span>
                  <div className="flex-grow">
                    <h3 
                      className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer" 
                      onClick={() => playEpisode(episode)}
                    >
                      {episode.title}
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
                    onClick={() => playEpisode(episode)}
                    className="flex-1 sm:flex-none"
                  >
                    <PlayCircle size={16} className="mr-2" /> 
                    {isActive && isPlaying ? 'Playing' : (isActive ? 'Paused' : 'Play')}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => downloadEpisode(episode)}
                    className="flex-1 sm:flex-none"
                  >
                    <Download size={16} className="mr-2" /> Download
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// generateStaticParams remains a server function.
// If it needs data that's also used in the client component, ensure it's fetched appropriately.
// export async function generateStaticParams() {
//   return placeholderSeries.map(series => ({
//     seriesId: series.id,
//   }));
// }
// Disabling generateStaticParams for now as it requires metadata generation which also needs to be fixed
// for client components or have data fetched in a server-compatible way.
// If you need static generation, metadata and data fetching strategies here will need adjustment.
// For dynamic rendering, this setup is fine.

    