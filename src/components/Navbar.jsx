import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, showSearch } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    }

    return (
        <div className='backdrop-blur-md bg-white/30 shadow-sm border-b border-gray-200/30'>
            <div className='flex items-center justify-between py-3 md:py-4 font-medium max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
                <Link to='/' className='group'>
                    <img 
                        src={assets.logo} 
                        className='w-[100px] sm:w-[120px] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-2deg]' 
                        alt="Trendwear Logo" 
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    <NavLink 
                        to='/' 
                        className={({isActive}) => 
                            `text-sm relative group/nav hover:text-black transition-all duration-300 ${
                                isActive ? 'text-black' : 'text-gray-500'
                            }`
                        }
                    >
                        <span className='relative inline-block'>
                            HOME
                            <span className='absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/nav:w-full'></span>
                        </span>
                    </NavLink>
                    <NavLink 
                        to='/collection' 
                        className={({isActive}) => 
                            `text-sm relative group/nav hover:text-black transition-all duration-300 ${
                                isActive ? 'text-black' : 'text-gray-500'
                            }`
                        }
                    >
                        <span className='relative inline-block'>
                            COLLECTION
                            <span className='absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/nav:w-full'></span>
                        </span>
                    </NavLink>
                    <NavLink 
                        to='/about' 
                        className={({isActive}) => 
                            `text-sm relative group/nav hover:text-black transition-all duration-300 ${
                                isActive ? 'text-black' : 'text-gray-500'
                            }`
                        }
                    >
                        <span className='relative inline-block'>
                            ABOUT
                            <span className='absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/nav:w-full'></span>
                        </span>
                    </NavLink>
                    <NavLink 
                        to='/contact' 
                        className={({isActive}) => 
                            `text-sm relative group/nav hover:text-black transition-all duration-300 ${
                                isActive ? 'text-black' : 'text-gray-500'
                            }`
                        }
                    >
                        <span className='relative inline-block'>
                            CONTACT
                            <span className='absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover/nav:w-full'></span>
                        </span>
                    </NavLink>
                </div>

                {/* Right Side Icons */}
                <div className='flex items-center gap-4 sm:gap-6'>
                    {/* Search Icon */}
                    <div className='group relative hidden sm:block'>
                        <img 
                            onClick={toggleSearch} 
                            className='w-4 sm:w-5 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:opacity-80' 
                            src={assets.search_icon} 
                            alt="Search" 
                        />
                        <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <div className='bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap'>
                                {showSearch ? 'Close Search' : 'Search'}
                            </div>
                        </div>
                    </div>

                    {/* Profile Icon */}
                    <div className='group relative'>
                        <img 
                            onClick={() => token ? null : navigate('/login') } 
                            className='w-4 sm:w-5 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:opacity-80' 
                            src={assets.profile_icon} 
                            alt="Profile" 
                        />
                        {token && 
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white/80 backdrop-blur-md text-gray-500 rounded-lg shadow-lg border border-gray-200/30 animate-fadeIn'>
                                <p className='cursor-pointer hover:text-black transition-colors duration-300 transform hover:translate-x-1'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black transition-colors duration-300 transform hover:translate-x-1'>Orders</p>
                                {token === 'admin' && (
                                    <p onClick={() => navigate('/admin')} className='cursor-pointer hover:text-black transition-colors duration-300 transform hover:translate-x-1'>Admin Panel</p>
                                )}
                                <p onClick={logout} className='cursor-pointer hover:text-black transition-colors duration-300 transform hover:translate-x-1'>Logout</p>
                            </div>
                        </div>}
                    </div>

                    {/* Cart Icon */}
                    <div className='group relative'>
                        <Link to='/cart' className='flex items-center gap-1'>
                            <img 
                                className='w-4 sm:w-5 transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:opacity-80' 
                                src={assets.cart_icon} 
                                alt="Cart" 
                            />
                            <p className='text-xs font-medium'>{getCartCount()}</p>
                        </Link>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className='sm:hidden'>
                        <img 
                            onClick={() => setVisible(true)} 
                            className='w-4 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:opacity-80' 
                            src={assets.menu_icon} 
                            alt="Menu" 
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {visible && (
                <div className='fixed inset-0 bg-black/50 z-50 animate-fadeIn h-screen'>
                    <div className='w-[80%] h-full bg-white p-6 animate-slideIn'>
                        <div className='flex justify-between items-center mb-8'>
                            <img src={assets.logo} className='w-[100px]' alt="Trendwear Logo" />
                            <img 
                                onClick={() => setVisible(false)} 
                                className='w-4 cursor-pointer' 
                                src={assets.cross_icon} 
                                alt="Close" 
                            />
                        </div>
                        <div className='flex flex-col gap-6'>
                            <NavLink 
                                to='/' 
                                onClick={() => setVisible(false)} 
                                className={({isActive}) => 
                                    `text-sm ${isActive ? 'text-black' : 'text-gray-500'}`
                                }
                            >
                                HOME
                            </NavLink>
                            <NavLink 
                                to='/collection' 
                                onClick={() => setVisible(false)} 
                                className={({isActive}) => 
                                    `text-sm ${isActive ? 'text-black' : 'text-gray-500'}`
                                }
                            >
                                COLLECTION
                            </NavLink>
                            <NavLink 
                                to='/about' 
                                onClick={() => setVisible(false)} 
                                className={({isActive}) => 
                                    `text-sm ${isActive ? 'text-black' : 'text-gray-500'}`
                                }
                            >
                                ABOUT
                            </NavLink>
                            <NavLink 
                                to='/contact' 
                                onClick={() => setVisible(false)} 
                                className={({isActive}) => 
                                    `text-sm ${isActive ? 'text-black' : 'text-gray-500'}`
                                }
                            >
                                CONTACT
                            </NavLink>
                            <div className="mt-4 border-t pt-4">
                                <div 
                                    onClick={() => {
                                        setVisible(false);
                                        setShowSearch(true);
                                        navigate('/collection');
                                    }} 
                                    className="text-sm text-gray-500 flex items-center gap-2 cursor-pointer"
                                >
                                    <img className='w-4' src={assets.search_icon} alt="Search" />
                                    <span>Search Products</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
