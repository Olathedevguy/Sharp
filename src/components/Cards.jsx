import { ArrowUpFromDot, LucideShoppingCart } from "lucide-react";
import { images } from "../assets/asset";
import { useState } from "react";

const Cards = () => {

  const [hover, setHover] =  useState(false)

  return (
    <div className="bg-transparent border w-[240px] flex flex-col items-center text-md py-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <img className="w-[220px] h-[200px]" src={images.nikeshoePLaceholder} alt="" />
      <div className="w-full mt-2 px-2 flex justify-between">
        <div>
          <p className="text-left">Nike Air</p>
          <p className="text-left">20,000</p>
        </div>
        <button  onMouseEnter={()=>setHover(true)}
                          onMouseLeave={()=>setHover(false)}
                          className="border border-black py-1 px-2 rounded-[4px] flex bg-black text-white text-center items-center hover:bg-white hover:text-black custom-transition">
          {hover? <p className="text-sm slide-out  duration-300">Add to cart</p>:''}
          <LucideShoppingCart  size={20}/>
        </button>
      </div>
    </div>
  );
};

export default Cards;
