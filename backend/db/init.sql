DROP TABLE IF EXISTS SystemUserSystemRole;
DROP TABLE IF EXISTS SystemRole;
DROP TABLE IF EXISTS SystemUser;
--
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 
CREATE
OR REPLACE FUNCTION updTimestamp() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN
  NEW .modified = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$;
-- 
CREATE
OR REPLACE FUNCTION rndStr(len INTEGER) RETURNS VARCHAR(64) LANGUAGE plpgsql AS $$
DECLARE
  str VARCHAR(64);
BEGIN
  str := (
    SELECT
      substr(md5(random() :: text), 0, len)
  );
RETURN str;
END;
$$;
-- 
CREATE
OR REPLACE FUNCTION rndIntInRange(MIN INTEGER, MAX INTEGER) RETURNS INT LANGUAGE plpgsql AS $$ BEGIN
  RETURN floor(random() * (MAX - MIN + 1) + MIN);
END;
$$;
-- 
CREATE
OR REPLACE FUNCTION epochHoursAgoInRange(hoursMin INTEGER, hoursMax INTEGER) RETURNS DECIMAL LANGUAGE plpgsql AS $$ BEGIN
  RETURN (
    EXTRACT(
      epoch
      FROM
        now()
    ) * 1000 - (
      rndIntInRange(hoursMin, hoursMax) * 1000 * 60 * 60
    )
  ) / 1000;
END;
$$;
-- 
CREATE TABLE IF NOT EXISTS SystemUser (
  id SERIAL,
  -- uuid_ UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  email VARCHAR(64) UNIQUE NOT NULL,
  username VARCHAR(64) NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  isActivated BOOLEAN NOT NULL DEFAULT TRUE,
  otpToken VARCHAR(255),
  createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE
OR REPLACE TRIGGER modifiedUpd BEFORE
UPDATE
  ON SystemUser FOR EACH ROW EXECUTE PROCEDURE updTimestamp();
-- 
CREATE TABLE IF NOT EXISTS SystemRole (
  id SERIAL,
  roleName VARCHAR(64) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);
-- 
CREATE TABLE IF NOT EXISTS SystemUserSystemRole (
  userId INTEGER NOT NULL,
  roleId INTEGER NOT NULL,
  PRIMARY KEY (userId, roleId),
  FOREIGN KEY (userId) REFERENCES SystemUser (id) ON
  DELETE
    CASCADE,
    FOREIGN KEY (roleId) REFERENCES SystemRole (id) ON
  DELETE
    CASCADE
);
-- 
BEGIN
;
-- pwd = pwd123456 | bcrypt secret = auto, 12 rounds
INSERT INTO
  SystemUser (email, username, passwordHash)
VALUES
  (
    'testadmin@gmail.com',
    'testadmin',
    '$2a$12$OfyJOnXVNp4yE1eGha4KJuh182nWC0NTL0I8/OeRbzubP2JIIMpf6'
  ),
  (
    'testuser@gmail.com',
    'testuser',
    '$2a$12$LxcmMFGVW6u0qXPVP.fDBeteTBpy2mq7TvCYQYVdWjJ6QF4f2xfti'
  ),
  (
    CONCAT(rndStr(10), '@gmail.com'),
    rndStr(10),
    '$2a$12$OfyJOnXVNp4yE1eGha4KJuh182nWC0NTL0I8/OeRbzubP2JIIMpf6'
  ),
  (
    CONCAT(rndStr(10), '@gmail.com'),
    rndStr(10),
    '$2a$12$LxcmMFGVW6u0qXPVP.fDBeteTBpy2mq7TvCYQYVdWjJ6QF4f2xfti'
  ),
  (
    CONCAT(rndStr(8), '@gmail.com'),
    rndStr(10),
    '$2a$12$OfyJOnXVNp4yE1eGha4KJuh182nWC0NTL0I8/OeRbzubP2JIIMpf6'
  );
END;
-- 
BEGIN
;
INSERT INTO
  SystemRole (roleName)
VALUES
  ('admin'),
  ('user');
END;
--
BEGIN
;
INSERT INTO
  SystemUserSystemRole (userId, roleId)
VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (3, 2),
  (4, 2),
  (5, 2);
END;
-- 
-- SELECT * FROM SystemUser;
-- SELECT * FROM SystemRole;
-- SELECT * FROM SystemUserSystemRole;