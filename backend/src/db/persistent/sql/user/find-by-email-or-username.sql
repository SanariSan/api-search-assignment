SELECT
    *
FROM
    SystemUser AS s
WHERE
    s.email = $1
    OR s.username = $2