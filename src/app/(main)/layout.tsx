import Header from '@/components/layout/header';
import AudioPlayerWrapper from '@/components/player/audio-player-wrapper';
import { PlayerProvider } from '@/contexts/player-context';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      <div className="relative flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <AudioPlayerWrapper />
      </div>
    </PlayerProvider>
  );
}
