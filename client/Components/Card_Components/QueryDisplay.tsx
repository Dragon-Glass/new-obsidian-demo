import { React } from '../../../deps.ts';
// import CardsContainer from './CardsContainer.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      button: any;
      input: any;
      label: any;
      select: any;
      option: any;
      form: any;
    }
  }
}

const QueryDisplay = (props: any) => {
  const handleSubmit = (e: any) => {
    props.byGenre(props.dropGenre);
    e.preventDefault();
  };

  return (
    <>
      <div className="queryDisplay">
        <button type="button" id="fetchAllMovies" onClick={props.allMovies}>
          All Movies
        </button>
        <button type="button" id="fetchAllActors" onClick={props.allActors}>
          All Actors
        </button>
        <form onSubmit={handleSubmit}>
          {/* <label id="genre-label">
            Movies by Genre */}
          <div id="dropdown-content">
            <select
              id="genres"
              value={props.dropGenre}
              onChange={props.setDropGenre}
            >
              <option value="ACTION">ACTION</option>
              <option value="SCIFI">SCIFI</option>
              <option value="DRAMA">DRAMA</option>
              <option value="COMEDY">COMEDY</option>
              <option value="ROMANCE">ROMANCE</option>
              <option value="ADVENTURE">ADVENTURE</option>
            </select>
          </div>
          {/* </label> */}
          <input type="submit" value="Movies by Genre" />
        </form>
        <button type="button" id="fetchByYear" onClick={props.byYear}>
          Movies by Release Year
        </button>
      </div>
    </>
  );
};

export default QueryDisplay;
