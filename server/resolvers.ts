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
        const result = await db.query({
          text: `
            INSERT INTO obsidian_demo_schema.films (title,release_dt, genre)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
          args: [input.title, input.releaseYear, input.genre],
        });
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
      }
    },
    deleteMovie: async (_: any, { id }: { id: String }) => {
      try {
        const result = await db.query({
          text: `
            DELETE FROM obsidian_demo_schema.films
            WHERE id = $1
            RETURNING *;
            `,
          args: [id],
        });
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
      }
    },
    addActor: async (
      _: any,
      {
        input,
      }: { input: { firstName: String; lastName: Number; nickname?: String } }
    ) => {
      try {
        const result = await db.query({
          text: `
            INSERT INTO obsidian_demo_schema.actors (first_name,last_name, nickname)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
          args: [input.firstName, input.lastName, input.nickname],
        });
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
      }
    },
    deleteActor: async (_: any, { id }: { id: String }) => {
      try {
        const result = await db.query({
          text: `
            DELETE FROM obsidian_demo_schema.actors
            WHERE id = $1
            RETURNING *;
            `,
          args: [id],
        });
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
      }
    },
    updateNickname: async (
      _: any,
      { input }: { input: { actorId: String; nickname: String } }
    ) => {
      try {
        const result = await db.query({
          text: `
            UPDATE obsidian_demo_schema.actors
            SET nickname = $2
            WHERE id = $1
            RETURNING * ;
            `,
          args: [input.actorId, input.nickname],
        });
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
      }
    },
    associateActorWithMovie: async (
      _: any,
      {
        input,
      }: { input: { movieId: String; actorId: String; respType: String } }
    ) => {
      try {
        await db.query({
          text: `
          INSERT INTO obsidian_demo_schema.actor_films (film_id, actor_id)
          VALUES ($1, $2)
          `,
          args: [input.movieId, input.actorId],
        });
        if (input.respType === 'MOVIE') {
          const result = await db.query({
            text: `
              SELECT * FROM obsidian_demo_schema.films
              WHERE id = $1
              `,
            args: [input.movieId],
          });
          console.log(result.rows);
          const MovieArr = result.rows[0];
          const MovieObj = {
            id: MovieArr[0],
            title: MovieArr[1],
            genre: MovieArr[2],
            releaseYear: MovieArr[3],
          };
          return MovieObj;
        } else {
          const result = await db.query({
            text: `
              SELECT * FROM obsidian_demo_schema.actors
              WHERE id = $1
              `,
            args: [input.actorId],
          });
          console.log(result.rows);
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
      }
    },
  },
};

export default resolvers;
