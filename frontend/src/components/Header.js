import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const logoImage = '/logo.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();

  const toggleDropdown = (itemPath) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [itemPath]: !prev[itemPath]
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { path: '/', label: 'Home' },
    { 
      path: '/about', 
      label: 'About',
      dropdown: [
        { path: '/about', label: 'Our Story' },
        { path: '/about#mission', label: 'Mission & Vision' },
        { path: '/about#founder', label: 'Meet Uzo' }
      ]
    },
    { 
      path: '/volumes', 
      label: 'Volumes',
      dropdown: [
        { path: '/volumes', label: 'All Collections' },
        { path: '/volumes?category=thanksgiving', label: 'Thanksgiving' },
        { path: '/volumes?category=wonder', label: 'Wonder' },
        { path: '/volumes?category=faith', label: 'Faith' },
        { path: '/volumes?category=contemplation', label: 'Contemplation' },
        { path: '/volumes?category=reflection', label: 'Reflection' }
      ]
    },
    { 
      path: '/blog', 
      label: 'Blog',
      dropdown: [
        { path: '/blog', label: 'All Posts' },
        { path: '/blog?category=inspiration', label: 'Daily Inspiration' },
        { path: '/blog?category=testimony', label: 'Testimonies' },
        { path: '/blog?category=reflection', label: 'Reflections' },
        { path: '/blog?category=selah', label: 'SELAH Series' }
      ]
    },
    { 
      path: '/contact', 
      label: 'Connect',
      dropdown: [
        { path: '/contact', label: 'Contact Us' },
        { path: '/prayer-request', label: 'Prayer Request' },
        { path: '/contact#newsletter', label: 'Newsletter' },
        { path: '/contact#social', label: 'Follow Us' }
      ]
    }
  ];

  return (
    <header className={`header ${isVisible ? 'header-visible' : 'header-hidden'}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-container">
            <div className="logo-wrapper">
              <img 
                src={logoImage} 
                alt="Abbaswhispers Logo" 
                onError={(e) => e.target.style.display = 'none'}
                style={{
                  height: '60px',
                  width: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: 'none',
                  boxShadow: 'none'
                }}
              />
            </div>
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) => (
              <div key={item.path} className={`nav-item ${item.dropdown ? 'has-dropdown' : ''}`}>
                {item.dropdown ? (
                  <>
                    <button
                      className="nav-link-button"
                      onClick={() => toggleDropdown(item.path)}
                    >
                      {item.label}
                      <span className="dropdown-arrow">{openDropdowns[item.path] ? '▲' : '▼'}</span>
                    </button>
                    {openDropdowns[item.path] && (
                      <div className="dropdown-menu mobile-dropdown">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.path}
                            to={dropItem.path}
                            className="dropdown-item"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;