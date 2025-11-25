'use client';

import { useState, useEffect } from 'react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby0Q5XgvzW7fq6f6P3VHyzJvaQNoHvmItSR45x8R7ZPiWZZ26_EHUjaFzqcMu5Vq1Cw/exec';

export interface AnalyticsData {
  [episodeId: string]: {
    views: number;
    likes: number;
  };
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getEpisodes`, { 
      cache: 'no-store',
      mode: 'cors' 
    });
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    const result = await response.json();

    if (result.status === 'success' && Array.isArray(result.data)) {
      const analyticsMap: AnalyticsData = result.data.reduce((acc, item) => {
        acc[item.id] = { views: item.views || 0, likes: item.likes || 0 };
        return acc;
      }, {});
      return analyticsMap;
    } else {
      throw new Error(result.message || 'Invalid data structure from API');
    }
}


export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const data = await getAnalyticsData();
        setAnalytics(data);
      } catch (e) {
        setError(e as Error);
        console.error('Error fetching analytics:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { analytics, isLoading, error };
}
