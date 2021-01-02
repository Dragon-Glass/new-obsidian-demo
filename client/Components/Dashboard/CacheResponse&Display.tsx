import { React, useObsidian } from '../../../deps.ts';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      p: any;
      span: any;
      br: any;
      pre: any;
      code: any;
    }
  }
}

const CacheResponseDisplay = (props: any) => {
  let cache = {
    ROOT_QUERY: {},
    ROOT_MUTATION: {},
  };
  function clearCache() {
    cache = {
      ROOT_QUERY: {},
      ROOT_MUTATION: {},
    };
  }
  const response = 'response here';

  function createCache() {
    return Object.entries(cache).reduce((acc: any, pair: any, i) => {
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
        <button onClick={clearCache}>Clear Cache</button>
        <pre className="pre-block">
          Cache:
          <code className="code-block" id="code-pink">
            {'{'}
            {cachedPair}
            {'}'}
          </code>
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
