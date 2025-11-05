
export interface Episode {
  id: string;
  title: string;
  showName: string; // This can represent the overall show or podcast series name
  description: string;
  duration: string; // e.g., "30:15"
  thumbnailUrl: string;
  audioUrl: string;
  releaseDate: string;
  category?: string; // Corresponds to category id - will be removed if categories are fully removed
  seriesId?: string; // ID of the series this episode belongs to
  seriesTitle?: string; // Title of the series, denormalized for convenience
  episodeNumber?: number; // Episode number within the series
  transcript?: string;
  keywords?: string[];
  views?: number;
  likes?: number;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  shortDescription?: string; // Add this new field
  thumbnailUrl: string;
  dataAiHint?: string;
  keywords?: string[];
  views?: number;
  likes?: number;
}
