
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Episode, Series } from '@/types';
import EpisodeList from '@/components/episodes/episode-list';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface EpisodesClientPageProps {
  initialEpisodes: Episode[];
  allSeries: Series[];
}

export default function EpisodesClientPage({ initialEpisodes, allSeries }: EpisodesClientPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeriesId, setSelectedSeriesId] = useState(''); // Empty string for "All Series" logic
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>(initialEpisodes);

  useEffect(() => {
    let episodesToFilter = initialEpisodes;

    // Filter by selected series
    if (selectedSeriesId) { // This will be true if selectedSeriesId is not '' (i.e., a specific series is chosen)
      episodesToFilter = episodesToFilter.filter(episode => episode.seriesId === selectedSeriesId);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.toLowerCase();
      episodesToFilter = episodesToFilter.filter(episode =>
        episode.title.toLowerCase().includes(lowerSearchTerm) ||
        episode.description.toLowerCase().includes(lowerSearchTerm) ||
        (episode.showName && episode.showName.toLowerCase().includes(lowerSearchTerm)) ||
        (episode.seriesTitle && episode.seriesTitle.toLowerCase().includes(lowerSearchTerm))
      );
    }

    setFilteredEpisodes(episodesToFilter);
  }, [searchTerm, selectedSeriesId, initialEpisodes]);

  const uniqueSeriesForFilter = useMemo(() => {
    const seriesMap = new Map<string, Series>();
    initialEpisodes.forEach(ep => {
      if (ep.seriesId && ep.seriesTitle) {
        const existingSeries = allSeries.find(s => s.id === ep.seriesId);
        if (existingSeries && !seriesMap.has(ep.seriesId)) {
           seriesMap.set(ep.seriesId, existingSeries);
        }
      }
    });
    return Array.from(seriesMap.values());
  }, [initialEpisodes, allSeries]);

  const handleSeriesChange = (value: string) => {
    setSelectedSeriesId(value === "all-series" ? "" : value);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 px-4 md:px-0">
        <h1 className="text-4xl font-bold mb-6 font-headline">All Episodes</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search episodes by title, description, show..."
              className="pl-9 h-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search all episodes"
            />
          </div>
          <Select 
            value={selectedSeriesId || "all-series"} 
            onValueChange={handleSeriesChange}
          >
            <SelectTrigger className="w-full md:w-[280px] h-10" aria-label="Filter by series">
              <SelectValue placeholder="Filter by Series" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-series">All Series</SelectItem>
              {uniqueSeriesForFilter.map(series => (
                <SelectItem key={series.id} value={series.id}>
                  {series.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <EpisodeList episodes={filteredEpisodes} />
      {filteredEpisodes.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No episodes match your criteria.</p>
          {searchTerm && <p className="mt-2 text-sm">Try adjusting your search or filters.</p>}
        </div>
      )}
    </div>
  );
}
