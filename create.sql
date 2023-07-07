drop table if exists ranking.public.users;

create schema if not exists ranking;


CREATE TABLE ranking.public.users (
  id INT PRIMARY KEY,
  name VARCHAR(255)
);

insert into ranking.public.users (id, name) values (1, 'A');