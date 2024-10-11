import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '../assets/asset'

const Navbar = ({setIsPopupOpen}) => {
  return (
    <div className='sticky top-0  bg-white shadow-lg backdrop-blur-lg'>
      <nav className='flex justify-between gap-[560px] items-center px-10 py-4'>
        <Link to='/menu' className='w-full'>
        <img className='w-[40px]' src={images.menu_icon} alt="" />
        </Link>
        <Link to='/' className='w-full'>
        <img className='w-[80px]' src={images.nike_icon} alt="" />
        </Link>
        <Link to='/signup' className='w-full'>
        <button onClick={()=>setIsPopupOpen(true)} className='bg-black text-white text-sm py-3 px-6 rounded-md text-center'>Sign Up</button>
        </Link>
      </nav>
    </div>
  )
}

export default Navbar