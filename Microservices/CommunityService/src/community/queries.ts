export const getAll =
`
SELECT 
id, 
name,
created_at,
created_by,
description
FROM community_view
`


export const createMob = 
`
INSERT INTO mob(data) 
VALUES (
  jsonb_build_object(
    'name', $1::text,
    'size', $2::numeric,
    'image', $3::text,
    'description', $4::text,
    'last_update', $5::text
  )
)
RETURNING id, data;
;
`

export const updateMob = 
`
UPDATE mob
SET data = jsonb_build_object(
  'name', $2::text,
  'size', $3::numeric,
  'image', $4::text,
  'description', $5::text,
  'last_update', NOW()
)
WHERE id = $1
RETURNING id, data;
`;

export const mobExists =
`
SELECT 1
FROM mob WHERE data->>'name' = $1 
LIMIT 1
`