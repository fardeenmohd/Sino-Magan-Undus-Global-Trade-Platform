-- Flyway Migration Script: V3__Add_Auth_Fields_To_Users.sql
-- DBA Persona Compliance: Add password_hash column to users table

ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255) DEFAULT '$2a$10$e8T7Q...';
