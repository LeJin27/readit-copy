\connect community_db

DROP TABLE IF EXISTS community CASCADE;
CREATE TABLE community(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

DROP VIEW IF EXISTS community_view CASCADE;
CREATE VIEW community_view 
AS
SELECT
id,
data->>'name' AS name,
data->>'created_at' AS created_at,
data->>'created_by' AS created_by,
data->>'description' AS description
FROM community;
