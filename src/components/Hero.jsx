import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Hero = () => {
  const navigate = useNavigate();
  const { setShowSearch, setSearch } = useContext(ShopContext);

  const handleShopNow = () => {
    // Navigate to collection page with state indicating it came from hero
    navigate('/collection', { state: { fromHero: true } });
    
    // Show the search box
    setShowSearch(true);
    
    // Clear any existing search term to show all products initially
    setSearch('');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          className="w-full h-full object-cover" 
          src={assets.hero_img} 
          alt="TrendWear Fashion" 
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white/20 backdrop-blur-sm p-10 md:p-16 rounded-lg w-full max-w-4xl mx-auto transform transition-all duration-700 hover:scale-105">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 md:w-16 h-[2px] bg-white"></div>
            <p className="font-medium text-base md:text-lg text-white tracking-wider">SUMMER COLLECTION</p>
            <div className="w-10 md:w-16 h-[2px] bg-white"></div>
          </div>
          
          <h1 className="prata-regular text-5xl md:text-7xl lg:text-8xl text-white mb-6 md:mb-8">
            Elevate Your Style
          </h1>
          
          <p className="text-white text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Discover the latest trends and timeless classics. Quality fashion for every occasion.
          </p>
          
          <button 
            onClick={handleShopNow}
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-md font-medium text-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
