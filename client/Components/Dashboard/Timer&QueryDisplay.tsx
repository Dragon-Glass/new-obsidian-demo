import { React, useObsidian } from '../../../deps.ts';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      br: any;
      pre: any;
      code: any;
      label: any;
      select: any;
      option: any;
      p: any;
      input: any;
    }
  }
}

const TimerQueryDisplay = (props: any) => {
  const queryTime = 0;
  const query = 'this is the query';
  // const [queryTime, setQueryTime] = (React as any).useState(0);
  // const start = Date.now();
  // setQueryTime(Date.now() - start);
  return (
    <div className="timer-query">
      <div className="timer">
        <code className="code-block query-timer" id="code-black">
          {`Request Timer: ${queryTime}ms`}
        </code>
      </div>
      <div className="query">
        <div className="showQuery">
          <pre className="pre-block" id="stretchQuery">
            Query:
            <code className="code-block" id="code-black">
              {query}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
export default TimerQueryDisplay;
