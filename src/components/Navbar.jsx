import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '../assets/asset'

const Navbar = () => {
  return (
    <div className='sticky top-0  bg-white shadow-lg backdrop-blur-lg w-full z-30'>
      <nav className='flex items-center px-10 py-4 w-'>
        {/* md:text-[#1E1E1E] text-gray-600 ☝️☝️ */}
        <Link to='/menu' className='w-full'>
        <img className='md:max-w-[40px] max-w-[30px]' src={images.menu_icon} alt="" />
        </Link>
        <Link to='/' className='w-full'>
        <img className='md:max-w-[80px] max-w-[40px]' src={images.nike_icon} alt="" />
        </Link>
        <Link to='/signup' className=''>
        <button  className='bg-black text-white md:text-sm text-xs py-3 px-6 rounded-md text-center '>Join</button>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar