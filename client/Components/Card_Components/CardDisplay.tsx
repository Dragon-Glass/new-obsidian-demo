import { React, useObsidian, BrowserCache } from '../../../deps.ts';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      article: any;
      h4: any;
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
              id
              actors {
                id
                movies{
                  id
                }
              }
            }
            ... on Actor{
              id
            }
          }
        }
      `;
      console.log('gql queryStr', associateActorWithMovie);
      const res = await mutate(associateActorWithMovie);
      console.log('response from server', res);
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
          <h4 className="movieTitle">{title}</h4>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            {' '}
            <span>Release Year:</span> {releaseYear}
          </li>
          <li className="list-group-item">
            {' '}
            <span>Actors: </span>
            {outputActor}
          </li>
          <li className="list-group-item">
            {' '}
            <span> Genre: </span>
            {genre}
          </li>
        </ul>
        <form onSubmit={handleSubmit}>
          <label>
            Add Actor
            <select
              className="form-select"
              required
              value={value}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {arrOfOptions}
            </select>
          </label>
          <input
            // className="btn btn-outline-secondary"
            type="submit"
            value="Submit"
          />
        </form>
        <button onClick={deleteMovie}>Delete Movie</button>
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
      const associateActorWithMovie = `
  mutation addingActor{
    associateActorWithMovie(input:{actorId:${event.target.parentNode.id},movieId: ${props.movieList[valueMovie]}, respType:ACTOR}){
    ... on Actor{
          id
          movies {
            id
            actors {
              id
            }
          }
        }
        ... on Movie{
          id
        }
      }
    }
`;
      console.log('movieList', props.movieList);
      console.log('valueMovie', valueMovie);
      console.log('gql queryStr', associateActorWithMovie);
      const res = await mutate(associateActorWithMovie);
      console.log('response fro, server', res);
      const newResponse = await query(allActorsQuery);
      props.setCardsResponse(newResponse.data);
    };
    const updateNickname = `
    mutation {
      updateNickname(input:{actorId:${props.id}, nickname: "${valueNickname}" }){
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
      await mutate(updateNickname);
      const newResponse = await query(allActorsQuery);
      props.setCardsResponse(newResponse.data);
      setValueNickname('');
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
      props.setCardsResponse(newResponse.data);
      props.setDisplay('all actors');
    };
    return (
      <article className="card actorCard" id={props.id}>
        <div className="actorHeadContainer">
          <h4 className="actorName">{firstName}</h4>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            {' '}
            <span>Last Name: </span> {lastName}
          </li>
          <li className="list-group-item">
            {' '}
            <span>Movies:</span> {outputMovie}
          </li>
          <li className="list-group-item">
            {' '}
            <span>Nickname:</span> {nickname}
          </li>
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
          <input
            className="btn btn-outline-secondary"
            type="submit"
            value="Submit"
          />
        </form>
        <form onSubmit={handleSubmit} id={props.id}>
          <label>
            Add Movie <br />
            <select
              className="form-select"
              required
              value={valueMovie}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {arrOfOptions}
            </select>
          </label>
          <input
            // className="btn btn-outline-secondary"
            type="submit"
            value="Submit"
          />
        </form>
        <button onClick={deleteActor}>Delete Actor</button>
      </article>
    );
  }
};
export default CardDisplay;
