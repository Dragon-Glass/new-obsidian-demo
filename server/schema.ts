import { gql } from '../serverDeps.ts';

// can anybody tell me if this tag needs the TS any declaration?
// const types = (gql as any)`
const types = gql`
  enum MovieGenre {
    ACTION
    SCIFI
    DRAMA
    COMEDY
    ROMANCE
    ADVENTURE
  }
  enum ReleaseYearOrder {
    ASC
    DESC
  }
  enum RespType {
    MOVIE
    ACTOR
  }

  union ActorOrMovie = Actor | Movie
  type Movie {
    id: ID!
    title: String!
    releaseYear: Int!
    actors: [Actor!]!
    genre: MovieGenre!
  }
  type Actor {
    id: ID!
    firstName: String!
    lastName: String!
    nickname: String
    movies: [Movie!]!
  }
  input MovieInput {
    genre: MovieGenre
    order: ReleaseYearOrder
    actor: ID
  }
  input ActorInput {
    film: ID
  }
  input NewMovieInput {
    title: String!
    releaseYear: Int!
    genre: MovieGenre!
  }
  input NewActorInput {
    firstName: String!
    lastName: String!
    nickname: String
  }
  input AssociateActorAndMovieInput {
    movieId: ID!
    actorId: ID!
    respType: RespType!
  }
  input UpdateNicknameInput {
    actorId: ID!
    nickname: String!
  }
  type Query {
    movies(input: MovieInput): [Movie]!
    actors(input: ActorInput): [Actor]!
  }
  type Mutation {
    addMovie(input: NewMovieInput!): Movie!
    deleteMovie(id: ID!): Movie!
    addActor(input: NewActorInput!): Actor!
    deleteActor(id: ID!): Actor!
    associateActorWithMovie(input: AssociateActorAndMovieInput!): ActorOrMovie
    updateNickname(input: UpdateNicknameInput!): Actor!
  }
`;

export default types;
