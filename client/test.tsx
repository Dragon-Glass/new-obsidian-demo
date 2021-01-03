import { React, useObsidian } from '../deps.ts';
import { Cache } from '../../obsidian/src/CacheClassBrowser.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      p: any;
    }
  }
}
const Test = () => {
  const { cache, query, mutate, setCache, clearCache } = useObsidian();
  const queryStr = `
    {
      movies{
        id
        title
        genre
      }
    }
  `;

  const mutationStr = `
    mutation {
      addMovie(input: {title: "Inglorious Bastards", genre: ACTION, releaseYear: 2009}){
        id
        title
        genre
      }
    }
  `;
  // const [, forceUpdate] = (React as any).useReducer((x: any) => x + 1, 0);

  async function handleClick() {
    console.log('I have been clicked');
    const result = await query(queryStr);
    console.log('result from query', result);
    // forceUpdate();
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
  }
  async function handleClick2() {
    const result = await mutate(mutationStr);
    console.log('result from mutation', result);
    setTimeout(() => setCache(new Cache(cache.storage)), 1);
    // forceUpdate();
  }
  return (
    <div className="app">
      <h1>I'm a sub component. do I have cache access?</h1>
      <button onClick={handleClick}>query</button>
      <button onClick={handleClick2}>mutation</button>
      {JSON.stringify(cache.storage)}
    </div>
  );
};
export default Test;
