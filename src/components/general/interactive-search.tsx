
'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import EpisodeCard from '@/components/episodes/episode-card';
import SeriesCard from '@/components/series/series-card';
import { placeholderEpisodes as placeholderEpisodes1, placeholderSeries as placeholderSeries1 } from '@/lib/placeholder-data';
import { placeholderEpisodes2, placeholderSeries2 } from '@/lib/placeholder-2data';
import type { Episode, Series } from '@/types';
import { parseDurationToSeconds, formatTotalSeconds } from '@/lib/utils';
import { useAnalytics } from '@/hooks/use-analytics';

type Suggestion = 
  | (Episode & { resultType: 'episode'; score: number }) 
  | (Series & { resultType: 'series'; episodeCount: number; totalDuration: string; score: number });

const placeholderEpisodes = [...placeholderEpisodes1, ...placeholderEpisodes2];
const placeholderSeries = [...placeholderSeries1, ...placeholderSeries2];

export default function InteractiveSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { analytics, isLoading: isAnalyticsLoading } = useAnalytics();

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      setIsSearching(true);
      const lowerSearchTerm = searchTerm.toLowerCase();

      const calculateScore = (item: Episode | Series, term: string): number => {
        let score = 0;
        const weights = {
          title: 10,
          keywords: 5,
          seriesTitle: 4,
          showName: 3,
          description: 2,
          transcript: 1,
        };

        if (item.title?.toLowerCase().includes(term)) score += weights.title;
        if (item.description?.toLowerCase().includes(term)) score += weights.description;
        if (item.keywords?.some(k => k.toLowerCase().includes(term))) score += weights.keywords;

        if ('seriesTitle' in item && item.seriesTitle?.toLowerCase().includes(term)) score += weights.seriesTitle;
        if ('showName' in item && item.showName?.toLowerCase().includes(term)) score += weights.showName;
        if ('transcript' in item && item.transcript?.toLowerCase().includes(term)) score += weights.transcript;

        return score;
      };

      const matchingEpisodes = placeholderEpisodes
        .map(ep => {
            const stats = analytics[ep.id] || { views: 0, likes: 0 };
            return { ...ep, ...stats, resultType: 'episode' as const, score: calculateScore(ep, lowerSearchTerm) }
        })
        .filter(ep => ep.score > 0);

      const matchingSeries = placeholderSeries.map(s => {
        const episodesInSeries = placeholderEpisodes.filter(ep => ep.seriesId === s.id);
        const count = episodesInSeries.length;
        const totalDurationInSeconds = episodesInSeries.reduce((total, ep) => total + parseDurationToSeconds(ep.duration), 0);
        const totalDuration = formatTotalSeconds(totalDurationInSeconds);
        const seriesStats = episodesInSeries.reduce((acc, ep) => {
            const stats = analytics[ep.id] || { views: 0, likes: 0 };
            acc.views += stats.views;
            acc.likes += stats.likes;
            return acc;
        }, { views: 0, likes: 0 });
        
        return { 
          ...s, 
          ...seriesStats,
          resultType: 'series' as const, 
          episodeCount: count, 
          totalDuration,
          score: calculateScore(s, lowerSearchTerm)
        };
      }).filter(s => s.score > 0);
      
      const combinedSuggestions = [...matchingEpisodes, ...matchingSeries];

      combinedSuggestions.sort((a, b) => b.score - a.score);
      
      setSuggestions(combinedSuggestions);
      setIsSearching(false);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, analytics]);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search episodes, series, topics..."
          className="h-12 w-full pl-9 text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search all content"
          autoFocus
        />
      </div>

      {searchTerm && (
        <div className="grid grid-cols-1 gap-4">
          {suggestions.length > 0 ? (
            suggestions.map((item) => {
              if (item.resultType === 'episode') {
                return (
                  <EpisodeCard 
                    key={`ep-search-${item.id}`} 
                    episode={item as Episode} 
                    layout="horizontal" 
                    className="bg-background border border-border/70 shadow-sm hover:shadow-md"
                    isLoading={isAnalyticsLoading}
                  />
                );
              } else if (item.resultType === 'series') {
                const seriesItem = item as Series & { episodeCount: number; totalDuration: string; };
                return (
                  <SeriesCard 
                    key={`ser-search-${seriesItem.id}`} 
                    series={seriesItem} 
                    episodeCount={seriesItem.episodeCount}
                    totalDuration={seriesItem.totalDuration}
                    className="bg-background border border-border/70 shadow-sm hover:shadow-md"
                    isLoading={isAnalyticsLoading}
                  />
                );
              }
              return null;
            })
          ) : !isAnalyticsLoading && !isSearching ? (
             <p className="text-center text-muted-foreground py-8">No results found for "{searchTerm}".</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
