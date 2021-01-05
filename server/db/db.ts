import { Client } from 'https://deno.land/x/postgres@v0.4.6/mod.ts';
import { sqlTableCreate } from './db-init.js';
import { filmsData } from './test-data/films.js';
import { actorsData } from './test-data/actors.js';
import { actorFilmsData } from './test-data/actor_films.js';
import 'https://deno.land/x/dotenv/load.ts';

// connect to db

export const db = new Client(config);
await db.connect();

export async function createDb() {
  // drops the schema
  try {
    await db.query({
      text: `DROP SCHEMA IF EXISTS obsidian_demo_schema CASCADE;`,
      args: [],
    });
  } catch (err) {
    console.log(err);
  }

  // create db
  try {
    await db.query({
      text: sqlTableCreate,
      args: [],
    });
  } catch (err) {
    console.log(err);
  }

  // Seeds the DB
  try {
    await db.query({
      text: filmsData,
      args: [],
    });
  } catch (err) {
    console.log(err);
  }

  try {
    await db.query({
      text: actorsData,
      args: [],
    });
  } catch (err) {
    console.log(err);
  }

  try {
    await db.query({
      text: actorFilmsData,
      args: [],
    });
  } catch (err) {
    console.log(err);
  }
}
