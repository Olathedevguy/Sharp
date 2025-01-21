import React, { useContext, useEffect, useState } from "react";
import { details, images } from "../assets/asset";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Cards from "./Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronDown, ZapIcon } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
import { GlobalContext } from "../context/Appcontext";
import { useAuth } from "../hooks/useAuth";
import Footer from "./Footer";
import PopupAuth from "./PopupAuth";
import { ToastContainer } from "react-toastify";
import { RingLoader } from "react-spinners";

const Home = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  let settings2 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.1,
    slidesToScroll: 1,
  };

  let settings3 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const { uploadList, getUploadList, toast, showToast } =
    useContext(GlobalContext);

  useEffect(() => {
    getUploadList();
  }, [getUploadList]);

  const { user } = useAuth();
  // console.log(user)

  return (
    <div className="">
      {/* <Auth  /> */}
      {/* <Navbar  /> */}
      <PopupAuth />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div
        className={`bg-custom-image bg-cover bg-center h-[105vh] w-full flex items-left`}>
        <div className="lg:pt-[400px] md:pt-[700px] pt-[450px] pl-20 item md:bg-transparent bg-slate-100 md:bg-opacity-0 bg-opacity-30">
          <h1 className="text-xl text-[#1E1E1E] mb-3">
            <span className="font-semibold text-[50px]">JUST DO IT,</span> the
            way you like
          </h1>
          <p className="text-xl text-[#1E1E1E]  md:w-[450px] w-[250px]">
            Explore what you want, how you want, and when you want; from tech
            gears to sports gears, shoes, and more.
          </p>
          <button className="bg-[#1E1E1E] text-white rounded-md py-3 px-6 mt-3">
            SHOP NOW
          </button>
        </div>
        {/* <div className='w-full md:visible invisible'>
          <img className='h-[35vh] ' src={images.ellipse} alt="" />
        </div> */}
      </div>

      <div className="md:px-[100px] px-10 mb-[220px] ">
        <div className="flex items-center justify-center">
          <div>
            <img className="w-[300px]" src={images.aesth_1} alt="" />
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-lg items-left mb-5">
            WHAT&apos;S TRENDING
          </h1>

          <div className="flex lg:flex-row flex-col justify-center gap-[40px] items-center">
            {details.map((items, index) => (
              <div key={index}>
                <div className="w-full">
                  <img
                    className="lg:w-[400px] lg:h-[500px] md:w-[600px] md:h-[60vh] w-[350px] h-[350px]"
                    src={items.img}
                    alt=""
                  />
                </div>
                <p className="mt-5 text-black font-medium">{items.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 mb-20">
          <p className="font-semibold text-lg items-left mb-1">EXPLORE ALL</p>


 {/* Slider for different screen sizes */}
{['lg', 'md', 'sm'].map((screen, index) => (
  <div
    key={screen}
    className={`
      relative my-6 
      ${screen === 'lg' ? 'hidden lg:block' : ''} 
      ${screen === 'md' ? 'hidden md:block lg:hidden' : ''} 
      ${screen === 'sm' ? 'block md:hidden' : ''}
    `}
  >
    <Slider {...(screen === 'lg' ? settings : screen === 'md' ? settings3 : settings2)}>
      {uploadList.length > 0 ? (
        uploadList.map((item) => (
          <Cards
            key={item.id}
            name={item.name}
            price={item.price}
            category={item.filter}
            imageUrl={item.imageUrl}
            item={item}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No items available</p>
      )}
    </Slider>
  </div>
))}


          <div className=" md:flex hidden mt-6">
            <img src={images.banner_1} alt="" />
          </div>

          <div className="mx-auto md:hidden flex justify-center">
            <img src={images.bannerMobile} alt="" />
          </div>

          <div className="flex justify-center">
            <img src={images.aesth_2} className="w-[500px]" alt="" />
          </div>

          <div>
            <div className="flex justify-between mb-10">
              <p className="font-semibold text-lg">CATEGORIES</p>
              <button className="flex border px-2 border-gray-500 rounded-sm">
                <p className="text-gray-500">All</p>
                <ChevronDown color="gray" />
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {uploadList.length > 0 ? (
                uploadList.map((item) => {
                  return (
                    <Cards
                      key={item.id}
                      name={item.name}
                      price={item.price}
                      // description={item.description}
                      filter={item.filter}
                      imageUrl={item.imageUrl}
                      item={item}
                    />
                  );
                })
              ) : (
                <p>no items available</p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center my-20">
            <img src={images.aesth_3} className="w-[300px]" alt="" />
          </div>
        </div>

        {/* bento box */}
        <section className="flex justify-center items-center px-4">
  <div className="flex flex-col md:flex-row gap-8 max-w-7xl w-full">
    {/* Left Column */}
    <div className="flex flex-col gap-8 w-full md:w-2/3">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Top Left Image */}
        <div className="bg-custom-image4 w-full md:w-1/2 h-[300px] bg-cover rounded-xl flex items-end justify-end">
          <p className="text-end  text-white font-bold pr-5 pb-5 md:pb-10 text-xl md:text-2xl leading-snug max-w-[200px] ">
            Run the day, don&apos;t let it run you.
          </p>
        </div>
        {/* Right Section in Row */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {/* Small Image */}
          <div className="bg-custom-image5 h-[200px] bg-cover bg-center rounded-xl"></div>
          {/* Text Box */}
          <div className="bg-[#203429] h-[90px] rounded-xl flex items-center justify-center">
            <p className="text-center text-white font-bold text-lg md:text-2xl">
              Waits for no one
            </p>
          </div>
        </div>
      </div>
      {/* Wide Image */}
      <div className="bg-custom-image7 w-full h-[300px] bg-cover bg-blend-soft-light rounded-xl flex items-end">
        <p className="text-white font-bold text-xl md:text-2xl pl-4 pb-4 md:pb-10 max-w-[300px]">
          Don&apos;t believe you have to be like anybody to be somebody.
        </p>
      </div>
    </div>
    {/* Right Column */}
    <div className="flex flex-col gap-8 w-full md:w-1/3">
      {/* Tall Image */}
      <div className="bg-custom-image6 w-full h-[400px] bg-cover rounded-xl"></div>
      {/* Bottom Text Box */}
      <div className="bg-[#A6BDD3] w-full h-[200px] rounded-xl flex items-center justify-center">
        <p className="text-center text-white font-bold text-lg md:text-2xl">
          Just Do It! <ZapIcon color="yellow" />
        </p>
      </div>
    </div>
  </div>
</section>

      </div>
      <Footer />
    </div>
  );
};

export default Home;
