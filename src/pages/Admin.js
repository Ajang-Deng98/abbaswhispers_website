import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { blogAPI, volumeAPI, prayerAPI } from '../utils/api';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [stats, setStats] = useState({ blogs: 0, volumes: 0, prayers: 0 });
  const [blogs, setBlogs] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [prayers, setPrayers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      loadDashboardData();
    }
  }, []);

  const loadDashboardData = async () => {
    try {
      const [blogsRes, volumesRes, prayersRes] = await Promise.all([
        blogAPI.getAllPosts(),
        volumeAPI.getAllVolumes(),
        prayerAPI.getAllRequests()
      ]);
      
      setBlogs(blogsRes.data?.posts || blogsRes.data || []);
      setVolumes(volumesRes.data || []);
      setPrayers(prayersRes.data || []);
      
      setStats({
        blogs: (blogsRes.data?.posts || blogsRes.data || []).length,
        volumes: (volumesRes.data || []).length,
        prayers: (prayersRes.data || []).length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'password123') {
      localStorage.setItem('adminToken', 'admin-token');
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

  if (!isAuthenticated) {
    return (
      <div className="admin-app">
        <Helmet>
          <title>Admin Login - Abbaswhispers</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="admin-login">
          <div className="login-container">
            <div className="login-header">
              <h1>Admin Panel</h1>
              <p>Abbaswhispers Content Management</p>
            </div>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="login-btn">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-app">
      <Helmet>
        <title>Admin Dashboard - Abbaswhispers</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="admin-panel">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
            <p>Abbaswhispers CMS</p>
          </div>
          <nav className="sidebar-nav">
            <button 
              className={activeTab === 'dashboard' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={activeTab === 'blogs' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('blogs')}
            >
              📝 Blog Posts
            </button>
            <button 
              className={activeTab === 'volumes' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('volumes')}
            >
              📚 Volumes
            </button>
            <button 
              className={activeTab === 'prayers' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('prayers')}
            >
              🙏 Prayer Requests
            </button>
          </nav>
          <div className="sidebar-footer">
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-main">
          <div className="admin-header">
            <h1>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'blogs' && 'Blog Posts'}
              {activeTab === 'volumes' && 'Volumes'}
              {activeTab === 'prayers' && 'Prayer Requests'}
            </h1>
            <div className="header-actions">
              <span className="welcome">Welcome, Admin</span>
            </div>
          </div>

          <div className="admin-content">
            {activeTab === 'dashboard' && (
              <div className="dashboard">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">📝</div>
                    <div className="stat-info">
                      <h3>{stats.blogs}</h3>
                      <p>Blog Posts</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-info">
                      <h3>{stats.volumes}</h3>
                      <p>Volumes</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🙏</div>
                    <div className="stat-info">
                      <h3>{stats.prayers}</h3>
                      <p>Prayer Requests</p>
                    </div>
                  </div>
                </div>

                <div className="recent-activity">
                  <h2>Recent Activity</h2>
                  <div className="activity-list">
                    <div className="activity-item">
                      <span className="activity-icon">📝</span>
                      <span>Latest blog posts and content updates</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">🙏</span>
                      <span>New prayer requests received</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">📚</span>
                      <span>Volume collections managed</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'blogs' && (
              <div className="content-section">
                <div className="section-header">
                  <h2>Blog Posts Management</h2>
                  <button className="add-btn">+ Add New Post</button>
                </div>
                <div className="content-table">
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
                      {blogs.slice(0, 10).map(blog => (
                        <tr key={blog.id}>
                          <td>{blog.title}</td>
                          <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                          <td><span className="status published">Published</span></td>
                          <td>
                            <button className="action-btn edit">Edit</button>
                            <button className="action-btn delete">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'volumes' && (
              <div className="content-section">
                <div className="section-header">
                  <h2>Volumes Management</h2>
                  <button className="add-btn">+ Add New Volume</button>
                </div>
                <div className="content-table">
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
                      {volumes.slice(0, 10).map(volume => (
                        <tr key={volume.id}>
                          <td>{volume.title}</td>
                          <td>{volume.category || 'General'}</td>
                          <td>{new Date(volume.created_at || Date.now()).toLocaleDateString()}</td>
                          <td>
                            <button className="action-btn edit">Edit</button>
                            <button className="action-btn delete">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'prayers' && (
              <div className="content-section">
                <div className="section-header">
                  <h2>Prayer Requests</h2>
                </div>
                <div className="content-table">
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
                      {prayers.slice(0, 10).map(prayer => (
                        <tr key={prayer.id}>
                          <td>{prayer.name || 'Anonymous'}</td>
                          <td>{prayer.category}</td>
                          <td>{new Date(prayer.created_at).toLocaleDateString()}</td>
                          <td><span className="status pending">Pending</span></td>
                          <td>
                            <button className="action-btn view">View</button>
                            <button className="action-btn edit">Update</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;