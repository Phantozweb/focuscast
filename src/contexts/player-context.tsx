
// src/contexts/player-context.tsx
"use client";

import type { Episode } from '@/types';
import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

interface PlayerState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isExpanded: boolean; // For mobile player view
  isLoading: boolean;
}

interface PlayerActions {
  playEpisode: (episode: Episode) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleExpandPlayer: () => void;
  downloadEpisode: (episode: Episode) => void;
  closePlayer: () => void;
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;

      const handleTimeUpdate = () => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime);
        }
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
        // Implement next episode logic or reset
      };
      const handleWaiting = () => setIsLoading(true);
      const handleCanPlay = () => setIsLoading(false);


      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('waiting', handleWaiting);
      audioRef.current.addEventListener('canplay', handleCanPlay);


      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('play', handlePlay);
          audioRef.current.removeEventListener('pause', handlePause);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('waiting', handleWaiting);
          audioRef.current.removeEventListener('canplay', handleCanPlay);
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, []);

  const playEpisode = useCallback((episode: Episode) => {
    if (audioRef.current) {
      setIsLoading(true);
      setCurrentEpisode(episode);
      const rawAudioUrl = getRawGitHubUrl(episode.audioUrl);
      audioRef.current.src = rawAudioUrl;
      audioRef.current.load(); // Important to load new src
      audioRef.current.play().then(() => {
         setIsPlaying(true);
         setIsLoading(false);
      }).catch(error => {
        console.error("Error playing audio:", error);
        setIsLoading(false);
        toast({ title: "Error", description: "Could not play audio.", variant: "destructive" });
      });
    }
  }, [toast]);

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
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, currentEpisode, toast]);

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

  const toggleExpandPlayer = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const downloadEpisode = useCallback((episode: Episode) => {
    // Simulate download
    toast({
      title: "Download Started",
      description: `Downloading "${episode.title}"...`,
    });
    console.log(`Simulating download for: ${episode.title}`);
    // In a real app, you'd use browser APIs or a library for actual downloads.
    // For web, this could be creating an anchor tag and clicking it.
    // For offline, service workers would be involved.
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `"${episode.title}" has been "downloaded".`,
      });
    }, 3000);
  }, [toast]);

  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentEpisode(null);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
    setIsExpanded(false);
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
      playEpisode,
      togglePlayPause,
      seek,
      setVolume,
      toggleExpandPlayer,
      downloadEpisode,
      closePlayer,
    }}>
      {children}
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
