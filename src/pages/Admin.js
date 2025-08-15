import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { blogAPI, volumeAPI, prayerAPI, subscriberAPI, authAPI, commentAPI, contactAPI } from '../utils/api';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [comments, setComments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    image: '',
    author: '',
    status: 'draft'
  });

  const [volumeForm, setVolumeForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: '',
    downloadLink: '',
    content: '',
    audioUrl: '',
    status: 'published'
  });

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      verifyToken();
    }
  }, []);

  const verifyToken = async () => {
    try {
      await authAPI.verify();
      setIsAuthenticated(true);
      loadData();
    } catch (error) {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      // Load posts
      try {
        const postsResponse = await blogAPI.getAdminPosts();
        setPosts(postsResponse.data || []);
      } catch (err) {
        console.error('Error loading posts:', err);
        setPosts([]);
      }

      // Load volumes
      try {
        const volumesResponse = await volumeAPI.getAdminVolumes();
        setVolumes(volumesResponse.data || []);
      } catch (err) {
        console.error('Error loading volumes:', err);
        setVolumes([]);
      }

      // Load prayer requests
      try {
        const prayersResponse = await prayerAPI.getAllRequests();
        setPrayerRequests(prayersResponse.data?.requests || prayersResponse.data || []);
      } catch (err) {
        console.error('Error loading prayers:', err);
        setPrayerRequests([]);
      }

      // Load subscribers
      try {
        const subscribersResponse = await subscriberAPI.getAll();
        setSubscribers(subscribersResponse.data?.subscribers || subscribersResponse.data || []);
      } catch (err) {
        console.error('Error loading subscribers:', err);
        setSubscribers([]);
      }

      // Load comments
      try {
        const commentsResponse = await commentAPI.getAllComments();
        setComments(commentsResponse.data || []);
      } catch (err) {
        console.error('Error loading comments:', err);
        setComments([]);
      }

      // Load contacts
      try {
        const contactsResponse = await contactAPI.getAllContacts();
        setContacts(contactsResponse.data || []);
      } catch (err) {
        console.error('Error loading contacts:', err);
        setContacts([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.login(loginData);
      localStorage.setItem('adminToken', response.data.token);
      setIsAuthenticated(true);
      await loadData();
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (postForm.id) {
        await blogAPI.updatePost(postForm.id, postForm);
        alert('Post updated successfully!');
      } else {
        await blogAPI.createPost(postForm);
        alert('Post created successfully!');
      }
      setPostForm({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: '',
        image: '',
        status: 'draft'
      });
      await loadData();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setError('Error saving post: ' + errorMsg);
      console.error('Post submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVolumeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await volumeAPI.createVolume(volumeForm);
      setVolumeForm({
        title: '',
        description: '',
        category: '',
        price: '',
        image: '',
        downloadLink: '',
        content: '',
        audioUrl: '',
        status: 'published'
      });
      alert('Volume saved successfully!');
      await loadData(); // Reload data to show new volume
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setError('Error saving volume: ' + errorMsg);
      console.error('Volume submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrayerStatus = async (id, status) => {
    try {
      await prayerAPI.updateStatus(id, { status });
      alert('Prayer status updated successfully!');
      await loadData();
    } catch (error) {
      alert('Error updating prayer status');
      console.error('Update prayer status error:', error);
    }
  };

  const deletePrayerRequest = async (id) => {
    if (window.confirm('Are you sure you want to delete this prayer request?')) {
      try {
        await prayerAPI.deleteRequest(id);
        alert('Prayer request deleted successfully!');
        await loadData();
      } catch (error) {
        alert('Error deleting prayer request');
        console.error('Delete prayer request error:', error);
      }
    }
  };

  const viewPrayerDetails = (request) => {
    setSelectedPrayer(request);
    setShowPrayerModal(true);
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5003/api/volumes/upload-audio', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setVolumeForm({...volumeForm, audioUrl: data.audioUrl});
        alert('Audio uploaded successfully!');
      } else {
        alert('Error uploading audio: ' + data.message);
      }
    } catch (error) {
      console.error('Audio upload error:', error);
      alert('Error uploading audio');
    } finally {
      setLoading(false);
    }
  };

  const handleVolumeSubmitWithStatus = async (formData) => {
    setLoading(true);
    setError('');
    try {
      if (formData.id) {
        await volumeAPI.updateVolume(formData.id, formData);
        alert(`Volume ${formData.status === 'published' ? 'updated and published' : 'updated as draft'} successfully!`);
      } else {
        await volumeAPI.createVolume(formData);
        alert(`Volume ${formData.status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      }
      setVolumeForm({
        title: '',
        description: '',
        category: '',
        price: '',
        image: '',
        downloadLink: '',
        content: '',
        audioUrl: '',
        status: 'published'
      });
      await loadData();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setError('Error saving volume: ' + errorMsg);
      console.error('Volume submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateVolumeStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5003/api/volumes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        alert(`Volume ${status === 'published' ? 'published' : 'unpublished'} successfully!`);
        await loadData();
      } else {
        const error = await response.json();
        alert('Error updating volume status: ' + (error.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error updating volume status');
      console.error('Update volume status error:', error);
    }
  };

  const editVolume = (volume) => {
    setVolumeForm({
      id: volume.id,
      title: volume.title,
      description: volume.description,
      category: volume.category,
      price: volume.price,
      image: volume.image || '',
      downloadLink: volume.download_link || '',
      content: volume.content || '',
      audioUrl: volume.audio_url || '',
      status: volume.status
    });
  };

  const deleteVolume = async (id) => {
    if (window.confirm('Are you sure you want to delete this volume?')) {
      try {
        await volumeAPI.deleteVolume(id);
        alert('Volume deleted successfully!');
        await loadData();
      } catch (error) {
        alert('Error deleting volume');
        console.error('Delete volume error:', error);
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5003/api/blog/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setPostForm({...postForm, image: data.imageUrl});
        alert('Image uploaded successfully!');
      } else {
        alert('Error uploading image: ' + data.message);
      }
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const editPost = (post) => {
    setPostForm({
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags,
      image: post.image || '',
      author: post.author || '',
      status: post.status
    });
  };

  const deletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogAPI.deletePost(id);
        alert('Post deleted successfully!');
        await loadData();
      } catch (error) {
        alert('Error deleting post');
        console.error('Delete post error:', error);
      }
    }
  };

  const handlePostSubmitWithStatus = async (formData) => {
    setLoading(true);
    setError('');
    try {
      if (formData.id) {
        await blogAPI.updatePost(formData.id, formData);
        alert(`Post ${formData.status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      } else {
        await blogAPI.createPost(formData);
        alert(`Post ${formData.status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      }
      setPostForm({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: '',
        image: '',
        author: '',
        status: 'draft'
      });
      await loadData();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setError('Error saving post: ' + errorMsg);
      console.error('Post submit error:', error);
    } finally {
      setLoading(false);
    }
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
                <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && (
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '1rem',
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    borderRadius: '5px',
                    textAlign: 'center'
                  }}>
                    {error}
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ 
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{ margin: 0, color: '#2c3e50', fontSize: '2rem', fontWeight: '700' }}>Admin Dashboard</h1>
              <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d', fontSize: '1rem' }}>Manage your content and monitor activity</p>
            </div>
            <button 
              onClick={handleLogout} 
              style={{
                background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                border: 'none',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>

          {/* Stats Cards */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              borderLeft: '4px solid #28a745'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#28a745', fontSize: '2rem', fontWeight: '700' }}>{volumes.length}</h3>
              <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Total Volumes</p>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              borderLeft: '4px solid #007bff'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#007bff', fontSize: '2rem', fontWeight: '700' }}>{posts.length}</h3>
              <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Blog Posts</p>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              borderLeft: '4px solid #ffc107'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#ffc107', fontSize: '2rem', fontWeight: '700' }}>{prayerRequests.length}</h3>
              <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Prayer Requests</p>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              borderLeft: '4px solid #17a2b8'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#17a2b8', fontSize: '2rem', fontWeight: '700' }}>{subscribers.length}</h3>
              <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>Subscribers</p>
            </div>
          </div>

          {error && (
            <div style={{ 
              marginBottom: '2rem',
              padding: '1rem 1.5rem',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              borderRadius: '8px',
              border: '1px solid #f5c6cb'
            }}>
              {error}
            </div>
          )}

          {/* Navigation Tabs */}
          <div style={{ 
            background: 'white',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              {['volumes', 'posts', 'prayers', 'subscribers', 'comments', 'contacts'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: activeTab === tab ? 'linear-gradient(135deg, var(--primary-gold) 0%, #b8860b 100%)' : 'transparent',
                    color: activeTab === tab ? 'white' : '#6c757d',
                    border: activeTab === tab ? 'none' : '2px solid #e9ecef',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'capitalize'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>



          {/* Posts Management */}
          {activeTab === 'posts' && (
            <div style={{ 
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <h2 style={{ margin: '0 0 2rem 0', color: '#2c3e50', fontSize: '1.5rem', fontWeight: '600' }}>Manage Posts</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3>{postForm.id ? 'Edit Post' : 'Create New Post'}</h3>
                    {postForm.id && (
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        style={{ fontSize: '0.8rem', padding: '5px 10px' }}
                        onClick={() => setPostForm({
                          title: '',
                          content: '',
                          excerpt: '',
                          category: '',
                          tags: '',
                          image: '',
                          author: '',
                          status: 'draft'
                        })}
                      >
                        Clear Form
                      </button>
                    )}
                  </div>
                  <form onSubmit={handlePostSubmit}>
                    <input
                      type="text"
                      placeholder="Post Title"
                      value={postForm.title}
                      onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                      style={{ width: '100%', padding: '12px', marginBottom: '1rem', border: '2px solid #e9ecef', borderRadius: '8px' }}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Author Name"
                      value={postForm.author}
                      onChange={(e) => setPostForm({...postForm, author: e.target.value})}
                      style={{ width: '100%', padding: '12px', marginBottom: '1rem', border: '2px solid #e9ecef', borderRadius: '8px' }}
                    />
                    <textarea
                      placeholder="Excerpt"
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                      rows="3"
                      style={{ width: '100%', padding: '12px', marginBottom: '1rem', border: '2px solid #e9ecef', borderRadius: '8px' }}
                    />
                    <select
                      value={postForm.category}
                      onChange={(e) => setPostForm({...postForm, category: e.target.value})}
                      style={{ width: '100%', padding: '12px', marginBottom: '1rem', border: '2px solid #e9ecef', borderRadius: '8px' }}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="peace">Peace</option>
                      <option value="gratitude">Gratitude</option>
                      <option value="strength">Strength</option>
                      <option value="worship">Worship</option>
                      <option value="faithfulness">Faithfulness</option>
                      <option value="guidance">Guidance</option>
                    </select>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Post Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid #e9ecef',
                          borderRadius: '8px'
                        }}
                      />
                      {postForm.image && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'green' }}>
                          ✓ Image uploaded: {postForm.image}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Tags (comma separated)"
                      value={postForm.tags}
                      onChange={(e) => setPostForm({...postForm, tags: e.target.value})}
                      style={{ width: '100%', padding: '12px', marginBottom: '1rem', border: '2px solid #e9ecef', borderRadius: '8px' }}
                    />
                    <ReactQuill
                      value={postForm.content}
                      onChange={(content) => setPostForm({...postForm, content})}
                      style={{ height: '200px', marginBottom: '3rem' }}
                    />
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button 
                        type="button" 
                        className="btn"
                        onClick={async (e) => {
                          e.preventDefault();
                          const updatedForm = {...postForm, status: 'published'};
                          setPostForm(updatedForm);
                          await handlePostSubmitWithStatus(updatedForm);
                        }}
                      >
                        Publish
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={async (e) => {
                          e.preventDefault();
                          const updatedForm = {...postForm, status: 'draft'};
                          setPostForm(updatedForm);
                          await handlePostSubmitWithStatus(updatedForm);
                        }}
                      >
                        Save Draft
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3>Existing Posts</h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {posts.map(post => (
                      <div key={post.id} style={{ padding: '1rem', border: '1px solid #e9ecef', borderRadius: '8px', marginBottom: '1rem' }}>
                        <h4>{post.title}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6c757d', marginBottom: '0.5rem' }}>
                          <span>Status: {post.status}</span>
                          <span>Views: {post.views || 0}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn" 
                            style={{ fontSize: '0.8rem', padding: '5px 10px' }}
                            onClick={() => editPost(post)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn" 
                            style={{ fontSize: '0.8rem', padding: '5px 10px', backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                            onClick={() => deletePost(post.id)}
                          >
                            Delete
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
            <div style={{ 
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <h2 style={{ margin: '0 0 2rem 0', color: '#2c3e50', fontSize: '1.5rem', fontWeight: '600' }}>Manage Volumes</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3>{volumeForm.id ? 'Edit Volume' : 'Create New Volume'}</h3>
                    {volumeForm.id && (
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        style={{ fontSize: '0.8rem', padding: '5px 10px' }}
                        onClick={() => setVolumeForm({
                          title: '',
                          description: '',
                          category: '',
                          price: '',
                          image: '',
                          downloadLink: '',
                          content: '',
                          audioUrl: '',
                          status: 'published'
                        })}
                      >
                        Clear Form
                      </button>
                    )}
                  </div>
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
                        <option value="faith">Faith</option>
                        <option value="worship">Worship</option>
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
                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="url"
                        placeholder="Image URL (optional)"
                        value={volumeForm.image}
                        onChange={(e) => setVolumeForm({...volumeForm, image: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid var(--cream)',
                          borderRadius: '5px'
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Audio File</label>
                      <input
                        type="file"
                        accept=".mp3,.wav,.m4a,.ogg"
                        onChange={handleAudioUpload}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid var(--cream)',
                          borderRadius: '5px'
                        }}
                      />
                      {volumeForm.audioUrl && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'green' }}>
                          ✓ Audio uploaded: {volumeForm.audioUrl}
                        </div>
                      )}
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <ReactQuill
                        value={volumeForm.content}
                        onChange={(content) => setVolumeForm({...volumeForm, content})}
                        placeholder="Volume content (poems, writings, etc.)"
                        style={{ height: '200px', marginBottom: '50px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button 
                        type="button" 
                        className="btn"
                        onClick={async (e) => {
                          e.preventDefault();
                          const updatedForm = {...volumeForm, status: 'published'};
                          setVolumeForm(updatedForm);
                          await handleVolumeSubmitWithStatus(updatedForm);
                        }}
                      >
                        Publish Volume
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={async (e) => {
                          e.preventDefault();
                          const updatedForm = {...volumeForm, status: 'draft'};
                          setVolumeForm(updatedForm);
                          await handleVolumeSubmitWithStatus(updatedForm);
                        }}
                      >
                        Save Draft
                      </button>
                    </div>
                  </form>
                </div>

                <div className="card">
                  <h3>Existing Volumes</h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {volumes.map(volume => (
                      <div key={volume.id} style={{ 
                        padding: '1rem', 
                        border: volume.status === 'published' ? '2px solid #28a745' : '1px solid var(--cream)', 
                        borderRadius: '5px',
                        marginBottom: '1rem',
                        backgroundColor: volume.status === 'published' ? '#f8fff8' : volume.status === 'draft' ? '#fff8e1' : 'white'
                      }}>
                        <h4>{volume.title}</h4>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontSize: '0.9rem',
                          color: 'var(--text-light)',
                          marginBottom: '0.5rem'
                        }}>
                          <span>Price: {volume.price}</span>
                          <span>Downloads: {volume.downloads}</span>
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            backgroundColor: volume.status === 'published' ? '#28a745' : volume.status === 'draft' ? '#ffc107' : '#6c757d',
                            color: 'white'
                          }}>
                            {volume.status.toUpperCase()}
                          </span>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {volume.status === 'draft' && (
                              <button 
                                className="btn" 
                                style={{ fontSize: '0.8rem', padding: '5px 10px', backgroundColor: '#28a745', borderColor: '#28a745' }}
                                onClick={() => updateVolumeStatus(volume.id, 'published')}
                              >
                                Publish
                              </button>
                            )}
                            {volume.status === 'published' && (
                              <button 
                                className="btn btn-secondary" 
                                style={{ fontSize: '0.8rem', padding: '5px 10px' }}
                                onClick={() => updateVolumeStatus(volume.id, 'draft')}
                              >
                                Unpublish
                              </button>
                            )}
                            <button 
                              className="btn" 
                              style={{ fontSize: '0.8rem', padding: '5px 10px' }}
                              onClick={() => editVolume(volume)}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn" 
                              style={{ fontSize: '0.8rem', padding: '5px 10px', backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                              onClick={() => deleteVolume(volume.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Prayer Requests */}
          {activeTab === 'prayers' && (
            <div style={{ 
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <h2 style={{ margin: '0 0 2rem 0', color: '#2c3e50', fontSize: '1.5rem', fontWeight: '600' }}>Prayer Requests</h2>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3>Recent Requests</h3>
                  <span>Total: {prayerRequests.length}</span>
                </div>
                {prayerRequests.map(request => (
                  <div key={request.id} style={{ 
                    padding: '1rem', 
                    border: request.status === 'prayed' || request.status === 'answered' ? '2px solid #28a745' : '1px solid var(--cream)', 
                    borderRadius: '5px',
                    marginBottom: '1rem',
                    backgroundColor: request.status === 'prayed' || request.status === 'answered' ? '#f8fff8' : 'white',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <span>Category: {request.category}</span>
                      <span>Date: {new Date(request.created_at).toLocaleDateString()}</span>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Name:</strong> {request.name || 'Anonymous'}
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Email:</strong> {request.email || 'Not provided'}
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Request:</strong> {request.request.substring(0, 100)}...
                    </div>
                    <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <strong>Status:</strong> 
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        backgroundColor: request.status === 'prayed' || request.status === 'answered' ? '#28a745' : 
                                       request.status === 'praying' ? '#ffc107' : '#6c757d',
                        color: 'white'
                      }}>
                        {request.status === 'prayed' ? '✓ PRAYED' : 
                         request.status === 'answered' ? '✓ ANSWERED' :
                         request.status === 'praying' ? 'PRAYING' : 'NEW'}
                      </span>
                      {(request.status === 'prayed' || request.status === 'answered') && (
                        <span style={{ 
                          position: 'absolute', 
                          top: '10px', 
                          right: '10px', 
                          fontSize: '1.5rem',
                          color: '#28a745'
                        }}>✓</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {request.status === 'new' && (
                        <button 
                          className="btn" 
                          style={{ fontSize: '0.8rem', padding: '5px 10px', backgroundColor: '#ffc107', borderColor: '#ffc107' }}
                          onClick={() => updatePrayerStatus(request.id, 'praying')}
                        >
                          Start Praying
                        </button>
                      )}
                      {(request.status === 'new' || request.status === 'praying') && (
                        <button 
                          className="btn" 
                          style={{ fontSize: '0.8rem', padding: '5px 10px', backgroundColor: '#28a745', borderColor: '#28a745' }}
                          onClick={() => updatePrayerStatus(request.id, 'prayed')}
                        >
                          Mark as Prayed
                        </button>
                      )}
                      {request.status === 'prayed' && (
                        <button 
                          className="btn" 
                          style={{ fontSize: '0.8rem', padding: '5px 10px', backgroundColor: '#17a2b8', borderColor: '#17a2b8' }}
                          onClick={() => updatePrayerStatus(request.id, 'answered')}
                        >
                          Mark as Answered
                        </button>
                      )}
                      <button 
                        className="btn btn-secondary" 
                        style={{ fontSize: '0.8rem', padding: '5px 10px' }}
                        onClick={() => viewPrayerDetails(request)}
                      >
                        View Details
                      </button>
                      <button 
                        className="btn" 
                        style={{ fontSize: '0.8rem', padding: '5px 10px', backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                        onClick={() => deletePrayerRequest(request.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}



          {/* Subscribers */}
          {activeTab === 'subscribers' && (
            <div style={{ 
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <h2 style={{ margin: '0 0 2rem 0', color: '#2c3e50', fontSize: '1.5rem', fontWeight: '600' }}>Newsletter Subscribers</h2>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3>Subscriber List</h3>
                  <span>Total: {subscribers.length}</span>
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {subscribers.map(subscriber => (
                    <div key={subscriber.id} style={{ 
                      padding: '1rem', 
                      border: '1px solid #e9ecef', 
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div>{subscriber.email}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                          Subscribed: {new Date(subscriber.created_at).toLocaleDateString()}
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

          {/* Comments */}
          {activeTab === 'comments' && (
            <div style={{ 
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <h2 style={{ margin: '0 0 2rem 0', color: '#2c3e50', fontSize: '1.5rem', fontWeight: '600' }}>All Comments</h2>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3>Recent Comments</h3>
                  <span>Total: {comments.length}</span>
                </div>
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {comments.map(comment => (
                    <div key={comment.id} style={{ 
                      padding: '1rem', 
                      border: '1px solid #e9ecef', 
                      borderRadius: '8px',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
                        Post: {comment.post_title}
                      </div>
                      <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#6c757d' }}>
                        <strong>Author:</strong> {comment.author} | <strong>Date:</strong> {new Date(comment.created_at).toLocaleDateString()}
                      </div>
                      <div style={{ 
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '5px',
                        border: '1px solid #dee2e6'
                      }}>
                        {comment.content}
                      </div>
                      <button 
                        className="btn" 
                        style={{ fontSize: '0.8rem', padding: '5px 10px', backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                        onClick={async () => {
                          if (window.confirm('Delete this comment?')) {
                            try {
                              await commentAPI.deleteComment(comment.id);
                              await loadData();
                              alert('Comment deleted successfully!');
                            } catch (error) {
                              alert('Error deleting comment');
                            }
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  {comments.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#6c757d', padding: '2rem' }}>
                      No comments yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contacts */}
          {activeTab === 'contacts' && (
            <div style={{ 
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <h2 style={{ margin: '0 0 2rem 0', color: '#2c3e50', fontSize: '1.5rem', fontWeight: '600' }}>Contact Messages</h2>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3>Recent Messages</h3>
                  <span>Total: {contacts.length}</span>
                </div>
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  {contacts.map(contact => (
                    <div key={contact.id} style={{ 
                      padding: '1rem', 
                      border: '1px solid #e9ecef', 
                      borderRadius: '8px',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
                        Subject: {contact.subject}
                      </div>
                      <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#6c757d' }}>
                        <strong>Name:</strong> {contact.name} | <strong>Email:</strong> {contact.email} | <strong>Date:</strong> {new Date(contact.created_at).toLocaleDateString()}
                      </div>
                      <div style={{ 
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '5px',
                        border: '1px solid #dee2e6'
                      }}>
                        {contact.message}
                      </div>
                      <button 
                        className="btn" 
                        style={{ fontSize: '0.8rem', padding: '5px 10px', backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                        onClick={async () => {
                          if (window.confirm('Delete this contact message?')) {
                            try {
                              await contactAPI.deleteContact(contact.id);
                              await loadData();
                              alert('Contact message deleted successfully!');
                            } catch (error) {
                              alert('Error deleting contact message');
                            }
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#6c757d', padding: '2rem' }}>
                      No contact messages yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Prayer Details Modal */}
          {showPrayerModal && selectedPrayer && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '10px',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3>Prayer Request Details</h3>
                  <button 
                    onClick={() => setShowPrayerModal(false)}
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
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>ID:</strong> {selectedPrayer.id}
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Name:</strong> {selectedPrayer.name || 'Anonymous'}
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Email:</strong> {selectedPrayer.email || 'Not provided'}
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Category:</strong> {selectedPrayer.category}
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Status:</strong> 
                  <span style={{
                    marginLeft: '0.5rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    backgroundColor: selectedPrayer.status === 'prayed' || selectedPrayer.status === 'answered' ? '#28a745' : 
                                   selectedPrayer.status === 'praying' ? '#ffc107' : '#6c757d',
                    color: 'white'
                  }}>
                    {selectedPrayer.status.toUpperCase()}
                  </span>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Anonymous:</strong> {selectedPrayer.is_anonymous ? 'Yes' : 'No'}
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Allow Sharing:</strong> {selectedPrayer.allow_sharing ? 'Yes' : 'No'}
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Submitted:</strong> {new Date(selectedPrayer.created_at).toLocaleString()}
                </div>
                
                {selectedPrayer.updated_at && (
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Last Updated:</strong> {new Date(selectedPrayer.updated_at).toLocaleString()}
                  </div>
                )}
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Prayer Request:</strong>
                  <div style={{
                    marginTop: '0.5rem',
                    padding: '1rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '5px',
                    border: '1px solid #dee2e6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {selectedPrayer.request}
                  </div>
                </div>
                
                {selectedPrayer.notes && (
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Notes:</strong>
                    <div style={{
                      marginTop: '0.5rem',
                      padding: '1rem',
                      backgroundColor: '#fff3cd',
                      borderRadius: '5px',
                      border: '1px solid #ffeaa7'
                    }}>
                      {selectedPrayer.notes}
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setShowPrayerModal(false)}
                  >
                    Close
                  </button>
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