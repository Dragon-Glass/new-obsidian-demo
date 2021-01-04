import { React, useObsidian } from '../../../deps.ts';
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

  if (!cache.storage.ROOT_QUERY) {
    return (
      <div>
        <h1> No data to be displayed </h1>
      </div>
    );
  }
  const findActors = (arrOfMovies: any) => {
    let movieActors: any = [];
    const obj: any = {};
    arrOfMovies.forEach((movie: any) => {
      movie.actors.forEach((actor: any) => {
        let act =
          cache.storage[actor].firstName + ' ' + cache.storage[actor].lastName;
        obj[act] = actor.id;
      });
    });
    return obj;
  };

  if (props.display === 'all movies') {
    const movies = cache.storage.ROOT_QUERY['movies'];
    const movieActors = findActors(movies);
    movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={cache.storage[movie]}
          key={cache.storage[movie].id}
          display={'Movies'}
          actorList={movieActors}
        ></CardDisplay>
      );
    });
    return <div>{cards}</div>;
  }

  if (props.display === 'all actors') {
    const actors = cache.storage.ROOT_QUERY['actors'];
    let actorMovies: any = [];
    const obj: any = {};
    actors.forEach((actor: any) => {
      actor.movies.forEach((movie: any) => {
        let mov = cache.storage[movie].title;
        obj[mov] = movie.id;
      });
    });
    actors.forEach((actor: any) => {
      cards.push(
        <CardDisplay
          info={cache.storage[actor]}
          key={cache.storage[actor].id}
          display={'Actors'}
          movieList={actorMovies}
        ></CardDisplay>
      );
    });
    return { cards };
  }

  if (props.display === 'by genre') {
    const movies = cache.storage.ROOT_QUERY[`movies(input: ${props.genre})`];
    let movieActors = findActors(movies);
    movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={cache.storage[movie]}
          key={cache.storage[movie].id}
          display={'Movies'}
          actorList={movieActors}
        ></CardDisplay>
      );
    });
    return { cards };
  }

  if (props.display === 'by year') {
    const movies = cache.storage.ROOT_QUERY['movies(input:ASC)'];
    let movieActors = findActors(movies);
    movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={cache.storage[movie]}
          key={cache.storage[movie].id}
          display={'Movies'}
          actorList={movieActors}
        ></CardDisplay>
      );
    });
    return { cards };
  }
  return [cards];
};
export default CardsDisplay;
