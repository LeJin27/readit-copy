\connect mob

DELETE FROM mob;
INSERT INTO mob(id, data) 
VALUES (
  '50990564-ac2d-47b6-be71-f1f557878c0c',
  jsonb_build_object(
    'name','carrion_eater_B',
    'image', 'random_image_url',
    'size', 1,
    'description', 'not null',
    'last_update', '2024-06-15T12:00:00+00:00'
  )
);

INSERT INTO mob(id, data) 
VALUES (
  '186af181-46fa-4c13-8a98-6e284e3b5dfc',
  jsonb_build_object(
    'name','carrion_eater_C',
    'size', 2,
    'image', 'random_image_url',
    'last_update', '2023-06-15T12:00:00+00:00'

  )
);