
import { placeholderEpisodes as placeholderEpisodes1, placeholderSeries as placeholderSeries1 } from '@/lib/placeholder-data';
import { placeholderEpisodes2, placeholderSeries2 } from '@/lib/placeholder-2data';
import { Metadata } from 'next';
import EpisodesClientPage from './episodes-client-page';
import type { Episode, Series } from '@/types';

export const metadata: Metadata = {
  title: 'All Episodes - FocusCast',
  description: 'Browse, search, and filter all episodes from FocusCast. Discover optometry insights on topics like clinical skills, ocular disease, and vision science. Your source for continuing education and professional knowledge.',
  keywords: ['optometry podcast', 'eye care episodes', 'vision science', 'clinical optometry', 'ocular disease', 'ophthalmology', 'optometry education'],
};

export default async function EpisodesPage() {
  // In a real app, these would be fetched from a database or API
  const allEpisodes: Episode[] = [...placeholderEpisodes1, ...placeholderEpisodes2];
  const allSeries: Series[] = [...placeholderSeries1, ...placeholderSeries2];

  return <EpisodesClientPage initialEpisodes={allEpisodes} allSeries={allSeries} />;
}
