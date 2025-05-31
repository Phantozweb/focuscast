
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { placeholderSeries, placeholderEpisodes } from '@/lib/placeholder-data';
import SeriesClientPage from './series-client-page';
import type { Series, Episode } from '@/types';

type SeriesPageServerProps = {
  params: { seriesId: string };
};

export async function generateMetadata(
  { params }: SeriesPageServerProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const seriesId = params.seriesId;
  const series = placeholderSeries.find(s => s.id === seriesId);

  if (!series) {
    // Title for notFound will be handled by not-found.js or default layout if not specified
    return {
      title: 'Series Not Found', 
      description: 'The podcast series you are looking for could not be found on FocusCast.',
    };
  }

  return {
    title: series.title, // Will be combined with template: "%s - FocusCast"
    description: series.description,
    openGraph: {
      title: `${series.title} - FocusCast`,
      description: series.description,
      images: series.thumbnailUrl ? [{ url: series.thumbnailUrl }] : [],
      type: 'website', // Or 'article' if more appropriate for a series
    },
  };
}

export default async function SeriesPage({ params }: SeriesPageServerProps) {
  const seriesId = params.seriesId;
  const series: Series | undefined = placeholderSeries.find(s => s.id === seriesId);

  if (!series) {
    notFound(); 
  }

  const episodesInSeries: Episode[] = placeholderEpisodes
    .filter(ep => ep.seriesId === series.id)
    .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0));

  return <SeriesClientPage initialSeries={series} initialEpisodesInSeries={episodesInSeries} />;
}
