import React, { createContext, useContext, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoaderContext = createContext();

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Loading...');

  const showLoader = (msg = 'Loading...') => {
    setMessage(msg);
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, loading }}>
      {children}
      {loading && (
        <LoadingSpinner 
          message={message} 
          fullScreen={true} 
          overlay={true}
          size="50px"
        />
      )}
    </LoaderContext.Provider>
  );
};