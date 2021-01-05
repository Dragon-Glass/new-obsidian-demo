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
      h5: any;
    }
  }
}

const MutationDisplay = (props: any) => {
  const [reset, setReset] = (React as any).useState('');

  return (
    <div className="mutation-display">
      <h3>Make a mutation:</h3>
      <form className="create-movieCard">
        <h5>Enter your movie details</h5>
        <div className="createCharFields">
          <label className="form-label" htmlFor="title">
            Title:{' '}
          </label>
          <input
            className="form-control"
            name="title"
            value={props.title}
            onChange={props.setTitle}
            required
          />
        </div>
        <div className="createCharFields">
          <label className="form-label" htmlFor="releaseYear">
            Release Year:{' '}
          </label>
          <input
            className="form-control"
            name="releaseYear"
            value={props.releaseYear}
            onChange={props.setReleaseYear}
            required
          />
        </div>
        <div className="createCharFields">
          <label className="form-label" htmlFor="genre">
            Genre:{' '}
          </label>
          <select
            className="form-select"
            id="genres"
            value={props.dropGenre}
            onChange={props.setDropGenre}
            required
          >
            <option value="">Select the genre</option>
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
        <h5>Enter your actor details</h5>
        <div className="createCharFields">
          <label className="form-label" htmlFor="firstName">
            First Name:{' '}
          </label>
          <input
            className="form-control"
            name="firstName"
            value={props.firstName}
            onChange={props.setFirstName}
            required
          />
        </div>
        <div className="createCharFields">
          <label
            className="form-label"
            htmlFor="las
        tName"
          >
            Last Name:
          </label>
          <input
            className="form-control"
            name="lastName"
            value={props.lastName}
            onChange={props.setLastName}
            required
          />
        </div>
        <div className="createCharFields">
          <label className="form-label" htmlFor="nickname">
            Nickname:{' '}
          </label>
          <input
            className="form-control"
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
