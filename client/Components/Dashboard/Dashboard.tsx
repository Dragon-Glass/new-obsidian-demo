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
    }
  }
}
const Dashboard = (props: any) => {
  const { queryTime, gqlRequest, response } = props;
  const { query, cache, setCache, clearCache } = useObsidian();
  return (
    // <CardsContainer>
    <div>
      <h1>Dashboard</h1>
      <TimerQueryDisplay queryTime={queryTime} gqlRequest={gqlRequest} />
      <CacheResponseDisplay response={response} />
    </div>
    /* </CardsContainer> */
  );
};
export default Dashboard;
