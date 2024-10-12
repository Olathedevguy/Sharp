import React, { useState } from 'react';
import { details, images } from '../assets/asset';
import Auth from './Auth';
import Navbar from './Navbar';

const Home = () => {

  

  return (

    <div>
      
      {/* <Auth  /> */}
      {/* <Navbar  /> */}
      
      <div className={`bg-custom-image bg-cover bg-center h-[105vh] w-full`}>
        <div className='pt-[400px] pl-20'>
          <h1 className='text-xl text-[#1E1E1E] mb-3'>
            <span className='font-semibold text-[50px]'>JUST DO IT,</span> the way you like
          </h1>
          <p className='text-xl text-[#1E1E1E] w-[450px]'>
            Explore what you want, how you want, and when you want; from tech gears to sports gears, shoes, and more.
          </p>
          <button className='bg-[#1E1E1E] text-white rounded-md py-3 px-6 mt-3'>SHOP NOW</button>
        </div>
        <div className='w-full'>
          <img className='h-[35vh]' src={images.ellipse} alt="" />
        </div>
      </div>

      <div>
        <div className='flex items-center justify-center'>
          <div>
            <img className='w-[300px]' src={images.aesth_1} alt="" />
          </div>
        </div>
        <div>
          <h1 className='ml-[90px] mb-[20px] font-medium text-lg'>WHAT&apos;S TRENDING</h1>

          <div className='flex justify-center gap-[40px]'>
            {details.map((items, index) => (
              <div key={index}>
                <div className='w-full'>
                  <img className='w-[400px] h-[500px]' src={items.img} alt="" />
                </div>
                <p className='mt-5 text-black font-medium'>{items.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
