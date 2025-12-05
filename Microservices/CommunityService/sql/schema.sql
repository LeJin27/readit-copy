\connect community_db

DROP TABLE IF EXISTS community CASCADE;
CREATE TABLE community(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);
