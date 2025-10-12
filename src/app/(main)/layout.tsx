
import AudioPlayerWrapper from '@/components/player/audio-player-wrapper';
import { PlayerProvider } from '@/contexts/player-context';
import MainContent from './main-content';
import SignupDialogManager from '@/components/general/signup-dialog-manager';
import BottomNavigation from '@/components/layout/bottom-navigation';

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
        <SignupDialogManager />
        <BottomNavigation />
      </div>
    </PlayerProvider>
  );
}
