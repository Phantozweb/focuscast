import { NextResponse } from 'next/server';
import { placeholderEpisodes as placeholderEpisodes1 } from '@/lib/placeholder-data';
import { placeholderEpisodes2 } from '@/lib/placeholder-2data';
import type { Episode } from '@/types';
import { getAnalyticsData } from '@/hooks/use-analytics';

export async function GET() {
  const allEpisodes: Episode[] = [...placeholderEpisodes1, ...placeholderEpisodes2];

  try {
    const analytics = await getAnalyticsData();

    const episodesWithAnalytics = allEpisodes.map(episode => {
      const episodeAnalytics = analytics[episode.id];
      return {
        ...episode,
        views: episodeAnalytics?.views ?? episode.views ?? 0,
        likes: episodeAnalytics?.likes ?? episode.likes ?? 0,
        url: `/episode/${episode.id}`,
      };
    });

    return NextResponse.json(episodesWithAnalytics);
  } catch (error) {
    console.error('Failed to fetch analytics for episodes.json:', error);
    // Return data without analytics if fetch fails
    const episodesWithUrls = allEpisodes.map(episode => ({
        ...episode,
        url: `/episode/${episode.id}`,
    }));
    return NextResponse.json(episodesWithUrls);
  }
}
