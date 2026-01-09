


\connect test_db

DELETE FROM image;
INSERT INTO image(id, data) 
VALUES (
  '50990564-ac2d-47b6-be71-f1f557878c0c',
  jsonb_build_object(
    'url','link'
  )
);


INSERT INTO image(id, data) 
VALUES (
  '50990564-ac2d-47b6-be71-f1f557878c0d',
  jsonb_build_object(
    'url','link2'
  )
);