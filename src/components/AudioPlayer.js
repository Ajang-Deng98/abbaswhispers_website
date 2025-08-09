import React, { useState, useRef } from 'react';

const AudioPlayer = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          setHasError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError || !audioUrl) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px',
        padding: '8px',
        background: 'var(--soft-white)',
        borderRadius: '5px',
        border: '1px solid #ddd'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>🎤 Audio recording coming soon</span>
        <button 
          className="btn"
          style={{ 
            fontSize: '0.7rem', 
            padding: '4px 8px',
            opacity: 0.6,
            cursor: 'not-allowed'
          }}
          disabled
        >
          Play Audio
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      padding: '8px',
      background: 'var(--soft-white)',
      borderRadius: '5px',
      border: '1px solid #ddd'
    }}>
      <audio 
        ref={audioRef}
        onError={handleError}
        onEnded={() => setIsPlaying(false)}
        preload="none"
      >
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
      
      <button 
        onClick={togglePlay}
        className="btn"
        style={{ 
          fontSize: '0.7rem', 
          padding: '4px 8px'
        }}
      >
        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
      </button>
      
      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
        Listen to "{title}"
      </span>
    </div>
  );
};

export default AudioPlayer;