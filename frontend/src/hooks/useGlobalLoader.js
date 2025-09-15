import { useEffect } from 'react';
import { useLoader } from '../components/GlobalLoader';
import { setGlobalLoader } from '../utils/api';

export const useGlobalLoader = () => {
  const loader = useLoader();
  
  useEffect(() => {
    // Set the global loader reference for API calls
    setGlobalLoader(loader);
  }, [loader]);
  
  return loader;
};