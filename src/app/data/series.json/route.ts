import { NextResponse } from 'next/server';
import { placeholderSeries as placeholderSeries1, placeholderEpisodes as placeholderEpisodes1 } from '@/lib/placeholder-data';
import { placeholderSeries2, placeholderEpisodes2 } from '@/lib/placeholder-2data';
import type { Series, Episode } from '@/types';
import { parseDurationToSeconds, formatTotalSeconds } from '@/lib/utils';
import { getAnalyticsData } from '@/hooks/use-analytics';

export async function GET() {
  const allSeries: Series[] = [...placeholderSeries1, ...placeholderSeries2];
  const allEpisodes: Episode[] = [...placeholderEpisodes1, ...placeholderEpisodes2];

  try {
    const analytics = await getAnalyticsData();
    
    const episodesWithAnalytics = allEpisodes.map(ep => {
      const episodeAnalytics = analytics[ep.id];
      return {
        ...ep,
        views: episodeAnalytics?.views ?? ep.views ?? 0,
        likes: episodeAnalytics?.likes ?? ep.likes ?? 0,
      };
    });

    const seriesWithDetails = allSeries.map(series => {
      const episodesInSeries = episodesWithAnalytics.filter(ep => ep.seriesId === series.id);
      
      const totalDurationInSeconds = episodesInSeries.reduce((total, episode) => {
        return total + parseDurationToSeconds(episode.duration);
      }, 0);

      const totalViews = episodesInSeries.reduce((acc, curr) => acc + (curr.views || 0), 0);
      const totalLikes = episodesInSeries.reduce((acc, curr) => acc + (curr.likes || 0), 0);

      return {
        ...series,
        url: `/series/${series.id}`,
        episodeCount: episodesInSeries.length,
        totalDuration: formatTotalSeconds(totalDurationInSeconds),
        totalViews,
        totalLikes,
        episodes: episodesInSeries.map(ep => ({
            id: ep.id,
            title: ep.title,
            episodeNumber: ep.episodeNumber,
            duration: ep.duration,
            url: `/episode/${ep.id}`,
            thumbnailUrl: ep.thumbnailUrl,
            views: ep.views,
            likes: ep.likes,
        })),
      };
    });

    return NextResponse.json(seriesWithDetails);
  } catch (error) {
    console.error('Failed to fetch analytics for series.json:', error);
    // Return data without analytics if fetch fails
     const seriesWithDetails = allSeries.map(series => {
      const episodesInSeries = allEpisodes.filter(ep => ep.seriesId === series.id);
      const totalDurationInSeconds = episodesInSeries.reduce((total, episode) => {
        return total + parseDurationToSeconds(episode.duration);
      }, 0);
       return {
        ...series,
        url: `/series/${series.id}`,
        episodeCount: episodesInSeries.length,
        totalDuration: formatTotalSeconds(totalDurationInSeconds),
        episodes: episodesInSeries.map(ep => ({
            id: ep.id,
            title: ep.title,
            episodeNumber: ep.episodeNumber,
            duration: ep.duration,
            url: `/episode/${ep.id}`,
        })),
      };
    });
    return NextResponse.json(seriesWithDetails);
  }
}
