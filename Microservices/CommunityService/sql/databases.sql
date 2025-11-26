
CREATE DATABASE community_db;
CREATE DATABASE test_db;

\connect community_db
CREATE EXTENSION IF NOT EXISTS pgcrypto;
\connect test_db
CREATE EXTENSION IF NOT EXISTS pgcrypto;