import { react, useObsidian } from '../../deps.ts'
import CardDisplay from './CardDisplay.tsx'

declare global {
    namespace JSX {
      interface IntrinsicElements {
        div: any;
        h1: any;
      }
    }
  }

  const CardsDisplay = (props: any) => {
      const [display, setDisplay] = (React as any).useState('')
      const {cache} = useObsidian();
      const cards =[]
      
      render() {
      if(!cache.ROOT_QUERY){ 
        return(
            <div>
                <h1> No data to be displayed </h1>
            </div>
        )
      }
      } 
  }