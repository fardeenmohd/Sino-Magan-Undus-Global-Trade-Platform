-- Flyway Migration Script: V1__Create_Leads_Table.sql
-- DBA Persona Compliance: Initial table creation for Lead entity

CREATE TABLE IF NOT EXISTS leads (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    score INT NOT NULL DEFAULT 50,
    estimated_value NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    source VARCHAR(100) NOT NULL DEFAULT 'Direct',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_company ON leads(company);
CREATE INDEX idx_leads_email ON leads(email);
