
"use client";

import type { Episode } from '@/types';
import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { placeholderEpisodes } from '@/lib/placeholder-data';

interface PlayerState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isExpanded: boolean;
  isLoading: boolean;
  currentPlaylist: Episode[];
  currentPlaylistEpisodeIndex: number;
  playbackRate: number;
}

interface PlayerActions {
  playEpisode: (episode: Episode, playlist?: Episode[], startIndex?: number) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleExpandPlayer: () => void;
  closePlayer: () => void;
  playNextInPlaylist: () => void;
  playPreviousInPlaylist: () => void;
  startSeriesPlayback: (seriesEpisodes: Episode[], startIndex?: number) => void;
  setPlaybackRate: (rate: number) => void;
  skipForward: () => void;
  skipBackward: () => void;
}

type PlayerContextType = PlayerState & PlayerActions;

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const getRawGitHubUrl = (url: string): string => {
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');
  }
  return url;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Episode[]>([]);
  const [currentPlaylistEpisodeIndex, setCurrentPlaylistEpisodeIndex] = useState<number>(-1);
  const [playbackRate, setPlaybackRateState] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const findAndPlayNextEpisode = useCallback(() => {
    toast({ title: "Autoplaying Next Episode..." });

    let nextEpisode: Episode | undefined;
    const allOtherEpisodes = placeholderEpisodes.filter(ep => ep.id !== currentEpisode?.id);

    if (currentEpisode?.seriesId) {
      const relatedEpisodes = allOtherEpisodes.filter(
        ep => ep.seriesId === currentEpisode.seriesId && !currentPlaylist.some(p => p.id === ep.id)
      );
      if (relatedEpisodes.length > 0) {
        nextEpisode = relatedEpisodes[Math.floor(Math.random() * relatedEpisodes.length)];
      }
    }

    if (!nextEpisode) {
      const unplayedEpisodes = allOtherEpisodes.filter(ep => !currentPlaylist.some(p => p.id === ep.id));
      if(unplayedEpisodes.length > 0) {
        nextEpisode = unplayedEpisodes[Math.floor(Math.random() * unplayedEpisodes.length)];
      } else {
        // All episodes have been played, pick any random one
        nextEpisode = allOtherEpisodes[Math.floor(Math.random() * allOtherEpisodes.length)];
      }
    }
    
    if (nextEpisode) {
        // Add to playlist and play
        setCurrentPlaylist(prev => [...prev, nextEpisode!]);
        setCurrentPlaylistEpisodeIndex(prev => prev + 1);
        setCurrentEpisode(nextEpisode);
    } else {
        toast({ title: "End of Content", description: "You've listened to all available episodes." });
        setIsPlaying(false);
    }
  }, [currentEpisode, currentPlaylist, toast]);


  const playNextInPlaylist = useCallback(() => {
    if (currentPlaylist.length > 0 && currentPlaylistEpisodeIndex < currentPlaylist.length - 1) {
      const nextIndex = currentPlaylistEpisodeIndex + 1;
      const nextEpisode = currentPlaylist[nextIndex];
      setCurrentPlaylistEpisodeIndex(nextIndex);
      setCurrentEpisode(nextEpisode);
      toast({ title: "Playing Next in Playlist", description: nextEpisode.title });
    } else {
      findAndPlayNextEpisode();
    }
  }, [currentPlaylist, currentPlaylistEpisodeIndex, findAndPlayNextEpisode, toast]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;

      const handleTimeUpdate = () => {
        if (audioRef.current) setProgress(audioRef.current.currentTime);
      };
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          setIsLoading(false);
        }
      };
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => {
        setIsPlaying(false);
        playNextInPlaylist();
      };
      const handleWaiting = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);

      const audio = audioRef.current;
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('waiting', handleWaiting);
      audio.addEventListener('canplay', handleCanPlay);

      return () => {
        if (audio) {
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audio.removeEventListener('play', handlePlay);
          audio.removeEventListener('pause', handlePause);
          audio.removeEventListener('ended', handleEnded);
          audio.removeEventListener('waiting', handleWaiting);
          audio.removeEventListener('canplay', handleCanPlay);
        }
      };
    }
  }, [volume, playbackRate, playNextInPlaylist]);

  useEffect(() => {
    if (currentEpisode && audioRef.current) {
      setIsLoading(true);
      const rawAudioUrl = getRawGitHubUrl(currentEpisode.audioUrl);
      if (audioRef.current.src !== rawAudioUrl) {
        audioRef.current.src = rawAudioUrl;
        audioRef.current.load();
      }
      audioRef.current.play().then(() => {
         setIsPlaying(true);
         setIsLoading(false);
      }).catch(error => {
        console.error("Error playing audio:", error);
        setIsLoading(false);
        toast({ title: "Error", description: "Could not play audio.", variant: "destructive" });
      });
    }
  }, [currentEpisode, toast]);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current && currentEpisode) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
            console.error("Error playing audio:", error);
            toast({ title: "Error", description: "Could not resume audio.", variant: "destructive" });
        });
      }
    }
  }, [isPlaying, currentEpisode, toast]);

  const playEpisode = useCallback((episode: Episode, playlist?: Episode[], startIndex?: number) => {
    if (currentEpisode?.id !== episode.id) {
      if (playlist && startIndex !== undefined) {
        setCurrentPlaylist(playlist);
        setCurrentPlaylistEpisodeIndex(startIndex);
      } else {
        const existingIndex = currentPlaylist.findIndex(ep => ep.id === episode.id);
        if (existingIndex !== -1) {
          // If the episode is already in the history, just jump to it
          setCurrentPlaylistEpisodeIndex(existingIndex);
        } else {
          // It's a new episode, add it to the history
          const newPlaylist = [...currentPlaylist.slice(0, currentPlaylistEpisodeIndex + 1), episode];
          setCurrentPlaylist(newPlaylist);
          setCurrentPlaylistEpisodeIndex(newPlaylist.length - 1);
        }
      }
      setCurrentEpisode(episode);
    } else {
      togglePlayPause();
    }
  }, [currentEpisode, togglePlayPause, currentPlaylist, currentPlaylistEpisodeIndex]);


  const startSeriesPlayback = useCallback((seriesEpisodes: Episode[], startIndex: number = 0) => {
    if (seriesEpisodes.length > 0) {
      playEpisode(seriesEpisodes[startIndex], seriesEpisodes, startIndex);
      // setIsExpanded(true); // Let's not force expand, user can do it.
    }
  }, [playEpisode]);

  const playPreviousInPlaylist = useCallback(() => {
    if (currentPlaylist.length > 0 && currentPlaylistEpisodeIndex > 0) {
      const prevIndex = currentPlaylistEpisodeIndex - 1;
      setCurrentPlaylistEpisodeIndex(prevIndex);
      setCurrentEpisode(currentPlaylist[prevIndex]);
    } else {
       toast({ title: "Start of playlist", description: "You're at the beginning of your listening history." });
    }
  }, [currentPlaylist, currentPlaylistEpisodeIndex, toast]);

  const seek = useCallback((time: number) => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, [currentEpisode]);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  }, []);
  
  const setPlaybackRate = useCallback((rate: number) => {
      if (audioRef.current) {
        audioRef.current.playbackRate = rate;
        setPlaybackRateState(rate);
      }
  }, []);

  const skipTime = useCallback((amount: number) => {
    if (audioRef.current) {
        const newTime = audioRef.current.currentTime + amount;
        audioRef.current.currentTime = Math.max(0, Math.min(newTime, duration));
    }
  }, [duration]);

  const skipForward = () => skipTime(10);
  const skipBackward = () => skipTime(-10);


  const toggleExpandPlayer = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setCurrentEpisode(null);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
    setIsExpanded(false);
    setCurrentPlaylist([]);
    setCurrentPlaylistEpisodeIndex(-1);
  }, []);

  return (
    <PlayerContext.Provider value={{
      currentEpisode,
      isPlaying,
      progress,
      duration,
      volume,
      isExpanded,
      isLoading,
      currentPlaylist,
      currentPlaylistEpisodeIndex,
      playbackRate,
      playEpisode,
      togglePlayPause,
      seek,
      setVolume,
      toggleExpandPlayer,
      closePlayer,
      playNextInPlaylist,
      playPreviousInPlaylist,
      startSeriesPlayback,
      setPlaybackRate,
      skipForward,
      skipBackward,
    }}>
      {children}
      {audioRef.current && <audio ref={audioRef} />}
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
