import React, { useContext, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import AdminPanel from './pages/AdminPanel'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import { ShopContext } from './context/ShopContext'

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const { setShowSearch } = useContext(ShopContext);

  // Close search box on page navigation
  useEffect(() => {
    setShowSearch(false);
  }, [location.pathname, setShowSearch]);

  return (
    <div className='min-h-screen flex flex-col'>
      <ToastContainer className="z-50" />
      {!isLoginPage && (
        <>
          <div className='fixed top-0 left-0 right-0 z-50'>
            <div className='bg-white/40 backdrop-blur-md shadow-md'>
              <Navbar />
            </div>
            <div className='relative z-50 bg-white/40 backdrop-blur-md'>
              <SearchBar />
            </div>
          </div>
          <div className='pt-32'>
            <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-8'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/collection' element={<Collection />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/product/:productId' element={<Product />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/place-order' element={<PlaceOrder />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/admin' element={<AdminPanel />} />
                <Route path='/verify' element={<Verify />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </>
      )}
      {isLoginPage && (
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      )}
    </div>
  )
}

export default App
