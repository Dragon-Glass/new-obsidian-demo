import { React, useObsidian } from '../../deps.ts';
// import CardsDisplay from './CardsDisplay.tsx';
import QueryDisplay from './QueryDisplay.tsx';
import MutationDisplay from './MutationDisplay.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
    }
  }
}
const useInput = (init: any) => {
  const [value, setValue] = (React as any).useState(init);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

const CardsContainer = () => {
  const { query, mutate, cache, setCache, clearCache } = useObsidian();
  const [queryTime, setQueryTime] = (React as any).useState(0);
  const [response, setResponse] = (React as any).useState('');
  const [display, setDisplay] = (React as any).useState('');
  const [dropGenre, setDropGenre] = useInput('');
  const [genre, setGenre] = useInput('');
  const [title, setTitle] = useInput('');
  const [releaseYear, setReleaseYear] = useInput('');
  const [firstName, setFirstName] = useInput('');
  const [lastName, setLastName] = useInput('');
  const [nickname, setNickname] = useInput('');
  // change state dependent on fetch request

  const allMoviesQuery = `
    query { 
      movies {
        __typename
        id
        title
        releaseYear
        actors {
          id
          firstName
          lastName
        }
        genre
      }
    }
  `;

  const allActorsQuery = `
    query {
      actors {
        __typename
        id
        firstName
        lastName
        nickname
        movies {
          id
          title
          releaseYear
          genre
        }
      }
    }
  `;

  const allMoviesByGenre = `
    query {
      movies(input: ${dropGenre}){
        __typename
        id
        title
        releaseYear
        actors {
          id
          firstName
          lastName
        }
      }
    }
  `;

  const moviesByReleaseYear = `{
    query {
      movies(input: { release: ASC} ) {
        __typename
        id
        title
        releaseYear
        actors {
          id
          firstName
          lastName
        }
        genre
      }
    }
  `;

  const addMovie = `
    mutation AddMovie {
    addMovie(input: {title: ${title}, releaseYear: ${releaseYear}, genre: ${genre} }) {
      __typename
      id
      title
      releaseYear
      genre
    }
  }
  `;

  const addActor = `
    mutation AddActor {
    addActor(input: {firstName: ${firstName}, lastName: ${lastName}, nickname: ${nickname} }) {
      __typename
      id
      firstName
      lastName
      nickname
    }
  }
  `;

  const fetchAllMovies = (e: any) => {
    const start = Date.now();
    const res = query(allMoviesQuery).then((resp: any) => {
      setQueryTime(Date.now() - start);
      setResponse(resp.data.movies);
      setDisplay('all movies');
    });
    console.log(res);
    // const respObj = {
    //   data: {
    //     movies: [
    //       {
    //         id: '1',
    //         title: 'Indiana Jones and the Last Crusade',
    //         genre: 'ACTION',
    //         releaseYear: 1989,
    //       },
    //       {
    //         id: '4',
    //         title: 'Air Force One',
    //         genre: 'ACTION',
    //         releaseYear: 1997,
    //       },
    //     ],
    //   },
    // };
    // console.log(respObj);
    // return respObj;
  };

  const fetchAllActors = (e: any) => {
    const start = Date.now();
    const res = query(allActorsQuery).then((resp: any) => {
      setQueryTime(Date.now() - start);
      setResponse(resp.data.actors);
      setDisplay('all actors');
    });
    console.log(res);

    // const respObj = {
    //   data: {
    //     movies: [
    //       {
    //         id: '1',
    //         title: 'Indiana Jones and the Last Crusade',
    //         genre: 'ACTION',
    //         releaseYear: 1989,
    //       },
    //       {
    //         id: '4',
    //         title: 'Air Force One',
    //         genre: 'ACTION',
    //         releaseYear: 1997,
    //       },
    //     ],
    //   },
    // };
    // console.log(respObj);
    // return respObj;
  };

  const fetchMoviesByGenre = (e: any) => {
    const start = Date.now();
    const res = query(allMoviesByGenre).then((resp: any) => {
      setQueryTime(Date.now() - start);
      setResponse(resp.data.movies);
      setDisplay('by genre');
    });
    console.log(res);
    setTimeout(() => setCache(newCache(cache.storage)), 1);
  };

  const fetchReleaseYear = (e: any) => {
    const start = Date.now();
    const res = query(moviesByReleaseYear).then((resp: any) => {
      setQueryTime(Date.now() - start);
      setResponse(resp.data.movies);
      setDisplay('by year');
    });
    console.log(res);
    setTimeout(() => setCache(newCache(cache.storage)), 1);
  };

  const addMovieCard = (e: any) => {
    const start = Date.now();
    const res = mutate(addMovie, {
      endpoint: '/graphql',
    }).then((resp: any) => {
      setQueryTime(Date.now() - start);
      setResponse(resp.data.movies);
      setDisplay('all movies');
    });
    console.log(res);
    setTimeout(() => setCache(newCache(cache.storage)), 1);
  };

  const addActorCard = (e: any) => {
    const start = Date.now();
    const res = mutate(addActor, {
      endpoint: '/graphql',
    }).then((resp: any) => {
      setQueryTime(Date.now() - start);
      setResponse(resp.data.actor);
      setDisplay('all actors');
    });
    console.log(res);
    setTimeout(() => setCache(newCache(cache.storage)), 1);
  };

  return (
    <div className="cardsContainer">
      {/* <CardsDisplay display={display} /> */}
      <QueryDisplay
        allMovies={fetchAllMovies}
        allActors={fetchAllActors}
        byGenre={fetchMoviesByGenre}
        byYear={fetchReleaseYear}
        dropGenre={dropGenre}
        setDropGenre={setDropGenre}
      />
      <MutationDisplay
        addMovieCard={addMovieCard}
        addActorCard={addActorCard}
        firstName={firstName}
        lastName={lastName}
        nickname={nickname}
        title={title}
        releaseYear={releaseYear}
        genre={genre}
        setTitle={setTitle}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setNickname={setNickname}
        setReleaseYear={setReleaseYear}
        setGenre={setGenre}
      />
    </div>
  );
};

export default CardsContainer;
