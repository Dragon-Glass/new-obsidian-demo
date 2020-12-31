import { gql } from '../serverDeps.ts';

const types = (gql as any)`
  type Movie {
    id: ID
    title: String
    releaseYear: Int
  }
  type Query {
    getMovie: Movie 
  }
`;

export default types;
