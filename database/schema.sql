-- Abba Whispers Database Schema
-- MySQL Database

CREATE DATABASE IF NOT EXISTS abba_whispers;
USE abba_whispers;

-- Users table (for admin authentication)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(50) NOT NULL,
    tags TEXT,
    image VARCHAR(255),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    author_id INT,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at)
);

-- Volumes table
CREATE TABLE volumes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(50) NOT NULL,
    price VARCHAR(20) NOT NULL,
    image VARCHAR(255),
    download_link VARCHAR(255),
    content LONGTEXT,
    audio_url VARCHAR(255),
    downloads INT DEFAULT 0,
    status ENUM('draft', 'published', 'archived') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_status (status)
);

-- Prayer requests table
CREATE TABLE prayer_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    category ENUM('healing', 'family', 'financial', 'guidance', 'salvation', 'grief', 'thanksgiving', 'other') NOT NULL,
    request TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    allow_sharing BOOLEAN DEFAULT FALSE,
    status ENUM('new', 'praying', 'prayed', 'answered') DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at)
);

-- Contact messages table
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Newsletter subscribers table
CREATE TABLE subscribers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100),
    status ENUM('active', 'unsubscribed', 'bounced') DEFAULT 'active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status)
);

-- Comments table (for blog posts)
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(100),
    content TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    INDEX idx_post_id (post_id),
    INDEX idx_status (status)
);

-- Site settings table
CREATE TABLE site_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: password123)
INSERT INTO users (username, email, password, role) VALUES 
('admin', 'admin@abbawhispers.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample blog posts
INSERT INTO blog_posts (title, content, excerpt, category, tags, status, author_id) VALUES 
(
    'Finding Peace in Psalm 23',
    '<p>The Twenty-third Psalm stands as one of the most beloved and comforting passages in all of Scripture...</p>',
    'Discover the profound comfort and guidance found in the shepherd\'s psalm.',
    'peace',
    'psalm-23,peace,comfort,shepherd',
    'published',
    1
),
(
    'The Power of Gratitude in Psalm 100',
    '<p>Learn how thanksgiving transforms our hearts and minds, drawing us closer to God\'s presence...</p>',
    'Learn how thanksgiving transforms our hearts and minds.',
    'gratitude',
    'psalm-100,gratitude,thanksgiving',
    'published',
    1
);

-- Insert sample volumes
INSERT INTO volumes (title, description, excerpt, category, price) VALUES 
(
    'Whispers of Hope',
    'A collection of healing meditations inspired by Psalms of comfort and restoration.',
    'In times of darkness, God\'s whispers of hope shine brightest...',
    'healing',
    'Free'
),
(
    'Songs of Strength',
    'Empowering writings drawn from Psalms of courage and divine strength.',
    'Discover the unshakeable strength that comes from trusting in the Lord...',
    'empowerment',
    '$9.99'
);

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value) VALUES 
('site_title', 'Abba Whispers'),
('site_description', 'Healing and empowerment through writings inspired by the Book of Psalms'),
('contact_email', 'info@abbawhispers.com'),
('prayer_email', 'prayer@abbawhispers.com');