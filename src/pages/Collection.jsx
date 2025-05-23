import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useLocation } from 'react-router-dom';

const Collection = () => {
  const { products, search, showSearch, setShowSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const location = useLocation();

  // Ensure search bar is visible when navigating directly to this page with search params
  useEffect(() => {
    // Check if we're at the collection page and should show search
    if (location.pathname === '/collection' && location.state?.fromHero) {
      setShowSearch(true);
    }
  }, [location]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    // Apply search filter if search is active
    if (search) {
      productsCopy = productsCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, products])

  // Sort products when sortType changes
  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 border-t'>
      
      {/* Filter Options */}
      <div className='min-w-60 hidden sm:block'>
        <div className="sticky top-36 mt-4">
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>
          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-4 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> kids
              </p>
            </div>
          </div>
          {/* SubCategory Filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className='sm:hidden w-full mb-4'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {showFilter && (
          <div className='border border-gray-300 p-4 mt-2 rounded-md'>
            <div className='mb-4'>
              <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
              <div className='flex flex-wrap gap-3 text-sm font-light text-gray-700'>
                <p className='flex gap-2 items-center'>
                  <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
                </p>
                <p className='flex gap-2 items-center'>
                  <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
                </p>
                <p className='flex gap-2 items-center'>
                  <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> kids
                </p>
              </div>
            </div>
            <div>
              <p className='mb-3 text-sm font-medium'>TYPE</p>
              <div className='flex flex-wrap gap-3 text-sm font-light text-gray-700'>
                <p className='flex gap-2 items-center'>
                  <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
                </p>
                <p className='flex gap-2 items-center'>
                  <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
                </p>
                <p className='flex gap-2 items-center'>
                  <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 mt-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Search Status Display */}
        {search && (
          <p className="text-sm text-gray-600 mb-4">
            Showing results for: <span className="font-medium">{search}</span>
          </p>
        )}

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          ) : (
            <p className="col-span-full text-center py-10 text-gray-500">
              No products match your search criteria
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
