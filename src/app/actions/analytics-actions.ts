'use server';

import { z } from 'zod';

// THIS IS A PLACEHOLDER URL. Replace it with your actual Google Apps Script Web App URL.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

const ViewCountSchema = z.object({
  action: z.literal('incrementView'),
  episodeId: z.string().min(1),
});

const LikeCountSchema = z.object({
    action: z.literal('incrementLike'),
    itemId: z.string().min(1),
    itemType: z.enum(['episode', 'series']),
});

/**
 * Sends a request to the Google Apps Script backend to increment the view count for an episode.
 * @param episodeId The ID of the episode that was viewed.
 */
export async function incrementViewCount(episodeId: string) {
  const validation = ViewCountSchema.safeParse({ action: 'incrementView', episodeId });
  if (!validation.success) {
    console.error("Invalid input for incrementViewCount:", validation.error);
    return;
  }

  try {
    // We don't await the fetch call to avoid blocking.
    // This is a "fire-and-forget" action.
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validation.data),
    });
  } catch (error) {
    console.error('Failed to send view count update:', error);
    // In a real app, you might want to queue this for a retry.
  }
}

/**
 * Sends a request to the Google Apps Script backend to increment the like count for an item.
 * @param itemId The ID of the episode or series that was liked.
 * @param itemType The type of the item ('episode' or 'series').
 */
export async function incrementLikeCount(itemId: string, itemType: 'episode' | 'series') {
    const validation = LikeCountSchema.safeParse({ action: 'incrementLike', itemId, itemType });
    if (!validation.success) {
      console.error("Invalid input for incrementLikeCount:", validation.error);
      return;
    }
  
    try {
      // Fire-and-forget
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });
    } catch (error) {
      console.error('Failed to send like count update:', error);
    }
}
