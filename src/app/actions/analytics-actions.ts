
'use server';

import { z } from 'zod';

// This is the Google Apps Script Web App URL you provided.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby0Q5XgvzW7fq6f6P3VHyzJvaQNoHvmItSR45x8R7ZPiWZZ26_EHUjaFzqcMu5Vq1Cw/exec';

const ViewCountSchema = z.object({
  episodeId: z.string().min(1),
});

const LikeCountSchema = z.object({
    itemId: z.string().min(1),
    itemType: z.enum(['episode', 'series']), // Retaining this for client-side logic, though the API might not use it
});

/**
 * Sends a request to the Google Apps Script backend to increment the view count for an episode.
 * @param episodeId The ID of the episode that was viewed.
 */
export async function incrementViewCount(episodeId: string) {
  const validation = ViewCountSchema.safeParse({ episodeId });
  if (!validation.success) {
    console.error("Invalid input for incrementViewCount:", validation.error);
    return;
  }

  const url = `${GOOGLE_SCRIPT_URL}?action=view&episodeId=${validation.data.episodeId}`;

  try {
    // Fire-and-forget GET request
    fetch(url, { method: 'GET', cache: 'no-store' });
  } catch (error) {
    console.error('Failed to send view count update:', error);
  }
}

/**
 * Sends a request to the Google Apps Script backend to increment the like count for an item.
 * @param itemId The ID of the episode or series that was liked.
 * @param itemType The type of the item ('episode' or 'series').
 */
export async function incrementLikeCount(itemId: string, itemType: 'episode' | 'series') {
    const validation = LikeCountSchema.safeParse({ itemId, itemType });
    if (!validation.success) {
      console.error("Invalid input for incrementLikeCount:", validation.error);
      return;
    }

    // The API documentation refers to 'episodeId', so we will use that parameter name.
    // This assumes your backend can handle series IDs sent to the 'episodeId' parameter.
    const url = `${GOOGLE_SCRIPT_URL}?action=like&episodeId=${validation.data.itemId}`;
  
    try {
      // Fire-and-forget GET request
      fetch(url, { method: 'GET', cache: 'no-store' });
    } catch (error) {
      console.error('Failed to send like count update:', error);
    }
}
