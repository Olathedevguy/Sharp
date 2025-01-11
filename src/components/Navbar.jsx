import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets/asset';
import { GlobalContext } from '../context/Appcontext';
import { ShoppingCart, User2 } from 'lucide-react';

const Navbar = () => {
  const { authSuccess } = useContext(GlobalContext);

  console.log("Navbar Auth Success:", authSuccess);

  return (
    <div className='sticky top-0 bg-white shadow-lg w-full z-30'>
      <nav className='flex items-center px-10 py-4'>
        <Link to='/menu' className='w-full'>
          <img className='md:max-w-[40px] max-w-[30px]' src={images.menu_icon} alt="" />
        </Link>
        <Link to='/' className='w-full'>
          <img className='md:max-w-[80px] max-w-[40px]' src={images.nike_icon} alt="" />
        </Link>
        {authSuccess ? (
          <div className='flex gap-4'>
            <Link to='/account'><User2 /></Link>
            <div className='relative'>
              <Link to='/cart'><ShoppingCart /></Link>
              <div className='bg-black text-white rounded-full items-center text-center text-sm absolute z-10 -top-[10px] '>0</div>
            </div>
            
          </div>
        ) : (
          <Link to='/signup'>
            <button className='bg-black text-white md:text-sm text-xs py-3 px-6 rounded-md'>Join</button>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
