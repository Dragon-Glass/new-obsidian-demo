import { React, ReactDOMServer } from '../../deps.ts';
import cacheDisplay from './cacheDisplay.tsx';
import responseDisplay from './responseDisplay.tsx';
import timerQuery from './timerQuery.tsx';

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
