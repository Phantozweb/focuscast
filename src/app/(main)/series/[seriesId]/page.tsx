
import { placeholderEpisodes, placeholderSeries } from '@/lib/placeholder-data';
import type { Episode, Series } from '@/types';
import EpisodeList from '@/components/episodes/episode-list';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SeriesPageProps {
  params: { seriesId: string };
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const series = placeholderSeries.find(s => s.id === params.seriesId);
  if (!series) {
    return {
      title: 'Series Not Found - FocusCast',
    };
  }
  return {
    title: `${series.title} - Series - FocusCast`,
    description: series.description,
  };
}

export default function SeriesPage({ params }: SeriesPageProps) {
  const series = placeholderSeries.find(s => s.id === params.seriesId) as Series | undefined;
  
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

  const episodesInSeries = placeholderEpisodes
    .filter(ep => ep.seriesId === series.id)
    .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0));

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
      <EpisodeList episodes={episodesInSeries} />
    </div>
  );
}

export async function generateStaticParams() {
  return placeholderSeries.map(series => ({
    seriesId: series.id,
  }));
}

