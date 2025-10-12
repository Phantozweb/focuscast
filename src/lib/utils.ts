
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatDurationToISO8601(duration: string): string {
  if (!duration || !duration.includes(':')) {
    return 'PT0S';
  }
  const parts = duration.split(':');
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);

  if (isNaN(minutes) || isNaN(seconds)) {
    return 'PT0S';
  }

  return `PT${minutes}M${seconds}S`;
}

export function parseDurationToSeconds(duration: string): number {
  if (!duration || !duration.includes(':')) {
    return 0;
  }
  const parts = duration.split(':');
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);

  if (isNaN(minutes) || isNaN(seconds)) {
    return 0;
  }

  return minutes * 60 + seconds;
}

export function formatTotalSeconds(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    return '0 minutes';
  }
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let result = '';
  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''} `;
  }
  if (minutes > 0 || hours === 0) {
    result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  
  return result.trim();
}
