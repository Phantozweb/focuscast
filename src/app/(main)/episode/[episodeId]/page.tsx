
import { placeholderEpisodes, placeholderSeries } from '@/lib/placeholder-data';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import EpisodeDetailClientPage from './episode-detail-client-page';
import type { Episode, Series } from '@/types';
import { formatDurationToISO8601 } from '@/lib/utils';
import Script from 'next/script';

type EpisodePageServerProps = {
  params: { episodeId: string };
};

export async function generateMetadata(
  { params }: EpisodePageServerProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const episodeId = params.episodeId;
  const episode = placeholderEpisodes.find(ep => ep.id === episodeId);

  if (!episode) {
    return {
      title: 'Episode Not Found',
      description: 'The podcast episode you are looking for could not be found on FocusCast.',
    };
  }

  const series = episode.seriesId ? placeholderSeries.find(s => s.id === episode.seriesId) : undefined;
  const fullTitle = `${episode.title} | ${series ? series.title : episode.showName}`;

  return {
    title: fullTitle, 
    description: `Listen to "${episode.title}". ${episode.description}`,
    openGraph: {
      title: fullTitle,
      description: episode.description,
      images: episode.thumbnailUrl ? [{ url: episode.thumbnailUrl }] : [],
      type: 'article',
      article: {
        publishedTime: new Date(episode.releaseDate).toISOString(),
        authors: [series ? series.title : episode.showName],
        section: series ? series.title : 'Podcast',
      },
      audio: {
        url: episode.audioUrl,
        type: 'audio/mpeg',
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: episode.description,
      images: episode.thumbnailUrl ? [episode.thumbnailUrl] : [],
    },
  };
}

export default async function EpisodePage({ params }: EpisodePageServerProps) {
  const episodeId = params.episodeId;
  const episode: Episode | undefined = placeholderEpisodes.find(ep => ep.id === episodeId);

  if (!episode) {
    notFound();
  }
  
  const series: Series | undefined = episode.seriesId ? placeholderSeries.find(s => s.id === episode.seriesId) : undefined;

  // Find related episodes
  let relatedEpisodes: Episode[] = [];
  if (episode.seriesId) {
    relatedEpisodes = placeholderEpisodes
      .filter(ep => ep.seriesId === episode.seriesId && ep.id !== episode.id)
      .sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0))
      .slice(0, 3); 
  }
  if (relatedEpisodes.length < 3) {
    const otherEpisodes = placeholderEpisodes
      .filter(ep => ep.id !== episode.id && (!ep.seriesId || ep.seriesId !== episode.seriesId))
      .sort(() => 0.5 - Math.random()) // Shuffle for variety
      .slice(0, 3 - relatedEpisodes.length);
    relatedEpisodes = [...relatedEpisodes, ...otherEpisodes];
  }

  const episodeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    'name': episode.title,
    'description': episode.description,
    'url': `/episode/${episode.id}`,
    'datePublished': new Date(episode.releaseDate).toISOString(),
    'timeRequired': formatDurationToISO8601(episode.duration),
    'associatedMedia': {
      '@type': 'MediaObject',
      'contentUrl': episode.audioUrl,
      'encodingFormat': 'audio/mpeg'
    },
    'image': episode.thumbnailUrl,
    ...(series && {
      'partOfSeries': {
        '@type': 'PodcastSeries',
        'name': series.title,
        'url': `/series/${series.id}`
      }
    })
  };

  return (
    <>
      <Script
        id="episode-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeJsonLd) }}
      />
      <EpisodeDetailClientPage episode={episode} series={series} relatedEpisodes={relatedEpisodes} />
    </>
  );
}
