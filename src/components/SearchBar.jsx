import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [isListening, setIsListening] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [pulseCount, setPulseCount] = useState(0);
    const [animationRing, setAnimationRing] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (showSearch) {
            setIsExpanded(true);
        } else {
            const timer = setTimeout(() => {
                setIsExpanded(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [showSearch]);

    // Animation effect for listening
    useEffect(() => {
        let interval;
        let ringInterval;
        
        if (isListening) {
            // Animate the dots
            interval = setInterval(() => {
                setPulseCount(count => (count + 1) % 3);
            }, 500); // Faster animation
            
            // Animate the pulse rings
            ringInterval = setInterval(() => {
                setAnimationRing(ring => (ring + 1) % 3);
            }, 800); // Faster ring animation
        } else {
            setPulseCount(0);
            setAnimationRing(0);
        }
        
        return () => {
            if (interval) clearInterval(interval);
            if (ringInterval) clearInterval(ringInterval);
        };
    }, [isListening]);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        
        if (location.pathname !== '/collection') {
            navigate('/collection');
        }
    };

    const startVoiceSearch = () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const cleanTranscript = transcript.replace(/\.$/, '');
                setSearch(cleanTranscript);
                setIsListening(false);
                
                handleSearch();
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        } else {
            alert('Speech recognition is not supported in this browser.');
        }
    };

    // Render listening status text
    const renderListeningStatus = () => {
        if (!isListening) return null;
        
        const dots = '.'.repeat(pulseCount + 1);
        return (
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 animate-fade-in z-50">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                    Listening{dots}
                </div>
            </div>
        );
    };

    return (
        <div className={`w-full border-t border-gray-200/30 text-center overflow-visible transition-all duration-300 ${isExpanded ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
            <form onSubmit={handleSearch} className='inline-block w-3/4 sm:w-1/2 my-2 relative'>
                <div className='flex items-center justify-center border border-gray-300/30 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm shadow-lg transform transition-all duration-300 scale-100'>
                    <input 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className={`flex-1 outline-none bg-transparent text-sm placeholder-gray-500 transition-all duration-300 ${isListening ? 'text-red-600' : ''}`}
                        type="text" 
                        placeholder={isListening ? 'Listening...' : 'Search products...'}
                        autoFocus={showSearch}
                        readOnly={isListening}
                    />
                    <div className="relative">
                        {renderListeningStatus()}
                        <div className={`absolute inset-0 rounded-full ${isListening ? 'animate-ping-subtle opacity-60 bg-red-400' : ''}`}></div>
                        <div className={`absolute inset-0 rounded-full ${isListening ? 'animate-ping-slow opacity-40 bg-red-300 delay-150' : ''}`}></div>
                        <button 
                            type="button"
                            onClick={startVoiceSearch}
                            className={`p-1.5 rounded-full mr-2 transition-all duration-300 relative z-10 ${
                                isListening 
                                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md shadow-red-200' 
                                    : 'hover:bg-gray-100/80 hover:shadow-sm'
                            }`}
                            title="Voice Search"
                            disabled={isListening}
                        >
                            <svg 
                                className={`w-4 h-4 ${isListening ? 'animate-pulse-gentle' : 'transition-transform duration-300 group-hover:scale-110'}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                />
                            </svg>
                        </button>
                    </div>
                    <button 
                        type="submit" 
                        disabled={isListening} 
                        className={`transition-all duration-300 ${isListening ? 'opacity-50' : 'hover:opacity-80'}`}
                    >
                        <img className="w-4" src={assets.search_icon} alt="Search" />
                    </button>
                </div>
            </form>
            <img 
                onClick={() => setShowSearch(false)} 
                className='inline w-3 cursor-pointer hover:opacity-70 ml-2 transition-opacity duration-200' 
                src={assets.cross_icon} 
                alt="Close" 
            />
        </div>
    );
}

export default SearchBar;
