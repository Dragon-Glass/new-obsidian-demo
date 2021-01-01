import { React, useObsidian } from '../../deps.ts';
import CardsContainer from './CardsContainer.tsx'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      button: any;
    }
  }
}

const QueryDisplay = (props: any) => {
  
  return (
    <>
    <div className="queryDisplay">
      <button id="fetchAllMovies" onClick={fetchData}>
      </button>
      </div>
    </>
  )
};
