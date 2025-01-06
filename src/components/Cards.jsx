import { ArrowUpFromDot } from "lucide-react";
import { images } from "../assets/asset";

const Cards = () => {
  return (
    <div className="bg-transparent border w-[230px] flex flex-col items-center text-md py-3">
      <img className="w-[200px] h-[200px]" src={images.nikeshoePLaceholder} alt="" />
      <div className="w-full mt-2 pl-2 flex gap-4">
        <div>
             <p className="text-left">Nike Air</p>
        <p className="text-left">20,000</p>
        </div>
       {/* <button className="border border-black py-1 px-2 rounded-[4px] flex"><p>Add to cart</p><img src={images.cab} className="w-6" alt="" /></button> */}
       <button className="border border-black py-1 px-2 rounded-[4px] flex bg-black text-white text-center items-center" ><p>Add to cart</p><img src={images.caw} className="w-6" alt="" /></button>
       {/* <ArrowUpFromDot  className=""/> */}
      </div>
    </div>
  );
};

export default Cards;
