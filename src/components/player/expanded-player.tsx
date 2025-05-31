'use client';

import Image from 'next/image';
import { usePlayer } from '@/contexts/player-context';
import PlayerControls from './player-controls';
import { Button } from '@/components/ui/button';
import { ChevronDown, X, ListMusic, Bookmark } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';

const ExpandedPlayer: React.FC = () => {
  const { currentEpisode, isExpanded, toggleExpandPlayer, closePlayer, isLoading } = usePlayer();

  if (!currentEpisode) return null;

  // For mobile, expanded player is a full screen modal
  // For desktop, it's part of the layout (e.g. a sidebar or a prominent section)
  // This component will render differently based on `isExpanded` (for mobile sheet behavior)
  // and screen size (for desktop fixed panel).

  const content = (
    <div className="flex flex-col h-full bg-background text-foreground shadow-2xl">
      <div className="p-4 flex items-center justify-between border-b">
        <Button variant="ghost" size="icon" onClick={toggleExpandPlayer} className="md:hidden">
          <ChevronDown size={24} />
          <span className="sr-only">Minimize Player</span>
        </Button>
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-lg font-semibold truncate">{currentEpisode.title}</h2>
          <p className="text-sm text-muted-foreground truncate">{currentEpisode.showName}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={closePlayer} className="hidden md:inline-flex hover:bg-destructive/20">
          <X size={24} className="text-muted-foreground hover:text-destructive"/>
          <span className="sr-only">Close Player</span>
        </Button>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="flex-shrink-0 w-full md:w-1/3 max-w-xs md:max-w-sm">
            <Image
              src={currentEpisode.thumbnailUrl}
              alt={currentEpisode.title}
              width={400}
              height={400}
              className="rounded-lg aspect-square object-cover shadow-md w-full"
              data-ai-hint="podcast episode art"
            />
          </div>
          <div className="flex-grow w-full md:w-2/3 mt-4 md:mt-0">
             <Tabs defaultValue="transcript" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="transcript"><ListMusic className="mr-2 h-4 w-4" />Transcript</TabsTrigger>
                <TabsTrigger value="bookmarks"><Bookmark className="mr-2 h-4 w-4" />Bookmarks</TabsTrigger>
              </TabsList>
              <TabsContent value="transcript">
                <Card className="min-h-[200px]">
                  <CardHeader>
                    <CardTitle>Transcript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Transcript for "{currentEpisode.title}" will be displayed here. 
                      This feature is currently under development.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="bookmarks">
                 <Card className="min-h-[200px]">
                  <CardHeader>
                    <CardTitle>Bookmarks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Bookmarks for this episode will appear here.
                      This feature is currently under development.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>
      
      <div className="border-t p-4 mt-auto">
        {isLoading && <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>}
        <PlayerControls isExpandedView={true} />
      </div>
    </div>
  );
  
  // Mobile expanded view (modal-like sheet)
  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-[60] bg-background animate-slide-up md:hidden">
        {content}
      </div>
    );
  }

  // Desktop expanded view (fixed panel, always visible when an episode is playing)
  return (
    <div className="hidden md:flex md:flex-col md:w-96 md:border-l md:h-full fixed right-0 top-16 bottom-0 z-40 bg-background shadow-lg">
       {/* This is the area that shows when a podcast is playing on Desktop. 
           It's part of the (main)/layout.tsx logic to show/hide it */}
      {content}
    </div>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default ExpandedPlayer;
