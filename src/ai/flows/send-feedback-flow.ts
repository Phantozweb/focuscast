'use server';
/**
 * @fileOverview A server action to send feedback to a Discord webhook.
 *
 * - sendFeedback - A function that sends feedback to Discord.
 */

import type { FeedbackInput } from '@/types/feedback';

export async function sendFeedback(input: FeedbackInput): Promise<{ success: boolean; message: string }> {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL is not set.');
      return { success: false, message: 'Server configuration error.' };
    }

    const { sourceTitle, sourceType, rating, feedback, name, email, sourceUrl, sourceThumbnailUrl } = input;

    const starRating = '⭐'.repeat(rating) + '✩'.repeat(5 - rating);

    const embed: any = {
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
         {
          name: 'Email',
          value: email,
        },
      ],
      author: {
        name: name
      },
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

    if (sourceThumbnailUrl) {
        embed.thumbnail = {
            url: sourceThumbnailUrl
        };
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
