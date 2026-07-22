-- Flyway Migration Script: V5__Add_Agri_Makhana_Meat_Machinery_Products.sql
-- DBA Persona Compliance: Seed records for Eggs, Onions, Makhana, Potatoes, Meat & Machinery

INSERT INTO products (title, description, category, hs_code, origin_country, destination_country, tariff_rate, price, unit, listed_by_user_id, status, lead_count)
VALUES 
('Bihar Premium Organic Foxnuts (Makhana HS 1904)', 'Export-grade hand-popped popped gorgon nuts (makhana), vacuum packed in 10kg cartons for superfood distributors.', 'Makhana & Superfoods', 'HS-1904', 'India', 'United States', 3.50, 14.50, 'kg', 1, 'ACTIVE', 28),
('Fresh Nashik Red Onions & Dehydrated Flakes (HS 0703)', 'Grade-A Nashik red onions with 45mm+ size specification and dehydrated onion powder for GCC food processing.', 'Fresh Produce', 'HS-0703', 'India', 'Oman', 5.00, 380.00, 'metric ton', 1, 'ACTIVE', 34),
('Fresh Table Eggs & Processed Egg Powder (HS 0407)', 'Phytosanitary certified fresh white table eggs (30 dozen crates) & spray-dried whole egg powder for EU bakeries.', 'Poultry & Eggs', 'HS-0407', 'India', 'Netherlands', 2.80, 24.00, 'crate (360 eggs)', 1, 'ACTIVE', 19),
('Cold Storage Table & Processing Potatoes (HS 0701)', 'Export quality Kufri Pukhraj potatoes with high dry matter content, suitable for French fries & table consumption.', 'Fresh Produce', 'HS-0701', 'India', 'Poland', 4.00, 290.00, 'metric ton', 1, 'ACTIVE', 22),
('APEDA Halal Certified Frozen Buffalo Meat (HS 0202)', 'APEDA approved boneless frozen buffalo meat (Bobby veal & forequarter cuts) packaged in 20kg master cartons.', 'Meat Exports', 'HS-0202', 'India', 'China', 6.50, 3450.00, 'metric ton', 1, 'ACTIVE', 41),
('Industrial CNC Lathe & Hydraulic Pumps (HS 8479)', 'Precision engineered CNC lathe machinery, agricultural pumps, and industrial gearboxes manufactured in Gujarat.', 'Machinery & Engineering', 'HS-8479', 'India', 'Australia', 4.00, 12500.00, 'machine unit', 1, 'ACTIVE', 17);
