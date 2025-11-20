
CREATE DATABASE member_db;
CREATE DATABASE test_db;

\connect member_db
CREATE EXTENSION IF NOT EXISTS pgcrypto;
\connect test_db
CREATE EXTENSION IF NOT EXISTS pgcrypto;