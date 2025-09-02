import React, { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../../context/CustomerContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const CustomerList = () => {
    const { customers, fetchCustomers, loading, setCustomers } = useContext(CustomerContext);
    const [filters, setFilters] = useState({ city: '', state: '', pin: '' });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure to delete this customer?')){
            await axios.delete(`http://localhost:5000/api/customers/${id}`);
            fetchCustomers(filters);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    };

    const applyFilters = () => {
        fetchCustomers(filters);
    };

    const clearFilters = () => {
        setFilters({ city: '', state: '', pin: '' });
        fetchCustomers();
    };

    return (
        <div className="customer-list">
            <h2>Customer List</h2>
            <div className="filters">
                <input placeholder="City" name="city" value={filters.city} onChange={handleFilterChange} />
                <input placeholder="State" name="state" value={filters.state} onChange={handleFilterChange} />
                <input placeholder="PIN" name="pin" value={filters.pin} onChange={handleFilterChange} />
                <button onClick={applyFilters}>Apply</button>
                <button onClick={clearFilters}>Clear</button>
            </div>
            {loading ? <p>Loading...</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.firstName} {c.lastName}</td>
                                <td>{c.phone}</td>
                                <td>{c.city}</td>
                                <td>{c.state}</td>
                                <td>
                                    <Link to={`/customer/${c.id}`}>View</Link>
                                    <Link to={`/edit-customer/${c.id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(c.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CustomerList;
