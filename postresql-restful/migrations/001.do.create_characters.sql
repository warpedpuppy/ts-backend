DROP TABLE IF EXISTS characters;
CREATE TABLE characters (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  character_name TEXT NOT NULL UNIQUE,
  character_color TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_modified TIMESTAMP
);