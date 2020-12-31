import { React, ReactDOMServer } from "../deps.ts";

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
    <div className="app">
      <h1>Hello! i was ready before i got here</h1>
    </div>
  );
}
export default App;