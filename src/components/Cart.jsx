import { useContext } from "react"
import { GlobalContext } from "../context/Appcontext"

const Cart = () => {

    const {cartItems, removeFromCart} = useContext(GlobalContext)

    const handleRemoveFromCart = (cartItemId) => {
        removeFromCart(cartItemId)
    }
  return (
    <div className="flex justify-between px-[100px] pt-[50px]">
        <div className="flex flex-col gap-3 w-[60vw]">
        {cartItems.length ===0 ? <div><p>Your Cart is empty</p>
        <button className="">Starting picking stuff</button></div> :<div className="flex flex-col gap-10 border py-4 px-4 justify-center shadow-md">
           { cartItems.map((cartItem)=>(
                    <div key={cartItem.id}>
                        <div className="flex items-center gap-2">
                        <div className="bg-gray-500 w-[100px] h-[100px]"></div>
                        <div className="">
                        <p>{cartItem.item.name} <span>x {cartItem.quantity}</span> </p>
                        <p>{cartItem.item.price}</p>
                        </div>
                    </div>
                        </div>
           ))
       }
        
        </div>}
        </div>
        

        <div className="border flex flex-col justify-center items-center h-fit py-4 px-4">
            <div className="flex justify-between gap-[150px]"><p className="font-regular text-lg">Total</p>
            <p className="font-semibold text-2xl">$30,000</p></div>
            <hr className="my-4 bg-orange-500 shadow-lg"/>
            <button className="bg-black text-white py-2 px-[100px] rounded-md hover:text-black hover:border hover:border-black hover:bg-transparent">Purchase</button>
        </div>
    </div>
  )
}
export default Cart