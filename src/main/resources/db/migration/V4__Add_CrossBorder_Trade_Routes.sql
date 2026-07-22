-- Flyway Migration Script: V4__Add_CrossBorder_Trade_Routes.sql
-- DBA Persona Compliance: Cross-Border Import/Export fields for India Trade Corridors

ALTER TABLE products ADD COLUMN IF NOT EXISTS hs_code VARCHAR(50) DEFAULT 'HS-8471';
ALTER TABLE products ADD COLUMN IF NOT EXISTS origin_country VARCHAR(100) DEFAULT 'India';
ALTER TABLE products ADD COLUMN IF NOT EXISTS destination_country VARCHAR(100) DEFAULT 'United States';
ALTER TABLE products ADD COLUMN IF NOT EXISTS tariff_rate NUMERIC(5, 2) DEFAULT 4.50;

CREATE INDEX idx_products_destination ON products(destination_country);
CREATE INDEX idx_products_hs_code ON products(hs_code);
