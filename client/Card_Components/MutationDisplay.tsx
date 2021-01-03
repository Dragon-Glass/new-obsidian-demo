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
    <div className="muationDisplay">
      <article className="create-movieCard">
        <h3>Enter your movie details</h3>
        <div className="createCharFields">
          <label htmlFor="title">Title: </label>
          <input name="title" value={props.title} onChange={props.setTitle} />
        </div>
        <div className="createCharFields">
          <label htmlFor="releaseYear">Release Year: </label>
          <input
            name="releaseYear"
            value={props.releaseYear}
            onChange={props.setReleaseYear}
          />
        </div>
        <div className="createCharFields">
          <label htmlFor="genre">Genre: </label>
          <input name="genre" value={props.genre} onChange={props.setGenre} />
        </div>
        <button type="button" onClick={props.addMovieCard}>
          Add Movie
        </button>
      </article>

      <article className="create-movieCard">
        <h3>Enter your actor details</h3>
        <div className="createCharFields">
          <label htmlFor="firstName">First Name: </label>
          <input
            name="firstName"
            value={props.firstName}
            onChange={props.setFirstName}
          />
        </div>
        <div className="createCharFields">
          <label
            htmlFor="las
        tName"
          >
            Last Name:{' '}
          </label>
          <input
            name="lastName"
            value={props.lastName}
            onChange={props.setLastName}
          />
        </div>
        <div className="createCharFields">
          <label htmlFor="nickname">Nickname: </label>
          <input
            name="nickname"
            value={props.nickname}
            onChange={props.setNickname}
          />
        </div>
        <button type="button" onClick={props.addActorCard}>
          Add Actor
        </button>
      </article>
    </div>
  );
};

export default MutationDisplay;
