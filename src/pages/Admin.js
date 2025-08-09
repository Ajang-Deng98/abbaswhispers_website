import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    image: '',
    status: 'draft'
  });

  const [volumeForm, setVolumeForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: '',
    downloadLink: ''
  });

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    // Mock data - replace with API calls
    setPosts([
      {
        id: 1,
        title: "Finding Peace in Psalm 23",
        status: "published",
        date: "2024-01-15",
        views: 1250
      },
      {
        id: 2,
        title: "The Power of Gratitude",
        status: "draft",
        date: "2024-01-10",
        views: 0
      }
    ]);

    setVolumes([
      {
        id: 1,
        title: "Whispers of Hope",
        category: "healing",
        price: "Free",
        downloads: 500
      }
    ]);

    setPrayerRequests([
      {
        id: 1,
        category: "healing",
        date: "2024-01-15",
        status: "new"
      },
      {
        id: 2,
        category: "guidance",
        date: "2024-01-14",
        status: "prayed"
      }
    ]);

    setSubscribers([
      { id: 1, email: "user1@example.com", date: "2024-01-15" },
      { id: 2, email: "user2@example.com", date: "2024-01-14" }
    ]);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication - replace with proper authentication
    if (loginData.username === 'admin' && loginData.password === 'password123') {
      localStorage.setItem('adminToken', 'mock-token');
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Add/update post logic
    const newPost = {
      id: posts.length + 1,
      ...postForm,
      date: new Date().toISOString().split('T')[0],
      views: 0
    };
    setPosts([...posts, newPost]);
    setPostForm({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      tags: '',
      image: '',
      status: 'draft'
    });
    alert('Post saved successfully!');
  };

  const handleVolumeSubmit = (e) => {
    e.preventDefault();
    // Add/update volume logic
    const newVolume = {
      id: volumes.length + 1,
      ...volumeForm,
      downloads: 0
    };
    setVolumes([...volumes, newVolume]);
    setVolumeForm({
      title: '',
      description: '',
      category: '',
      price: '',
      image: '',
      downloadLink: ''
    });
    alert('Volume saved successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="section">
        <div className="container">
          <motion.div
            className="text-center"
            style={{ maxWidth: '400px', margin: '0 auto' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="card">
              <h2>Admin Login</h2>
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--cream)',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--cream)',
                      borderRadius: '5px',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>
                <button type="submit" className="btn" style={{ width: '100%' }}>
                  Login
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>

          {/* Navigation Tabs */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '2rem',
            borderBottom: '2px solid var(--cream)',
            paddingBottom: '1rem'
          }}>
            {['posts', 'volumes', 'prayers', 'subscribers'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn ${activeTab === tab ? '' : 'btn-secondary'}`}
                style={{ textTransform: 'capitalize' }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Posts Management */}
          {activeTab === 'posts' && (
            <div>
              <h2>Manage Posts</h2>
              <div className="grid grid-2" style={{ gap: '2rem' }}>
                <div className="card">
                  <h3>Create New Post</h3>
                  <form onSubmit={handlePostSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="Post Title"
                        value={postForm.title}
                        onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid var(--cream)',
                          borderRadius: '5px'
                        }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <textarea
                        placeholder="Excerpt"
                        value={postForm.excerpt}
                        onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                        rows="3"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid var(--cream)',
                          borderRadius: '5px'
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <select
                        value={postForm.category}
                        onChange={(e) => setPostForm({...postForm, category: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid var(--cream)',
                          borderRadius: '5px'
                        }}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="peace">Peace</option>
                        <option value="gratitude">Gratitude</option>
                        <option value="strength">Strength</option>
                        <option value="worship">Worship</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={postForm.tags}
                        onChange={(e) => setPostForm({...postForm, tags: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid var(--cream)',
                          borderRadius: '5px'
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <ReactQuill
                        value={postForm.content}
                        onChange={(content) => setPostForm({...postForm, content})}
                        style={{ height: '200px', marginBottom: '50px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button 
                        type="submit" 
                        className="btn"
                        onClick={() => setPostForm({...postForm, status: 'published'})}
                      >
                        Publish
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-secondary"
                        onClick={() => setPostForm({...postForm, status: 'draft'})}
                      >
                        Save Draft
                      </button>
                    </div>
                  </form>
                </div>

                <div className="card">
                  <h3>Existing Posts</h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {posts.map(post => (
                      <div key={post.id} style={{ 
                        padding: '1rem', 
                        border: '1px solid var(--cream)', 
                        borderRadius: '5px',
                        marginBottom: '1rem'
                      }}>
                        <h4>{post.title}</h4>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontSize: '0.9rem',
                          color: 'var(--text-light)'
                        }}>
                          <span>Status: {post.status}</span>
                          <span>Views: {post.views}</span>
                        </div>
                        <div style={{ marginTop: '0.5rem' }}>
                          <button className="btn" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Volumes Management */}
          {activeTab === 'volumes' && (
            <div>
              <h2>Manage Volumes</h2>
              <div className="grid grid-2" style={{ gap: '2rem' }}>
                <div className="card">
                  <h3>Create New Volume</h3>
                  <form onSubmit={handleVolumeSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="Volume Title"
                        value={volumeForm.title}
                        onChange={(e) => setVolumeForm({...volumeForm, title: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid var(--cream)',
                          borderRadius: '5px'
                        }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <textarea
                        placeholder="Description"
                        value={volumeForm.description}
                        onChange={(e) => setVolumeForm({...volumeForm, description: e.target.value})}
                        rows="4"
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid var(--cream)',
                          borderRadius: '5px'
                        }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <select
                        value={volumeForm.category}
                        onChange={(e) => setVolumeForm({...volumeForm, category: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid var(--cream)',
                          borderRadius: '5px'
                        }}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="healing">Healing</option>
                        <option value="empowerment">Empowerment</option>
                        <option value="peace">Peace</option>
                        <option value="gratitude">Gratitude</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="Price (e.g., Free, $9.99)"
                        value={volumeForm.price}
                        onChange={(e) => setVolumeForm({...volumeForm, price: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid var(--cream)',
                          borderRadius: '5px'
                        }}
                        required
                      />
                    </div>
                    <button type="submit" className="btn">Save Volume</button>
                  </form>
                </div>

                <div className="card">
                  <h3>Existing Volumes</h3>
                  {volumes.map(volume => (
                    <div key={volume.id} style={{ 
                      padding: '1rem', 
                      border: '1px solid var(--cream)', 
                      borderRadius: '5px',
                      marginBottom: '1rem'
                    }}>
                      <h4>{volume.title}</h4>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        fontSize: '0.9rem',
                        color: 'var(--text-light)'
                      }}>
                        <span>Price: {volume.price}</span>
                        <span>Downloads: {volume.downloads}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Prayer Requests */}
          {activeTab === 'prayers' && (
            <div>
              <h2>Prayer Requests</h2>
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3>Recent Requests</h3>
                  <span>Total: {prayerRequests.length}</span>
                </div>
                {prayerRequests.map(request => (
                  <div key={request.id} style={{ 
                    padding: '1rem', 
                    border: '1px solid var(--cream)', 
                    borderRadius: '5px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <span>Category: {request.category}</span>
                      <span>Date: {request.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>
                        Mark as Prayed
                      </button>
                      <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscribers */}
          {activeTab === 'subscribers' && (
            <div>
              <h2>Newsletter Subscribers</h2>
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3>Subscriber List</h3>
                  <span>Total: {subscribers.length}</span>
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {subscribers.map(subscriber => (
                    <div key={subscriber.id} style={{ 
                      padding: '1rem', 
                      border: '1px solid var(--cream)', 
                      borderRadius: '5px',
                      marginBottom: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div>{subscriber.email}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                          Subscribed: {subscriber.date}
                        </div>
                      </div>
                      <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;