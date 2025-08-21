import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { blogAPI, volumeAPI, prayerAPI, contactAPI, subscriberAPI } from '../utils/api';
import '../styles/Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [stats, setStats] = useState({ blogs: 0, volumes: 0, prayers: 0 });
  const [blogs, setBlogs] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [prayers, setPrayers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploadingFiles, setUploadingFiles] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      loadDashboardData();
      const interval = setInterval(loadDashboardData, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [blogsRes, volumesRes, prayersRes, contactsRes, subscribersRes] = await Promise.all([
        blogAPI.getAllPosts().catch(() => ({ data: [] })),
        volumeAPI.getAdminVolumes().catch(() => ({ data: [] })),
        prayerAPI.getAllRequests().catch(() => ({ data: [] })),
        contactAPI.getAllContacts().catch(() => ({ data: [] })),
        subscriberAPI.getAll().catch(() => ({ data: [] }))
      ]);
      
      const blogsData = Array.isArray(blogsRes.data) ? blogsRes.data : [];
      const volumesData = Array.isArray(volumesRes.data) ? volumesRes.data : [];
      const prayersData = Array.isArray(prayersRes.data?.requests) ? prayersRes.data.requests : 
                         Array.isArray(prayersRes.data) ? prayersRes.data : [];
      const contactsData = Array.isArray(contactsRes.data) ? contactsRes.data : [];
      const subscribersData = Array.isArray(subscribersRes.data) ? subscribersRes.data : [];
      
      setBlogs(blogsData);
      setVolumes(volumesData);
      setPrayers(prayersData);
      setContacts(contactsData);
      setSubscribers(subscribersData);
      
      setStats({
        blogs: blogsData.length,
        volumes: volumesData.length,
        prayers: prayersData.length,
        contacts: contactsData.length,
        subscribers: subscribersData.length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setBlogs([]);
      setVolumes([]);
      setPrayers([]);
      setContacts([]);
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'password123') {
      // Generate a proper JWT-like token for testing
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MzQ1NjcwMDB9.test';
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
      loadDashboardData();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  const openAddModal = (type) => {
    setModalType(type);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setSelectedItem(null);
    setModalType('');
    setFormData({});
    setUploadingFiles({});
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (file, fieldName) => {
    setUploadingFiles(prev => ({ ...prev, [fieldName]: true }));
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5003'}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const result = await response.json();
      handleFormChange(fieldName, result.url);
    } catch (error) {
      console.error('File upload error:', error);
      alert('File upload failed. Please try again.');
    } finally {
      setUploadingFiles(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalType === 'blog') {
        if (selectedItem) {
          await blogAPI.updatePost(selectedItem.id, formData);
        } else {
          await blogAPI.createPost(formData);
        }
      } else if (modalType === 'volume') {
        const volumeData = {
          title: formData.title,
          description: formData.description,
          excerpt: formData.excerpt || '',
          category: formData.category,
          price: formData.price,
          content: formData.content || '',
          image: formData.image || '',
          downloadLink: formData.download_link || '',
          audioUrl: formData.audio_url || '',
          status: formData.status || 'published'
        };
        if (selectedItem) {
          await volumeAPI.updateVolume(selectedItem.id, volumeData);
        } else {
          await volumeAPI.createVolume(volumeData);
        }
      }
      closeModal();
      loadDashboardData();
      alert(`${modalType === 'blog' ? 'Blog post' : 'Volume'} ${selectedItem ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.error('Form submission error:', error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const editBlog = (blog) => {
    setSelectedItem(blog);
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      category: blog.category || '',
      tags: blog.tags || '',
      image: blog.image || '',
      status: blog.status || 'draft'
    });
    setModalType('blog');
    setShowAddModal(true);
  };

  const deleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogAPI.deletePost(blogId);
        loadDashboardData();
        alert('Blog post deleted successfully!');
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting blog post. Please try again.');
      }
    }
  };

  const editVolume = (volume) => {
    setSelectedItem(volume);
    setFormData({
      title: volume.title || '',
      description: volume.description || '',
      excerpt: volume.excerpt || '',
      category: volume.category || '',
      price: volume.price || '',
      content: volume.content || '',
      image: volume.image || '',
      download_link: volume.download_link || '',
      audio_url: volume.audio_url || '',
      status: volume.status || 'published'
    });
    setModalType('volume');
    setShowAddModal(true);
  };

  const deleteVolume = async (volumeId) => {
    if (window.confirm('Are you sure you want to delete this volume?')) {
      try {
        console.log('Deleting volume with ID:', volumeId);
        const response = await volumeAPI.deleteVolume(volumeId);
        console.log('Delete response:', response);
        loadDashboardData();
        alert('Volume deleted successfully!');
      } catch (error) {
        console.error('Delete error:', error);
        console.error('Error response:', error.response?.data);
        alert(`Error deleting volume: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const deleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        await contactAPI.deleteContact(contactId);
        loadDashboardData();
        alert('Contact message deleted successfully!');
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting contact message. Please try again.');
      }
    }
  };

  const deletePrayer = async (prayerId) => {
    if (window.confirm('Are you sure you want to delete this prayer request?')) {
      try {
        await prayerAPI.deleteRequest(prayerId);
        loadDashboardData();
        alert('Prayer request deleted successfully!');
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting prayer request. Please try again.');
      }
    }
  };

  const viewItem = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
    setShowAddModal(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <Helmet>
          <title>Admin Login - Abbaswhispers</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <div className="login-brand">
                <div className="login-logo">
                  <div className="logo-circle">
                    <span className="logo-text">AW</span>
                  </div>
                </div>
                <h1>Abbaswhispers</h1>
                <p>Admin Dashboard</p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="login-btn">
                <span>Sign In</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <Helmet>
        <title>Admin Dashboard - Abbaswhispers</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {/* Top Bar */}
      <div className="admin-topbar">
        <div className="topbar-left">
          <div className="brand">
            <div className="brand-logo">
              <div className="brand-logo-circle">
                <span className="brand-logo-text">AW</span>
              </div>
            </div>
            <div className="brand-info">
              <span className="brand-name">Abbaswhispers</span>
              <span className="brand-subtitle">Admin Panel</span>
            </div>
          </div>
        </div>
        <div className="topbar-right">
          <div className="admin-profile">
            <div className="profile-avatar">A</div>
            <span className="profile-name">Admin</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="admin-layout">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="12" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="16" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Dashboard</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Blog Posts</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'volumes' ? 'active' : ''}`}
              onClick={() => setActiveTab('volumes')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Volumes</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'prayers' ? 'active' : ''}`}
              onClick={() => setActiveTab('prayers')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Prayer Requests</span>
            </button>
            <button 
              className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Contacts</span>
            </button>

          </nav>
        </div>

        {/* Main Content */}
        <div className="admin-content">

          <div className="content-area">
            {activeTab === 'dashboard' && (
              <div className="dashboard-view">
                <div className="welcome-header">
                  <h1>Welcome to Abba Whispers Admin</h1>
                  <p>Manage your spiritual content and connect with your community</p>
                </div>

                <div className="stats-overview">
                  <div className="stats-grid">
                    <div className="stat-card blog-card">
                      <div className="stat-header">
                        <div className="stat-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <span className="stat-label">Blog Posts</span>
                      </div>
                      <div className="stat-number">{stats.blogs}</div>
                      <div className="stat-action">
                        <button onClick={() => openAddModal('blog')} className="stat-btn">
                          Create New Post
                        </button>
                      </div>
                    </div>

                    <div className="stat-card volume-card">
                      <div className="stat-header">
                        <div className="stat-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2"/>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <span className="stat-label">Volumes</span>
                      </div>
                      <div className="stat-number">{stats.volumes}</div>
                      <div className="stat-action">
                        <button onClick={() => openAddModal('volume')} className="stat-btn">
                          Add New Volume
                        </button>
                      </div>
                    </div>

                    <div className="stat-card prayer-card">
                      <div className="stat-header">
                        <div className="stat-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="stat-label">Prayer Requests</span>
                      </div>
                      <div className="stat-number">{stats.prayers}</div>
                      <div className="stat-action">
                        <button onClick={() => setActiveTab('prayers')} className="stat-btn">
                          View Requests
                        </button>
                      </div>
                    </div>

                    <div className="stat-card contact-card">
                      <div className="stat-header">
                        <div className="stat-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <span className="stat-label">Messages</span>
                      </div>
                      <div className="stat-number">{stats.contacts}</div>
                      <div className="stat-action">
                        <button onClick={() => setActiveTab('contacts')} className="stat-btn">
                          View Messages
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                


                <div className="quick-actions-section">
                  <h2>Quick Actions</h2>
                  <div className="quick-actions">
                    <button className="action-card" onClick={() => openAddModal('blog')}>
                      <div className="action-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span>New Blog Post</span>
                    </button>
                    <button className="action-card" onClick={() => openAddModal('volume')}>
                      <div className="action-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span>Add Volume</span>
                    </button>
                    <button className="action-card" onClick={() => setActiveTab('prayers')}>
                      <div className="action-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <span>View Prayers</span>
                    </button>
                    <button className="action-card" onClick={() => setActiveTab('contacts')}>
                      <div className="action-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <span>View Contacts</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blogs' && (
              <div className="content-view">
                <div className="page-header">
                  <div>
                    <h1>Blog Posts</h1>
                    <p>Manage your blog content and articles</p>
                  </div>
                  <button className="primary-btn" onClick={() => openAddModal('blog')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    New Post
                  </button>
                </div>
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(blogs) && blogs.length > 0 ? blogs.slice(0, 10).map(blog => (
                        <tr key={blog.id}>
                          <td className="title-cell">{blog.title}</td>
                          <td className="date-cell">{new Date(blog.created_at).toLocaleDateString()}</td>
                          <td><span className={`status-badge ${blog.status || 'published'}`}>{(blog.status || 'published').charAt(0).toUpperCase() + (blog.status || 'published').slice(1)}</span></td>
                          <td className="actions-cell">
                            <button className="icon-btn view" onClick={() => viewItem(blog, 'blog')}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                            <button className="icon-btn edit" onClick={() => editBlog(blog)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                            <button className="icon-btn delete" onClick={() => deleteBlog(blog.id)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2"/>
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="no-data">No blog posts found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'volumes' && (
              <div className="content-view">
                <div className="page-header">
                  <div>
                    <h1>Volumes</h1>
                    <p>Manage your inspirational volume collections</p>
                  </div>
                  <button className="primary-btn" onClick={() => openAddModal('volume')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    New Volume
                  </button>
                </div>
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(volumes) && volumes.length > 0 ? volumes.slice(0, 10).map(volume => (
                        <tr key={volume.id}>
                          <td className="title-cell">{volume.title}</td>
                          <td className="category-cell">{volume.category || 'General'}</td>
                          <td className="date-cell">{new Date(volume.created_at || Date.now()).toLocaleDateString()}</td>
                          <td className="actions-cell">
                            <button className="icon-btn view" onClick={() => viewItem(volume, 'volume')}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                            <button className="icon-btn edit" onClick={() => editVolume(volume)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                            <button className="icon-btn delete" onClick={() => deleteVolume(volume.id)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2"/>
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="no-data">No volumes found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'prayers' && (
              <div className="content-view">
                <div className="page-header">
                  <div>
                    <h1>Prayer Requests</h1>
                    <p>Review and manage prayer submissions</p>
                  </div>
                </div>
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(prayers) && prayers.length > 0 ? prayers.slice(0, 10).map(prayer => (
                        <tr key={prayer.id}>
                          <td className="name-cell">{prayer.name || 'Anonymous'}</td>
                          <td className="category-cell">{prayer.category}</td>
                          <td className="date-cell">{new Date(prayer.created_at).toLocaleDateString()}</td>
                          <td><span className={`status-badge ${prayer.status || 'new'}`}>{(prayer.status || 'new').charAt(0).toUpperCase() + (prayer.status || 'new').slice(1)}</span></td>
                          <td className="actions-cell">
                            <button className="icon-btn view" onClick={() => viewItem(prayer, 'prayer')}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                            <button className="icon-btn edit" onClick={() => alert('Prayer status update coming soon')}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2"/>
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className="no-data">No prayer requests found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="content-view">
                <div className="page-header">
                  <div>
                    <h1>Contact Messages</h1>
                    <p>Review and manage contact form submissions</p>
                  </div>
                </div>
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(contacts) && contacts.length > 0 ? contacts.slice(0, 10).map(contact => (
                        <tr key={contact.id}>
                          <td className="name-cell">{contact.name}</td>
                          <td className="email-cell">{contact.email}</td>
                          <td className="subject-cell">{contact.subject}</td>
                          <td className="date-cell">{new Date(contact.created_at).toLocaleDateString()}</td>
                          <td className="actions-cell">
                            <button className="icon-btn view" onClick={() => viewItem(contact, 'contact')}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                            <button className="icon-btn delete" onClick={() => deleteContact(contact.id)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2"/>
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className="no-data">No contact messages found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
      
      {/* Modal Component */}
      {showAddModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modalType === 'blog' && selectedItem && !formData.title ? 'View Blog Post' : ''}
                {modalType === 'blog' && (selectedItem && formData.title ? 'Edit Blog Post' : (!selectedItem ? 'Add New Blog Post' : ''))}
                {modalType === 'volume' && (selectedItem && formData.title ? 'Edit Volume' : 'Add New Volume')}
                {modalType === 'prayer' && 'Prayer Request Details'}
                {modalType === 'contact' && 'Contact Message Details'}
              </h2>
              <button className="modal-close" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {modalType === 'blog' && (
                <form className="add-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Title *</label>
                    <input 
                      type="text" 
                      placeholder="Enter blog post title" 
                      value={formData.title || ''}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Content *</label>
                    <textarea 
                      rows="8" 
                      placeholder="Enter blog post content" 
                      value={formData.content || ''}
                      onChange={(e) => handleFormChange('content', e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Excerpt</label>
                    <textarea 
                      rows="3" 
                      placeholder="Brief description of the post"
                      value={formData.excerpt || ''}
                      onChange={(e) => handleFormChange('excerpt', e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select 
                      value={formData.category || ''}
                      onChange={(e) => handleFormChange('category', e.target.value)}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="peace">Peace</option>
                      <option value="gratitude">Gratitude</option>
                      <option value="healing">Healing</option>
                      <option value="faith">Faith</option>
                      <option value="prayer">Prayer</option>
                      <option value="inspiration">Inspiration</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tags</label>
                    <input 
                      type="text" 
                      placeholder="Enter tags separated by commas"
                      value={formData.tags || ''}
                      onChange={(e) => handleFormChange('tags', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image</label>
                    <div className="file-upload-group">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'image')}
                        disabled={uploadingFiles.image}
                      />
                      {uploadingFiles.image && <span className="upload-status">Uploading...</span>}
                      {formData.image && (
                        <div className="file-preview">
                          <img src={formData.image} alt="Preview" className="image-preview" />
                          <button type="button" onClick={() => handleFormChange('image', '')} className="remove-file">×</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      value={formData.status || 'draft'}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                      {loading ? (selectedItem ? 'Updating...' : 'Creating...') : (selectedItem ? 'Update Post' : 'Create Post')}
                    </button>
                  </div>
                </form>
              )}
              
              {modalType === 'volume' && (formData.title || !selectedItem) && (
                <form className="add-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Title *</label>
                    <input 
                      type="text" 
                      placeholder="Enter volume title" 
                      value={formData.title || ''}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Description *</label>
                    <textarea 
                      rows="4" 
                      placeholder="Enter volume description" 
                      value={formData.description || ''}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Excerpt</label>
                    <textarea 
                      rows="2" 
                      placeholder="Brief excerpt for preview"
                      value={formData.excerpt || ''}
                      onChange={(e) => handleFormChange('excerpt', e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select 
                      value={formData.category || ''}
                      onChange={(e) => handleFormChange('category', e.target.value)}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="healing">Healing</option>
                      <option value="empowerment">Empowerment</option>
                      <option value="peace">Peace</option>
                      <option value="gratitude">Gratitude</option>
                      <option value="faith">Faith</option>
                      <option value="devotions">Devotions</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Free, $9.99, $19.99" 
                      value={formData.price || ''}
                      onChange={(e) => handleFormChange('price', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Content</label>
                    <textarea 
                      rows="8" 
                      placeholder="Enter volume content (optional)"
                      value={formData.content || ''}
                      onChange={(e) => handleFormChange('content', e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Cover Image</label>
                    <div className="file-upload-group">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'image')}
                        disabled={uploadingFiles.image}
                      />
                      {uploadingFiles.image && <span className="upload-status">Uploading...</span>}
                      {formData.image && (
                        <div className="file-preview">
                          <img src={formData.image} alt="Preview" className="image-preview" />
                          <button type="button" onClick={() => handleFormChange('image', '')} className="remove-file">×</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Download Link</label>
                    <input 
                      type="url" 
                      placeholder="Enter download link (optional)"
                      value={formData.download_link || ''}
                      onChange={(e) => handleFormChange('download_link', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Audio File</label>
                    <div className="file-upload-group">
                      <input 
                        type="file" 
                        accept="audio/*"
                        onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], 'audio_url')}
                        disabled={uploadingFiles.audio_url}
                      />
                      {uploadingFiles.audio_url && <span className="upload-status">Uploading...</span>}
                      {formData.audio_url && (
                        <div className="file-preview">
                          <audio controls className="audio-preview">
                            <source src={formData.audio_url} />
                          </audio>
                          <button type="button" onClick={() => handleFormChange('audio_url', '')} className="remove-file">×</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      value={formData.status || 'published'}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                      {loading ? (selectedItem ? 'Updating...' : 'Creating...') : (selectedItem ? 'Update Volume' : 'Create Volume')}
                    </button>
                  </div>
                </form>
              )}
              
              {modalType === 'volume' && selectedItem && !formData.title && (
                <div className="view-details">
                  <div className="detail-group">
                    <label>Title:</label>
                    <p>{selectedItem.title}</p>
                  </div>
                  <div className="detail-group">
                    <label>Category:</label>
                    <p>{selectedItem.category}</p>
                  </div>
                  <div className="detail-group">
                    <label>Price:</label>
                    <p>{selectedItem.price}</p>
                  </div>
                  {selectedItem.description && (
                    <div className="detail-group">
                      <label>Description:</label>
                      <p>{selectedItem.description}</p>
                    </div>
                  )}
                  {selectedItem.excerpt && (
                    <div className="detail-group">
                      <label>Excerpt:</label>
                      <p>{selectedItem.excerpt}</p>
                    </div>
                  )}
                  {selectedItem.content && (
                    <div className="detail-group">
                      <label>Content:</label>
                      <div className="content-preview">
                        {selectedItem.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()}
                      </div>
                    </div>
                  )}
                  {selectedItem.image && (
                    <div className="detail-group">
                      <label>Cover Image:</label>
                      <img src={selectedItem.image} alt="Volume" className="blog-image-preview" />
                    </div>
                  )}
                  {selectedItem.audio_url && (
                    <div className="detail-group">
                      <label>Audio:</label>
                      <audio controls className="volume-audio-player" preload="metadata" controlsList="nodownload">
                        <source src={selectedItem.audio_url.startsWith('http') ? selectedItem.audio_url : `${process.env.REACT_APP_API_URL || 'http://localhost:5003'}${selectedItem.audio_url}`} type="audio/mpeg" />
                        <source src={selectedItem.audio_url.startsWith('http') ? selectedItem.audio_url : `${process.env.REACT_APP_API_URL || 'http://localhost:5003'}${selectedItem.audio_url}`} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                  {selectedItem.download_link && (
                    <div className="detail-group">
                      <label>Download Link:</label>
                      <p><a href={selectedItem.download_link} target="_blank" rel="noopener noreferrer">{selectedItem.download_link}</a></p>
                    </div>
                  )}
                  <div className="detail-group">
                    <label>Created:</label>
                    <p>{new Date(selectedItem.created_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
              
              {modalType === 'prayer' && selectedItem && (
                <div className="view-details">
                  <div className="detail-group">
                    <label>Name:</label>
                    <p>{selectedItem.name || 'Anonymous'}</p>
                  </div>
                  <div className="detail-group">
                    <label>Email:</label>
                    <p>{selectedItem.email || 'Not provided'}</p>
                  </div>
                  <div className="detail-group">
                    <label>Category:</label>
                    <p>{selectedItem.category}</p>
                  </div>
                  <div className="detail-group">
                    <label>Status:</label>
                    <p><span className={`status-badge ${selectedItem.status || 'new'}`}>{(selectedItem.status || 'new').charAt(0).toUpperCase() + (selectedItem.status || 'new').slice(1)}</span></p>
                  </div>
                  <div className="detail-group">
                    <label>Prayer Request:</label>
                    <div className="content-preview">
                      {(selectedItem.request || selectedItem.message || selectedItem.prayer_text || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()}
                    </div>
                  </div>
                  {selectedItem.is_anonymous && (
                    <div className="detail-group">
                      <label>Anonymous Request:</label>
                      <p>Yes</p>
                    </div>
                  )}
                  {selectedItem.allow_sharing && (
                    <div className="detail-group">
                      <label>Allow Sharing:</label>
                      <p>Yes</p>
                    </div>
                  )}
                  {selectedItem.notes && (
                    <div className="detail-group">
                      <label>Admin Notes:</label>
                      <p>{selectedItem.notes}</p>
                    </div>
                  )}
                  <div className="detail-group">
                    <label>Submitted:</label>
                    <p>{new Date(selectedItem.created_at).toLocaleString()}</p>
                  </div>
                  {selectedItem.updated_at && selectedItem.updated_at !== selectedItem.created_at && (
                    <div className="detail-group">
                      <label>Last Updated:</label>
                      <p>{new Date(selectedItem.updated_at).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              )}
              
              {modalType === 'blog' && selectedItem && !formData.title && (
                <div className="view-details">
                  <div className="detail-group">
                    <label>Title:</label>
                    <p>{selectedItem.title}</p>
                  </div>
                  <div className="detail-group">
                    <label>Category:</label>
                    <p>{selectedItem.category}</p>
                  </div>
                  <div className="detail-group">
                    <label>Status:</label>
                    <p><span className={`status-badge ${selectedItem.status || 'published'}`}>{(selectedItem.status || 'published').charAt(0).toUpperCase() + (selectedItem.status || 'published').slice(1)}</span></p>
                  </div>
                  {selectedItem.excerpt && (
                    <div className="detail-group">
                      <label>Excerpt:</label>
                      <p>{selectedItem.excerpt}</p>
                    </div>
                  )}
                  <div className="detail-group">
                    <label>Content:</label>
                    <div className="content-preview">
                      {selectedItem.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()}
                    </div>
                  </div>
                  {selectedItem.image && (
                    <div className="detail-group">
                      <label>Image:</label>
                      <img src={selectedItem.image} alt="Blog" className="blog-image-preview" />
                    </div>
                  )}
                  {selectedItem.tags && (
                    <div className="detail-group">
                      <label>Tags:</label>
                      <p>{selectedItem.tags}</p>
                    </div>
                  )}
                  <div className="detail-group">
                    <label>Created:</label>
                    <p>{new Date(selectedItem.created_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
              
              {modalType === 'contact' && selectedItem && (
                <div className="view-details">
                  <div className="detail-group">
                    <label>Name:</label>
                    <p>{selectedItem.name}</p>
                  </div>
                  <div className="detail-group">
                    <label>Email:</label>
                    <p>{selectedItem.email}</p>
                  </div>
                  <div className="detail-group">
                    <label>Subject:</label>
                    <p>{selectedItem.subject}</p>
                  </div>
                  <div className="detail-group">
                    <label>Message:</label>
                    <p>{selectedItem.message}</p>
                  </div>
                  <div className="detail-group">
                    <label>Date:</label>
                    <p>{new Date(selectedItem.created_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;