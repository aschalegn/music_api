/* Replace with your SQL commands */
-- users, songs, album, artist, subscription, logs
-- Table for users
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role ENUM('regular', 'premium', 'admin', 'artist') NOT NULL DEFAULT 'regular'
);
-- Table for playlists
CREATE TABLE IF NOT EXISTS playlists (
    playlist_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    playlist_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE IF NOT EXISTS artists (
    artist_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    user_id INT,
    status ENUM('big', 'very big', 'local bar') NOT NULL DEFAULT 'local bar',
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Table for songs
CREATE TABLE IF NOT EXISTS songs (
    song_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    album VARCHAR(100),
    releaseyear INT,
    src VARCHAR(255) NOT NULL,
    duration INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    artist_id INT,
    playlist_id INT,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(playlist_id)
);
-- Table for subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type ENUM('monthly', 'yearly') NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    start_date DATE NOT NULL,
    end_date DATE,
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Table for the l
CREATE TABLE IF NOT EXISTS logging (
    id INT PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(100),
    domain VARCHAR(50),
    type ENUM('info', 'error', 'warning') NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);