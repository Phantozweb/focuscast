
import { placeholderEpisodes, placeholderSeries } from '@/lib/placeholder-data';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import EpisodeDetailClientPage from './episode-detail-client-page';
import type { Episode, Series } from '@/types';

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
      description: 'The episode you are looking for could not be found on FocusCast.',
    };
  }

  return {
    title: episode.title, 
    description: episode.description,
    openGraph: {
      title: `${episode.title} - FocusCast`,
      description: episode.description,
      images: episode.thumbnailUrl ? [{ url: episode.thumbnailUrl }] : [],
      type: 'article',
      article: {
        published_time: new Date(episode.releaseDate).toISOString(),
        // authors: [episode.showName], // Consider adding if author data is available
        // section: episode.seriesTitle || 'Podcast', // Consider adding if category/section data is robust
      },
    },
    twitter: { // Basic Twitter card metadata
      card: 'summary_large_image',
      title: `${episode.title} - FocusCast`,
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


  return <EpisodeDetailClientPage episode={episode} series={series} relatedEpisodes={relatedEpisodes} />;
}
