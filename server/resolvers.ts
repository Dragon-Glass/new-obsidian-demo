import { db } from './db/db.ts';

const resolvers = {
  Query: {
    movies: async (
      _: any,
      { input }: { input: { genre?: String; order?: String; actor?: String } }
    ) => {
      try {
        const result = await db.query({
          text: 'SELECT * FROM obsidian_demo_schema.films;',
          args: [],
        });
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
              const result = await db.query({
                text: `
                  SELECT film_id
                  FROM obsidian_demo_schema.actor_films
                  WHERE actor_id = $1;
                  `,
                args: [input.actor],
              });
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
      }
    },
    actors: async (_: any, { input }: { input: { film?: String } }) => {
      try {
        const result = await db.query({
          text: 'SELECT * FROM obsidian_demo_schema.actors;',
          args: [],
        });
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
              const result = await db.query({
                text: `
                  SELECT actor_id
                  FROM obsidian_demo_schema.actor_films
                  WHERE film_id = $1;
                  `,
                args: [input.film],
              });
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
      }
    },
  },
  Movie: {
    actors: async ({ id }: { id: String }) => {
      try {
        const result = await db.query({
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
      }
    },
  },
  Actor: {
    movies: async ({ id }: { id: String }) => {
      try {
        const result = await db.query({
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
      }
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
        const result = await db.query({
          text: `
            INSERT INTO obsidian_demo_schema.films (title,release_dt, genre)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
          args: [input.title, input.releaseYear, input.genre],
        });
        console.log(result.rows);
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
      }
    },
  },
};

export default resolvers;
