-- Seed data for Indian cities and their areas
-- This file populates all areas in Ghaziabad, Delhi, and Noida

-- Cities
INSERT INTO cities (name, description, latitude, longitude) VALUES
('Ghaziabad', 'Industrial city in Uttar Pradesh', 28.6692, 77.4538),
('Delhi', 'Capital of India', 28.7041, 77.1025),
('Noida', 'Technology and industrial city in Uttar Pradesh', 28.5805, 77.3910)
ON CONFLICT (name) DO NOTHING;

-- GHAZIABAD Areas
INSERT INTO areas (city_id, name, description, latitude, longitude) VALUES
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Indirapuram', 'Upscale residential area', 28.5921, 77.3674),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Vaishali', 'Planned residential sector', 28.5855, 77.3552),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Kaushambi', 'Modern township', 28.6011, 77.3703),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Mohan Nagar', 'Residential area', 28.6634, 77.4127),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Loni', 'Industrial and residential', 28.6821, 77.4321),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Crossings Republik', 'Residential township', 28.6312, 77.3889),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Raj Nagar', 'Established residential area', 28.6741, 77.4156),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Vijay Nagar', 'Commercial and residential', 28.6822, 77.4243),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Ashok Nagar', 'Residential locality', 28.6572, 77.3987),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Govindpuram', 'Developing area', 28.5712, 77.4098)
ON CONFLICT DO NOTHING;

-- DELHI Areas
INSERT INTO areas (city_id, name, description, latitude, longitude) VALUES
((SELECT id FROM cities WHERE name = 'Delhi'), 'South Delhi', 'Upscale residential', 28.5244, 77.1855),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Dwarka', 'Modern sector', 28.5921, 77.0460),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Rohini', 'Planned residential', 28.7948, 77.0506),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Greater Noida', 'Urban development', 28.4744, 77.5616),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Janakpuri', 'Residential sector', 28.5189, 77.1180),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Sector 10', 'Residential area', 28.5940, 77.3110),
((SELECT id FROM cities WHERE name = 'Delhi'), 'East Delhi', 'Commercial hub', 28.6139, 77.2570),
((SELECT id FROM cities WHERE name = 'Delhi'), 'West Delhi', 'Industrial area', 28.6644, 77.0506),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Lajpat Nagar', 'Commercial and residential', 28.5656, 77.2300),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Connaught Place', 'Business district', 28.6328, 77.1805),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Chandni Chowk', 'Historic market', 28.6505, 77.2303),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Karol Bagh', 'Shopping area', 28.6452, 77.1894),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Defense Colony', 'Upscale residential', 28.5694, 77.2374),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Greater Kailash', 'Premium residential', 28.5244, 77.2365),
((SELECT id FROM cities WHERE name = 'Delhi'), 'Hauz Khas', 'Student area', 28.5244, 77.2095)
ON CONFLICT DO NOTHING;

-- NOIDA Areas
INSERT INTO areas (city_id, name, description, latitude, longitude) VALUES
((SELECT id FROM cities WHERE name = 'Noida'), 'Sector 18', 'Commercial and residential', 28.5760, 77.3569),
((SELECT id FROM cities WHERE name = 'Noida'), 'Sector 50', 'Residential sector', 28.6080, 77.3843),
((SELECT id FROM cities WHERE name = 'Noida'), 'Sector 62', 'IT hub', 28.5766, 77.4027),
((SELECT id FROM cities WHERE name = 'Noida'), 'Sector 93', 'Residential area', 28.5509, 77.4163),
((SELECT id FROM cities WHERE name = 'Noida'), 'Noida City Center', 'Commercial zone', 28.5762, 77.3770),
((SELECT id FROM cities WHERE name = 'Noida'), 'Noida Extension', 'Developing area', 28.5910, 77.4401),
((SELECT id FROM cities WHERE name = 'Noida'), 'Sector 63', 'Business district', 28.5776, 77.4031),
((SELECT id FROM cities WHERE name = 'Noida'), 'Sector 100', 'Residential township', 28.6220, 77.4220),
((SELECT id FROM cities WHERE name = 'Noida'), 'Sector 137', 'New development', 28.4701, 77.4112),
((SELECT id FROM cities WHERE name = 'Noida'), 'Ecotech Extn I', 'IT corridor', 28.5900, 77.3900)
ON CONFLICT DO NOTHING;

-- Add neighborhoods for Ghaziabad areas
INSERT INTO neighborhoods (area_id, name, postal_code, description) VALUES
((SELECT id FROM areas WHERE name = 'Indirapuram' AND city_id = (SELECT id FROM cities WHERE name = 'Ghaziabad')), 'Indirapuram Main', '201014', 'Main commercial area'),
((SELECT id FROM areas WHERE name = 'Indirapuram' AND city_id = (SELECT id FROM cities WHERE name = 'Ghaziabad')), 'Indirapuram Greens', '201014', 'Residential complex'),
((SELECT id FROM areas WHERE name = 'Vaishali' AND city_id = (SELECT id FROM cities WHERE name = 'Ghaziabad')), 'Vaishali Sector A', '201010', 'Planned sector'),
((SELECT id FROM areas WHERE name = 'Vaishali' AND city_id = (SELECT id FROM cities WHERE name = 'Ghaziabad')), 'Vaishali Sector B', '201010', 'Residential zone'),
((SELECT id FROM areas WHERE name = 'Kaushambi' AND city_id = (SELECT id FROM cities WHERE name = 'Ghaziabad')), 'Kaushambi Grand', '201010', 'Modern township'),
((SELECT id FROM areas WHERE name = 'Mohan Nagar' AND city_id = (SELECT id FROM cities WHERE name = 'Ghaziabad')), 'Mohan Nagar Central', '201001', 'Central area'),
((SELECT id FROM areas WHERE name = 'Loni' AND city_id = (SELECT id FROM cities WHERE name = 'Ghaziabad')), 'Loni Road', '201102', 'Along main road'),
((SELECT id FROM areas WHERE name = 'Crossings Republik' AND city_id = (SELECT id FROM cities WHERE name = 'Ghaziabad')), 'Crossings Main', '201009', 'Main complex'),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Raj Nagar Central', '201017', 'Central shopping area'),
((SELECT id FROM cities WHERE name = 'Ghaziabad'), 'Vijay Nagar Commercial', '201010', 'Commercial hub')
ON CONFLICT DO NOTHING;

-- Add neighborhoods for Delhi areas
INSERT INTO neighborhoods (area_id, name, postal_code, description) VALUES
((SELECT id FROM areas WHERE name = 'South Delhi' AND city_id = (SELECT id FROM cities WHERE name = 'Delhi')), 'GK-1', '110048', 'Greater Kailash 1'),
((SELECT id FROM areas WHERE name = 'South Delhi' AND city_id = (SELECT id FROM cities WHERE name = 'Delhi')), 'GK-2', '110048', 'Greater Kailash 2'),
((SELECT id FROM areas WHERE name = 'Dwarka' AND city_id = (SELECT id FROM cities WHERE name = 'Delhi')), 'Dwarka Sector 1', '110075', 'Sector 1'),
((SELECT id FROM areas WHERE name = 'Dwarka' AND city_id = (SELECT id FROM cities WHERE name = 'Delhi')), 'Dwarka Sector 5', '110075', 'Sector 5'),
((SELECT id FROM areas WHERE name = 'Rohini' AND city_id = (SELECT id FROM cities WHERE name = 'Delhi')), 'Rohini Sector 3', '110085', 'Sector 3'),
((SELECT id FROM areas WHERE name = 'Rohini' AND city_id = (SELECT id FROM cities WHERE name = 'Delhi')), 'Rohini Sector 7', '110085', 'Sector 7'),
((SELECT id FROM areas WHERE name = 'Janakpuri' AND city_id = (SELECT id FROM cities WHERE name = 'Delhi')), 'Janakpuri Main', '110058', 'Main area'),
((SELECT id FROM areas WHERE name = 'Lajpat Nagar' AND city_id = (SELECT id FROM cities WHERE name = 'Delhi')), 'Lajpat Nagar 1', '110024', 'Market area'),
((SELECT id FROM areas WHERE name = 'Lajpat Nagar' AND city_id = (SELECT id FROM cities WHERE name = 'Delhi')), 'Lajpat Nagar 3', '110024', 'Commercial zone'),
((SELECT id FROM areas WHERE name = 'Connaught Place' AND city_id = (SELECT id FROM cities WHERE name = 'Delhi')), 'CP Central', '110001', 'Main business area')
ON CONFLICT DO NOTHING;

-- Add neighborhoods for Noida areas
INSERT INTO neighborhoods (area_id, name, postal_code, description) VALUES
((SELECT id FROM areas WHERE name = 'Sector 18' AND city_id = (SELECT id FROM cities WHERE name = 'Noida')), 'Sector 18 Main', '201301', 'Central commercial'),
((SELECT id FROM areas WHERE name = 'Sector 50' AND city_id = (SELECT id FROM cities WHERE name = 'Noida')), 'Sector 50 A', '201301', 'Residential A'),
((SELECT id FROM areas WHERE name = 'Sector 62' AND city_id = (SELECT id FROM cities WHERE name = 'Noida')), 'Sector 62 IT Park', '201309', 'IT hub'),
((SELECT id FROM areas WHERE name = 'Sector 93' AND city_id = (SELECT id FROM cities WHERE name = 'Noida')), 'Sector 93 Main', '201301', 'Main area'),
((SELECT id FROM areas WHERE name = 'Noida City Center' AND city_id = (SELECT id FROM cities WHERE name = 'Noida')), 'City Center Mall', '201301', 'Shopping district'),
((SELECT id FROM areas WHERE name = 'Noida Extension' AND city_id = (SELECT id FROM cities WHERE name = 'Noida')), 'Extension Zone', '201309', 'Extended development'),
((SELECT id FROM areas WHERE name = 'Sector 100' AND city_id = (SELECT id FROM cities WHERE name = 'Noida')), 'Sector 100 Alpha', '201314', 'Alpha township')
ON CONFLICT DO NOTHING;
