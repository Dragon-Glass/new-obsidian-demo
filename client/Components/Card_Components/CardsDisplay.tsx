import { React, useObsidian } from '../../../deps.ts';
import CardDisplay from './CardDisplay.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      h1: any;
    }
  }
}

const CardsDisplay = (props: any) => {
  // const [display, setDisplay] = (React as any).useState('');
  // const { cache } = useObsidian();
  // const cards = [];

  return (
    <div>
      <h1> Here The Cards </h1>
      <CardDisplay display={props.display} />
    </div>
  );
};
export default CardsDisplay;
