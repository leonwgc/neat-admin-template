/**
 * @file src/index.tsx
 * @author leon.wang
 */

import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import App from './App';
import './scss/index.scss';
import { configureDevtools } from '@derbysoft/zustand-kit';

configureDevtools(!process.env.NODE_ENV?.startsWith('production'));

createRoot(document.getElementById('app') as HTMLElement).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
