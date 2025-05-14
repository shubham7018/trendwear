import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const endpoint = currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login';
            const response = await axios.post(backendUrl + endpoint, formData);
            
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                toast.success(currentState === 'Sign Up' ? 'Account created successfully!' : 'Logged in successfully!');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-sm'>
                <div className='text-center mb-8'>
                    <img 
                        src={assets.logo} 
                        alt="Trendwear Logo" 
                        className='w-32 mx-auto mb-6'
                    />
                    <h2 className='text-2xl font-medium text-gray-800'>{currentState}</h2>
                    <div className='w-12 h-0.5 bg-gray-800 mx-auto mt-2'></div>
                </div>

                <form onSubmit={onSubmitHandler} className='space-y-4'>
                    {currentState === 'Sign Up' && (
                        <div>
                            <input
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                type='text'
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800'
                                placeholder='Full Name'
                                required
                            />
                        </div>
                    )}

                    <div>
                        <input
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            type='email'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800'
                            placeholder='Email Address'
                            required
                        />
                    </div>

                    <div>
                        <input
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            type='password'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800'
                            placeholder='Password'
                            required
                        />
                    </div>

                    <div className='flex justify-between text-sm text-gray-600'>
                        <button
                            type='button'
                            onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                            className='hover:text-gray-800 transition-colors'
                        >
                            {currentState === 'Login' ? 'Create an account' : 'Already have an account?'}
                        </button>
                    </div>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isLoading ? 'Processing...' : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
