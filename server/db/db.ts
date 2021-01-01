import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { sqlTableCreate } from './db-init.js';
import 'https://deno.land/x/dotenv/load.ts';

// const config = {
//   hostname: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: '1234',
//   database: 'postgres',
// };
// alternatively
const config = Deno.env.get('PG_URI');

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
      FROM '/Users/derekmiller/Dropbox/2020/Codesmith/obsidian-project/new-obsidian-demo/server/db/test-data/films.csv' 
      DELIMITER ',' 
      CSV HEADER;`,
    args: [],
  });
  // COPY my_table FROM '/path/to/csv/my_table.txt' WITH (FORMAT csv);
} catch (err) {
  console.log(err);
}
