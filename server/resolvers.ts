import { db } from './db/db.ts';

const resolvers = {
  Query: {
    movies: async (_: any, { input }: any) => {
      try {
        const result = await db.query({
          text: 'SELECT * FROM obsidian_demo_schema.films',
          args: [],
        });
        const resObj = result.rows.map((arr) => {
          return {
            id: arr[0],
            title: arr[1],
            genre: arr[2],
            releaseYear: arr[3],
          };
        });
        console.log('resObj', resObj);
        return resObj;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default resolvers;
