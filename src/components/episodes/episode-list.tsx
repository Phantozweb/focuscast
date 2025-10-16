
import type { Episode } from '@/types';
import EpisodeCard from './episode-card';

interface EpisodeListProps {
  episodes: Episode[];
  isLoading?: boolean;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes, isLoading }) => {
  if (!episodes || episodes.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No episodes found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-0">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} layout="vertical" isLoading={isLoading} />
      ))}
    </div>
  );
};

export default EpisodeList;
