import { React } from '../../deps.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      article: any;
      h3: any;
      ul: any;
      li: any;
      button: any;
      form: any;
      input: any;
      label: any;
      select: any;
      option: any;
    }
  }
}

const CardDisplay = (props: any) => {
  const [nickName, setNickName] = (React as any).useState('');
  const [popup, setPopup] = (React as any).useState(false);
  const [value, setValue] = (React as any).useState('');

  const togglePopup = (e: any) => {
    e.preventDefault();
    setPopup(!popup);
  };

  if (props.display === 'Movies') {
    const handleChange = (event: any) => {
      setValue(event.target.value);
    };

    const handleSubmit = (event: any) => {
      const associateActorWithMovie = `
    mutation {
      associateActorWithMovie(input:${event.target.value}){
        __typename
      }
    }
  `;
      // mutate(associateActorWithMovie)
      event.preventDefault();
    };

    const { title, releaseYear, actors = [], genre, id } = props.info;
    // const deleteMovie => (id:any) => {
    //   const deleteMovieMutation = `mutation {deleteMovie(id:${id}){
    //     id
    //     title
    //   }
    //   }`;
    //   // mutate(deleteMovie, {toDelete=true});
    // }
    const arrOfOptions: any = [];
    props.actorList.forEach((actor: any) => {
      arrOfOptions.push(<option value={actor}>{actor}</option>);
    });
    return (
      <article className="card movieCard">
        <div className="movieHeadContainer">
          <h3 className="movieTitle">{title}</h3>
        </div>
        <ul className="movieDetailsList">
          <li className="movDetail"> Release Year: {releaseYear}</li>
          <li className="movDetail"> Actors: {actors}</li>
          <li className="movDetail"> Genre: {genre}</li>
        </ul>
        <form onSubmit={handleSubmit}>
          <label>
            Add Actor
            <select value={value} onChange={handleChange}>
              {arrOfOptions}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button>Delete Movie</button>
      </article>
    );
  }

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    const associateActorWithMovie = `
  mutation {
    associateActorWithMovie(input:${event.target.value}){
      __typename
    }
  }
`;
    // mutate(associateActorWithMovie);
    event.preventDefault();
  };
  const updateNickname = `
    mutation {
      updateNickname(input: ${nickName}){
        __typename
        id
        nickname
      }
    }
  `;

  const handleChangeNickname = (event: any) => {
    setNickName(event.target.value);
  };
  const handleSubmitNickname = (event: any) => {
    // mutate(updateNickname);
    event.preventDefault();
  };

  const { firstName, lastName, movies = [], nickname = '' } = props.info;
  const arrOfOptions: any = [];
  props.movieList.forEach((movie: any) => {
    arrOfOptions.push(<option value={movie}>{movie}</option>);
  });

  // const deleteActor => (id:any) => {
  //   const deleteActorMutation = `mutation {deleteActor(id:${id}){
  //     id
  //     firstName
  //   }
  //   }`;
  //   // mutate(deleteActor, {toDelete=true});
  // }
  return (
    <article className="card actorCard">
      <div className="actorHeadContainer">
        <h3 className="actorName">{firstName}</h3>
      </div>
      <ul className="actorDetailsList">
        <li className="actorDetail"> Last Name: {lastName}</li>
        <li className="actorDetail"> Movies: {movies}</li>
        <li className="actorDetail"> Nickname: {nickname}</li>
      </ul>
      <form onSubmit={handleSubmitNickname}>
        <label>
          Nickname:
          <input type="text" value={value} onChange={handleChangeNickname} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={handleSubmit}>
        <label>
          Add Movie
          <select value={value} onChange={handleChange}>
            {arrOfOptions}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button>Delete Actor</button>
    </article>
  );
};

export default CardDisplay;
