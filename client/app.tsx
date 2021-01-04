import { React, ObsidianWrapper } from '../deps.ts';
import Test from './test.tsx';

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
    <div className="app">
      <h1>Hello! i was ready before i got here</h1>
      <ObsidianWrapper>
        <Test />
      </ObsidianWrapper>
    </div>
  );
};
export default App;
