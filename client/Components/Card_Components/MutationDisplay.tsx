import { React } from '../../../deps.ts';
// import CardsContainer from './CardsContainer.tsx';

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
  const [reset, setReset] = (React as any).useState('');

  return (
    <div className="mutationDisplay">
      <form className="create-movieCard">
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
        <button type="button" onClick={props.addMovieCard}>
          Add Movie
        </button>
      </form>

      <form className="create-movieCard">
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
            Last Name:
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
      </form>
    </div>
  );
};

export default MutationDisplay;
