import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScrollAnimatedSection from '../components/ScrollAnimatedSection';
import { blogAPI, commentAPI } from '../utils/api';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const loadPost = useCallback(async () => {
    try {
      const response = await blogAPI.getPost(id);
      setPost(response.data);
    } catch (error) {
      console.error('Error loading post:', error);
      setPost(null);
    }
  }, [id]);

  const loadRelatedPosts = useCallback(async () => {
    try {
      const response = await blogAPI.getAllPosts({ limit: 2 });
      const posts = response.data?.posts || response.data || [];
      setRelatedPosts(posts.filter(p => p.id !== parseInt(id)).slice(0, 2));
    } catch (error) {
      console.error('Error loading related posts:', error);
      setRelatedPosts([]);
    }
  }, [id]);

  const loadComments = useCallback(async () => {
    try {
      const response = await commentAPI.getPostComments(id);
      setComments(response.data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
      setComments([]);
    }
  }, [id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadPost();
    loadRelatedPosts();
    loadComments();
  }, [id, loadPost, loadRelatedPosts, loadComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        console.log('Submitting comment:', { post: id, author_name: "Anonymous", content: comment });
        const response = await commentAPI.addComment({
          post: id,
          author_name: isAnonymous ? "Anonymous" : (commentAuthor.trim() || "Anonymous"),
          content: comment
        });
        console.log('Comment response:', response);
        setComment('');
        setCommentAuthor('');
        setIsAnonymous(true);
        loadComments(); // Reload comments
        alert('Comment added successfully!');
      } catch (error) {
        console.error('Error adding comment:', error);
        console.error('Error details:', error.response?.data);
        alert('Error adding comment: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  if (!post) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{post.title || 'Blog Post'} - Abba's Whispers</title>
        <meta name="description" content={(post.content || '').substring(0, 160).replace(/<[^>]*>/g, '') + '...'} />
      </Helmet>

      {/* Document-style Article */}
      <article style={{
        background: '#ffffff',
        minHeight: '100vh',
        padding: '180px 0 80px 0'
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '0 2rem',
          fontFamily: 'Georgia, serif'
        }}>
          
          {/* Breadcrumb */}
          <ScrollAnimatedSection animation="fade-up">
            <nav style={{
              marginBottom: '3rem',
              fontSize: '0.8rem',
              color: '#999999',
              borderBottom: '1px solid #f0f0f0',
              paddingBottom: '1rem'
            }}>
              <Link to="/" style={{ color: '#999999', textDecoration: 'none' }}>Home</Link>
              <span style={{ margin: '0 0.5rem' }}>/</span>
              <Link to="/blog" style={{ color: '#999999', textDecoration: 'none' }}>Blog</Link>
              <span style={{ margin: '0 0.5rem' }}>/</span>
              <span>{post.title}</span>
            </nav>
          </ScrollAnimatedSection>

          {/* Article Header */}
          <ScrollAnimatedSection animation="fade-up" delay={100}>
            <header style={{ marginBottom: '4rem' }}>
              <h1 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '2.2rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                lineHeight: '1.2',
                marginBottom: '2rem',
                letterSpacing: '-0.02em'
              }}>{post.title}</h1>
              
              <div style={{
                fontSize: '0.9rem',
                color: '#666666',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  By <span style={{ fontWeight: '500' }}>{post.author || 'Uzo'}</span>
                </div>
                <div>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </header>
          </ScrollAnimatedSection>

          {/* Article Content */}
          <ScrollAnimatedSection animation="fade-up" delay={200}>
            <div 
              style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#333333',
                fontFamily: 'Georgia, serif'
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </ScrollAnimatedSection>

          {/* Article Footer */}
          <ScrollAnimatedSection animation="fade-up" delay={300}>
            <footer style={{
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid #f0f0f0'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
                color: '#999999'
              }}>
                <div>
                  Category: <span style={{ color: '#666666' }}>{post.category}</span>
                </div>
                <Link 
                  to="/blog" 
                  style={{
                    color: '#666666',
                    textDecoration: 'none',
                    borderBottom: '1px solid #666666',
                    paddingBottom: '1px'
                  }}
                >
                  ← Back to Blog
                </Link>
              </div>
            </footer>
          </ScrollAnimatedSection>

        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section style={{
          background: '#f8f9fa',
          padding: '4rem 0'
        }}>
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <ScrollAnimatedSection animation="fade-up">
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.4rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>Related Writings</h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
              }}>
                {relatedPosts.map((relatedPost, index) => (
                  <ScrollAnimatedSection key={relatedPost.id} animation="fade-up" delay={index * 100}>
                    <div style={{
                      borderBottom: '1px solid #e8e8e8',
                      paddingBottom: '2rem'
                    }}>
                      <h3 style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.1rem',
                        fontWeight: 'normal',
                        marginBottom: '0.5rem'
                      }}>
                        <Link 
                          to={`/blog/${relatedPost.id}`} 
                          style={{
                            color: '#2c2c2c',
                            textDecoration: 'none'
                          }}
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#666666',
                        lineHeight: '1.6',
                        margin: '0'
                      }}>
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </ScrollAnimatedSection>
                ))}
              </div>
            </ScrollAnimatedSection>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <section style={{
        background: '#ffffff',
        padding: '4rem 0'
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <ScrollAnimatedSection animation="fade-up">
            <div style={{
              borderTop: '1px solid #f0f0f0',
              paddingTop: '3rem'
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.4rem',
                fontWeight: 'normal',
                color: '#2c2c2c',
                marginBottom: '2rem'
              }}>Reflections ({comments.length})</h2>
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} style={{ marginBottom: '3rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(true)}
                      style={{
                        fontFamily: 'Georgia, serif',
                        padding: '0.5rem 1rem',
                        border: '1px solid #e8e8e8',
                        background: isAnonymous ? '#2c2c2c' : 'transparent',
                        color: isAnonymous ? 'white' : '#2c2c2c',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Anonymous
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(false)}
                      style={{
                        fontFamily: 'Georgia, serif',
                        padding: '0.5rem 1rem',
                        border: '1px solid #e8e8e8',
                        background: !isAnonymous ? '#2c2c2c' : 'transparent',
                        color: !isAnonymous ? 'white' : '#2c2c2c',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Add Your Name
                    </button>
                  </div>
                  {!isAnonymous && (
                    <input
                      type="text"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      placeholder="Your name"
                      style={{
                        fontFamily: 'Georgia, serif',
                        width: '100%',
                        padding: '0.75rem 0',
                        border: 'none',
                        borderBottom: '1px solid #e8e8e8',
                        fontSize: '1rem',
                        marginBottom: '1rem',
                        outline: 'none',
                        background: 'transparent'
                      }}
                    />
                  )}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your reflection..."
                  rows="4"
                  style={{
                    fontFamily: 'Georgia, serif',
                    width: '100%',
                    padding: '1rem 0',
                    border: 'none',
                    borderBottom: '1px solid #e8e8e8',
                    fontSize: '1rem',
                    resize: 'vertical',
                    marginBottom: '1.5rem',
                    outline: 'none',
                    background: 'transparent'
                  }}
                />
                <button 
                  type="submit" 
                  style={{
                    fontFamily: 'Georgia, serif',
                    padding: '0.75rem 2rem',
                    border: '1px solid #2c2c2c',
                    background: 'transparent',
                    color: '#2c2c2c',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#2c2c2c';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#2c2c2c';
                  }}
                >
                  Share Reflection
                </button>
              </form>

              {/* Comments List */}
              <div>
                {comments.map((comment, index) => (
                  <ScrollAnimatedSection key={comment.id} animation="fade-up" delay={index * 50}>
                    <div style={{
                      borderBottom: '1px solid #f0f0f0',
                      paddingBottom: '2rem',
                      marginBottom: '2rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                        fontSize: '0.8rem',
                        color: '#999999'
                      }}>
                        <span style={{ fontWeight: '500' }}>{comment.author_name}</span>
                        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                      </div>
                      <p style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '0.95rem',
                        lineHeight: '1.7',
                        color: '#333333',
                        margin: 0
                      }}>{comment.content}</p>
                    </div>
                  </ScrollAnimatedSection>
                ))}
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </>
  );
};

export default BlogPost;