'use client';

import { usePlayer } from '@/contexts/player-context';
import MiniPlayer from './mini-player';
import ExpandedPlayer from './expanded-player';
import { useIsMobile } from '@/hooks/use-mobile'; // Assuming this hook exists or will be created

const AudioPlayerWrapper: React.FC = () => {
  const { currentEpisode, isExpanded } = usePlayer();
  const isMobile = useIsMobile();

  if (!currentEpisode) {
    return null;
  }

  if (isMobile) {
    return isExpanded ? <ExpandedPlayer /> : <MiniPlayer />;
  }

  // On desktop, ExpandedPlayer is always shown if there's a currentEpisode.
  // MiniPlayer is not typically used on desktop in this design.
  // The ExpandedPlayer itself handles its fixed panel layout for desktop.
  return <ExpandedPlayer />;
};

export default AudioPlayerWrapper;
