import { useEffect, useRef } from 'react';

export const useRealTimeData = (fetchFunction, dependencies = [], interval = 60000) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (typeof fetchFunction === 'function') {
      intervalRef.current = setInterval(() => {
        fetchFunction();
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchFunction, interval]);
};