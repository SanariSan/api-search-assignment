INSERT INTO
    SystemUser(email, username, passwordHash)
VALUES
    ($1, $2, $3) RETURNING *