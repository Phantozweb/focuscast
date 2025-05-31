
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
];

export const placeholderEpisodes: Episode[] = [
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
];

