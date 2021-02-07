// import { pool } from './db/db.ts';
import { Pool } from 'https://deno.land/x/postgres@v0.4.6/mod.ts';
import { PoolClient } from 'https://deno.land/x/postgres@v0.4.6/client.ts';

let pg_port: any = Deno.env.get('PG_PORT');
if (typeof pg_port === 'string') {
  pg_port = parseInt(pg_port);
}

const config = {
  user: Deno.env.get('PG_USER'),
  database: Deno.env.get('PG_DATABASE'),
  password: Deno.env.get('PG_PASSWORD'),
  hostname: Deno.env.get('PG_HOSTNAME'),
  port: pg_port,
};
const POOL_CONNECTIONS = 6; // breaks at 10+ due to ElephantSQL

let pool = new Pool(config, POOL_CONNECTIONS);

const resolvers = {
  Query: {
    movies: async (
      _: any,
      { input }: { input: { genre?: String; order?: String; actor?: String } }
    ) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.query({
          text: 'SELECT * FROM obsidian_demo_schema.films;',
          args: [],
        });
        client.release();
        let resObj = result.rows.map((arr) => {
          return {
            id: arr[0],
            title: arr[1],
            genre: arr[2],
            releaseYear: arr[3],
          };
        });
        if (input) {
          if (input.genre) {
            resObj = resObj.filter((obj) => obj.genre === input.genre);
          }
          if (input.order) {
            if (input.order === 'ASC') {
              resObj = resObj.sort((a, b) => a.releaseYear - b.releaseYear);
            } else {
              resObj = resObj.sort((a, b) => b.releaseYear - a.releaseYear);
            }
          }
          if (input.actor) {
            try {
              const client: PoolClient = await pool.connect();
              const result = await client.query({
                text: `
                  SELECT film_id
                  FROM obsidian_demo_schema.actor_films
                  WHERE actor_id = $1;
                  `,
                args: [input.actor],
              });
              client.release();
              const arrOfIds = result.rows.map((arr) => arr[0]);
              resObj = resObj.filter((obj) => arrOfIds.includes(obj.id));
            } catch (err) {
              console.log(err);
            }
          }
        }
        return resObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    actors: async (_: any, { input }: { input: { film?: String } }) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.query({
          text: 'SELECT * FROM obsidian_demo_schema.actors;',
          args: [],
        });
        client.release();
        let resObj = result.rows.map((arr) => {
          return {
            id: arr[0],
            firstName: arr[1],
            lastName: arr[2],
            nickname: arr[3],
          };
        });
        if (input) {
          if (input.film) {
            try {
              const client: PoolClient = await pool.connect();
              const result = await client.query({
                text: `
                  SELECT actor_id
                  FROM obsidian_demo_schema.actor_films
                  WHERE film_id = $1;
                  `,
                args: [input.film],
              });
              client.release();
              const arrOfIds = result.rows.map((arr) => arr[0]);
              resObj = resObj.filter((obj) => arrOfIds.includes(obj.id));
            } catch (err) {
              console.log(err);
              console.log('resetting connection');
              pool.end();
              pool = new Pool(config, POOL_CONNECTIONS);
            }
          }
        }
        return resObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
  },
  Movie: {
    actors: async ({ id }: { id: String }) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.query({
          text: `
            SELECT a.* 
            FROM obsidian_demo_schema.actors AS a
            INNER JOIN obsidian_demo_schema.actor_films AS af
            ON a.id = af.actor_id
            INNER JOIN obsidian_demo_schema.films AS f
            ON f.id =  af.film_id
            WHERE f.id = $1;
            `,
          args: [id],
        });
        client.release();
        let resObj = result.rows.map((arr) => {
          return {
            id: arr[0],
            firstName: arr[1],
            lastName: arr[2],
            nickname: arr[3],
          };
        });
        return resObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
  },
  Actor: {
    movies: async ({ id }: { id: String }) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.query({
          text: `
            SELECT f.* 
            FROM obsidian_demo_schema.films AS f
            INNER JOIN obsidian_demo_schema.actor_films AS af
            ON f.id = af.film_id
            INNER JOIN obsidian_demo_schema.actors AS a
            ON a.id =  af.actor_id
            WHERE a.id = $1;
            `,
          args: [id],
        });
        client.release();
        let resObj = result.rows.map((arr) => {
          return {
            id: arr[0],
            title: arr[1],
            genre: arr[2],
            releaseYear: arr[3],
          };
        });
        return resObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
  },
  ActorOrMovie: {
    __resolveType(obj: any) {
      if (obj.firstName || obj.lastName || obj.nickName || obj.movies) {
        return 'Actor';
      }
      if (obj.title || obj.releaseYear || obj.genre || obj.actors) {
        return 'Movie';
      }
      return null;
    },
  },
  Mutation: {
    addMovie: async (
      _: any,
      {
        input,
      }: { input: { title: String; releaseYear: Number; genre: String } }
    ) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.query({
          text: `
            INSERT INTO obsidian_demo_schema.films (title,release_dt, genre)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
          args: [input.title, input.releaseYear, input.genre],
        });
        client.release();
        const newMovieArr = result.rows[0];
        const newMovieObj = {
          id: newMovieArr[0],
          title: newMovieArr[1],
          genre: newMovieArr[2],
          releaseYear: newMovieArr[3],
        };
        return newMovieObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    deleteMovie: async (_: any, { id }: { id: String }) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.query({
          text: `
            DELETE FROM obsidian_demo_schema.films
            WHERE id = $1
            RETURNING *;
            `,
          args: [id],
        });
        client.release();
        const deletedMovieArr = result.rows[0];
        const deletedMovieObj = {
          id: deletedMovieArr[0],
          title: deletedMovieArr[1],
          genre: deletedMovieArr[2],
          releaseYear: deletedMovieArr[3],
        };
        return deletedMovieObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    addActor: async (
      _: any,
      {
        input,
      }: { input: { firstName: String; lastName: String; nickname?: String } }
    ) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.query({
          text: `
            INSERT INTO obsidian_demo_schema.actors (first_name,last_name, nickname)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
          args: [input.firstName, input.lastName, input.nickname],
        });
        client.release();
        const newActorArr = result.rows[0];
        const newActorObj = {
          id: newActorArr[0],
          firstName: newActorArr[1],
          lastName: newActorArr[2],
          nickname: newActorArr[3],
        };
        return newActorObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    deleteActor: async (_: any, { id }: { id: String }) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.query({
          text: `
            DELETE FROM obsidian_demo_schema.actors
            WHERE id = $1
            RETURNING *;
            `,
          args: [id],
        });
        client.release();
        const deletedActorArr = result.rows[0];
        const deletedActorObj = {
          id: deletedActorArr[0],
          firstName: deletedActorArr[1],
          lastName: deletedActorArr[2],
          nickname: deletedActorArr[3],
        };
        return deletedActorObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    updateNickname: async (
      _: any,
      { input }: { input: { actorId: String; nickname: String } }
    ) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.query({
          text: `
            UPDATE obsidian_demo_schema.actors
            SET nickname = $2
            WHERE id = $1
            RETURNING * ;
            `,
          args: [input.actorId, input.nickname],
        });
        client.release();
        const updatedActorArr = result.rows[0];
        const updatedActorObj = {
          id: updatedActorArr[0],
          firstName: updatedActorArr[1],
          lastName: updatedActorArr[2],
          nickname: updatedActorArr[3],
        };
        return updatedActorObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    associateActorWithMovie: async (
      _: any,
      {
        input,
      }: { input: { movieId: String; actorId: String; respType: String } }
    ) => {
      try {
        const client: PoolClient = await pool.connect();
        await client.query({
          text: `
          INSERT INTO obsidian_demo_schema.actor_films (film_id, actor_id)
          VALUES ($1, $2)
          `,
          args: [input.movieId, input.actorId],
        });
        client.release();
        if (input.respType === 'MOVIE') {
          const client: PoolClient = await pool.connect();
          const result = await client.query({
            text: `
              SELECT * FROM obsidian_demo_schema.films
              WHERE id = $1
              `,
            args: [input.movieId],
          });
          client.release();
          const MovieArr = result.rows[0];
          const MovieObj = {
            id: MovieArr[0],
            title: MovieArr[1],
            genre: MovieArr[2],
            releaseYear: MovieArr[3],
          };
          return MovieObj;
        } else {
          const client: PoolClient = await pool.connect();
          const result = await client.query({
            text: `
              SELECT * FROM obsidian_demo_schema.actors
              WHERE id = $1
              `,
            args: [input.actorId],
          });
          client.release();
          const ActorArr = result.rows[0];
          const ActorObj = {
            id: ActorArr[0],
            firstName: ActorArr[1],
            lastName: ActorArr[2],
            nickname: ActorArr[3],
          };
          return ActorObj;
        }
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
  },
};

export default resolvers;
