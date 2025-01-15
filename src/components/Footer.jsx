import { Instagram, Send, SendIcon } from "lucide-react"
import { images } from "../assets/asset"

const Footer = () => {
  return (
    <footer className="mt-[270px] bg-black">
        <div className="flex py-20 px-10 md:flex-row flex-col items-center md:justify-between justify-normal md:gap-0 gap-10">
        <h1 className="text-white font-bold md:text-4xl text-3xl max-w-[600px]">Is greatness worth fighting for? What do you think?</h1>
        <div>
            <p className="text-white">Subscribe to our news letter</p>
        <div className="flex items-center bg-white p-2 gap-3 rounded-md">
            <input type="email" name="" id="" placeholder="enter your mail here" className="border-none focus:border-none p-2"/>
            <button className="bg-black text-white text-wrap flex gap-1 rounded-sm p-2">Go<Send color="white"/></button>
        </div>
        </div>
        </div>
            <div className="flex items-center justify-center gap-3 pb-10">
                <img src={images.Xicon} className="w-[20px]"/>
                <Instagram  color="white"/>
            </div>
    </footer>
  )
}
export default Footer