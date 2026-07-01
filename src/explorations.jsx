import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import ExplorationsApp from './components/ExplorationsApp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ExplorationsApp />
    <Analytics />
  </>,
);
