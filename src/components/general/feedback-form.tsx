
'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sendFeedback } from '@/ai/flows/send-feedback-flow';
import type { FeedbackInput } from '@/ai/flows/send-feedback-flow';

interface FeedbackFormProps {
  sourceTitle: string;
  sourceType: 'Episode' | 'Series';
  sourceUrl?: string;
  onFeedbackSent?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ sourceTitle, sourceType, sourceUrl, onFeedbackSent }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: 'Rating Required',
        description: 'Please select a star rating before submitting.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);

    const feedbackData: FeedbackInput = {
      sourceTitle,
      sourceType,
      rating,
      feedback,
      sourceUrl,
    };

    try {
      const result = await sendFeedback(feedbackData);
      if (result.success) {
        toast({
          title: 'Thank You!',
          description: 'Your feedback has been submitted successfully.',
        });
        setRating(0);
        setFeedback('');
        if (onFeedbackSent) {
            onFeedbackSent();
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Failed to send feedback:', error);
      toast({
        title: 'Submission Failed',
        description: (error as Error).message || 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground/80 mb-2 block">Your Rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                'h-7 w-7 cursor-pointer transition-colors',
                (hoverRating >= star || rating >= star)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              )}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="feedback-textarea" className="text-sm font-medium text-foreground/80 mb-2 block">
          Your Feedback (Optional)
        </label>
        <Textarea
          id="feedback-textarea"
          placeholder={`What did you think of this ${sourceType.toLowerCase()}?`}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
        />
      </div>
      <Button type="submit" disabled={isSubmitting || rating === 0}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default FeedbackForm;
