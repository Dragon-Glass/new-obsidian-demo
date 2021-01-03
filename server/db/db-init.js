/* eslint-disable */
export const sqlTableCreate = `
  CREATE SCHEMA obsidian_demo_schema
  CREATE TABLE 
  actors (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR(255) NOT NULL, 
    last_name VARCHAR(255) NOT NULL,
    nickname VARCHAR(255)
    )
  CREATE TABLE 
  films (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    release_dt INTEGER NOT NULL
    )
  CREATE TABLE 
  actor_films (
    id SERIAL NOT NULL PRIMARY KEY,
    actor_id INTEGER NOT NULL,
    film_id INTEGER NOT NULL,
    FOREIGN KEY (film_id)
      REFERENCES films (id)
      ON DELETE CASCADE,
    FOREIGN KEY (actor_id)
      REFERENCES actors (id) 
      ON DELETE CASCADE
    );
`;
