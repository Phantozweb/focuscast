
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
  | (Episode & { resultType: 'episode'; score: number }) 
  | (Series & { resultType: 'series'; episodeCount: number; totalDuration: string; score: number });

const searchExamples = [
  "Diabetic Retinopathy",
  "Contact Lens Fitting",
  "Slit Lamp Techniques",
  "Glaucoma Diagnosis",
  "Pediatric Optometry",
];

const HeroSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [placeholder, setPlaceholder] = useState("Search episodes, series, topics...");
  
  useEffect(() => {
    let currentTermIndex = 0;
    let currentTerm = searchExamples[currentTermIndex];
    let letterIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const fullText = `Search "${currentTerm}"...`;
      if (isDeleting) {
        setPlaceholder(fullText.substring(0, letterIndex--));
        if (letterIndex < 8) { // "Search ""
          isDeleting = false;
          currentTermIndex = (currentTermIndex + 1) % searchExamples.length;
          currentTerm = searchExamples[currentTermIndex];
          timeoutId = setTimeout(type, 500);
        } else {
          timeoutId = setTimeout(type, 50);
        }
      } else {
        setPlaceholder(fullText.substring(0, letterIndex++));
        if (letterIndex > fullText.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, 2000);
        } else {
          timeoutId = setTimeout(type, 100);
        }
      }
    };

    timeoutId = setTimeout(type, 500);

    return () => clearTimeout(timeoutId);
  }, []);


  useEffect(() => {
    if (searchTerm.trim() !== '') {
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
        .map(ep => ({ ...ep, resultType: 'episode' as const, score: calculateScore(ep, lowerSearchTerm) }))
        .filter(ep => ep.score > 0);

      const matchingSeries = placeholderSeries.map(s => {
        const episodesInSeries = placeholderEpisodes.filter(ep => ep.seriesId === s.id);
        const count = episodesInSeries.length;
        const totalDurationInSeconds = episodesInSeries.reduce((total, ep) => total + parseDurationToSeconds(ep.duration), 0);
        const totalDuration = formatTotalSeconds(totalDurationInSeconds);
        return { 
          ...s, 
          resultType: 'series' as const, 
          episodeCount: count, 
          totalDuration,
          score: calculateScore(s, lowerSearchTerm)
        };
      }).filter(s => s.score > 0);
      
      const combinedSuggestions = [...matchingEpisodes, ...matchingSeries];

      combinedSuggestions.sort((a, b) => b.score - a.score);
      
      setSuggestions(combinedSuggestions);

    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
      <div className="container mx-auto text-center">
        <div className="hidden md:flex justify-center items-center gap-3 mb-4 md:mb-6">
          <FocusCastLogo className="h-10 md:h-12 text-4xl md:text-5xl" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 max-w-3xl mx-auto font-headline">
          Listen to optometry podcasts anytime, anywhere.
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your source for clear, concise, and professional optometry knowledge.
        </p>
        <div className="max-w-xl mx-auto px-4 md:px-0">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="search"
              placeholder={placeholder}
              className="flex-1 h-12 text-base"
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
