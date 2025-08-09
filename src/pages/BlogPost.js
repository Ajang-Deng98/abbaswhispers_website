import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Mock data - replace with API call
    const mockPost = {
      id: parseInt(id),
      title: "Finding Peace in Psalm 23",
      content: `
        <p>The Twenty-third Psalm stands as one of the most beloved and comforting passages in all of Scripture. In times of uncertainty, fear, and anxiety, these ancient words continue to speak peace into our modern hearts.</p>
        
        <h3>The Shepherd's Care</h3>
        <p>"The Lord is my shepherd; I shall not want." These opening words establish a relationship of trust and dependence. When we acknowledge God as our shepherd, we position ourselves as His sheep - dependent, trusting, and under His care.</p>
        
        <blockquote>"He makes me lie down in green pastures. He leads me beside still waters. He restores my soul."</blockquote>
        
        <p>Notice the gentle nature of God's care. He doesn't drive us to rest; He makes us lie down. He doesn't push us toward refreshment; He leads us beside still waters. This is the tender care of a loving shepherd who knows exactly what His sheep need.</p>
        
        <h3>Walking Through Darkness</h3>
        <p>The psalm doesn't promise that we'll never face dark valleys. Instead, it assures us that even in the darkest moments, we need not fear because our Shepherd walks with us.</p>
        
        <p>"Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me."</p>
        
        <p>The rod and staff were tools of protection and guidance. In our lives, God's word serves as our rod and staff, protecting us from spiritual danger and guiding us along the right path.</p>
        
        <h3>Abundant Provision</h3>
        <p>The psalm concludes with images of abundance and eternal security. God doesn't just meet our basic needs; He prepares a feast for us, even in the presence of our enemies.</p>
        
        <p>As we meditate on these truths, may we find the peace that comes from knowing we are under the care of the Good Shepherd, who gave His life for His sheep.</p>
      `,
      category: "peace",
      tags: ["psalm-23", "peace", "comfort", "shepherd"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center",
      date: "2024-01-15",
      author: "Abba Whispers Team",
      readTime: "5 min read"
    };

    setPost(mockPost);

    // Mock related posts
    setRelatedPosts([
      {
        id: 2,
        title: "The Power of Gratitude in Psalm 100",
        excerpt: "Learn how thanksgiving transforms our hearts...",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=300&h=200&fit=crop&crop=center"
      },
      {
        id: 3,
        title: "Strength in Times of Trouble - Psalm 46",
        excerpt: "When life feels overwhelming, Psalm 46 reminds us...",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center"
      }
    ]);

    // Mock comments
    setComments([
      {
        id: 1,
        author: "Sarah M.",
        content: "This reflection on Psalm 23 brought me such comfort during a difficult time. Thank you for these beautiful insights.",
        date: "2024-01-16"
      },
      {
        id: 2,
        author: "David L.",
        content: "The imagery of the shepherd's care really resonates with me. It's amazing how these ancient words still speak to us today.",
        date: "2024-01-17"
      }
    ]);
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "Anonymous",
        content: comment,
        date: new Date().toISOString().split('T')[0]
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  if (!post) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Abba Whispers Blog</title>
        <meta name="description" content={post.content.substring(0, 160).replace(/<[^>]*>/g, '') + '...'} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content.substring(0, 160).replace(/<[^>]*>/g, '') + '...'} />
        <meta property="og:image" content={post.image} />
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
                {post.tags.map(tag => (
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
                    #{tag}
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
                <span>By {post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </header>

            {/* Featured Image */}
            <img 
              src={post.image} 
              alt={post.title}
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover', 
                borderRadius: '10px',
                marginBottom: '3rem',
                boxShadow: '0 8px 25px var(--shadow)'
              }}
            />

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
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title}
                    style={{ 
                      width: '100%', 
                      height: '150px', 
                      objectFit: 'cover', 
                      borderRadius: '5px', 
                      marginBottom: '1rem' 
                    }}
                  />
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
                    <strong>{comment.author}</strong>
                    <span>{comment.date}</span>
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