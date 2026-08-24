import './index.css';
import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from './App';
import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root')!;
const app = (
    <React.StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </React.StrictMode>
);

if (container.hasChildNodes()) {
    hydrateRoot(container, app);
} else {
    createRoot(container).render(app);
}
