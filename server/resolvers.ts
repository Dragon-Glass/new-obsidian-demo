// https://deno.land/x/casualdb@v0.1.2

const resolvers = {
  Query: {
    getMovie: () => ({
      id: '1',
      title: 'Up',
      releaseYear: 2009,
    }),
  },
};

export default resolvers;
