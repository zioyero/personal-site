import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import RFCSpec from './components/RFCSpec.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RFCSpec />
    <Analytics />
  </React.StrictMode>,
);
