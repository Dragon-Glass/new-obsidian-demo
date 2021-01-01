import { React, useObsidia } from '../../deps.ts';
import CardsDisplay from './CardsDisplay.tsx';
import QueryDisplay from './QueryDisplay.tsx';
import MutationDisplay from './MutationDisplay.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
    }
  }
}

const CardsContainer = () => {
  const [queryTime, setQueryTime] = (React as any).useState(0);
  const [response, setResponse] = (React as any).useState('');
  const [display, setDisplay] = (React as any).useState('');

  const { query, cache, clearCache } = useObsidian();
  const [genre, setGenre] = (React as any).useState('');
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
      movies(input: ${genre}){
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
      movies(input: ASC) {
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

  const fetchAllMovies = (e: any) => {
    const start = Date.now();
    query(query, {
      endpoint: '/graphql',
    }).then((resp: any) => {
      setQueryTime(Date.now() - start);
      console.log('response', resp);
      // display respObj
      setResponse(JSON.stringify(resp.data));
      setDisplay('all movies')
      
    });
  };

  const 
  
  return (
    <>
    <div className='cardsContainer'>
        <CardsDisplay />
        <QueryDisplay />
        <MutationDisplay />
    </div>
    </>
  )
}

export default CardsContainer;