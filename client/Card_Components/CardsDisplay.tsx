import { React, useObsidian } from '../../deps.ts';
import CardDisplay from './CardDisplay.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      h1: any;
    }
  }
}

const CardsDisplay = (props: any) => {
  const { cache } = useObsidian();
  const cards: any = [];

  if (!cache.ROOT_QUERY) {
    return (
      <div>
        <h1> No data to be displayed </h1>
      </div>
    );
  }
  // const movieInfo = {
  //   movies: [
  //     {
  //       id: 1,
  //       title: 'Star Wars',
  //       releaseYear: 1996,
  //       actors: ['actor~1', 'actor~2'],
  //       genre: 'ACTION',
  //     },
  //     {
  //       id: 2,
  //       title: 'Harry Potter',
  //       releaseYear: 1998,
  //       actors: ['actor~3', 'actor~2'],
  //       genre: 'FANTASY',
  //     },
  //   ],
  // };
  // let movieActors: any = [];
  // movieInfo.movies.forEach((movie) => {
  //   movie.actors.forEach((actor) => {
  //     if (movieActors.indexOf(actor) === -1) {
  //       movieActors.push(actor);
  //     }
  //   });
  // });
  // movieInfo.movies.forEach((movie) => {
  //   cards.push(
  //     <CardDisplay
  //       info={movie}
  //       key={movie.id}
  //       display={'Movies'}
  //       actorList={movieActors}
  //       setQueryTime={props.setQueryTime}
  //       setResponse={props.setResponse}
  //     ></CardDisplay>
  //   );
  // });
  // return (
  //   <div>
  //     <h1> No data to be displayed </h1>
  //     {cards}
  //   </div>
  // );
  const findActors = (arrOfMovies: any) => {
    let movieActors: any = [];
    const obj: any ={};
    movies.forEach((movie) => {
      movie.actors.forEach((actor) => {
        let act =
          cache.storage[actor].firstName + ' ' + cache.storage[actor].lastName;
        obj[act] = actor.id;
      });
    });
    return obj;
  };

  if (props.display === 'getAllMovies') {
    const movies = cache.storage.ROOT_QUERY['movies'];
    const movieActors =findActors(movies);
    movies.forEach((movie) => {
      cards.push(
        <CardDisplay info={cache.storage[movie]} key={cache.storage[movie].id display={'Movies'} actorList={movieActors}}></CardDisplay>
      );
    });
    return { cards };
  }

  if (props.display === 'getAllActors') {
    const actors = cache.storage.ROOT_QUERY['actors'];
    let actorMovies: any = [];
     const obj: any ={};
    actors.forEach((actor) => {
      actor.movies.forEach((movie) => {
         let mov = cache.storage[movie].title;
        obj[mov] = movie.id;
      });
    });
    actors.forEach((actor) => {
      cards.push(
        <CardDisplay info={cache.storage[actor]} key={cache.storage[actor].id display={'Actors'} movieList={actorMovies}}></CardDisplay>
      );
    });
    return { cards };
  }

  if (props.display === 'getMoviesGenre') {
    const movies = cache.storage.ROOT_QUERY[`movies(input: ${props.genre})`];
    let movieActors= findActors(movies);
    movies.forEach((movie) => {
      cards.push(
        <CardDisplay info={cache.storage[movie]} key={cache.storage[movie].id display={'Movies'} actorList={movieActors}}></CardDisplay>
      );
    });
    return { cards };
  }

  if (props.display === 'getMoviesReleaseDate') {
    const movies = cache.storage.ROOT_QUERY['movies(input:ASC)'];
      let movieActors = findActors(movies);
    movies.forEach((movie) => {
      cards.push(
        <CardDisplay info={cache.storage[movie]} key={cache.storage[movie].id display={'Movies'} actorList={movieActors}}></CardDisplay>
      );
    });
    return { cards };
  }
};

export default CardsDisplay;
