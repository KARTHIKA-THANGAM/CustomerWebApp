import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const CustomerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        firstName: '', lastName: '', phone: '', address: '', city: '', state: '', pin: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if(id){
            axios.get(`http://localhost:5000/api/customers/${id}`)
                .then(res => setCustomer(res.data))
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleChange = (e) => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!customer.firstName || !customer.lastName || !customer.phone || !customer.address || !customer.city || !customer.state || !customer.pin){
            setError('All fields are required');
            return;
        }
        try{
            if(id){
                await axios.put(`http://localhost:5000/api/customers/${id}`, customer);
                alert('Customer updated successfully');
            } else {
                await axios.post(`http://localhost:5000/api/customers`, customer);
                alert('Customer added successfully');
            }
            navigate('/');
        } catch(err){
            console.error(err);
            setError('Server error. Please try again.');
        }
    };

    return (
        <div className="customer-form">
            <h2>{id ? 'Edit Customer' : 'Add Customer'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input name="firstName" placeholder="First Name" value={customer.firstName} onChange={handleChange} />
                <input name="lastName" placeholder="Last Name" value={customer.lastName} onChange={handleChange} />
                <input name="phone" placeholder="Phone Number" value={customer.phone} onChange={handleChange} />
                <input name="address" placeholder="Address" value={customer.address} onChange={handleChange} />
                <input name="city" placeholder="City" value={customer.city} onChange={handleChange} />
                <input name="state" placeholder="State" value={customer.state} onChange={handleChange} />
                <input name="pin" placeholder="Pin Code" value={customer.pin} onChange={handleChange} />
                <button type="submit">{id ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default CustomerForm;
