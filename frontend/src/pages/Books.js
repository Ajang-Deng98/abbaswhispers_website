import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { bookAPI } from '../utils/api';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await bookAPI.getAllBooks();
      
      let booksData = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          booksData = response.data;
        } else if (response.data.results && Array.isArray(response.data.results)) {
          booksData = response.data.results;
        }
      }
      
      setBooks(booksData);
    } catch (error) {
      console.error('Error loading books:', error);
      setBooks([]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Books - Abba's Whispers | Inspirational Christian Literature</title>
        <meta name="description" content="Discover Uzo's collection of inspirational Christian books, devotionals, and poetry. Transform your faith journey through powerful written words." />
      </Helmet>

      {/* Hero Section */}
      <section className="books-hero" style={{
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(255, 255, 255, 0.95) 100%)',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1rem', color: '#000', fontWeight: '800' }}>
              Published Books
            </h1>
            <p style={{ fontSize: '1.4rem', color: '#666', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
              Transform your spiritual journey with Uzo's powerful collection of books. Each one crafted from personal experience and deep faith to bring healing, hope, and inspiration to your life.
            </p>
            <div style={{
              background: 'rgba(212, 175, 55, 0.1)',
              padding: '2rem',
              borderRadius: '15px',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <h3 style={{ color: 'var(--primary-gold)', marginBottom: '1rem', fontSize: '1.5rem' }}>📚 Available Now</h3>
              <p style={{ color: '#333', fontSize: '1.1rem', margin: 0 }}>Digital & Physical copies • Worldwide shipping • Instant download</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Books Grid */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          {books.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <h3 style={{ color: 'var(--primary-gold)', marginBottom: '1rem' }}>Coming Soon</h3>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>
                New books are being prepared. Subscribe to our newsletter to be notified when they're available!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '3rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(212, 175, 55, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                  }}
                >
                  {book.cover_image && (
                    <div style={{ height: '400px', overflow: 'hidden', position: 'relative' }}>
                      <img 
                        src={book.cover_image.startsWith('http') ? book.cover_image : `http://localhost:8000${book.cover_image}`}
                        alt={book.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {book.featured && (
                        <div style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          background: 'var(--primary-gold)',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          ⭐ BESTSELLER
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#000', fontWeight: '700' }}>
                      {book.title}
                    </h3>
                    
                    {book.subtitle && (
                      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
                        {book.subtitle}
                      </p>
                    )}
                    
                    <p style={{ fontSize: '1rem', color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      {book.excerpt || book.description}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: '2rem',
                      padding: '1rem',
                      background: 'rgba(212, 175, 55, 0.05)',
                      borderRadius: '10px'
                    }}>
                      <div>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-gold)' }}>
                          ${book.price}
                        </span>
                        {book.pages && (
                          <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.2rem 0 0 0' }}>
                            {book.pages} pages
                          </p>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>Available in:</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--primary-gold)', margin: '0.2rem 0 0 0', fontWeight: '500' }}>Print & Digital</p>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {book.purchase_link && (
                        <a
                          href={book.purchase_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, var(--primary-gold), #f59e0b)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            textAlign: 'center',
                            fontSize: '1.1rem',
                            boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)'
                          }}
                        >
                          🛒 Buy Now - ${book.price}
                        </a>
                      )}
                      
                      <button
                        onClick={() => setSelectedBook(book)}
                        style={{
                          padding: '0.8rem 2rem',
                          background: 'transparent',
                          color: 'var(--primary-gold)',
                          border: '2px solid var(--primary-gold)',
                          borderRadius: '50px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        📖 Read Preview
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Book Preview Modal */}
      {selectedBook && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedBook(null)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '15px',
              padding: '2rem',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: '#000' }}>{selectedBook.title}</h2>
              <button 
                onClick={() => setSelectedBook(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>
            
            {selectedBook.subtitle && (
              <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '1rem' }}>
                {selectedBook.subtitle}
              </p>
            )}
            
            <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {selectedBook.description}
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              {selectedBook.preview_pdf && (
                <a
                  href={selectedBook.preview_pdf.startsWith('http') ? selectedBook.preview_pdf : `http://localhost:8000${selectedBook.preview_pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '1rem 2rem',
                    background: 'var(--primary-gold)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '500'
                  }}
                >
                  Read Preview
                </a>
              )}
              
              {selectedBook.purchase_link && (
                <a
                  href={selectedBook.purchase_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '1rem 2rem',
                    background: 'transparent',
                    color: 'var(--primary-gold)',
                    border: '2px solid var(--primary-gold)',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '500'
                  }}
                >
                  Purchase Book
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Books;