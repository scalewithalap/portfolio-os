/**
 * @file main.tsx
 * @description React 19 application entry point for Scale with Alap (Portfolio OS).
 *
 * Responsibilities:
 * - Bootstraps the React DOM root into element #root.
 * - Enforces React StrictMode for development safety.
 * - Imports global Tailwind CSS v4 styling rules from index.css.
 */

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
