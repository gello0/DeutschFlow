
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Fatal Error: Could not find 'root' element in index.html");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React Mount Error:", error);
    rootElement.innerHTML = `<div style="padding:20px;color:red">Application crashed during mount: ${error}</div>`;
  }
}
