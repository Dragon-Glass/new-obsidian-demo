import { React, useObsidian, BrowserCache } from '../../../deps.ts';
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
  const allMoviesQuery = `query { 
    movies {
      id
      title
      releaseYear
      actors {
        id
        firstName
        lastName
      }
      genre
    }
  }
`;
  const [nickName, setNickName] = (React as any).useState('');
  const [valueNickname, setValueNickname] = (React as any).useState('');
  const [valueMovie, setValueMovie] = (React as any).useState('');
  const [value, setValue] = (React as any).useState('');
  const { query, mutate, cache, setCache, clearCache } = useObsidian();
  if (props.display === 'Movies') {
    const {
      title = '',
      releaseYear = 0,
      actors = [],
      id,
      genre = '',
    } = props.info;
    const handleChange = (event: any) => {
      setValue(event.target.value);
    };
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const associateActorWithMovie = `
        mutation {
          associateActorWithMovie (input:{actorId:${props.actorList[value]}, movieId:${e.target.parentNode.id}, respType:MOVIE}){
            ... on Movie{
              title
              __typename
              id
            }
            ... on Actor{
              __typename
            firstName
            id
            }
        }
      `;
      const res = await mutate(associateActorWithMovie);
      console.log(res);
      const newResponse = await query(allMoviesQuery);
      props.setCardsResponse(newResponse.data);
    };
    const deleteMovie = async (e: any) => {
      const deleteMovieMutation = `mutation {deleteMovie(id:${e.target.parentNode.id}){
            id
            title
          }
          }`;
      await mutate(deleteMovieMutation, { toDelete: true });
      await setCache(new BrowserCache(cache.storage));
      const newResponse = await query(allMoviesQuery);
      props.setCardsResponse(newResponse.data);
      props.setDisplay('all movies');
    };
    const arrOfOptions: any = [];
    let outputActor: any = '';
    actors.forEach((actor: any) => {
      outputActor = outputActor + actor.firstName + ' ' + actor.lastName + ', ';
    });
    const arrOfActors = Object.keys(props.actorList);
    arrOfActors.forEach((actor: any) => {
      arrOfOptions.push(<option value={actor}>{actor}</option>);
    });
    return (
      <article className="card movieCard" id={props.id}>
        <div className="movieHeadContainer">
          <h3 className="movieTitle">{title}</h3>
        </div>
        <ul className="movieDetailsList">
          <li className="movDetail"> Release Year: {releaseYear}</li>
          <li className="movDetail"> Actors: {outputActor}</li>
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
        <button className="btn btn-primary" onClick={deleteMovie}>
          Delete Movie
        </button>
      </article>
    );
  } else if (props.display === 'Actors') {
    const { firstName, lastName, movies = [], nickname = '', id } = props.info;
    const allActorsQuery = `query {
      actors {
        id
        firstName
        lastName
        nickname
        movies {
          id
          title
          releaseYear
          genre
        }
      }
    }
  `;
    const handleChange = (event: any) => {
      setValueMovie(event.target.value);
    };
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      console.log(event.target.parentNode);
      const associateActorWithMovie = `
  mutation addingActor{
    associateActorWithMovie(input:{actorId:${event.target.parentNode.id},movieId: ${props.movieList[valueMovie]}, respType:ACTOR}){
      ...on Movie{
        title
        __typename
        id
      }
      ...on Actor{
        __typename
      firstName
      lastName
      }
    }
  }
`;
      const res = await mutate(associateActorWithMovie);
      const newResponse = await query(allActorsQuery);
      props.setCardResponse(newResponse.data);
    };
    const updateNickname = `
    mutation {
      updateNickname(input:{actorId{${props.id}}nickname:${valueNickname}}){
        __typename
        id
        nickname
      }
    }
  `;
    const handleChangeNickname = (event: any) => {
      setValueNickname(event.target.value);
    };
    const handleSubmitNickname = async (event: any) => {
      event.preventDefault();
      const res = await mutate(updateNickname);
      const newResponse = await query(allActorsQuery);
      props.setCardResponse(newResponse.data);
    };
    const arrOfOptions: any = [];
    const arrOfMovies = Object.keys(props.movieList);
    arrOfMovies.forEach((movie: any) => {
      arrOfOptions.push(<option value={movie}>{movie}</option>);
    });
    let outputMovie: any = '';
    movies.forEach((movie: any) => {
      outputMovie = outputMovie + movie.title + ', ';
    });
    //deleting actor
    const deleteActor = async (e: any) => {
      const deleteActorMutation = `mutation {deleteActor(id:${e.target.parentNode.id}){
      id
      firstName
    }
    }`;
      await mutate(deleteActorMutation, { toDelete: true });
      await setCache(new BrowserCache(cache.storage));
      const newResponse = await query(allActorsQuery);
      props.setCardResponse(newResponse.data);
      props.setDisplay('all actors');
    };
    return (
      <article className="card actorCard" id={props.id}>
        <div className="actorHeadContainer">
          <h3 className="actorName">{firstName}</h3>
        </div>
        <ul className="actorDetailsList">
          <li className="actorDetail"> Last Name: {lastName}</li>
          <li className="actorDetail"> Movies: {outputMovie}</li>
          <li className="actorDetail"> Nickname: {nickname}</li>
        </ul>
        <form onSubmit={handleSubmitNickname}>
          <label>
            Nickname:
            <input
              type="text"
              value={valueNickname}
              onChange={handleChangeNickname}
            />
          </label>
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
        <form onSubmit={handleSubmit} id={props.id}>
          <label>
            Add Movie
            <select value={valueMovie} onChange={handleChange}>
              {arrOfOptions}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={deleteActor}>Delete Actor</button>
      </article>
    );
  }
};
export default CardDisplay;
