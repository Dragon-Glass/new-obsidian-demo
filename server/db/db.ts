import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { sqlTableCreate } from './db-init.js';

let config;

config = {
  hostname: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
  applicationName: 'obsidian_demo',
};
// alternatively
// config = "postgres://postgres:postgres@localhost:5432/postgres?application_name=obsidian_demo";

const client = new Client(config);
await client.connect();

// check if schema already exists
let flag;
try {
  flag = await client.query({
    text: `SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'obsidian_demo_schema';`,
    args: [],
  });
} catch (err) {
  console.log(err);
}

// create db
if (flag == undefined || !flag.rows.length) {
  try {
    await client.query({
      text: sqlTableCreate,
      args: [],
    });
  } catch (err) {
    console.log(err);
  }
}

// Seeds the DB
// currently throws an error when done twice b/c duplicate pkeys
try {
  await client.query({
    text: `COPY obsidian_demo_schema.films (id, title, genre, release_dt)
      FROM '/Users/spencerstockton/codesmith/production_project/new-obsidian-demo/server/db/films.csv' 
      DELIMITER ',' 
      CSV HEADER;`,
    args: [],
  });
  // COPY my_table FROM '/path/to/csv/my_table.txt' WITH (FORMAT csv);
} catch (err) {
  console.log(err);
}
