/**
 * @file src/index.tsx
 * @author leon.wang
 */

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { configureDevtools } from '@derbysoft/zustand-kit';
import configureHelpWidgets from './config.helpWidgets';
import App from './App';
import './scss/index.scss';

configureDevtools(!process.env.NODE_ENV?.startsWith('production'));

configureHelpWidgets();

createRoot(document.getElementById('app') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
