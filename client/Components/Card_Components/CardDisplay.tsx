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
  const [nickName, setNickName] = (React as any).useState('');
  const [value, setValue] = (React as any).useState('');
  const { query, mutate, cache, setCache, clearCache } = useObsidian();

  if (props.display === 'Movies') {
    const { title, releaseYear, actors = [], id } = props.info;
    const handleChange = (event: any) => {
      setValue(event.target.value);
    };

    const handleSubmit = async (event: any) => {
      //     const associateActorWithMovie = `
      //   mutation {
      //     associateActorWithMovie(input:{movieId:${id}, actorId:${
      //       objOfActors[event.target.value]
      //     }, respType:MOVIE}){
      //       __typename
      //       title
      //       actors
      //     }
      //   }
      // `;
      // const start = Date.now();
      // const res = await mutate(associateActorWithMovie);
      // props.setQueryTime(Date.now() - start);
      // props.setResponse(JSON.stringify(res.data));

      event.preventDefault();
    };

    const deleteMovie = async (e: any) => {
      console.log(e.target.parentNode.id);

      const deleteMovieMutation = `mutation {deleteMovie(id:${e.target.parentNode.id}){
            id
            title
          }
          }`;
      const res = await mutate(deleteMovieMutation, { toDelete: true });
      await setCache(new BrowserCache(cache.storage));
      console.log('res', res);
      const newResponse = await query(allMoviesQuery);
      props.setCardsResponse(newResponse.data);
      props.setDisplay('all movies');
      console.log('newResponse', newResponse);
    };

    // const findActors = (arrOfMovies: any) => {
    //   const output: any = {};
    //   arrOfMovies.forEach((actor: any) => {
    //     let act = actor.firstName + ' ' + actor.lastName;
    //     output[act] = actor.id;
    //   });
    //   return output;
    // };

    // console.log(JSON.parse(props.actorList));
    // const arr = JSON.parse(props.actorList);
    // const objOfActors = findActors(arr.actors);
    const arrOfOptions: any = [];
    // console.log(props.actorList.actors);
    let outputActor: any = '';
    actors.forEach((actor: any) => {
      outputActor = outputActor + actor.firstName + ' ' + actor.lastName + ', ';
    });
    // const arrOfActors = Object.keys(objOfActors);
    // arrOfActors.forEach((actor: any) => {
    //   arrOfOptions.push(<option value={actor}>{actor}</option>);
    // });
    return (
      <article className="card movieCard" id={props.id}>
        <div className="movieHeadContainer">
          <h3 className="movieTitle">{title}</h3>
        </div>
        <ul className="movieDetailsList">
          <li className="movDetail"> Release Year: {releaseYear}</li>
          <li className="movDetail"> Actors: {outputActor}</li>
          {/* <li className="movDetail"> Genre: {genre}</li> */}
        </ul>
        {/* <form onSubmit={handleSubmit}>
          <label>
            Add Actor
            <select value={value} onChange={handleChange}>
              {arrOfOptions}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form> */}
        <button className="btn btn-primary" onClick={deleteMovie}>
          Delete Movie
        </button>
      </article>
    );
  } else if (props.display === 'Actors') {
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
      // const start = Date.now();
      // const res = await mutate(associateActorWithMovie);
      // props.setQueryTime(Date.now() - start);
      // props.setResponse(JSON.stringify(res.data));
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
      props.setCardsResponse(JSON.stringify(res.data));
      event.preventDefault();
    };

    const arrOfOptions: any = [];
    // const arrOfMovies = Object.keys(props.movieList);
    // arrOfMovies.forEach((movie: any) => {
    //   arrOfOptions.push(<option value={movie}>{movie}</option>);
    // });
    let outputMovie: any = '';
    movies.forEach((movie: any) => {
      outputMovie = outputMovie + movie.title + ', ';
    });
    const deleteActor = async (e: any) => {
      const deleteActorMutation = `mutation {deleteActor(id:${id}){
      id
      firstName
    }
    }`;
      console.log(e.target.parentNode.id);

      const res = await mutate(deleteActorMutation, { toDelete: true });
      await setCache(new BrowserCache(cache.storage));
      console.log('res', res);
      const newResponse = await query(allActorsQuery);
      props.setCardsResponse(newResponse.data);
      props.setDisplay('all actors');
      console.log('newResponse', newResponse);
    };

    return (
      <article className="card actorCard">
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
            <input type="text" value={value} onChange={handleChangeNickname} />
          </label>
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
        {/* <form onSubmit={handleSubmit}>
          <label>
            Add Movie
            <select value={value} onChange={handleChange}>
              [arrOfOptions]
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form> */}
        <button onClick={deleteActor}>Delete Actor</button>
      </article>
    );
  }
};
export default CardDisplay;
