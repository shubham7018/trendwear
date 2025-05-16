import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const NewsletterBox = () => {
    const [email, setEmail] = useState('');
    const { backendUrl } = useContext(ShopContext);
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            // const response = await axios.post(backendUrl + '/api/subscription/subscribe', { email });
            const response = await axios.post(backendUrl + '/sendemail', { email });
            if (response.data.success) {
                toast.success(response.data.message);
                console.log(response.data)
                setEmail('');
            } else {
                toast.error(response.data.message);
                console.log(response)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }

        
    };

    return (
        <div className='text-center py-10 bg-gray-50 hover:bg-gray-100 transition-all duration-500 group'>
            <p className='text-2xl font-medium text-gray-800 transform hover:scale-105 transition-transform duration-300 group-hover:text-black'>
                Subscribe now & get 20% off
            </p>
            <p className='text-gray-400 mt-3 hover:text-gray-500 transition-colors duration-300 group-hover:translate-y-1'>
                Stay updated with our latest collections and exclusive offers.
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 bg-white rounded-full shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full sm:flex-1 outline-none text-sm py-3 focus:ring-2 focus:ring-gray-300 transition-all duration-300 focus:translate-x-1' 
                    type="email" 
                    placeholder='Enter your email' 
                    required
                />
                <button 
                    type='submit' 
                    className='bg-black text-white text-xs px-8 py-3 rounded-full hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300 transform hover:shadow-lg hover:-translate-y-0.5'
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
};

export default NewsletterBox;
