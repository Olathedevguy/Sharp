import React, { useState } from 'react';
import { details, images } from '../assets/asset';
import Auth from './Auth';
import Navbar from './Navbar';
import Cards from './Cards';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronDown } from 'lucide-react';

const Home = () => {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  

  return (

    <div className=''>
      
      {/* <Auth  /> */}
      {/* <Navbar  /> */}
      
      <div className={`bg-custom-image bg-cover bg-center h-[105vh] w-full flex items-left`}>
        <div className='lg:pt-[400px] md:pt-[700px] pt-[450px] pl-20 item md:bg-transparent bg-slate-100 md:bg-opacity-0 bg-opacity-30'>
          <h1 className='text-xl text-[#1E1E1E] mb-3'>
            <span className='font-semibold text-[50px]'>JUST DO IT,</span> the way you like
          </h1>
          <p className='text-xl text-[#1E1E1E]  md:w-[450px] w-[250px]'>
            Explore what you want, how you want, and when you want; from tech gears to sports gears, shoes, and more.
          </p>
          <button className='bg-[#1E1E1E] text-white rounded-md py-3 px-6 mt-3'>SHOP NOW</button>
        </div>
        {/* <div className='w-full md:visible invisible'>
          <img className='h-[35vh] ' src={images.ellipse} alt="" />
        </div> */}
      </div>

      <div className='px-[100px]'>
        <div className='flex items-center justify-center'>
          <div>
            <img className='w-[300px]' src={images.aesth_1} alt="" />
          </div>
        </div>
        <div>
          <h1 className='font-semibold text-lg items-left mb-5'>WHAT&apos;S TRENDING</h1>

          <div className='flex lg:flex-row flex-col justify-center gap-[40px] items-center'>
            {details.map((items, index) => (
              <div key={index}>
                <div className='w-full'>
                  <img className='lg:w-[400px] lg:h-[500px] md:w-[600px] md:h-[60vh] w-[350px] h-[350px]' src={items.img} alt="" />
                </div>
                <p className='mt-5 text-black font-medium'>{items.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-20 mb-20'>
          <p className='font-semibold text-lg items-left mb-10'>EXPLORE ALL</p>
          <div className='relative'>
          <Slider {...settings}>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          </Slider>
          </div>

          <div className='mt-[100px]'>
            <img src={images.banner_1} alt="" />
          </div>

          <div className='flex justify-center'>
            <img src={images.aesth_2} className='w-[500px]' alt="" />
          </div>

          <div>
            <div className='flex justify-between'>
              <p>CATEGORIES</p>
              <button className='flex border px-2 border-gray-500 rounded-sm'>
                <p className='text-gray-500'>All</p>
                <ChevronDown  color='gray'/>
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
  <Cards />
  <Cards />
  <Cards />
  <Cards />
  <Cards />
  <Cards />
  <Cards />
  <Cards />
  <Cards />
  <Cards />
  <Cards />
  <Cards />
  <Cards />
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
