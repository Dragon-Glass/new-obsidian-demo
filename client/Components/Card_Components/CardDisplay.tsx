import { React } from '../../../deps.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      article: any;
      h3: any;
      ul: any;
      li: any;
    }
  }
}

const cardDisplay = (props: any) => {
  // const { title, releaseYear, actors = [], genre } = props.info;
  // if (props.display === 'Movies') {
  return (
    <article className="card movieCard">
      <div className="movieHeadContainer">
        <h3 className="movieTitle">MOVIE 1</h3>
        <ul className="movieDetailsList">
          <li className="movDetail"> Release Year: </li>
          <li className="movDetail"> Actors: </li>
          <li className="movDetail"> Genre: </li>
        </ul>
      </div>
      <div className="actorHeadContainer">
        <h3 className="actorName">ACTOR 1</h3>
        <ul className="actorDetailsList">
          <li className="actorDetail"> Last Name: </li>
          <li className="actorDetail"> Movies:</li>
          <li className="actorDetail"> Nickname: </li>
        </ul>
      </div>
    </article>
  );
  // }
  // const { firstName, lastName, movies = [], nickname = '' } = props.info;
  // return (
  //   <article className="card actorCard">
  //     <div className="actorHeadContainer">
  //       <h3 className="actorName"></h3>
  //       <ul className="actorDetailsList">
  //         <li className="actorDetail"> Last Name: </li>
  //         <li className="actorDetail"> Movies:</li>
  //         <li className="actorDetail"> Nickname: </li>
  //       </ul>
  //     </div>
  //   </article>
  // );
};
export default cardDisplay;
