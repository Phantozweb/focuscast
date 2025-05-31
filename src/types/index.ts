export interface Episode {
  id: string;
  title: string;
  showName: string;
  description: string;
  duration: string; // e.g., "30:15"
  thumbnailUrl: string;
  audioUrl: string;
  releaseDate: string; 
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: React.ElementType; // Optional: for a Lucide icon or custom SVG component
  imageUrl?: string; // Optional: for a category image
}
