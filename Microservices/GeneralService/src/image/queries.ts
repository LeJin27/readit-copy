export const selectById =
`
SELECT id, data
FROM lot  WHERE id = $1
`