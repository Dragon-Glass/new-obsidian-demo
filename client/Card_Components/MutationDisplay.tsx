import { React } from '../../deps.ts';
import CardsContainer from './CardsContainer.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      button: any;
      input: any;
      article: any;
      h3: any;
    }
  }
}

const MutationDisplay = (props: any) => {
 
  return (
    <div className="mutationDisplay">
      <form className="create-movieCard" onSubmit={props.addMovieCard}>
        <h3>Enter your movie details</h3>
        <div className="createCharFields">
          <label htmlFor="title">Title: </label>
          <input name="title" value={props.title} onChange={props.onChange} />
        </div>
        <div className="createCharFields">
          <label htmlFor="releaseYear">Release Year: </label>
          <input
            name="releaseYear"
            value={props.releaseYear}
            onChange={props.onChange}
          />
        </div>
        <div className="createCharFields">
          <label htmlFor="genre">Genre: </label>
          <select
            id="genres"
            value={props.cardGenre}
            onChange={props.setCardGenre}
          >
            <option value="ACTION">ACTION</option>
            <option value="SCIFI">SCIFI</option>
            <option value="DRAMA">DRAMA</option>
            <option value="COMEDY">COMEDY</option>
            <option value="ROMANCE">ROMANCE</option>
            <option value="ADVENTURE">ADVENTURE</option>
          </select>
        </div>
        <button>
          Add Movie
        </button>
      </form>

      <form className="create-movieCard" onSubmit={props.addActorCard}>
        <h3>Enter your actor details</h3>
        <div className="createCharFields">
          <label htmlFor="firstName">First Name: </label>
          <input
            name="firstName"
            value={props.firstName}
            onChange={props.onChange}
          />
        </div>
        <div className="createCharFields">
          <label
            htmlFor="las
        tName"
          >
            Last Name:
          </label>
          <input
            name="lastName"
            value={props.lastName}
            onChange={props.onChange}
          />
        </div>
        <div className="createCharFields">
          <label htmlFor="nickname">Nickname: </label>
          <input
            name="nickname"
            value={props.nickname}
            onChange={props.onChange}
          />
        </div>
        <button>
          Add Actor
        </button>
      </form>
    </div>
  );
};

export default MutationDisplay;
