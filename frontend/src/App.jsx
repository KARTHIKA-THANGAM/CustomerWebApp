import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerProfile from './components/CustomerProfile';
import './App.css';

function App() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<CustomerList />} />
                    <Route path="/add-customer" element={<CustomerForm />} />
                    <Route path="/edit-customer/:id" element={<CustomerForm />} />
                    <Route path="/customer/:id" element={<CustomerProfile />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
