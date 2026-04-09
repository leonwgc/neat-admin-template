/**
 * @file src/index.tsx
 * @author leon.wang
 */

import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import App from './App';
import './scss/index.scss';

createRoot(document.getElementById('app')).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
