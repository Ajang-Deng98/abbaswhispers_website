import React, { useState, useEffect } from 'react';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrollHidden, setIsScrollHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrollHidden(true);
      } else {
        setIsScrollHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!isVisible) return null;

  return (
    <div className={`announcement-banner ${isScrollHidden ? 'banner-hidden' : 'banner-visible'}`}>
      <div className="announcement-content">
        <div className="scrolling-text">
          <span>Seven volumes are coming soon. Stay tuned.</span>
        </div>
        <button
          className="announcement-close"
          onClick={() => setIsVisible(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;