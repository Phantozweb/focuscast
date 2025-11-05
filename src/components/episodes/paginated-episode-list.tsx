'use client';

import React, { useState, useEffect } from 'react';
import type { Episode } from '@/types';
import EpisodeList from './episode-list';
import { useAnalytics } from '@/hooks/use-analytics';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginatedEpisodeListProps {
  initialEpisodes: Episode[];
  episodesPerPage?: number;
}

export default function PaginatedEpisodeList({ initialEpisodes, episodesPerPage = 8 }: PaginatedEpisodeListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes);
  const { analytics, isLoading: isAnalyticsLoading } = useAnalytics();

  useEffect(() => {
    if (!isAnalyticsLoading && Object.keys(analytics).length > 0) {
      const updatedEpisodes = initialEpisodes.map(ep => {
        const episodeAnalytics = analytics[ep.id];
        if (episodeAnalytics) {
          return { ...ep, ...episodeAnalytics };
        }
        return ep;
      });
      setEpisodes(updatedEpisodes);
    }
  }, [analytics, isAnalyticsLoading, initialEpisodes]);

  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const startIndex = (currentPage - 1) * episodesPerPage;
  const endIndex = startIndex + episodesPerPage;
  const currentEpisodes = episodes.slice(startIndex, endIndex);

  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    const ellipsis = <PaginationItem key="ellipsis"><PaginationEllipsis /></PaginationItem>;

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i); }} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(1); }} isActive={1 === currentPage}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(React.cloneElement(ellipsis, { key: "start-ellipsis" }));
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
          start = 2;
          end = maxPagesToShow -1;
      }
       if (currentPage >= totalPages - 2) {
          start = totalPages - maxPagesToShow + 2;
          end = totalPages -1
      }


      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i); }} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
         items.push(React.cloneElement(ellipsis, { key: "end-ellipsis" }));
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }} isActive={totalPages === currentPage}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div>
      <EpisodeList episodes={currentEpisodes} isLoading={isAnalyticsLoading} />
      {totalPages > 1 && (
         <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} />
              </PaginationItem>
              {getPaginationItems()}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
      )}
    </div>
  );
}