
'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps extends Omit<ButtonProps, 'onClick' | 'children'> {
  shareTitle: string;
  shareUrl?: string; 
  buttonText?: string; 
}

const ShareButton: React.FC<ShareButtonProps> = ({
  shareTitle,
  shareUrl: customShareUrl,
  buttonText,
  variant = "outline",
  size = "sm",
  className,
  ...props
}) => {
  const { toast } = useToast();

  const handleShare = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevents any parent link navigation
    
    let urlToShare: string;
    if (customShareUrl) {
      // If customShareUrl is already absolute, URL constructor handles it.
      // If relative, it correctly prepends origin.
      try {
        urlToShare = new URL(customShareUrl, window.location.origin).href;
      } catch (e) {
        // Fallback if customShareUrl is invalid
        urlToShare = window.location.href;
        console.warn("Invalid customShareUrl provided, defaulting to current page URL:", customShareUrl);
      }
    } else {
      urlToShare = window.location.href;
    }
    
    const shareData = {
      title: shareTitle,
      text: `Check out: ${shareTitle}`,
      url: urlToShare,
    };

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        // Native share provides its own feedback, so no toast needed here.
      } catch (err) {
        const error = err as Error;
        if (error.name !== 'AbortError') { // User didn't cancel
          console.error('Error sharing natively:', error);
          toast({
            title: 'Could not share',
            description: 'An error occurred while trying to share.',
            variant: 'destructive',
          });
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API: copy to clipboard
      try {
        await navigator.clipboard.writeText(urlToShare);
        toast({
          title: 'Link Copied!',
          description: `'${shareTitle}' link copied to clipboard.`,
        });
      } catch (err) {
        console.error('Error copying to clipboard:', err);
        toast({
          title: 'Failed to copy',
          description: 'Could not copy link to clipboard.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Button variant={variant} size={size} onClick={handleShare} className={className} {...props} aria-label={`Share ${shareTitle}`}>
      <Share2 size={16} className={buttonText ? "mr-2" : ""} />
      {buttonText}
    </Button>
  );
};

export default ShareButton;
