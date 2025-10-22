import React from 'react';

const ScrollAnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fade-up',
  delay = 0,
  ...props 
}) => {
  return (
    <div
      className={`${className}`}
      style={{
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollAnimatedSection;