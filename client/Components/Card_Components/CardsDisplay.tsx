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
  const { cache, query } = useObsidian();
  const [allActors, setAllActors] = (React as any).useState('');
  const cards: any = [];

  if (!cache.storage.ROOT_QUERY) {
    return (
      <div>
        <h1> No data to be displayed </h1>
      </div>
    );
  }
  const findActors = (arrOfMovies: any) => {
    const output: any = {};
    arrOfMovies.forEach((actor: any) => {
      let act = actor.firstName + ' ' + actor.lastName;
      output[act] = actor.id;
    });
    return output;
  };

  const allActorsQuery = `query {
    actors {
      id
      firstName
      lastName
    }
  }
`;

  const fetch = async () => {
    let output = await query(allActorsQuery);
    setAllActors(output.data);
  };

  if (props.display === 'all movies') {
    let resp = JSON.parse(props.response);
    // fetch();
    console.log('res', allActors);
    // const movieActors = findActors(res.data.actors);
    resp.movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={movie}
          key={movie.id}
          id={movie.id}
          display={'Movies'}
          // actorList={allActors}
          setQueryTime={props.setQueryTime}
          setResponse={props.setResponse}
        ></CardDisplay>
      );
    });

    console.log('working');
    return [cards];
  }

  if (props.display === 'all actors') {
    let resp = JSON.parse(props.response);

    // let actorMovies: any = [];
    // const obj: any = {};
    // actors.forEach((actor: any) => {
    //   if (Array.isArray(actor.movies)) {
    //     actor.movies.forEach((movie: any) => {
    //       let mov = cache.storage[movie].title;
    //       obj[mov] = cache.storage[movie].id;
    //     });
    //   } else {
    //     let movie = actor.movies;
    //     let mov = cache.storage[movie].title;
    //     obj[mov] = cache.storage[movie].id;
    //   }
    // });
    console.log(resp);
    resp.actors.forEach((actor: any) => {
      cards.push(
        <CardDisplay
          info={actor}
          key={actor.id}
          display={'Actors'}
          //movieList={obj}
          setQueryTime={props.setQueryTime}
          setResponse={props.setResponse}
        ></CardDisplay>
      );
    });
    return { cards };
  }

  if (props.display === 'by genre') {
    let resp = JSON.parse(props.response);

    // let movieActors = findActors(movies);
    resp.movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={movie}
          key={movie.id}
          display={'Movies'}
          // actorList={movieActors}
          setQueryTime={props.setQueryTime}
          setResponse={props.setResponse}
        ></CardDisplay>
      );
    });
    return { cards };
  }

  if (props.display === 'by year') {
    let resp = JSON.parse(props.response);
    // let movieActors = findActors(movies);
    console.log('heheheh', resp);
    resp.movies.forEach((movie: any) => {
      cards.push(
        <CardDisplay
          info={movie}
          key={movie.id}
          id={movie.id}
          display={'Movies'}
          // actorList={movieActors}
          setQueryTime={props.setQueryTime}
          setResponse={props.setResponse}
        ></CardDisplay>
      );
    });
    return [cards];
  }
  return [cards];
};
export default CardsDisplay;
