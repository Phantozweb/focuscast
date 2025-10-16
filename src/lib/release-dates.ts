
import type { Episode } from "@/types";

// The time is set in UTC, which is 5 hours and 30 minutes behind IST.
// 06:00 IST on Oct 20, 2025 is 00:30 UTC on Oct 20, 2025.
const opticsUnveiledReleaseDate = new Date('2025-10-20T00:30:00Z');

export const isEpisodeLocked = (episode: Episode): boolean => {
  if (episode.seriesId === 'series-optics-unveiled') {
    return new Date() < opticsUnveiledReleaseDate;
  }
  return false;
};

export const getUnlockDate = (seriesId: string): Date | null => {
    if (seriesId === 'series-optics-unveiled') {
        return opticsUnveiledReleaseDate;
    }
    return null;
}

    