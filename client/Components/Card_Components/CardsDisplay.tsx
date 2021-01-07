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

  if (!Object.keys(cache.storage.ROOT_QUERY).length) {
    return (
      <div id="no-data">
        <h1> Fetch some movies... </h1>
      </div>
    );
  } else if (props.display === 'all movies') {
    let resp = props.cardsResponse;
    const arrOfActors = props.actorResponse.actors;
    const actorList: any = {};
    arrOfActors.forEach((actor: any) => {
      let output = actor.firstName + ' ' + actor.lastName;
      actorList[output] = actor.id;
    });
    resp.movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={movie}
          key={movie.id}
          id={movie.id}
          display={'Movies'}
          setDisplay={props.setDisplay}
          actorList={actorList}
          setQueryTime={props.setQueryTime}
          setCardsResponse={props.setCardsResponse}
          cardsResponse={props.cardsResponse}
        ></CardDisplay>
      );
    });

    return [cards];
  } else if (props.display === 'all actors') {
    let resp = props.cardsResponse;
    const arrOfMovies = props.movieResponse.movies;
    const movieList: any = {};
    arrOfMovies.forEach((movie: any) => {
      let output = movie.title;
      movieList[output] = movie.id;
    });
    resp.actors.forEach((actor: any) => {
      cards.push(
        <CardDisplay
          info={actor}
          key={actor.id}
          display={'Actors'}
          movieList={movieList}
          setQueryTime={props.setQueryTime}
          setCardsResponse={props.setCardsResponse}
          cardsResponse={props.cardsResponse}
        ></CardDisplay>
      );
    });
    return [cards];
  } else if (props.display === 'by genre') {
    let resp = props.cardsResponse;
    const arrOfActors = props.actorResponse.actors;
    const actorList: any = {};
    arrOfActors.forEach((actor: any) => {
      let output = actor.firstName + ' ' + actor.lastName;
      actorList[output] = actor.id;
    });
    resp.movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={movie}
          key={movie.id}
          display={'Movies'}
          actorList={actorList}
          setQueryTime={props.setQueryTime}
          setCardsResponse={props.setCardsResponse}
          cardsResponse={props.cardsResponse}
        ></CardDisplay>
      );
    });
    return [cards];
  } else if (props.display === 'by year') {
    let resp = props.cardsResponse;
    const arrOfActors = props.actorResponse.actors;
    const actorList: any = {};
    arrOfActors.forEach((actor: any) => {
      let output = actor.firstName + ' ' + actor.lastName;
      actorList[output] = actor.id;
    });
    resp.movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={movie}
          key={movie.id}
          id={movie.id}
          display={'Movies'}
          actorList={actorList}
          setQueryTime={props.setQueryTime}
          setCardsResponse={props.setCardsResponse}
          cardsResponse={props.cardsResponse}
        ></CardDisplay>
      );
    });
    return [cards];
  }
  return [cards];
};
export default CardsDisplay;
