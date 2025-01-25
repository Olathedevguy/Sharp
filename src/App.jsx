import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Admin from "./components/admin/Admin";
import Users from "./components/admin/Users";
import Upload from "./components/admin/Upload";
import Setting from "./components/admin/Setting";
import AdminAuthPage from "./components/admin/AdminAuthPage";
import Test from "./test/Test";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage";
import ProtectedAdminRoute from "./components/admin/protectedAdminRoute";

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAdminLoginSuccessful, setIsAdminLoginSuccessful] = useState(
    () => localStorage.getItem("isAdminLoginSuccessful") === "true"
  );

  const navigate = useNavigate();
  const location = useLocation();

  // Define admin routes
  const adminRoutes = [
    "/admin",
    "/admin/auth",
    "/admin/users",
    "/admin/upload",
    "/admin/settings",
  ];

  // Display Navbar only on non-admin routes
  const shouldDisplayNav = !adminRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Handle admin login success
  const handleAdminSuccess = () => {
    setIsAdminLoginSuccessful(true);
    localStorage.setItem("isAdminLoginSuccessful", "true");
    navigate("/admin");
  };

  return (
    <div className="relative scroll">
      {/* Global Navbar */}
      {shouldDisplayNav && <Navbar />}

      {/* Global ToastContainer */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* App Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
          }
        />
        <Route path="/menu" element={<Menu />} />
        <Route path="/signUp" element={<Auth />} />

        {/* Protected admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute
              isAllowed={isAdminLoginSuccessful}
              redirectTo={"/admin/auth"}
            >
              <Admin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedAdminRoute
              isAllowed={isAdminLoginSuccessful}
              redirectTo={"/admin/auth"}
            >
              <Users />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <ProtectedAdminRoute
              isAllowed={isAdminLoginSuccessful}
              redirectTo={"/admin/auth"}
            >
              <Upload />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute
              isAllowed={isAdminLoginSuccessful}
              redirectTo={"/admin/auth"}
            >
              <Setting />
            </ProtectedAdminRoute>
          }
        />

        {/* Admin login */}
        <Route
          path="/admin/auth"
          element={
            <AdminAuthPage
              isAdminLoginSuccessful={isAdminLoginSuccessful}
              handleAdminSuccess={handleAdminSuccess}
            />
          }
        />

        {/* Other routes */}
        <Route path="/test" element={<Test />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
};


export default App;
