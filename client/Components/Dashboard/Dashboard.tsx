import { React, useObsidian } from '../../../deps.ts';
import CacheResponseDisplay from './CacheResponse&Display.tsx';
import TimerQueryDisplay from './Timer&QueryDisplay.tsx';
import { CardsContainer } from '../Card_Components/CardsContainer.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      p: any;
      h2: any;
    }
  }
}
const Dashboard = (props: any) => {
  const { queryTime, gqlRequest, dashResponse } = props;
  const { query, cache, setCache, clearCache } = useObsidian();
  return (
    // <CardsContainer>
    <div>
      <h2 style={{ color: '#e83e8c', textAlign: 'center' }}>Dashboard</h2>
      <TimerQueryDisplay queryTime={queryTime} gqlRequest={gqlRequest} />
      <CacheResponseDisplay dashResponse={dashResponse} />
    </div>
    /* </CardsContainer> */
  );
};
export default Dashboard;
