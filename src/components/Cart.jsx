import { useContext } from "react";
import { GlobalContext } from "../context/Appcontext";
import { Trash2 } from "lucide-react";
import BackButton from "./BackButton";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { images } from "../assets/asset";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate()
  const { cartItems, removeFromCart } = useContext(GlobalContext);

  const handleRemoveFromCart = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  const totalPrice = cartItems.reduce(
    (accumulator, cartItem) => accumulator + cartItem.item.price * cartItem.quantity,
    0
  );

  return (
    <>
      {/* Back Button */}
      <BackButton />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      {/* Content */}
      <div className="flex-grow flex md:flex-row flex-col md:justify-between justify-normal md:gap-0 gap-10 md:px-[100px] px-6 pt-[50px]">
        {/* Cart Items Section */}
        <div className="flex flex-col gap-4 md:w-[60vw] w-full items-center">
          {cartItems.length === 0 ? (
            <div className="text-center">
                <div className="w-[200px]">
                <img src={images.emptyCartAlt} alt="" className="w-[]"/>
                </div>
              <p>Your Cart is empty</p>
              <button onClick={()=>navigate('/')} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Start Picking Stuff
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
{cartItems.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="flex flex-wrap md:flex-nowrap justify-between items-center shadow-md border border-gray-300 p- rounded-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-[80px] h-[80px]">
                      <img
                        src={cartItem.item.imageUrl}
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-lg font-medium">
                        {cartItem.item.name} <span className="text-gray-500">x {cartItem.quantity}</span>
                      </p>
                      <p className="text-gray-700">${cartItem.item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(cartItem.id)}
                    className="bg-red-100 px-2 py-7 hover:bg-red-200 transition duration-300"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total Price Section */}
        <div className="border flex flex-col justify-center items-center h-fit py-4 px-4 rounded-md shadow-md">
          <div className="flex justify-between items-center w-full">
            <p className="font-regular text-lg">Total</p>
            <p className="font-semibold text-2xl">${totalPrice.toFixed(2)}</p>
          </div>
          <hr className="my-4 w-full bg-orange-500 shadow-lg" />
          <button className="bg-black text-white py-2 px-[100px] rounded-md hover:text-black hover:border hover:border-black hover:bg-transparent transition duration-500">
            Purchase
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Cart;
