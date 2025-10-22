import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = () => {
  const location = useLocation();
  const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      document.head.removeChild(script);
    };
  }, [GA_TRACKING_ID]);

  // Track page views on route changes
  useEffect(() => {
    if (!window.gtag || !GA_TRACKING_ID) return;

    window.gtag('config', GA_TRACKING_ID, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location, GA_TRACKING_ID]);

  return null;
};

export default GoogleAnalytics;