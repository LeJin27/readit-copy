export const selectByCredentials = `
  SELECT id, data->>'email' AS email, data->>'name' AS name
  FROM member
  WHERE data->>'email' = $1 AND
  crypt($2, data->>'pwhash') = data->>'pwhash'
  AND (data->>'suspended' IS NULL OR data->>'suspended' != 'true');
`;

export const selectUserById = `
  SELECT id, data->>'roles' AS roles
  FROM member
  WHERE id = $1
  AND (member.data->>'suspended' IS NULL OR member.data->>'suspended' != 'true');
`;

export const selectUserInfoById = `
  SELECT id, data->>'email' AS email, data->>'name' AS name
  FROM member
  WHERE id = $1
  AND (member.data->>'suspended' IS NULL OR member.data->>'suspended' != 'true');
`;

export const insertIntoMember = `
      INSERT INTO member (data) VALUES (jsonb_build_object(
        'email', $1::text,
        'pwhash', crypt($2, gen_salt('bf')),
        'name', $3::text,
        'roles', jsonb_build_array('user')::text,
        'suspended', 'false'
      ))
      RETURNING id, data->>'name' AS name, data->>'email' AS email;`;

export const emailExistsQuery = `
  SELECT * FROM member
  WHERE data->>'email' = $1::text;`;



export const selectUserBySub = `
  SELECT id, data->>'email' AS email, data->>'name' AS name
  FROM member
  WHERE data->>'sub' = $1
  AND (member.data->>'suspended' IS NULL OR member.data->>'suspended' != 'true');
`;


export const insertIntoMemberGoogle = `
  INSERT INTO member (data) VALUES (jsonb_build_object(
    'email', $1::text,
    'name', $2::text,
    'roles', jsonb_build_array('user')::text,
    'suspended', 'false',
    'provider', 'google',
    'sub', $3::text
  ))
  RETURNING id, data->>'name' AS name, data->>'email' AS email;`;