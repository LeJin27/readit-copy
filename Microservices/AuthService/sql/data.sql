\connect member_db

DELETE FROM member;
INSERT INTO member(id, data) 
VALUES (
  'e5944bb4-de67-4932-9c7a-9a07f95ed7c1',
  jsonb_build_object(
    'email','molly@books.com',
    'name','Molly Member',
    'pwhash',crypt('mollymember',gen_salt('bf')),
    'roles','["user"]',
    'provider', 'google',
    'sub', 'unique-google-id'
  )
);