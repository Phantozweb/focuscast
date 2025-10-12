'use server';
/**
 * @fileOverview A flow to send feedback to a Discord webhook.
 *
 * - sendFeedback - A function that sends feedback to Discord.
 * - FeedbackInput - The input type for the sendFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const FeedbackInputSchema = z.object({
  sourceTitle: z.string().describe('The title of the episode or series.'),
  sourceType: z.enum(['Episode', 'Series']).describe('The type of content being reviewed.'),
  rating: z.number().min(1).max(5).describe('The star rating from 1 to 5.'),
  feedback: z.string().optional().describe('The user\'s written feedback.'),
  sourceUrl: z.string().url().optional().describe('The URL of the episode or series.'),
});
export type FeedbackInput = z.infer<typeof FeedbackInputSchema>;

export async function sendFeedback(input: FeedbackInput): Promise<{ success: boolean; message: string }> {
  return sendFeedbackFlow(input);
}

const sendFeedbackFlow = ai.defineFlow(
  {
    name: 'sendFeedbackFlow',
    inputSchema: FeedbackInputSchema,
    outputSchema: z.object({
        success: z.boolean(),
        message: z.string(),
    }),
  },
  async (input) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL is not set.');
      return { success: false, message: 'Server configuration error.' };
    }

    const { sourceTitle, sourceType, rating, feedback, sourceUrl } = input;

    const starRating = '⭐'.repeat(rating) + '✩'.repeat(5 - rating);

    const embed = {
      title: `New ${sourceType} Feedback!`,
      type: 'rich',
      color: 0x5865f2, // Discord blurple
      fields: [
        {
          name: sourceType,
          value: sourceUrl ? `[${sourceTitle}](${sourceUrl})` : sourceTitle,
        },
        {
          name: 'Rating',
          value: starRating,
        },
      ],
      footer: {
        text: `Feedback submitted at: ${new Date().toUTCString()}`,
      },
    };

    if (feedback) {
      embed.fields.push({
        name: 'Feedback',
        value: feedback,
      });
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'FocusCast Feedback Bot',
          avatar_url: 'https://raw.githubusercontent.com/Phantozweb/focuscastaudios/main/Cover/logo.png',
          embeds: [embed],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to send Discord webhook:', response.status, errorText);
        return { success: false, message: `Failed to send feedback. Server responded with ${response.status}.` };
      }

      return { success: true, message: 'Feedback sent successfully!' };
    } catch (error) {
      console.error('Error sending Discord webhook:', error);
      return { success: false, message: 'An unexpected error occurred.' };
    }
  }
);
