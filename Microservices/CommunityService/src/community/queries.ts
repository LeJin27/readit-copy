export const getAll =
`
SELECT 
id, 
data
FROM community
`

export const getById =
`
SELECT 
id, 
data
FROM community
WHERE id = $1
`


export const create = 
`
INSERT INTO community(data) 
VALUES (
  jsonb_build_object(
    'created_by', $1::text,
    'name', $2::text,
    'description', $3::text,
    'created_at', NOW()::text
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