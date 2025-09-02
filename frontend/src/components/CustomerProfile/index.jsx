import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddressList from '../AddressList';
import './index.css';

const CustomerProfile = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/customers/${id}`)
            .then(res => setCustomer(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if(!customer) return <p>Loading...</p>;

    return (
        <div className="customer-profile">
            <h2>{customer.firstName} {customer.lastName}</h2>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Address:</strong> {customer.address}, {customer.city}, {customer.state} - {customer.pin}</p>

            <h3>Other Addresses</h3>
            <AddressList customerId={id} />
        </div>
    );
};

export default CustomerProfile;
