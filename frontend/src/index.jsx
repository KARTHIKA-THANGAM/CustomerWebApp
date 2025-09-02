import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CustomerProvider } from './context/CustomerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <CustomerProvider>
            <App />
        </CustomerProvider>
    </BrowserRouter>
);
