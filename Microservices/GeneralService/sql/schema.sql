\connect image_db

DROP TABLE IF EXISTS image CASCADE;
CREATE TABLE image(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);
