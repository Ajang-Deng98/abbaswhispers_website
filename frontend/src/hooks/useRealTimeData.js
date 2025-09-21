import { useEffect, useRef } from 'react';

export const useRealTimeData = (fetchFunction, dependencies = [], interval = 60000) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (typeof fetchFunction === 'function' && interval > 0) {
      intervalRef.current = setInterval(() => {
        try {
          fetchFunction();
        } catch (error) {
          console.error('Real-time data fetch error:', error);
        }
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [fetchFunction, interval]);
};