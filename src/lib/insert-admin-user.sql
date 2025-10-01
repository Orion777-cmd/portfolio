-- Insert Admin User
-- Run this AFTER creating the database schema
-- Replace 'your-admin-email@example.com' and 'your-secure-password' with your actual credentials

DO $$
DECLARE
    admin_email TEXT := 'your-admin-email@example.com';
    admin_password TEXT := 'your-secure-password';
    user_salt TEXT;
    password_hash TEXT;
BEGIN
    -- Generate a random salt for the admin user
    user_salt := encode(gen_random_bytes(16), 'hex');
    
    -- Hash the password with the salt
    password_hash := encode(hmac(admin_password, user_salt, 'sha256'), 'hex');
    
    -- Insert the admin user
    INSERT INTO admin_users (email, password_hash, salt, is_active)
    VALUES (admin_email, password_hash, user_salt, true)
    ON CONFLICT (email) DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        salt = EXCLUDED.salt,
        is_active = EXCLUDED.is_active;
    
    RAISE NOTICE 'Admin user created/updated successfully: %', admin_email;
END $$;

-- Verify the admin user was created
SELECT email, is_active, created_at FROM admin_users;
