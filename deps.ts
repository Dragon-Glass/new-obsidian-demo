import React from 'https://dev.jspm.io/react';
import ReactDOMServer from 'https://dev.jspm.io/react-dom/server';
import ReactDom from 'https://dev.jspm.io/react-dom';
import {
  ObsidianWrapper,
  useObsidian,
} from '../obsidian/src/ObsidianWrapper.jsx';
import rsh from 'https://dev.jspm.io/react-syntax-highlighter';
import codeStyles from 'https://dev.jspm.io/npm:react-syntax-highlighter@15.3.1/dist/cjs/styles/prism';

const realRSH: any = rsh;
const realCodeStyles: any = codeStyles;

const CodeBlock = realRSH.Prism;
const { dracula } = realCodeStyles;

export {
  React,
  ReactDOMServer,
  ReactDom,
  ObsidianWrapper,
  useObsidian,
  CodeBlock,
  dracula,
};
