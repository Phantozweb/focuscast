
import AudioPlayerWrapper from '@/components/player/audio-player-wrapper';
import { PlayerProvider } from '@/contexts/player-context';
import MainContent from './main-content';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      <div className="flex">
        <MainContent>{children}</MainContent>
        <AudioPlayerWrapper />
      </div>
    </PlayerProvider>
  );
}
