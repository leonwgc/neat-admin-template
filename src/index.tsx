import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import App from './App';
import './scss/index.scss';

// replace with BrowserRouter if your server supports it and you prefer clean URLs
createRoot(document.getElementById('app')).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
