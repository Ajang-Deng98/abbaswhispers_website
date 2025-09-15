import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
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
        <title>{post.title || 'Blog Post'} - Abba Whispers Blog</title>
        <meta name="description" content={(post.content || '').substring(0, 160).replace(/<[^>]*>/g, '') + '...'} />
        <meta property="og:title" content={post.title || 'Blog Post'} />
        <meta property="og:description" content={(post.content || '').substring(0, 160).replace(/<[^>]*>/g, '') + '...'} />
        <meta property="og:image" content={post.image || ''} />
      </Helmet>

      <article className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <nav style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
              <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / {post.title}
            </nav>

            {/* Post Header */}
            <header className="text-center" style={{ marginBottom: '3rem' }}>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                justifyContent: 'center',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                {(typeof post.tags === 'string' ? post.tags.split(',') : post.tags || []).map(tag => (
                  <span 
                    key={tag}
                    style={{
                      background: 'var(--cream)',
                      color: 'var(--text-dark)',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '0.8rem'
                    }}
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
              <h1 style={{ marginBottom: '1rem' }}>{post.title}</h1>
              <div style={{ 
                color: 'var(--text-light)', 
                fontSize: '0.9rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <span>By {post.author || 'Admin'}</span>
                <span>•</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>Category: {post.category}</span>
              </div>
            </header>

            {/* Featured Image */}
            {post.image && (
              <img 
                src={post.image.startsWith('http') ? post.image : `http://localhost:8000${post.image}`} 
                alt={post.title}
                style={{ 
                  width: '100%', 
                  height: '400px', 
                  objectFit: 'cover', 
                  borderRadius: '10px',
                  marginBottom: '3rem',
                  boxShadow: '0 8px 25px var(--shadow)'
                }}
                onError={(e) => e.target.style.display = 'none'}
              />
            )}

            {/* Post Content */}
            <div 
              style={{ 
                maxWidth: '800px', 
                margin: '0 auto',
                lineHeight: '1.8',
                fontSize: '1.1rem'
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Social Share */}
            <div style={{ 
              textAlign: 'center', 
              margin: '3rem 0',
              padding: '2rem',
              background: 'var(--cream)',
              borderRadius: '10px'
            }}>
              <h3>Share This Post</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                <button className="btn">📘 Facebook</button>
                <button className="btn">🐦 Twitter</button>
                <button className="btn">📧 Email</button>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-center">Related Posts</h2>
            <div className="grid grid-2" style={{ marginTop: '2rem' }}>
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  className="card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {relatedPost.image && (
                    <img 
                      src={relatedPost.image.startsWith('http') ? relatedPost.image : `http://localhost:8000${relatedPost.image}`} 
                      alt={relatedPost.title}
                      style={{ 
                        width: '100%', 
                        height: '150px', 
                        objectFit: 'cover', 
                        borderRadius: '5px', 
                        marginBottom: '1rem' 
                      }}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <h3>
                    <Link to={`/blog/${relatedPost.id}`} style={{ color: 'inherit' }}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p>{relatedPost.excerpt}</p>
                  <Link to={`/blog/${relatedPost.id}`} className="btn">Read More</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="section">
        <div className="container">
          <motion.div
            style={{ maxWidth: '800px', margin: '0 auto' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Comments ({comments.length})</h2>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} style={{ marginBottom: '3rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(true)}
                    style={{
                      padding: '8px 16px',
                      border: '2px solid var(--primary-gold)',
                      borderRadius: '5px',
                      background: isAnonymous ? 'var(--primary-gold)' : 'transparent',
                      color: isAnonymous ? 'white' : 'var(--primary-gold)',
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
                      padding: '8px 16px',
                      border: '2px solid var(--primary-gold)',
                      borderRadius: '5px',
                      background: !isAnonymous ? 'var(--primary-gold)' : 'transparent',
                      color: !isAnonymous ? 'white' : 'var(--primary-gold)',
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
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid var(--cream)',
                      borderRadius: '5px',
                      fontSize: '1rem',
                      marginBottom: '1rem'
                    }}
                  />
                )}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows="4"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid var(--cream)',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  resize: 'vertical',
                  marginBottom: '1rem'
                }}
              />
              <button type="submit" className="btn">Post Comment</button>
            </form>

            {/* Comments List */}
            <div>
              {comments.map((comment) => (
                <div 
                  key={comment.id}
                  style={{
                    background: 'var(--soft-white)',
                    padding: '1.5rem',
                    borderRadius: '5px',
                    marginBottom: '1rem',
                    boxShadow: '0 2px 10px var(--shadow)'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-light)'
                  }}>
                    <strong>{comment.author_name}</strong>
                    <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                  </div>
                  <p style={{ margin: 0 }}>{comment.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;