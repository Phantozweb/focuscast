import EpisodeList from '@/components/episodes/episode-list';
import { placeholderEpisodes } from '@/lib/placeholder-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Episodes - FocusCast',
  description: 'Browse all episodes from FocusCast.',
};

export default function EpisodesPage() {
  const allEpisodes = placeholderEpisodes; // In a real app, fetch this data

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 px-4 md:px-0 font-headline">All Episodes</h1>
      <EpisodeList episodes={allEpisodes} />
    </div>
  );
}
