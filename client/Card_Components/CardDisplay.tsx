import { React } from '../../deps.ts';

declare global {
    namespace JSX {
      interface IntrinsicElements {
        div: any;
        article:any;
        h3: any;
        ul: any;
        li: any;
      }
    }
  }

  const cardDisplay = (props: any) =>{
      if(props.display === 'Movies'){
          return(
          const {title, releaseYear,actors=[],genre} = props.info;
      
          <article className="card movieCard">
            <div className="movieHeadContainer">
                <h3 className="movieTitle">{title}</h3>
            </div>
            <ul className="movieDetailsList">
                <li className="movDetail"> Release Year: {releaseYear}</li>
                <li className="movDetail"> Actors: {actors}</li>
                <li className="movDetail"> Genre: {genre}</li>
            </ul>
            </article>
          )
      }
      const {firstName, lastName, movies=[], nickname=''} = props.info;
      return(
        <article className="card actorCard">
            <div className="actorHeadContainer">
                <h3 className="actorName">{firstName}</h3>
            </div>
            <ul className="actorDetailsList">
                <li className="actorDetail"> Last Name: {releaseYear}</li>
                <li className="actorDetail"> Movies: {Movies}</li>
                <li className="actorDetail"> Nickname: {nickname}</li>
            </ul>
            </article>
          )
      

  }