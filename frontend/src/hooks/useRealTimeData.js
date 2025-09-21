import { useEffect, useRef } from 'react';

export const useRealTimeData = (fetchFunction, dependencies = [], interval = 60000) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    // Set up polling for real-time updates (no initial fetch)
    intervalRef.current = setInterval(() => {
      console.log('Real-time data refresh triggered');
      fetchFunction();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, dependencies);

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
};