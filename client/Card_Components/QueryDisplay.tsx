import { React, useObsidian } from '../../deps.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      button: any;
    }
  }
}

const QueryDisplay = (props: any) => {
  const [queryTime, setQueryTime] = (React as any).useState(0);

  const { query, cache, clearCache } = useObsidian();

  const allMoviesQuery = `{

  }`

  const allActorsQuery = `{

  }`

  const allMoviesByGenre = `{

  }`
 
  const moviesByReleaseYear = `{

  }`

  
  const fetchData = (e: any) => {
    const start = Date.now();
    query(query, {
      endpoint: '/graphql',
    }).then((resp: any) => {
      setQueryTime(Date.now() - start);
      console.log('response', resp);
      
    });
  };
}
