-- Secure RLS policies that work with custom admin authentication
-- This approach creates a function to verify admin tokens and uses it in policies

-- Function to verify admin authentication
-- This function checks if the current request is from an authenticated admin
CREATE OR REPLACE FUNCTION verify_admin_auth()
RETURNS BOOLEAN AS $$
DECLARE
    admin_email TEXT;
    admin_token TEXT;
BEGIN
    -- Get the admin email and token from the request headers
    -- In Supabase, we can access these through request headers
    admin_email := current_setting('request.headers.x-admin-email', true);
    admin_token := current_setting('request.headers.x-admin-token', true);
    
    -- If no token or email, not authenticated
    IF admin_email IS NULL OR admin_token IS NULL THEN
        RETURN false;
    END IF;
    
    -- Verify the token against the admin_users table
    -- This is a simplified check - in production, you'd want more robust verification
    PERFORM 1 FROM admin_users 
    WHERE email = admin_email 
    AND is_active = true
    AND encode(hmac(admin_email || NOW()::date::text, salt, 'sha256'), 'hex') = admin_token;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow admin operations on projects" ON projects;
DROP POLICY IF EXISTS "Allow admin operations on experiences" ON experiences;
DROP POLICY IF EXISTS "Allow admin operations on blogs" ON blogs;

-- Create secure policies for projects
CREATE POLICY "Anyone can view projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Admin can insert projects" ON projects
  FOR INSERT WITH CHECK (verify_admin_auth());

CREATE POLICY "Admin can update projects" ON projects
  FOR UPDATE USING (verify_admin_auth());

CREATE POLICY "Admin can delete projects" ON projects
  FOR DELETE USING (verify_admin_auth());

-- Create secure policies for experiences
CREATE POLICY "Anyone can view experiences" ON experiences
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage experiences" ON experiences
  FOR ALL USING (verify_admin_auth());

-- Create secure policies for blogs
CREATE POLICY "Anyone can view published blogs" ON blogs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin can manage blogs" ON blogs
  FOR ALL USING (verify_admin_auth());
