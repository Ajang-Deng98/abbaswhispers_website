import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnnouncementBanner from './components/AnnouncementBanner';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import PrayerRequest from './pages/PrayerRequest';
import Volumes from './pages/Volumes';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <AnnouncementBanner />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/prayer-request" element={<PrayerRequest />} />
              <Route path="/volumes" element={<Volumes />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;