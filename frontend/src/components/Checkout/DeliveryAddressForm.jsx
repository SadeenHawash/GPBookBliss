import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import { useOrderContext } from '@/context/orderContext';
import { createOrderAPI, getUserShippingAddresses } from '@/APIServices/Orders/ordersAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DeliveryAddressForm = () => {
    const navigate = useNavigate();
    const {addresses, setAddresses} = useOrderContext();
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const newAddress = selectedAddressId ? null : {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            streetAddress: data.get('address'),
            city: data.get('city'),
            state: data.get('state'),
            zipCode: data.get('zip'),
            mobile: data.get('phoneNumber'),
        }
        console.log("address", newAddress);
        try {
            const response = await createOrderAPI({
                shippingAddress: selectedAddressId ? { _id: selectedAddressId } : newAddress
            });
            console.log("Order created successfully:", response.data);
            toast.success("Order created successfully");
            navigate(`/checkout?step=3&orderId=${response._id}`);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }

    useEffect(() => {
        const fetchUserAddresses = async () => {
            try {
                const addresses = await getUserShippingAddresses();
                setAddresses( addresses);
            } catch (error) {
                console.error('Error fetching shipping addresses:', error);
            }
        };

        fetchUserAddresses();
    }, []);

    const handleSelectAddress = (addressId) => {
        setSelectedAddressId(addressId);
        console.log(selectedAddressId);
    };

    return (
        <div className='container sm:flex gap-4'>
            <div className='w-1/3 h-[27rem] bg-background box rounded-lg p-5 overflow-y-scroll '>
            { addresses?.length === 0 ? (
                <div>No Addresses Yet</div>
            ) : (
                addresses?.map((address) => (
                    <div key={address?._id}>
                    <AddressCard address={address} show={true}/>
                    <button
                        onClick={() => handleSelectAddress(address?._id)}
                        sx={{backgroundColor: '#6F4E37', color: '#e3d3bf'}}
                        className="w-1/2 mt-2 py-2 px-4 rounded-md shadow-sm text-sm font-bold bg-primary text-btn-primary"
                    >
                        Deliver Here
                    </button>
                    <div className='w-full my-3 border-t border-divider-color'></div>
                    </div>
                ))
            )}
                {/* <AddressCard address={address}/> */}
            </div>
            <div className='w-2/3 bg-background box rounded-lg p-5'>
                <form className='flex flex-col gap-6 content-center' onSubmit={handleSubmit}>
                {!selectedAddressId && (
                    <>
                    <div className='flex grid-cols-2 gap-3'>
                        <TextField 
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            autoComplete="given-name"
                        />
                        <TextField 
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete="family-name"
                        />
                    </div>
                    <TextField 
                        required
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        autoComplete="street-address"
                        multiline
                        rows={4}
                    />
                    <div className='flex grid-cols-2 gap-3'>
                        <TextField 
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="address-level2"
                        />
                        <TextField 
                            required
                            id="state"
                            name="state"
                            label="State/Province/Region" 
                            fullWidth
                            autoComplete="address-level1"
                        />
                    </div>
                    <div className='flex grid-cols-2 gap-3'>
                        <TextField 
                            required
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
                            fullWidth
                            autoComplete="postal-code"
                        />
                        <TextField 
                            required
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            fullWidth
                            autoComplete="tel"
                        />
                    </div>
                    </>
                    )}
                    <button
                        type='submit'
                        className="w-1/3 mt-2 py-2 px-4 rounded-md shadow-sm text-md font-bold bg-primary text-btn-primary"
                    >
                        Deliver Here
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DeliveryAddressForm;
