import { React, useObsidian } from '../../../deps.ts';
import CardsDisplay from './CardsDisplay.tsx';
import QueryDisplay from './QueryDisplay.tsx';
import MutationDisplay from './MutationDisplay.tsx';
import { Cache } from '../../../../obsidian/src/CacheClassBrowser.js';
import Dashboard from '../Dashboard/Dashboard.tsx';
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

function CardsContainer(props: any) {
  const { query, mutate, cache, setCache, clearCache } = useObsidian();
  const [queryTime, setQueryTime] = (React as any).useState(0);
  const [gqlRequest, setGqlRequest] = (React as any).useState('');
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

  const allMoviesQuery = `query { 
      movies {
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

  const allActorsQuery = `query {
      actors {
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

  const allMoviesByGenre = `query {
      movies(input: {genre: ${dropGenre}}){
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

  const moviesByReleaseYear = `query {
    movies(input: {order : ASC }) {
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

  const addMovie = `mutation {
    addMovie(input: {title: "${title}", releaseYear: ${releaseYear}, genre: ${dropGenre} }) {
      id
      title
      releaseYear
      genre
    }
  }
  `;

  const addActor = `mutation {
    addActor(input: {firstName: "${firstName}", lastName: "${lastName}", nickname: "${nickname}" }) {
      id
      firstName
      lastName
      nickname
    }
  }
  `;

  const fetchAllMovies = async (e: any) => {
    setGqlRequest(allMoviesQuery);
    const start = Date.now();
    const res = await query(allMoviesQuery);
    setQueryTime(Date.now() - start);
    setResponse(JSON.stringify(res.data));
    console.log('data', JSON.stringify(res));
    console.log('response', response);
    setDisplay('all movies');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    console.log('all movies', res);
  };

  const fetchAllActors = async (e: any) => {
    setGqlRequest(allActorsQuery);
    const start = Date.now();
    const res = await query(allActorsQuery);
    setQueryTime(Date.now() - start);
    setResponse(JSON.stringify(res.data));
    setDisplay('all actors');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    console.log('all actors', res);
  };

  const fetchMoviesByGenre = async (e: any) => {
    setGqlRequest(allMoviesByGenre);
    const start = Date.now();
    const res = await query(allMoviesByGenre);
    setQueryTime(Date.now() - start);
    setResponse(JSON.stringify(res.data));
    setDisplay('by genre');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    console.log('by genre', res);
  };

  const fetchReleaseYear = async (e: any) => {
    setGqlRequest(moviesByReleaseYear);
    const start = Date.now();
    const res = await query(moviesByReleaseYear);
    setQueryTime(Date.now() - start);
    setResponse(JSON.stringify(res.data));
    setDisplay('by year');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    console.log('by year', res);
  };

  const addMovieCard = async (e: any) => {
    setGqlRequest(addMovie);
    const start = Date.now();
    const res = await mutate(addMovie);
    // option obj with update key on
    setQueryTime(Date.now() - start);
    setResponse(JSON.stringify(res.data));
    setDisplay('all movies');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    console.log('add movie', res);
  };

  const addActorCard = async (e: any) => {
    setGqlRequest(addActor);
    const start = Date.now();
    const res = await mutate(addActor);
    if (res.data.addActor.nickname === '') {
      res.data.addActor.nickname = null;
    }
    setQueryTime(Date.now() - start);
    setResponse(JSON.stringify(res.data));
    setDisplay('all actors');
    setTimeout(() => setCache(new Cache(cache.storage)), 1);

    console.log('add card', res);
    console.log('cache', cache.storage);
  };

  return (
    <div id="cardsContainer">
      <div id="query-mutation">
        <QueryDisplay
          id="query-display"
          allMovies={fetchAllMovies}
          allActors={fetchAllActors}
          byGenre={fetchMoviesByGenre}
          byYear={fetchReleaseYear}
          dropGenre={dropGenre}
          setDropGenre={setDropGenre}
        />
        <MutationDisplay
          id="mutation-display"
          addMovieCard={addMovieCard}
          addActorCard={addActorCard}
          firstName={firstName}
          lastName={lastName}
          nickname={nickname}
          title={title}
          releaseYear={releaseYear}
          dropGenre={dropGenre}
          setDropGenre={setDropGenre}
          setTitle={setTitle}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setNickname={setNickname}
          setReleaseYear={setReleaseYear}
        />
      </div>
      <CardsDisplay
        id="cards-display"
        display={display}
        genre={genre}
        setQueryTime={setQueryTime}
        setResponse={setResponse}
      />
      <Dashboard
        id="dashboard"
        queryTime={queryTime}
        gqlRequest={gqlRequest}
        response={response}
      />
    </div>
  );
}
export { CardsContainer };
