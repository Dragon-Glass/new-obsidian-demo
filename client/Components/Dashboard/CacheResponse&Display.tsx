import { React, useObsidian } from '../../../deps.ts';
// import reactBootstrap from 'https://cdn.skypack.dev/react-bootstrap';
// import { Button } from 'https://cdn.skypack.dev/react-bootstrap';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      p: any;
      span: any;
      br: any;
      pre: any;
      code: any;
      Button: any;
    }
  }
}

const CacheResponseDisplay = (props: any) => {
  const { cache, clearCache, setCache } = useObsidian();
  // const [cache, setCache] = (React as any).useState({
  //   ROOT_QUERY: {
  //     'movies(sort:{release:ASC})': ['Movie~1', 'Movie~5', 'Movie~4'],
  //   },
  //   ROOT_MUTATION: {
  //     "addMovie(input:{title:'TheFugitive',releaseYear:1993,genre:ACTION})":
  //       'Movie~5',
  //   },

  //   'Movie~1': {
  //     id: '1',
  //     title: 'Indiana Jones and the Last Crusade',
  //     genre: 'ACTION',
  //     releaseYear: 1989,
  //     isFavorite: false,
  //   },
  //   'Movie~4': {
  //     id: '4',
  //     title: 'Air Force One',
  //     genre: 'ACTION',
  //     releaseYear: 1997,
  //     isFavorite: false,
  //   },

  //   'Movie~5': {
  //     id: '5',
  //     title: 'The Fugitive',
  //     genre: 'ACTION',
  //     releaseYear: 1993,
  //     isFavorite: false,
  //   },
  // });
  // function clearCache(e: any) {
  //   e.preventDefault();
  //   console.log('clicked');
  //   setCache({
  //     ROOT_QUERY: {},
  //     ROOT_MUTATION: {},
  //   });
  // }
  const response = `{
    data: {
      movies: [
        {
          id: '1',
          title: 'Indiana Jones and the Last Crusade',
          actors: [
            { id: '1', firstName: 'Harrison' },
            { id: '2', firstName: 'Sean' },
          ],
        },
        {
          id: '2',
          title: 'Empire Strikes Back',
          actors: [
            { id: '1', firstName: 'Harrison' },
            { id: '3', firstName: 'Mark' },
          ],
        },
        {
          id: '3',
          title: 'Witness',
          actors: [
            { id: '1', firstName: 'Harrison' },
            { id: '4', firstName: 'Patti' },
          ],
        },
        {
          id: '4',
          title: 'Air Force One',
          actors: [
            { id: '1', firstName: 'Harrison' },
            { id: '5', firstName: 'Gary' },
          ],
        },
      ],
    },
  }`;
  function onClick() {
    console.log('clicked');
    clearCache();
  }
  function createCache() {
    return Object.entries(cache.storage).reduce((acc: any, pair: any, i) => {
      if (typeof pair[1] === 'object') {
        const insidePair = [];
        for (const key in pair[1]) {
          insidePair.push(
            <p key={`keyPair${i}`}>
              <span style={{ color: '#cc99ff' }}>
                {' '}
                {JSON.stringify(key)} :{' '}
              </span>{' '}
              {JSON.stringify(pair[1][key])},
            </p>
          );
        }
        acc.push(
          <p key={`pair${i}`}>
            <span style={{ color: '#ff66ff' }}>
              {JSON.stringify(pair[0])} :{' '}
            </span>{' '}
            {'{'}
            {insidePair} {'}'}
          </p>
        );
      }

      console.log('acc', acc);
      return acc;
    }, []);
  }
  const cachedPair = createCache();

  return (
    <div>
      <div className="cacheDisplay">
        <pre className="pre-block" id="cacheDisplay">
          Cache:
          <code className="code-block" id="code-pink">
            {'{'}
            {cachedPair}
            {'}'}
          </code>
          <button type="button" id="clear-cache" onClick={onClick}>
            Clear Cache
          </button>
        </pre>
      </div>
      <div className="responseDisplay">
        <pre className="pre-block">
          Response:
          <code className="code-block" id="code-yellow">
            {response}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CacheResponseDisplay;
