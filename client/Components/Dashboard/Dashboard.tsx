import { React, useObsidian } from '../../../deps.ts';
import CacheResponseDisplay from './CacheResponse&Display.tsx';
import TimerQueryDisplay from './Timer&QueryDisplay.tsx';

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
const Dashboard = (props: any) => {
  // const { query, cache, clearCache } = useObsidian();
  return (
    <div className="dashboard">
      <TimerQueryDisplay />
      <CacheResponseDisplay />
    </div>
  );
};
export default Dashboard;
