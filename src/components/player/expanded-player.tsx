
'use client';

import Image from 'next/image';
import { usePlayer } from '@/contexts/player-context';
import PlayerControls from './player-controls';
import { Button } from '@/components/ui/button';
import { ChevronDown, X, ListMusic, MessageSquareQuote } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FeedbackForm from '@/components/general/feedback-form';
import { useState } from 'react';

const ExpandedPlayer: React.FC = () => {
  const { currentEpisode, isExpanded, toggleExpandPlayer, closePlayer, isLoading } = usePlayer();
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  if (!currentEpisode) return null;

  const episodeUrl = typeof window !== 'undefined' ? `${window.location.origin}/episode/${currentEpisode.id}` : '';

  const content = (
    <div className="flex flex-col h-full bg-background text-foreground shadow-2xl">
      <div className="p-4 flex items-center justify-between border-b">
        <Button variant="ghost" size="icon" onClick={toggleExpandPlayer} className="md:hidden">
          <ChevronDown size={24} />
          <span className="sr-only">Minimize Player</span>
        </Button>
        <div className="flex-grow text-center font-semibold text-sm truncate md:hidden">
          Now Playing
        </div>
        <Button variant="ghost" size="icon" onClick={closePlayer} className="hover:bg-destructive/20">
          <X size={24} className="text-muted-foreground hover:text-destructive"/>
          <span className="sr-only">Close Player</span>
        </Button>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-6 flex flex-col items-center text-center space-y-6">
          <div className="w-full max-w-xs">
            <Image
              src={currentEpisode.thumbnailUrl}
              alt={currentEpisode.title}
              width={400}
              height={400}
              className="rounded-lg aspect-square object-cover shadow-2xl w-full"
              data-ai-hint="podcast episode art"
            />
          </div>
          
          <div className="w-full">
            <h2 className="text-xl font-bold font-headline">{currentEpisode.title}</h2>
            <p className="text-md text-muted-foreground mt-1">{currentEpisode.showName}</p>
          </div>

          <div className="w-full">
            {isLoading && (
              <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            )}
            <PlayerControls isExpandedView={true} />
          </div>

          <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <MessageSquareQuote className="mr-2 h-4 w-4" />
                    Leave a Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Review "{currentEpisode.title}"</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <FeedbackForm
                        sourceTitle={currentEpisode.title}
                        sourceType="Episode"
                        sourceUrl={episodeUrl}
                        sourceThumbnailUrl={currentEpisode.thumbnailUrl}
                        onFeedbackSent={() => setIsFeedbackDialogOpen(false)}
                    />
                </div>
            </DialogContent>
          </Dialog>

          <Separator className="w-2/3 mx-auto" />

          <div className="w-full text-left">
            <Card className="min-h-[200px]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ListMusic className="mr-2 h-5 w-5" />
                  Transcript
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentEpisode.transcript ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 p-1 leading-normal">
                    {currentEpisode.transcript.split('\n').map((line, index) => {
                      if (line.trim() === '') return <div key={index} className="h-4" />;
                      
                      const parts = line.split(/(:)/);
                      if (parts.length > 1 && (
                          line.toLowerCase().includes('welcome back') ||
                          line.toLowerCase().includes('concept & explanation') ||
                          line.toLowerCase().includes('clinical pearls') ||
                          line.toLowerCase().includes('wrap-up & takeaway') ||
                          line.toLowerCase().startsWith('i am john') ||
                          line.toLowerCase().startsWith('hey, this is jennifer') ||
                          line.toLowerCase().includes('thanks for tuning in')
                        )
                      ) {
                        return (
                          <p key={index} className="mb-2">
                            <strong>{parts[0]}{parts[1]}</strong>
                            {parts.slice(2).join('')}
                          </p>
                        );
                      }
                      
                      return <p key={index} className="mb-2">{line}</p>;
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Transcript for "{currentEpisode.title}" is not available.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
  
  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-[60] bg-background animate-slide-up md:hidden">
        {content}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="hidden md:flex md:flex-col md:w-96 md:border-l md:h-screen fixed right-0 top-0 z-40 bg-background shadow-lg">
      {content}
    </div>
  );
};

export default ExpandedPlayer;
