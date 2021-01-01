import { React } from '../../deps.ts';
import CardsDisplay from './CardsDisplay.ts';
import QueryDisplay from './QueryDisplay.ts';
import MutationDisplay from './MutationDisplay.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
    }
  }
}

const CardsContainer = (props: any) => {
  return (
    <>
    <div className='cardsContainer'>
        <CardsDisplay />
        <QueryDisplay />
        <MutationDisplay />
    </div>
    </>
  )
}

export default CardsContainer;