DROP SCHEMA IF EXISTS ranking CASCADE;

CREATE SCHEMA ranking;

CREATE TABLE ranking.users (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  username VARCHAR(255)
);

CREATE TABLE ranking.minutes (
  userId INT,
  date DATE,
  minutes INT,
  PRIMARY KEY (userId, date),
  FOREIGN KEY (userId) REFERENCES ranking.users(id)
);
