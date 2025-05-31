
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
    duration: '00:50', // Updated duration
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
    title: "The Stiles-Crawford Effect - Your Pupil's Sweet Spot",
    showName: 'Focus Bites',
    description: "Explore the Stiles-Crawford effect, where light entering the pupil's center appears brighter, impacting visual acuity and cone photoreceptor efficiency.",
    duration: '01:50', // Updated duration
    thumbnailUrl: focusBitesSeriesThumbnail, 
    audioUrl: 'https://github.com/Phantozweb/StromVault/raw/30a6a0ce0ff712484fb03ddc6ceefc9a44a14244/Focus%20bites/focus%20bites%20episode%202%20The%20Stiles-Crawford%20Effect%20-%20Your%20Pupil%27s%20Sweet%20Spot.mp3',
    releaseDate: '2024-08-02',
    seriesId: 'series-focus-bites',
    seriesTitle: 'Focus Bites',
    episodeNumber: 2,
    transcript: `Hey, this is Jennifer — and you’re tuned in to Focus Bites.

So, here's a neat visual science nugget: ever wonder why light entering the center of your pupil seems subjectively brighter and clearer than light entering from the edge?

Well, that’s the Stiles-Crawford effect of the first kind! It describes how the directional sensitivity of our cone photoreceptors makes them most efficient when light hits them head-on, perpendicular to their surface.

Think of your cones as tiny antennas optimally aligned to receive signals coming straight down their axis. Light entering the pupil more obliquely, even if it reaches the same cone, doesn't stimulate it as effectively. It’s primarily a cone phenomenon, so it impacts photopic vision most.

But here’s what’s really cool – this isn't just a lab curiosity. It subtly influences visual acuity and subjective refraction. A well-centered pupil maximizes this effect. It also partly explains why a pinhole, beyond just increasing depth of focus, can improve vision by directing light more centrally onto the retina.

You’ll appreciate this when considering patients with decentered pupils, irregular corneas, or even intraocular lenses that might not be perfectly centered – their effective visual quality might be impacted by how well light aligns with their photoreceptor "sweet spot."

And that’s what makes understanding even these subtle visual phenomena so fascinating – it adds another layer to how we interpret what our patients see and why precise optical correction is so critical.

Keep that in mind when you’re refracting – you’re not just bending light… you’re aiming it for peak photoreceptor performance!

See you tomorrow on Focus Bites.

Jennifer, signing off.`
  },
];

