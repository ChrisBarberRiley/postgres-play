CREATE DATABASE todo;

CREATE TABLE todo (
  id serial primary key,
  description varchar(255) NOT NULL,
  done boolean NOT NULL
);