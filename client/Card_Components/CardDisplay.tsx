import { React, useObsidian } from '../../deps.ts';

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
  const [value, setValue] = (React as any).useState('');

  const { mutate } = useObsidian();

  if (props.display === 'Movies') {
    const { title, releaseYear, actors = [], genre, id } = props.info;
    const handleChange = (event: any) => {
      setValue(event.target.value);
    };

    const handleSubmit = async (event: any) => {
      const associateActorWithMovie = `
    mutation {
      associateActorWithMovie(input:{movieId:${id}, actorId:${
        props.actorList[event.target.value]
      }, respType:MOVIE}){
        __typename
        title
        actors
      }
    }
  `;
      const start = Date.now();
      const res = await mutate(associateActorWithMovie);
      props.setQueryTime(Date.now() - start);
      props.setResponse(JSON.stringify(res.data));

      event.preventDefault();
    };

    const deleteMovie = async (id: any) => {
      const deleteMovieMutation = `mutation {deleteMovie(id:${id}){
            id
            title
          }
          }`;
      const start = Date.now();
      const res = await mutate(deleteMovieMutation, { toDelete: true });
      props.setQueryTime(Date.now() - start);
      props.setResponse(JSON.stringify(res.data));
    };
    const arrOfOptions: any = [];
    const arrOfActors = Object.keys(props.actorList);
    arrOfActors.forEach((actor: any) => {
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
        <button onClick={deleteMovie}>Delete Movie</button>
      </article>
    );
  }

  const { firstName, lastName, movies = [], nickname = '', id } = props.info;
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    const associateActorWithMovie = `
  mutation {
    associateActorWithMovie(input:{actorId:${id},movieId: ${
      props.movieList[event.target.value]
    }, respType:ACTOR}){
      __typename
      firstName
      lastName
      movies
    }
  }
`;
    const start = Date.now();
    const res = await mutate(associateActorWithMovie);
    props.setQueryTime(Date.now() - start);
    props.setResponse(JSON.stringify(res.data));
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
  const handleSubmitNickname = async (event: any) => {
    const start = Date.now();
    const res = await mutate(updateNickname);
    props.setQueryTime(Date.now() - start);
    props.setResponse(JSON.stringify(res.data));
    event.preventDefault();
  };

  const arrOfOptions: any = [];
  const arrOfMovies = Object.keys(props.movieList);
  arrOfMovies.forEach((movie: any) => {
    arrOfOptions.push(<option value={movie}>{movie}</option>);
  });

  const deleteActor = async (id: any) => {
    const deleteActorMutation = `mutation {deleteActor(id:${id}){
      id
      firstName
    }
    }`;
    const start = Date.now();
    const res = await mutate(deleteActorMutation, { toDelete: true });
    props.setQueryTime(Date.now() - start);
    props.setResponse(JSON.stringify(res.data));
  };
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
      <button onClick={deleteActor}>Delete Actor</button>
    </article>
  );
};

export default CardDisplay;
