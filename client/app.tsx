import { React, ReactDOMServer, ObsidianWrapper } from '../deps.ts';
// import Dashboard from './Components/Dashboard/Dashboard.tsx';
import { CardsContainer } from './Components/Card_Components/CardsContainer.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      p: any;
    }
  }
}
const App = () => {
  return (
    <ObsidianWrapper>
      <div className="app">
        {/* <h1>Hello!!!!! i was ready before i got here</h1> */}
        <CardsContainer />
      </div>
    </ObsidianWrapper>
  );
};
export default App;
