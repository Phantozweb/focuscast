
import type { Episode, Category } from '@/types';
import { Podcast, LayoutGrid, Zap, Brain, Lightbulb, TrendingUp, FlaskConical } from 'lucide-react';

export const placeholderEpisodes: Episode[] = [
  {
    id: '1',
    title: 'The Art of Deep Work',
    showName: 'Focus Masters',
    description: 'Exploring techniques for focused work in a distracted world.',
    duration: '45:22',
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder audio
    releaseDate: '2024-07-15',
    category: 'Productivity',
  },
  {
    id: '2',
    title: 'Mindfulness in Minutes',
    showName: 'Calm Cast',
    description: 'Simple mindfulness exercises for a peaceful day.',
    duration: '15:05',
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    releaseDate: '2024-07-14',
    category: 'Wellness',
  },
  {
    id: '3',
    title: 'Creative Sparks',
    showName: 'Idea Factory',
    description: 'Interviews with innovators and their creative processes.',
    duration: '55:10',
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    releaseDate: '2024-07-12',
    category: 'Creativity',
  },
  {
    id: '4',
    title: 'Tech Trends Weekly',
    showName: 'Future Forward',
    description: 'The latest in technology and its impact on our lives.',
    duration: '35:40',
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    releaseDate: '2024-07-10',
    category: 'Technology',
  },
  {
    id: '5',
    title: 'Startup Stories',
    showName: 'Founder Files',
    description: 'In-depth conversations with successful startup founders.',
    duration: '62:30',
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    releaseDate: '2024-07-08',
    category: 'Business',
  },
  {
    id: '6',
    title: 'Phosphene Phenomena',
    showName: 'Focus Bites',
    description: 'Episode 1 of Focus Bites, exploring the fascinating world of phosphene phenomena and what they tell us about our visual system.',
    duration: '08:17', // Assuming duration
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://github.com/Phantozweb/StromVault/blob/5d97da6c8163ba0593557434f5c3b5d1a5ed2fb9/Focus%20bites/focus-bites-ep1-phosphene-phenomena.mp3',
    releaseDate: '2024-07-26',
    category: 'Science',
  },
];

export const placeholderCategories: Category[] = [
  { id: '1', name: 'Productivity', icon: Zap, imageUrl: 'https://placehold.co/400x300.png' },
  { id: '2', name: 'Wellness', icon: Brain, imageUrl: 'https://placehold.co/400x300.png' },
  { id: '3', name: 'Creativity', icon: Lightbulb, imageUrl: 'https://placehold.co/400x300.png' },
  { id: '4', name: 'Technology', icon: Podcast, imageUrl: 'https://placehold.co/400x300.png' },
  { id: '5', name: 'Business', icon: TrendingUp, imageUrl: 'https://placehold.co/400x300.png' },
  { id: '6', name: 'All Categories', icon: LayoutGrid, imageUrl: 'https://placehold.co/400x300.png' },
  { id: '7', name: 'Science', icon: FlaskConical, imageUrl: 'https://placehold.co/400x300.png' },
];
