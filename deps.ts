import React from 'https://dev.jspm.io/react';
import ReactDOMServer from 'https://dev.jspm.io/react-dom/server';
import ReactDom from 'https://dev.jspm.io/react-dom';
import {
  ObsidianWrapper,
  useObsidian,
  BrowserCache,
} from 'https://deno.land/x/obsidian/clientMod.ts';
// } from '../obsidian/clientMod.ts';

import rsh from 'https://dev.jspm.io/react-syntax-highlighter';

const realRSH: any = rsh;

const CodeBlock = realRSH.Prism;

export {
  BrowserCache,
  ObsidianWrapper,
  useObsidian,
  React,
  ReactDOMServer,
  ReactDom,
  CodeBlock,
};
