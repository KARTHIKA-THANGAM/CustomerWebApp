import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const AddressList = ({ customerId }) => {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({ address: '', city: '', state: '', pin: '' });

    const fetchAddresses = () => {
        axios.get(`http://localhost:5000/api/addresses/${customerId}`)
            .then(res => setAddresses(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchAddresses();
    }, [customerId]);

    const handleChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const addAddress = async () => {
        if(!newAddress.address || !newAddress.city || !newAddress.state || !newAddress.pin){
            alert('All fields required');
            return;
        }
        await axios.post(`http://localhost:5000/api/addresses`, { ...newAddress, customerId });
        setNewAddress({ address: '', city: '', state: '', pin: '' });
        fetchAddresses();
    };

    const deleteAddress = async (id) => {
        if(window.confirm('Delete this address?')){
            await axios.delete(`http://localhost:5000/api/addresses/${id}`);
            fetchAddresses();
        }
    };

    return (
        <div className="address-list">
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map(a => (
                        <tr key={a.id}>
                            <td>{a.address}</td>
                            <td>{a.city}</td>
                            <td>{a.state}</td>
                            <td>{a.pin}</td>
                            <td><button onClick={() => deleteAddress(a.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="add-address">
                <input name="address" placeholder="Address" value={newAddress.address} onChange={handleChange}/>
                <input name="city" placeholder="City" value={newAddress.city} onChange={handleChange}/>
                <input name="state" placeholder="State" value={newAddress.state} onChange={handleChange}/>
                <input name="pin" placeholder="Pin" value={newAddress.pin} onChange={handleChange}/>
                <button onClick={addAddress}>Add Address</button>
            </div>
        </div>
    );
};

export default AddressList;
