-- Flyway Migration Script: V6__Add_User_Profile_Settings.sql
-- DBA Persona Compliance: Profile settings, phone, bio, and IEC trade registration codes

ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS iec_code VARCHAR(100) DEFAULT 'IEC-IN998877';

CREATE INDEX idx_users_iec_code ON users(iec_code);
