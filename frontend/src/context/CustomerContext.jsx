import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCustomers = async (filters = {}) => {
        setLoading(true);
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await axios.get(`http://localhost:5000/api/customers?${query}`);
            setCustomers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CustomerContext.Provider value={{ customers, fetchCustomers, loading, setCustomers }}>
            {children}
        </CustomerContext.Provider>
    );
};
