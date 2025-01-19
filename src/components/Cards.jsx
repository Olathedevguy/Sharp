import { ArrowUpFromDot, LucideShoppingCart } from "lucide-react";
import { images } from "../assets/asset";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cards = ({name, price, description, filter, imageUrl, item}) => {

  const [hover, setHover] =  useState(false)
  const {addToCart} = useContext(GlobalContext)
  const handleAddToCart = ()=>{
    addToCart(item)
  }
  const formatNumberWithCommas =(number)=> {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <Link to={`/product/${item.id}`} className="group">
    <div className="bg-transparent border w-[240px] flex flex-col items-center text-md py-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <img className="w-[220px] h-[200px]" src={imageUrl} alt="" />
      <div className="w-full mt-2 px-2 flex justify-between">
        <div >
          <div className="flex items-center gap-2">
          <p className="text-left">{name}</p>
          <p className="text-gray-400 text-sm font-regular">{filter}</p>
          </div>

          <p className="text-left">₦{formatNumberWithCommas(price)}</p>
        </div>
        <button  onMouseEnter={()=>setHover(true)}
                          onMouseLeave={()=>setHover(false)}
                          onClick={(e)=>{
                            e.stopPropagation()//prevent navigation
                            handleAddToCart()}}
                          className="border border-black py-1 px-2 rounded-[4px] flex bg-black text-white text-center items-center hover:bg-white hover:text-black custom-transition">
          <LucideShoppingCart  size={20}/>
        </button>
      </div>
    </div>
    </Link>
  );
};

export default Cards;
