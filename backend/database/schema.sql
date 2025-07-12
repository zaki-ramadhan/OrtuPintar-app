-- ============================
-- OrtuPintar Database Schema
-- ============================

-- 1. Tabel activities (sudah ada)
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category ENUM('cognitive', 'motor skills', 'language', 'social') NOT NULL,
  difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
  duration INT NOT NULL, -- dalam menit
  age_group VARCHAR(50), -- contoh: "2-3 years"
  age_group_min INT NOT NULL, -- usia minimum dalam tahun
  age_group_max INT NOT NULL, -- usia maksimum dalam tahun
  icon VARCHAR(10) DEFAULT '🎯',
  isMilestone BOOLEAN DEFAULT FALSE, -- apakah ini milestone
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Tabel child_activities untuk tracking progress
CREATE TABLE IF NOT EXISTS child_activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  child_id INT NOT NULL,
  activity_id INT NOT NULL,
  status ENUM('pending', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
  started_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  cancelled_at TIMESTAMP NULL,
  progress_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
  INDEX idx_child_status (child_id, status),
  INDEX idx_child_date (child_id, created_at)
);

-- 3. Tabel notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  child_id INT NULL, -- bisa null untuk notifikasi umum
  type ENUM('milestone', 'reminder', 'achievement', 'alert', 'info', 'activity_done') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  action_url VARCHAR(500) NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
  INDEX idx_user_unread (user_id, is_read),
  INDEX idx_created_at (created_at)
);

-- 4. Tabel child_milestones untuk tracking milestone
CREATE TABLE IF NOT EXISTS child_milestones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  child_id INT NOT NULL,
  activity_id INT NOT NULL, -- milestone activity
  achieved_at TIMESTAMP NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
  UNIQUE KEY unique_child_milestone (child_id, activity_id)
);

-- 5. Insert sample activities dengan milestone
INSERT INTO activities (title, description, category, difficulty, duration, age_group, age_group_min, age_group_max, icon, isMilestone) VALUES
-- Cognitive Activities
('Shape Sorting', 'Learn to identify and sort different shapes', 'cognitive', 'easy', 15, '2-3 years', 2, 3, '🔵', true),
('Color Recognition', 'Identify and name primary colors', 'cognitive', 'easy', 10, '2-4 years', 2, 4, '🌈', false),
('Counting 1-10', 'Learn to count from 1 to 10', 'cognitive', 'medium', 20, '3-5 years', 3, 5, '🔢', true),
('Simple Puzzles', 'Complete 4-6 piece puzzles', 'cognitive', 'medium', 25, '3-4 years', 3, 4, '🧩', false),
('Memory Game', 'Match pairs of cards', 'cognitive', 'medium', 15, '4-6 years', 4, 6, '🧠', false),

-- Motor Skills Activities
('Ball Throwing', 'Practice throwing and catching a ball', 'motor skills', 'easy', 20, '2-4 years', 2, 4, '⚽', false),
('Walking Balance', 'Walk on a straight line', 'motor skills', 'easy', 10, '2-3 years', 2, 3, '👣', true),
('Jumping Practice', 'Learn to jump with both feet', 'motor skills', 'medium', 15, '3-5 years', 3, 5, '🦘', true),
('Drawing Circles', 'Practice drawing basic shapes', 'motor skills', 'medium', 20, '3-4 years', 3, 4, '✏️', false),
('Building Blocks', 'Stack 5-10 blocks', 'motor skills', 'easy', 25, '2-5 years', 2, 5, '🧱', false),

-- Language Activities
('First Words', 'Say first 10 meaningful words', 'language', 'easy', 30, '1-2 years', 1, 2, '💬', true),
('Animal Sounds', 'Imitate animal sounds', 'language', 'easy', 15, '2-3 years', 2, 3, '🐄', false),
('Story Time', 'Listen to simple stories', 'language', 'easy', 20, '2-4 years', 2, 4, '📚', false),
('Singing Songs', 'Sing simple nursery rhymes', 'language', 'medium', 15, '3-5 years', 3, 5, '🎵', false),
('Alphabet Recognition', 'Recognize letters A-Z', 'language', 'hard', 30, '4-6 years', 4, 6, '🔤', true),

-- Social Activities
('Sharing Toys', 'Practice sharing with others', 'social', 'medium', 30, '2-4 years', 2, 4, '🤝', true),
('Greeting People', 'Say hello and goodbye', 'social', 'easy', 10, '2-3 years', 2, 3, '👋', false),
('Playing Together', 'Engage in cooperative play', 'social', 'medium', 45, '3-5 years', 3, 5, '👶', false),
('Following Rules', 'Follow simple game rules', 'social', 'medium', 20, '4-6 years', 4, 6, '📋', false),
('Emotional Expression', 'Express feelings appropriately', 'social', 'hard', 25, '3-6 years', 3, 6, '😊', true);
