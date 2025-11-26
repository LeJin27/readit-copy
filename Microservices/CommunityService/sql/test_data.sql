\connect test_db

DELETE FROM community;
INSERT INTO community(id, data) 
VALUES (
  '50990564-ac2d-47b6-be71-f1f557878c0c',
  jsonb_build_object(
    'name','test post 1'
  )
);

INSERT INTO community(id, data) 
VALUES (
  '186af181-46fa-4c13-8a98-6e284e3b5dfc',
  jsonb_build_object(
    'name','test post 2'
  )
);

INSERT INTO community(id, data) 
VALUES (
  '186af181-46fa-4c13-8a98-6e284e3b5dfd',
  jsonb_build_object(
    'name','test post 3'
  )
);