
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import EpisodeCard from '@/components/episodes/episode-card';
import SeriesCard from '@/components/series/series-card';
import { placeholderEpisodes, placeholderSeries } from '@/lib/placeholder-data';
import type { Episode, Series } from '@/types';
import FocusCastLogo from '@/components/icons/focus-cast-logo';
import { parseDurationToSeconds, formatTotalSeconds } from '@/lib/utils';

type Suggestion = 
  | (Episode & { resultType: 'episode' }) 
  | (Series & { resultType: 'series'; episodeCount: number; totalDuration: string; });

const HeroSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const newSuggestions: Omit<Suggestion, 'resultType'>[] = [];
      const lowerSearchTerm = searchTerm.toLowerCase();

      // Suggest first matching episode
      const matchingEpisode = placeholderEpisodes.find(ep => 
        ep.title.toLowerCase().includes(lowerSearchTerm) || 
        (ep.showName && ep.showName.toLowerCase().includes(lowerSearchTerm)) ||
        (ep.seriesTitle && ep.seriesTitle.toLowerCase().includes(lowerSearchTerm))
      );
      if (matchingEpisode) {
        newSuggestions.push({ ...matchingEpisode, resultType: 'episode' });
      }

      // Suggest first matching series
      const matchingSeries = placeholderSeries.find(s => s.title.toLowerCase().includes(lowerSearchTerm));
      if (matchingSeries) {
        const episodesInSeries = placeholderEpisodes.filter(ep => ep.seriesId === matchingSeries.id);
        const count = episodesInSeries.length;
        const totalDurationInSeconds = episodesInSeries.reduce((total, ep) => total + parseDurationToSeconds(ep.duration), 0);
        const totalDuration = formatTotalSeconds(totalDurationInSeconds);
        newSuggestions.push({ ...matchingSeries, resultType: 'series', episodeCount: count, totalDuration });
      }
      
      // Fallback: if no specific matches, but search term exists, show first of each
      if (newSuggestions.length === 0) {
          if (placeholderEpisodes.length > 0 && newSuggestions.filter(s => s.resultType === 'episode').length === 0) {
              newSuggestions.push({ ...placeholderEpisodes[0], resultType: 'episode' });
          }
          if (placeholderSeries.length > 0 && newSuggestions.filter(s => s.resultType === 'series').length === 0) {
              const firstSeries = placeholderSeries[0];
              const episodesInSeries = placeholderEpisodes.filter(ep => ep.seriesId === firstSeries.id);
              const count = episodesInSeries.length;
              const totalDurationInSeconds = episodesInSeries.reduce((total, ep) => total + parseDurationToSeconds(ep.duration), 0);
              const totalDuration = formatTotalSeconds(totalDurationInSeconds);
              newSuggestions.push({ ...firstSeries, resultType: 'series', episodeCount: count, totalDuration });
          }
      }

      const finalSuggestions: Suggestion[] = [];
      const epSugg = newSuggestions.find(s => s.resultType === 'episode') as (Episode & { resultType: 'episode' }) | undefined;
      const serSugg = newSuggestions.find(s => s.resultType === 'series') as (Series & { resultType: 'series'; episodeCount: number; totalDuration: string; }) | undefined;
      
      if(epSugg) finalSuggestions.push(epSugg);
      if(serSugg) finalSuggestions.push(serSugg);
      
      setSuggestions(finalSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <FocusCastLogo className="h-10 md:h-12 text-4xl md:text-5xl" />
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Listen to optometry podcasts anytime, anywhere.
        </p>
        <div className="max-w-xl mx-auto">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="search"
              placeholder="Search episodes, series..."
              className="flex-1 h-12 text-base md:text-lg"
              aria-label="Search episodes and series"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="lg" className="h-12" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="mt-8 max-w-3xl mx-auto bg-card p-4 sm:p-6 rounded-xl shadow-2xl border border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-left text-foreground">
              Suggested
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {suggestions.map((item) => {
                if (item.resultType === 'episode') {
                  return (
                    <EpisodeCard 
                      key={`ep-search-${item.id}`} 
                      episode={item as Episode} 
                      layout="horizontal" 
                      className="bg-background border border-border/70 shadow-sm hover:shadow-md"
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
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
