import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div className='group transform hover:-translate-y-2 transition-all duration-300 hover:shadow-lg p-6 rounded-lg'>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5 transform group-hover:scale-110 transition-transform duration-300' alt="Exchange Policy" />
        <p className='font-semibold group-hover:text-black transition-colors duration-300'>Easy Exchange Policy</p>
        <p className='text-gray-400 group-hover:text-gray-500 transition-colors duration-300'>We offer hassle free exchange policy</p>
      </div>

      <div className='group transform hover:-translate-y-2 transition-all duration-300 hover:shadow-lg p-6 rounded-lg'>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5 transform group-hover:scale-110 transition-transform duration-300' alt="Return Policy" />
        <p className='font-semibold group-hover:text-black transition-colors duration-300'>7 Days Return Policy</p>
        <p className='text-gray-400 group-hover:text-gray-500 transition-colors duration-300'>We provide 7 days free return policy</p>
      </div>

      <div className='group transform hover:-translate-y-2 transition-all duration-300 hover:shadow-lg p-6 rounded-lg'>
        <img src={assets.support_img} className='w-12 m-auto mb-5 transform group-hover:scale-110 transition-transform duration-300' alt="Customer Support" />
        <p className='font-semibold group-hover:text-black transition-colors duration-300'>Best customer support</p>
        <p className='text-gray-400 group-hover:text-gray-500 transition-colors duration-300'>we provide 24/7 customer support</p>
      </div>

    </div>
  )
}

export default OurPolicy
