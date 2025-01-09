import React from "react";
import { Link, useLocation } from "react-router-dom";
import { images } from "../../assets/asset";

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between p-6 max-w-[200px]">
      {/* Logo Section */}
      <div className="mb-8">
        <div className="flex justify-center mb-4">
          <img
            src={images.nike_icon}
            alt="Nike Icon"
            className="w-16 h-16"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-6">
        <Link
          to="/admin"
          className={`flex items-center gap-4 p-3 rounded-md ${
            currentPath === "/admin"
              ? "bg-blue-700"
              : "hover:bg-gray-700"
          }`}
        >
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
          }`}
        >
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
          }`}
        >
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
          }`}
        >
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
        <Link
          className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-700"
        >
          <img
            src={images.admin_info_icon}
            alt="Info Icon"
            className="w-6 h-6"
          />
          <p>Help & Info</p>
        </Link>

        <Link
          className="flex items-center gap-4 p-3 rounded-md hover:bg-red-700"
        >
          <img
            src={images.admin_logout_icon}
            alt="Logout Icon"
            className="w-6 h-6"
          />
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
