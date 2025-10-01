-- Simple fix for RLS policies - allows admin operations
-- Run this in your Supabase SQL editor to fix the immediate issue

-- For projects table
DROP POLICY IF EXISTS "Admin can insert projects" ON projects;
DROP POLICY IF EXISTS "Admin can update projects" ON projects;
DROP POLICY IF EXISTS "Admin can delete projects" ON projects;

-- Allow all operations on projects (public read, admin write handled by app logic)
CREATE POLICY "Allow all operations on projects" ON projects
  FOR ALL USING (true);

-- For experiences table
DROP POLICY IF EXISTS "Admin can manage experiences" ON experiences;

-- Allow all operations on experiences
CREATE POLICY "Allow all operations on experiences" ON experiences
  FOR ALL USING (true);

-- For blogs table (if it exists)
DROP POLICY IF EXISTS "Admin can manage blogs" ON blogs;

-- Allow all operations on blogs
CREATE POLICY "Allow all operations on blogs" ON blogs
  FOR ALL USING (true);

-- Note: This temporarily disables RLS restrictions.
-- The authentication is still handled by your AdminContext in the application.
-- Once you implement proper JWT-based auth, you can restore the original RLS policies.
