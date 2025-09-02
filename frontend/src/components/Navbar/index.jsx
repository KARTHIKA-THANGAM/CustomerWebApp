import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>Customer Management</h2>
            <div className="nav-links">
                <Link to="/">Customer List</Link>
                <Link to="/add-customer">Add Customer</Link>
            </div>
        </nav>
    );
};

export default Navbar;
