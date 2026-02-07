import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';

const heading = React.createElement('h1', null, 'Hello from React!');

const jsxHeading = <h1>Hello from React using JSX!</h1>;

const root = createRoot(document.getElementById('root'));
// root.render(heading);
// root.render(jsxHeading);
root.render(<App />);
