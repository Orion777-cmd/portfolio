-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Professional Experience table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  achievements TEXT[] NOT NULL DEFAULT '{}',
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  featured_image TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  avatar_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table with proper security
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins can view admin_users
CREATE POLICY "Admin can view admin users" ON admin_users
  FOR SELECT USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Function to hash passwords
CREATE OR REPLACE FUNCTION hash_password(password TEXT, salt TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN encode(hmac(password, salt, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Function to generate salt
CREATE OR REPLACE FUNCTION generate_salt()
RETURNS TEXT AS $$
BEGIN
  RETURN encode(gen_random_bytes(16), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Function to authenticate admin users
CREATE OR REPLACE FUNCTION authenticate_admin(admin_email TEXT, admin_password TEXT)
RETURNS JSON AS $$
DECLARE
    user_record admin_users%ROWTYPE;
    password_hash TEXT;
    result JSON;
BEGIN
    -- Get admin user by email
    SELECT * INTO user_record 
    FROM admin_users 
    WHERE email = admin_email AND is_active = true;
    
    -- If user not found
    IF NOT FOUND THEN
        RETURN json_build_object('authenticated', false, 'message', 'Invalid credentials');
    END IF;
    
    -- Hash the provided password with the stored salt
    password_hash := encode(hmac(admin_password, user_record.salt, 'sha256'), 'hex');
    
    -- Check if password matches
    IF password_hash = user_record.password_hash THEN
        -- Update last login
        UPDATE admin_users 
        SET last_login = NOW() 
        WHERE id = user_record.id;
        
        -- Generate a simple token (in production, use proper JWT)
        RETURN json_build_object(
            'authenticated', true,
            'token', encode(hmac(user_record.email || NOW()::text, user_record.salt, 'sha256'), 'hex'),
            'email', user_record.email
        );
    ELSE
        RETURN json_build_object('authenticated', false, 'message', 'Invalid credentials');
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Row Level Security Policies

-- Projects: Public read, Admin write
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Admin can insert projects" ON projects
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admin can update projects" ON projects
  FOR UPDATE USING (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Admin can delete projects" ON projects
  FOR DELETE USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Experiences: Public read, Admin write
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view experiences" ON experiences
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage experiences" ON experiences
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Blogs: Public read published, Admin write
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blogs" ON blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Admin can manage blogs" ON blogs
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Testimonials: Public read, Admin write
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage testimonials" ON testimonials
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
