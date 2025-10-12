'use client';

import { usePlayer } from '@/contexts/player-context';
import MiniPlayer from './mini-player';
import ExpandedPlayer from './expanded-player';
import { useIsMobile } from '@/hooks/use-mobile'; 

const AudioPlayerWrapper: React.FC = () => {
  const { currentEpisode, isExpanded } = usePlayer();
  const isMobile = useIsMobile();

  if (!currentEpisode) {
    return null;
  }

  if (isMobile) {
    return isExpanded ? <ExpandedPlayer /> : <MiniPlayer />;
  }

  // On desktop, the ExpandedPlayer is always shown in the sidebar if there's a currentEpisode.
  // The layout shift is handled in the MainAppLayout.
  return <ExpandedPlayer />;
};

export default AudioPlayerWrapper;
