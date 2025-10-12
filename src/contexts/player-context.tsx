
"use client";

import type { Episode } from '@/types';
import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { placeholderEpisodes } from '@/lib/placeholder-data'; // For next/prev episode logic

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
  startSeriesPlayback: (seriesEpisodes: Episode[]) => void;
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
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const playNextInPlaylist = useCallback(() => {
    if (currentPlaylist.length > 0 && currentPlaylistEpisodeIndex < currentPlaylist.length - 1) {
      const nextIndex = currentPlaylistEpisodeIndex + 1;
      setCurrentPlaylistEpisodeIndex(nextIndex);
      setCurrentEpisode(currentPlaylist[nextIndex]); // Trigger audio load via useEffect on currentEpisode
    } else {
      toast({ title: "End of playlist", description: "You've reached the end of the current playlist." });
    }
  }, [currentPlaylist, currentPlaylistEpisodeIndex, toast]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;

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
        if (currentPlaylist.length > 0 && currentPlaylistEpisodeIndex < currentPlaylist.length - 1) {
          playNextInPlaylist();
        }
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
  }, [volume, playNextInPlaylist, currentPlaylist, currentPlaylistEpisodeIndex]); // Added dependencies for playNextInPlaylist

  // Effect to load and play audio when currentEpisode changes
  useEffect(() => {
    if (currentEpisode && audioRef.current) {
      setIsLoading(true);
      const rawAudioUrl = getRawGitHubUrl(currentEpisode.audioUrl);
      audioRef.current.src = rawAudioUrl;
      audioRef.current.load();
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


  const playEpisode = useCallback((episode: Episode, playlist?: Episode[], startIndex?: number) => {
    setCurrentEpisode(episode); // This will trigger the useEffect above
    if (playlist && startIndex !== undefined) {
      setCurrentPlaylist(playlist);
      setCurrentPlaylistEpisodeIndex(startIndex);
    } else {
      // Playing a single episode, not part of a new explicit playlist
      // Check if it's part of an existing playlist, or create a new one-item playlist
      const existingIndex = currentPlaylist.findIndex(ep => ep.id === episode.id);
      if (existingIndex !== -1 && currentPlaylist.length > 0) {
        setCurrentPlaylistEpisodeIndex(existingIndex);
      } else {
        setCurrentPlaylist([episode]);
        setCurrentPlaylistEpisodeIndex(0);
      }
    }
  }, [currentPlaylist]);

  const startSeriesPlayback = useCallback((seriesEpisodes: Episode[]) => {
    if (seriesEpisodes.length > 0) {
      playEpisode(seriesEpisodes[0], seriesEpisodes, 0);
      setIsExpanded(true); // Optionally expand player when series starts
    }
  }, [playEpisode]);


  const playPreviousInPlaylist = useCallback(() => {
    if (currentPlaylist.length > 0 && currentPlaylistEpisodeIndex > 0) {
      const prevIndex = currentPlaylistEpisodeIndex - 1;
      setCurrentPlaylistEpisodeIndex(prevIndex);
      setCurrentEpisode(currentPlaylist[prevIndex]);
    } else {
       toast({ title: "Start of playlist", description: "You're at the beginning of the playlist." });
    }
  }, [currentPlaylist, currentPlaylistEpisodeIndex, toast]);

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
      // State update is handled by audio element's play/pause events
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

  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
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
      playEpisode,
      togglePlayPause,
      seek,
      setVolume,
      toggleExpandPlayer,
      closePlayer,
      playNextInPlaylist,
      playPreviousInPlaylist,
      startSeriesPlayback,
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
