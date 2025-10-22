import React from 'react';
import { Link } from 'react-router-dom';

const SEOLink = ({ 
  to, 
  children, 
  title, 
  ariaLabel,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <Link
      to={to}
      title={title || children}
      aria-label={ariaLabel || title || children}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </Link>
  );
};

export default SEOLink;