import { z } from 'zod';

export const FeedbackInputSchema = z.object({
  sourceTitle: z.string().describe('The title of the episode or series.'),
  sourceType: z.enum(['Episode', 'Series']).describe('The type of content being reviewed.'),
  rating: z.number().min(1).max(5).describe('The star rating from 1 to 5.'),
  feedback: z.string().optional().describe('The user\'s written feedback.'),
  sourceUrl: z.string().url().optional().describe('The URL of the episode or series.'),
});

export type FeedbackInput = z.infer<typeof FeedbackInputSchema>;
