const Cart = () => {
  return (
    <div className="flex justify-between px-[100px] pt-[50px]">
        <div className="flex flex-col gap-3 w-[60vw]">
        <div className="flex flex-col gap-10 border py-4 px-4 justify-center shadow-md">
            <div>
            <div className="flex items-center gap-2">
            <div className="bg-gray-500 w-[100px] h-[100px]"></div>
            <div className="">
            <p>Product Name <span>x Quantity</span> </p>
            <p>$Total,Price</p>
            </div>
        </div>
        {/* <hr className="w-[60vw]"/> */}
            </div>
        
        </div>
        <div className="flex flex-col gap-10 border py-4 px-4 justify-center shadow-md">
            <div>
            <div className="flex items-center gap-2">
            <div className="bg-gray-500 w-[100px] h-[100px]"></div>
            <div className="">
            <p>Product Name <span>x Quantity</span> </p>
            <p>$Total,Price</p>
            </div>
        </div>
        {/* <hr className="w-[60vw]"/> */}
            </div>
        
        </div>
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