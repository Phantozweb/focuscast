
import type { Episode, Series } from '@/types';

const focusBitesSeriesThumbnail = 'https://raw.githubusercontent.com/Phantozweb/StromVault/175bc58a00e53a095eb5065a0cfb6e8599ca93dd/Albums/file_000000002c2861f89474f0ba58bb39a3.png';

export const placeholderSeries: Series[] = [
  {
    id: 'series-focus-bites',
    title: 'Focus Bites',
    description: 'Short, insightful episodes exploring fascinating aspects of vision and optometry.',
    thumbnailUrl: focusBitesSeriesThumbnail,
    dataAiHint: 'abstract science eye',
  },
  // {
  //   id: 'series-clinical-cases',
  //   title: 'Clinical Case Files',
  //   description: 'Deep dives into interesting and educational clinical cases in optometry.',
  //   thumbnailUrl: 'https://placehold.co/600x600.png', 
  //   dataAiHint: 'medical chart files',
  // },
];

export const placeholderEpisodes: Episode[] = [
  {
    id: '1',
    title: 'The Art of Deep Work in Clinical Practice',
    showName: 'Optometry Edge',
    description: 'Strategies for maintaining focus and productivity in a busy optometric practice.',
    duration: '45:22',
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    releaseDate: '2024-07-15',
  },
  {
    id: '2',
    title: 'Mindfulness for Optometrists',
    showName: 'Clear Vision Wellness',
    description: 'Simple mindfulness exercises to reduce stress and enhance well-being for eye care professionals.',
    duration: '15:05',
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    releaseDate: '2024-07-14',
  },
  {
    id: '3',
    title: 'Innovative Clinic Design for Patient Flow',
    showName: 'Practice Builders',
    description: 'Exploring creative approaches to optometry clinic design for an enhanced patient experience and operational efficiency.',
    duration: '55:10',
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    releaseDate: '2024-07-12',
  },
  {
    id: '4',
    title: 'Latest in OCT Technology: A Clinical Overview',
    showName: 'Optical Innovations',
    description: 'A deep dive into the newest advancements in Optical Coherence Tomography and their clinical applications in modern optometry.',
    duration: '35:40',
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    releaseDate: '2024-07-10',
  },
  {
    id: '5',
    title: 'Building a Patient-Centric Optometry Practice',
    showName: 'The Modern Optometrist',
    description: 'Strategies for practice growth focusing on patient retention, exceptional care, and effective referral programs.',
    duration: '62:30',
    thumbnailUrl: 'https://placehold.co/600x600.png',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    releaseDate: '2024-07-08',
  },
  {
    id: '6',
    title: 'Phosphene Phenomena',
    showName: 'Focus Bites', 
    description: 'Exploring the fascinating world of phosphene phenomena and what they tell us about our visual system.',
    duration: '08:17',
    thumbnailUrl: focusBitesSeriesThumbnail,
    audioUrl: 'https://github.com/Phantozweb/StromVault/raw/5d97da6c8163ba0593557434f5c3b5d1a5ed2fb9/Focus%20bites/focus-bites-ep1-phosphene-phenomena.mp3',
    releaseDate: '2024-07-26',
    seriesId: 'series-focus-bites',
    seriesTitle: 'Focus Bites',
    episodeNumber: 1,
    transcript: `Hey, this is Jennifer — and welcome to Focus Bites, where we make optometry make sense.

Have you ever pressed your eye shut and suddenly seen sparkles or weird shapes? That’s not just your brain being silly — that’s actually something called a phosphene.

It happens when your retina gets triggered by pressure — not by light. Just a gentle press is enough to fire it up.

Now, here’s why this actually matters. If someone says they’re seeing sudden flashes of light — especially when they haven’t touched their eye — it could be something more serious. Like a retinal detachment, or the vitreous tugging on the retina.

So yeah — that strange little thing you see when you rub your eye? It’s actually a glimpse into how the retina reacts under stress.

Eyes are more electric than we think.

See you tomorrow on Focus Bites.

Jennifer, signing off.`
  },
  // {
  //   id: '7',
  //   title: 'Case Study: Managing Early Glaucoma',
  //   showName: 'Clinical Case Files',
  //   description: 'A detailed walkthrough of diagnosing and managing a patient with early-stage glaucoma, including treatment options and follow-up care.',
  //   duration: '25:50',
  //   thumbnailUrl: 'https://placehold.co/600x600.png',
  //   audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  //   releaseDate: '2024-07-28',
  //   seriesId: 'series-clinical-cases',
  //   seriesTitle: 'Clinical Case Files',
  //   episodeNumber: 1,
  // },
  {
    id: '8',
    title: 'The Entoptic Universe: Seeing Inside Your Eyes',
    showName: 'Focus Bites',
    description: 'Discover the various entoptic phenomena, from floaters to Haidinger\'s brush, and the science behind them.',
    duration: '10:30',
    thumbnailUrl: focusBitesSeriesThumbnail, 
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    releaseDate: '2024-08-02',
    seriesId: 'series-focus-bites',
    seriesTitle: 'Focus Bites',
    episodeNumber: 2,
  },
  // {
  //   id: '9',
  //   title: 'Case Study: Complex Refractive Error in a Pediatric Patient',
  //   showName: 'Clinical Case Files',
  //   description: 'Navigating the challenges of assessing and correcting a significant refractive error in a young child.',
  //   duration: '30:15',
  //   thumbnailUrl: 'https://placehold.co/600x600.png',
  //   audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  //   releaseDate: '2024-08-05',
  //   seriesId: 'series-clinical-cases',
  //   seriesTitle: 'Clinical Case Files',
  //   episodeNumber: 2,
  // },
];
