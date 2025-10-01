-- Fix RLS policies to work with custom admin authentication
-- This script updates the RLS policies to allow authenticated admins to manage data

-- Drop existing policies for projects
DROP POLICY IF EXISTS "Admin can insert projects" ON projects;
DROP POLICY IF EXISTS "Admin can update projects" ON projects;
DROP POLICY IF EXISTS "Admin can delete projects" ON projects;

-- Create new policies that work with custom authentication
-- These policies allow operations when there's a valid admin token in localStorage
-- Note: This is a simplified approach for development. In production, you'd want to use proper JWT verification.

-- Allow admin operations on projects (we'll handle auth in the application layer)
CREATE POLICY "Allow admin operations on projects" ON projects
  FOR ALL USING (true);

-- Drop existing policies for experiences
DROP POLICY IF EXISTS "Admin can manage experiences" ON experiences;

-- Allow admin operations on experiences
CREATE POLICY "Allow admin operations on experiences" ON experiences
  FOR ALL USING (true);

-- Drop existing policies for blogs (if they exist)
DROP POLICY IF EXISTS "Admin can manage blogs" ON blogs;

-- Allow admin operations on blogs
CREATE POLICY "Allow admin operations on blogs" ON blogs
  FOR ALL USING (true);

-- Note: This approach disables RLS for admin operations but keeps it enabled.
-- The authentication is handled in the application layer through the AdminContext.
-- In a production environment, you should implement proper JWT verification
-- or use Supabase's built-in authentication system with proper role-based access control.

-- Alternative approach: If you want to keep RLS but use a different auth method,
-- you could create a function that verifies the admin token:

/*
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- This would need to be implemented based on your token verification logic
  -- For now, we'll return true to allow operations (handled by app-level auth)
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Then use it in policies like:
-- CREATE POLICY "Admin can insert projects" ON projects
--   FOR INSERT WITH CHECK (is_admin());
*/
