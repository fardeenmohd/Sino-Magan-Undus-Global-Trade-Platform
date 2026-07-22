-- Flyway Migration Script: V2__Create_Product_Catalog_And_Users_Tables.sql
-- DBA Persona Compliance: Users (Buyers/Suppliers/Leads) & Products catalog tables

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'BUYER',
    location VARCHAR(255),
    rating NUMERIC(3, 2) DEFAULT 5.00,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    unit VARCHAR(50) NOT NULL DEFAULT 'unit',
    listed_by_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url VARCHAR(500),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    lead_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_listed_by ON products(listed_by_user_id);
CREATE INDEX idx_products_status ON products(status);
