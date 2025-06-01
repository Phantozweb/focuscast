
import type { Episode, Series } from '@/types';

const focusBitesSeriesThumbnail = 'https://raw.githubusercontent.com/Phantozweb/StromVault/175bc58a00e53a095eb5065a0cfb6e8599ca93dd/Albums/file_000000002c2861f89474f0ba58bb39a3.png';
const decodingOcularDiseaseSeriesThumbnail = 'https://raw.githubusercontent.com/Phantozweb/StromVault/465e2e0eb79ea7b432baa02d5940453dac8cb30b/Albums/file_00000000f84c61fb9d5c6e8418b642a7.png';

export const placeholderSeries: Series[] = [
  {
    id: 'series-focus-bites',
    title: 'Focus Bites',
    description: 'Short, insightful episodes exploring fascinating aspects of vision and optometry.',
    thumbnailUrl: focusBitesSeriesThumbnail,
    dataAiHint: 'abstract science eye',
  },
  {
    id: 'series-decoding-ocular-disease',
    title: 'Decoding Ocular Disease',
    description: 'Explore in-depth discussions on various ocular diseases, their mechanisms, diagnosis, and management. Essential insights for optometrists and eye care professionals.',
    thumbnailUrl: decodingOcularDiseaseSeriesThumbnail,
    dataAiHint: 'medical eye disease',
  },
];

export const placeholderEpisodes: Episode[] = [
  {
    id: '6',
    title: 'Phosphene Phenomena',
    showName: 'Focus Bites', 
    description: 'Exploring the fascinating world of phosphene phenomena and what they tell us about our visual system.',
    duration: '00:50',
    thumbnailUrl: focusBitesSeriesThumbnail,
    audioUrl: 'https://github.com/Phantozweb/StromVault/raw/5d97da6c8163ba0593557434f5c3b5d1a5ed2fb9/Focus%20bites/focus-bites-ep1-phosphene-phenomena.mp3',
    releaseDate: '2025-06-01', // Updated
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
    duration: '01:50',
    thumbnailUrl: focusBitesSeriesThumbnail, 
    audioUrl: 'https://github.com/Phantozweb/StromVault/raw/30a6a0ce0ff712484fb03ddc6ceefc9a44a14244/Focus%20bites/focus%20bites%20episode%202%20The%20Stiles-Crawford%20Effect%20-%20Your%20Pupil%27s%20Sweet%20Spot.mp3',
    releaseDate: '2025-06-01', // Updated
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
  {
    id: 'dod-ep1',
    title: 'Decoding Diabetic Retinopathy: A Comprehensive Look',
    showName: 'Decoding Ocular Disease',
    description: 'Dive deep into Diabetic Retinopathy, covering its pathophysiology, classification, modern diagnostic techniques, and comprehensive management strategies. A must-listen for understanding this prevalent ocular condition.',
    duration: '11:51',
    thumbnailUrl: decodingOcularDiseaseSeriesThumbnail,
    audioUrl: 'https://raw.githubusercontent.com/Phantozweb/StromVault/716dbb2d66af593a3d4604b9cc0afcfcb4946af9/DoD/podcast.mp3',
    releaseDate: '2025-06-01', // Updated
    seriesId: 'series-decoding-ocular-disease',
    seriesTitle: 'Decoding Ocular Disease',
    episodeNumber: 1,
    transcript: `I am John, and welcome to Focus Cast! This is the very first episode of our brand new series, Decoding Ocular Disease! In this series, our mission is to really break down those complex eye conditions, offering clear, practical insights for all you practicing optometrists out there, and for students who are eager to learn. Each episode, we’ll dissect a specific ocular pathology – looking at everything from its fundamental mechanisms, to what it actually looks like when you see it in the clinic, and, of course, how we best manage it. The goal here? To equip you with the knowledge and confidence to diagnose, to manage, and to truly educate your patients.

Today, for our inaugural deep dive, we’re tackling a condition that is, frankly, a significant public health concern. It’s one that every single one of us in optometric practice will encounter with increasing frequency: Diabetic Retinopathy.

Why are we starting with this one? Well, imagine this scenario: a patient walks into your clinic, perhaps just for a routine eye exam. They might mention some mild, intermittent blurry vision – something they might even just brush off as needing a new glasses prescription. But lurking behind that seemingly innocuous symptom could be a cascade of microvascular changes silently… silently… wreaking havoc on their retina, potentially leading to irreversible vision loss. This, my friends, is the insidious nature of Diabetic Retinopathy – often dubbed the "silent thief" of sight, because significant damage can, and often does, occur long before the patient notices any major visual disturbances.

As optometrists, we are right there on the front lines. We are frequently the first healthcare professionals to detect Diabetic Retinopathy, sometimes even before the patient is formally diagnosed with diabetes itself. So, understanding its intricacies isn't just an academic exercise; it's a critical responsibility that can profoundly impact our patients' quality of life.

So, let’s get into it. What is Diabetic Retinopathy? At its core, it’s a microvascular complication of diabetes mellitus – that’s both Type 1 and Type 2 – characterized by damage to the blood vessels of the light-sensitive tissue at the back of the eye, the retina. The longer a person has diabetes, and the less controlled their blood sugar levels are, the higher their risk becomes.

Let's explore the "how" – the pathophysiology. It might sound complex, but we can break it down. Persistent hyperglycemia, or high blood sugar, is the main culprit. This chronic state initiates a series of biochemical pathways that ultimately damage those tiny retinal capillaries. Think of these capillaries like delicate pipes. High sugar levels make the walls of these pipes weaker and more permeable, or leaky. They can develop tiny outpouchings called microaneurysms – and these are often the earliest clinical sign we see. These weakened vessels can then leak fluid, blood, and lipids into the surrounding retinal tissue.

This leakage is crucial. If it occurs in the macula – that’s the central part of the retina responsible for our sharp, detailed vision – it leads to Diabetic Macular Edema. Diabetic Macular Edema is a primary cause of vision loss in patients with Diabetic Retinopathy. The macula swells, distorting central vision, making everyday tasks like reading or recognizing faces incredibly difficult.

As the disease progresses, beyond just leaking, blood vessels can also become blocked. This occlusion leads to areas of retinal ischemia, meaning parts of the retina simply aren't getting enough oxygen. The retina, starved for oxygen, cries out for help by releasing signaling molecules, most notably one called Vascular Endothelial Growth Factor. Now, Vascular Endothelial Growth Factor is usually a good guy, promoting blood vessel growth, but in this ischemic environment, it triggers the formation of abnormal, fragile new blood vessels. This is a critical, and dangerous, turning point.

This growth of new, unhealthy vessels, what we call neovascularization, marks a more advanced and threatening stage of the disease. These new vessels are incredibly weak. They can grow on the surface of the retina or the optic disc – we call this Neovascularization of the Disc, or Neovascularization Elsewhere. They can even grow on the iris, leading to neovascular glaucoma, a very severe complication. Why are these new vessels so dangerous? They bleed easily, causing a vitreous hemorrhage – that’s blood filling the vitreous cavity, leading to sudden vision loss or a shower of floaters. They also form fibrous scar tissue. As this scar tissue contracts, it can pull on the retina, leading to a tractional retinal detachment. Both of these are sight-threatening emergencies.

The mechanisms we've discussed lead us to the two main stages, or classifications, of Diabetic Retinopathy, which are essential for us to understand for grading and management:

First, we have Non-Proliferative Diabetic Retinopathy. This is the earlier stage. "Non-proliferative" simply means new, abnormal blood vessels have not yet started to grow. We can have Mild Non-Proliferative Diabetic Retinopathy: This is characterized primarily by those microaneurysms we talked about. Then there’s Moderate Non-Proliferative Diabetic Retinopathy: Here, we start to see more extensive microaneurysms, dot and blot hemorrhages, cotton wool spots, and possibly venous beading. And then we have Severe Non-Proliferative Diabetic Retinopathy: This is often defined by what’s known as the "4-2-1 rule": significant hemorrhages in all 4 quadrants of the retina, venous beading in 2 or more quadrants, or Intraretinal Microvascular Abnormalities in 1 or more quadrants. Patients with Severe Non-Proliferative Diabetic Retinopathy have a high risk of progressing. And remember, Diabetic Macular Edema can occur at any stage of Non-Proliferative Diabetic Retinopathy, even in mild cases. So always, always carefully examine the macula.

Second, there’s Proliferative Diabetic Retinopathy. This is the advanced stage we mentioned, where that neovascularization has begun.

So, as optometrists, what are our key tools for detection and monitoring? First and foremost, a comprehensive dilated fundus examination. This is non-negotiable for any patient with diabetes. Fundus photography is invaluable for documenting findings, tracking progression, and for patient education. Optical Coherence Tomography has revolutionized how we detect and manage Diabetic Macular Edema, giving us those crucial cross-sectional images. And Fluorescein Angiography, while less common in primary care, is vital when Proliferative Diabetic Retinopathy is suspected, to clearly see leakage and ischemia.

Now that we can identify and classify it, the most important part is how we manage Diabetic Retinopathy and what our role is.

Let's talk management. This is where the collaborative aspect of our profession truly shines. The absolute cornerstone of managing Diabetic Retinopathy is systemic control: tight glycemic control, blood pressure control, and lipid management. We must emphasize this to our patients at every single visit. Working closely with their primary care physician or endocrinologist is absolutely key.

For the ocular management specifically: For Mild Non-Proliferative Diabetic Retinopathy: Often, it's observation, education, and annual exams, unless Diabetic Macular Edema is present. For Moderate Non-Proliferative Diabetic Retinopathy: More frequent follow-ups, perhaps every 6 to 9 months, are needed. For Severe Non-Proliferative Diabetic Retinopathy: These patients are at high risk. We might see them every 3 to 4 months, and often refer to a retinal specialist for consideration of treatment, like Pan-Retinal Photocoagulation laser. For Proliferative Diabetic Retinopathy: This requires prompt referral to a retinal specialist. Treatments include that Pan-Retinal Photocoagulation, Anti-Vascular Endothelial Growth Factor Injections, and in more severe cases, Vitrectomy. And for Diabetic Macular Edema: If it’s clinically significant, referral for treatment, usually with those Anti-Vascular Endothelial Growth Factor injections, is necessary.

Our role as optometrists in managing Diabetic Retinopathy is truly multifaceted. We are detectives in early detection, educators in emphasizing systemic control and the nature of this challenging disease, meticulous monitors of its progression, and crucial collaborators in co-managing patients with ophthalmology and other healthcare providers. We empower patients with knowledge and ensure they receive timely interventions.

Diabetic Retinopathy is a formidable opponent, there’s no doubt about it. But with diligent screening, accurate diagnosis, comprehensive patient education, and prompt referral when indicated, we can make a profound difference in preserving our patients' precious vision. It’s a condition that perfectly illustrates the intricate intersection of systemic health and ocular health, reinforcing our role as integral members of the patient's overall healthcare team.

And that wraps up our deep dive into Diabetic Retinopathy, and our very first episode of Decoding Ocular Disease. I sincerely hope this approach has provided you with a clearer, more confident understanding of this critical condition. Remember, early detection and proactive management are our greatest allies.

Until next time, keep those funduscopes ready, stay curious, and continue to make a clear impact. Thank you so much for listening.`
  },
  {
    id: 'fb-ep3',
    title: 'Troxler’s Fading – The Disappearing Act in Your Periphery',
    showName: 'Focus Bites',
    description: "Discover Troxler's fading, where stationary peripheral objects vanish due to neural adaptation, highlighting the brain's focus on change.",
    duration: '00:45',
    thumbnailUrl: focusBitesSeriesThumbnail,
    audioUrl: 'https://github.com/Phantozweb/StromVault/raw/f1180143675f538e7c48a962112743360367871a/Focus%20bites/Focus-bites-ep-3-The-Purkinje-Shift-Night_s-Different-Hues.mp3',
    releaseDate: '2025-06-01',
    seriesId: 'series-focus-bites',
    seriesTitle: 'Focus Bites',
    episodeNumber: 3,
    transcript: `Hey, welcome back to Focus Bites.

Ever stared intently at a fixed point, only to notice that objects in your peripheral vision start to fade or even disappear, especially if they’re low contrast?

That’s Troxler’s fading — a fascinating neural adaptation. When you fixate your gaze, the neurons responding to stable peripheral input begin to quiet down. The brain essentially says, “Nothing’s changing out there, no need to keep reporting it.”

It’s a smart trade-off. By tuning out the static, the visual system stays alert for motion and change — things that often matter more.

You’ll notice this most with soft-edged, blurry, or low-contrast stimuli. A small eye movement — even a blink — can reset the image and bring it back into awareness.

It’s one of those reminders that what we see isn’t just what’s out there — it’s what the brain decides is worth showing us.

Keep that in mind next time your peripheral world goes quiet.

See you tomorrow on Focus Bites.`
  },
  {
    id: 'fb-ep4',
    title: 'Maxwell’s Spot – The Eye’s Inner Shadow',
    showName: 'Focus Bites',
    description: "Learn about Maxwell's Spot, a faint shadow seen in blue light, revealing your macula's natural blue-light filtering capabilities.",
    duration: '00:50',
    thumbnailUrl: focusBitesSeriesThumbnail,
    audioUrl: 'https://github.com/Phantozweb/StromVault/raw/f1180143675f538e7c48a962112743360367871a/Focus%20bites/focus-bites-episode-4Haidinger_s-Brushes-Seeing-Polarized-Light.mp3',
    releaseDate: '2025-06-01',
    seriesId: 'series-focus-bites',
    seriesTitle: 'Focus Bites',
    episodeNumber: 4,
    transcript: `Welcome back to Focus Bites.

Ever noticed a faint purplish shadow in the center of your vision when staring at a white light through a blue filter?

That’s Maxwell’s Spot — and no, it’s not a glitch. It’s your macular pigment in action.

The macula, rich in lutein and zeaxanthin, absorbs short-wavelength blue light more than the surrounding retina. So when you view a blue field, less light reaches the fovea, creating the perception of a subtle, shadowy spot.

It’s an entoptic phenomenon — generated by your own eye — and it’s a clue to the natural blue-light filtering your macula provides. Sharper vision, less chromatic blur, and built-in retinal protection.

Maxwell’s Spot isn’t just cool science. It’s been used to assess macular health, even to demonstrate pigment density in research and education.

Sometimes, seeing that soft inner shadow is just your eye reminding you how brilliantly it’s been engineered.

See you tomorrow on Focus Bites.`
  },
  {
    id: 'fb-ep5',
    title: 'The Blue Arc of the Retina – A Flash of Your Own Artery',
    showName: 'Focus Bites',
    description: "Explore the Blue Arc Phenomenon, a fleeting visual effect where you glimpse your own retinal arteries under flickering light.",
    duration: '00:52',
    thumbnailUrl: focusBitesSeriesThumbnail,
    audioUrl: 'https://github.com/Phantozweb/StromVault/raw/f1180143675f538e7c48a962112743360367871a/Focus%20bites/focus-bites-ep-5Troxler_s-Fading-The-Disappearing-Act-in-Your-Periphery.mp3',
    releaseDate: '2025-06-01',
    seriesId: 'series-focus-bites',
    seriesTitle: 'Focus Bites',
    episodeNumber: 5,
    transcript: `Time for another curiosity on Focus Bites.

Ever seen a faint, curved blue line flash across your vision when looking at a bright, flickering light?

That’s the Blue Arc Phenomenon — a glimpse of your own retinal arteries.

It happens when a small flickering light stimulates the photoreceptors near the optic disc. Since the retinal arteries lie in front of the photoreceptors, they cast dynamic shadows — which you can perceive as bluish arcs, shaped like branches of a tree.

They typically radiate from the blind spot and curve toward the macula, mimicking the path of the superior or inferior temporal arteries.

What’s amazing is that under steady light, these shadows vanish due to neural adaptation. But introduce flicker — and suddenly, your own vasculature becomes visible.

It’s rare, subtle, and usually brief — but it’s a reminder that our visual system is filled with hidden layers, just waiting for the right light to reveal them.

See you tomorrow on Focus Bites.`
  },
];

