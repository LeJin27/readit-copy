\connect mob

DROP TABLE IF EXISTS mob CASCADE;
CREATE TABLE mob(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);