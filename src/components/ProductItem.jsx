import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
    const { currency, addToCart, getCartCount } = useContext(ShopContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        let interval;
        if (isHovered && image.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => 
                    prevIndex === image.length - 1 ? 0 : prevIndex + 1
                );
            }, 800);
        }
        return () => clearInterval(interval);
    }, [isHovered, image.length]);

    useEffect(() => {
        let timeout;
        if (showNotification) {
            timeout = setTimeout(() => {
                setShowNotification(false);
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [showNotification]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setCurrentImageIndex(0);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(id, 'M');
        setShowNotification(true);
    };

    return (
        <div className='group relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
            {/* Image Section */}
            <div className='relative'>
                <Link 
                    onClick={() => scrollTo(0, 0)} 
                    className='block' 
                    to={`/product/${id}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className='relative overflow-hidden w-full'>
                        <div className='relative w-full pb-[150%] group-hover:scale-105 transition-transform duration-500 ease-out'>
                            {image.map((img, index) => (
                                <img
                                    key={index}
                                    className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${
                                        index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                    }`}
                                    src={img}
                                    alt={`${name} - Image ${index + 1}`}
                                    style={{ objectFit: 'contain' }}
                                />
                            ))}
                        </div>
                        {image.length > 1 && (
                            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3'>
                                {image.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                                            index === currentImageIndex 
                                                ? 'bg-black scale-125' 
                                                : 'bg-gray-300 group-hover:bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </Link>
            </div>

            {/* Product Details and Add to Cart Container */}
            <div className='relative bg-white'>
                {/* Product Details - Always Visible */}
                <div className='p-4'>
                    <p className='text-sm font-medium text-gray-800 group-hover:text-black transition-colors duration-300 group-hover:translate-x-1'>{name}</p>
                    <p className='text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors duration-300 group-hover:translate-x-1'>{currency}{price}</p>
                </div>

                {/* Add to Cart Button - Slides up from bottom */}
                <div className='absolute inset-x-0 bottom-0 p-4 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0'>
                    <button 
                        onClick={handleAddToCart}
                        className='w-full bg-black text-white text-xs py-2 rounded-full hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300 transform hover:shadow-lg'
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>

            {/* Added to Cart Notification */}
            {showNotification && (
                <div className='fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn'>
                    <div className='bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-200/30 flex items-center gap-2'>
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className='text-sm font-medium text-gray-800'>Added to Cart</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductItem;
