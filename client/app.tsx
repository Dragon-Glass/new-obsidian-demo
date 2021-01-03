import { React, ReactDOMServer, ObsidianWrapper } from '../deps.ts';
import Dashboard from './Components/Dashboard/Dashboard.tsx';
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
        <div className="cardsContainer">
          <div>
            <h1>Here the cards</h1>
          </div>
          <div>
            <h1>Here the Queries/Mutations</h1>
          </div>
        </div>
        <Dashboard />
      </div>
    </ObsidianWrapper>
  );
};
export default App;
