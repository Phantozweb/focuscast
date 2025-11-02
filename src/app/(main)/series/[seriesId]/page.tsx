
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { placeholderSeries as placeholderSeries1, placeholderEpisodes as placeholderEpisodes1 } from '@/lib/placeholder-data';
import { placeholderSeries2, placeholderEpisodes2 } from '@/lib/placeholder-2data';
import SeriesClientPage from './series-client-page';
import type { Series, Episode } from '@/types';
import Script from 'next/script';
import { parseDurationToSeconds, formatTotalSeconds } from '@/lib/utils';

type SeriesPageServerProps = {
  params: { seriesId: string };
};

const placeholderSeries = [...placeholderSeries1, ...placeholderSeries2];
const placeholderEpisodes = [...placeholderEpisodes1, ...placeholderEpisodes2];

export async function generateMetadata(
  { params }: SeriesPageServerProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const seriesId = params.seriesId;
  const series = placeholderSeries.find(s => s.id === seriesId);

  if (!series) {
    return {
      title: 'Series Not Found', 
      description: 'The podcast series you are looking for could not be found on FocusCast.',
    };
  }

  const fullTitle = `${series.title} Podcast Series`;

  return {
    title: fullTitle,
    description: series.description,
    keywords: series.keywords,
    openGraph: {
      title: fullTitle,
      description: series.description,
      url: `/series/${series.id}`,
      images: series.thumbnailUrl ? [{ url: series.thumbnailUrl }] : [],
      type: 'website',
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
  
  const totalDurationInSeconds = episodesInSeries.reduce((total, episode) => {
    return total + parseDurationToSeconds(episode.duration);
  }, 0);

  const totalDurationFormatted = formatTotalSeconds(totalDurationInSeconds);

  const seriesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    'name': series.title,
    'description': series.description,
    'url': `/series/${series.id}`,
    'image': series.thumbnailUrl,
    'keywords': series.keywords?.join(','),
  };

  return (
    <>
      <Script
        id="series-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesJsonLd) }}
      />
      <SeriesClientPage 
        initialSeries={series} 
        initialEpisodesInSeries={episodesInSeries} 
        totalDuration={totalDurationFormatted}
      />
    </>
  );
}
