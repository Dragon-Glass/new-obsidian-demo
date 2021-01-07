import { React, ReactDOMServer, ObsidianWrapper } from '../deps.ts';
// import Dashboard from './Components/Dashboard/Dashboard.tsx';
import { CardsContainer } from './Components/Card_Components/CardsContainer.tsx';

declare global {
  namespace JSX {
    // interface IntrinsicElements {
    //   button: any;
    //   div: any;
    //   h1: any;
    //   p: any;
    // }
  }
}
const App = () => {
  return (
    <ObsidianWrapper>
      <div className="app">
        <h1>OBSIDIAN DEMO </h1>
        <h2>Brangelina Showcase</h2>
        <CardsContainer />
      </div>
    </ObsidianWrapper>
  );
};
export default App;
