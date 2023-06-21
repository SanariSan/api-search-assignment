UPDATE
    SystemUser AS s
SET
    passwordHash = $2
WHERE
    s.username = $1 RETURNING *