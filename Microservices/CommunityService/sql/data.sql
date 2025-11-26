\connect community_db

DELETE FROM community;

INSERT INTO community(id, data) 
VALUES (
  '50990564-ac2d-47b6-be71-f1f557878c0c',
  jsonb_build_object(
    'name','test_community_1',
    'created_by', 'e5944bb4-de67-4932-9c7a-9a07f95ed7c1',
    'created_at', '2025-04-25T09:30:00Z',
    'description', 'This is a coomunity pog'

  )
);

INSERT INTO community(id, data) 
VALUES (
  '186af181-46fa-4c13-8a98-6e284e3b5dfc',
  jsonb_build_object(
    'name','test_community_2',
    'created_by', 'e5944bb4-de67-4932-9c7a-9a07f95ed7c1',
    'created_at', '2025-04-25T09:30:00Z',
    'description', 'This is a coomunity second too'
  )
);
