import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { images } from "../../assets/asset";
import { Home, Menu, Settings, Upload, User, X } from "lucide-react";

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const path = window.location.pathname;
const [menuOpen, setMenuOpen] = useState(false)

const toggleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <>
      <div className="h-screen w-64 bg-gray-900 text-white md:flex hidden flex-col justify-between p-6 max-w-[200px] fixed  ">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <img src={images.nike_icon} alt="Nike Icon" className="w-16" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-6">
          <Link
            to="/admin"
            className={`flex items-center gap-4 p-3 rounded-md ${
              currentPath === "/admin" ? "bg-blue-700" : "hover:bg-gray-700"
            }`}>
            <img
              src={
                currentPath === "/admin"
                  ? images.admin_home_icon_active
                  : images.admin_home_icon
              }
              alt="Home Icon"
              className="w-6 h-6"
            />
            <p>Home</p>
          </Link>

          <Link
            to="/admin/users"
            className={`flex items-center gap-4 p-3 rounded-md ${
              currentPath === "/admin/users"
                ? "bg-blue-700"
                : "hover:bg-gray-700"
            }`}>
            <img
              src={
                currentPath === "/admin/users"
                  ? images.admin_users_icon_active
                  : images.admin_users_icon
              }
              alt="Users Icon"
              className="w-6 h-6"
            />
            <p>Users</p>
          </Link>

          <Link
            to="/admin/upload"
            className={`flex items-center gap-4 p-3 rounded-md ${
              currentPath === "/admin/upload"
                ? "bg-blue-700"
                : "hover:bg-gray-700"
            }`}>
            <img
              src={
                currentPath === "/admin/upload"
                  ? images.admin_upload_icon_active
                  : images.admin_upload_icon
              }
              alt="Upload Icon"
              className="w-6 h-6"
            />
            <p>Upload</p>
          </Link>

          <Link
            to="/admin/settings"
            className={`flex items-center gap-4 p-3  rounded-md ${
              currentPath === "/admin/settings"
                ? "bg-blue-700"
                : "hover:bg-gray-700"
            }`}>
            <img
              src={
                currentPath === "/admin/settings"
                  ? images.admin_setting_icon_active
                  : images.admin_setting_icon
              }
              alt="Settings Icon"
              className="w-6 h-6"
            />
            <p>Settings</p>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-auto flex flex-col gap-6">
          <Link className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-700">
            <img
              src={images.admin_info_icon}
              alt="Info Icon"
              className="w-6 h-6"
            />
            <p>Help & Info</p>
          </Link>

          <Link className="flex items-center gap-4 p-3 rounded-md hover:bg-red-700">
            <img
              src={images.admin_logout_icon}
              alt="Logout Icon"
              className="w-6 h-6"
            />
            <p>Logout</p>
          </Link>
        </div>
      </div>


      {/* mobile sidebar */}
      
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-900 z-20">
        <div className="flex justify-between items-center p-4">
          <img src={images.nike_icon} alt="Logo" className="w-10" />
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex flex-col items-center bg-gray-900 text-white p-6">
            <Link
              to="/admin"
              className={`flex items-center gap-4 p-3 rounded-md ${
                currentPath === "/admin" ? "bg-blue-700" : "hover:bg-gray-700"
              }`}
              onClick={toggleMenu}
            >
              <Home />
              <p>Home</p>
            </Link>
            <Link
              to="/admin/users"
              className={`flex items-center gap-4 p-3 rounded-md ${
                currentPath === "/admin/users"
                  ? "bg-blue-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={toggleMenu}
            >
              <User />
              <p>Users</p>
            </Link>
            <Link
              to="/admin/upload"
              className={`flex items-center gap-4 p-3 rounded-md ${
                currentPath === "/admin/upload"
                  ? "bg-blue-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={toggleMenu}
            >
              <Upload />
              <p>Upload</p>
            </Link>
            <Link
              to="/admin/settings"
              className={`flex items-center gap-4 p-3 rounded-md ${
                currentPath === "/admin/settings"
                  ? "bg-blue-700"
                  : "hover:bg-gray-700"
              }`}
              onClick={toggleMenu}
            >
              <Settings />
              <p>Settings</p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
