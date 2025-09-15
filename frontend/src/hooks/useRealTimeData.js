import { useEffect, useRef } from 'react';

export const useRealTimeData = (fetchFunction, dependencies = [], interval = 30000) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    // Initial fetch
    fetchFunction();

    // Set up polling for real-time updates
    intervalRef.current = setInterval(() => {
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