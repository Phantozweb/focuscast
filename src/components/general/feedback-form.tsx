'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { sendFeedback } from '@/ai/flows/send-feedback-flow';
import type { FeedbackInput } from '@/types/feedback';
import { z } from 'zod';
import { FeedbackInputSchema } from '@/types/feedback';

interface FeedbackFormProps {
  sourceTitle: string;
  sourceType: 'Episode' | 'Series';
  sourceUrl?: string;
  sourceThumbnailUrl?: string;
  onFeedbackSent?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ sourceTitle, sourceType, sourceUrl, sourceThumbnailUrl, onFeedbackSent }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<z.ZodError<FeedbackInput> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackData = {
      sourceTitle,
      sourceType,
      rating,
      feedback,
      name,
      email,
      sourceUrl,
      sourceThumbnailUrl,
    };
    
    const validationResult = FeedbackInputSchema.safeParse(feedbackData);

    if (!validationResult.success) {
      setErrors(validationResult.error);
      setIsSubmitting(false);
       if (validationResult.error.flatten().fieldErrors.rating) {
         toast({
            title: 'Rating Required',
            description: 'Please select a star rating before submitting.',
            variant: 'destructive',
          });
       }
      return;
    }

    setErrors(null);

    try {
      const result = await sendFeedback(validationResult.data);
      if (result.success) {
        toast({
          title: 'Thank You!',
          description: 'Your feedback has been submitted successfully.',
        });
        setRating(0);
        setFeedback('');
        setName('');
        setEmail('');
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

  const nameError = errors?.flatten().fieldErrors.name?.[0];
  const emailError = errors?.flatten().fieldErrors.email?.[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground/80 mb-2 block">Your Rating *</label>
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
         <label htmlFor="name-input" className="text-sm font-medium text-foreground/80 mb-2 block">
          Your Name *
        </label>
        <Input
          id="name-input"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={cn(nameError ? 'border-destructive' : '')}
        />
        {nameError && <p className="text-sm text-destructive mt-1">{nameError}</p>}
      </div>
      
      <div>
         <label htmlFor="email-input" className="text-sm font-medium text-foreground/80 mb-2 block">
          Your Email *
        </label>
        <Input
          id="email-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={cn(emailError ? 'border-destructive' : '')}
        />
        {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
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
