import { Instagram, Send } from "lucide-react";
import { images } from "../assets/asset";

const Footer = () => {
  return (
    <div className="mt-[50px] bg-black">
      <div className="flex py-20 px-10 md:flex-row flex-col items-center md:justify-between justify-center md:gap-0 gap-10">
        {/* Header Text */}
        <h1 className="text-white font-bold md:text-4xl text-3xl text-left md:text-left max-w-[600px]">
          Is greatness worth fighting for? What do you think?
        </h1>

        {/* Newsletter Subscription */}
        <div>
          <p className="text-white mb-2">Subscribe to our newsletter</p>
          <div className="flex items-center bg-white p-2 gap-3 rounded-md">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              className="flex-grow border-none focus:ring-2 focus:ring-gray-300 p-2 rounded-md"
            />
            <button className="bg-black text-white flex items-center justify-center gap-2 rounded-sm p-2 hover:bg-gray-800 transition">
              Go
              <Send color="white" />
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex items-center justify-center gap-3 pb-10">
        <img src={images.Xicon} className="w-[20px]" alt="Xicon" />
        <Instagram color="white" />
      </div>
    </div>
  );
};

export default Footer;
