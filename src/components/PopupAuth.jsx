import React, { useEffect, useState, useContext } from "react";
import { auth, googleprovider, db } from "../config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { InfinitySpin } from "react-loader-spinner";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/Appcontext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LucideEye, LucideEyeOff, X } from "lucide-react";
import { RingLoader } from "react-spinners";
import { videos } from "../assets/asset";

const PopupAuth = () => {
  const navigate = useNavigate();
  const { setAuthSuccess } = useContext(GlobalContext);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [showPwd, setShowPwd] = useState(false)

  // Check if user is already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthSuccess(true);
        setIsPopupOpen(false);
        navigate("/"); // Redirect to home or desired route
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, setAuthSuccess]);

  const storeUserData = async (user) => {
    const userData = { userId: user.uid, email: user.email, role: "user" };
    try {
      await setDoc(doc(db, "users", user.uid), userData);
    } catch (error) {
      console.error("Error storing user data:", error.message);
    }
  };

  const handleAuth = async (isSignUp = false) => {
    setIsLoading(true);
    try {
      const authFn = isSignUp
        ? createUserWithEmailAndPassword
        : signInWithEmailAndPassword;
      const userCredential = await authFn(auth, email, password);
      const user = userCredential.user;

      if (isSignUp) await storeUserData(user);
      setAuthSuccess(true);
      setEmail("");
      setPassword("");
      setIsPopupOpen(false);
      navigate("/");
      toast.success(isSignUp ? "Account created successfully!" : "Welcome back!");
    } catch (error) {
      console.error(error);
      setAuthSuccess(false);
      toast.error(isSignUp ? "Error creating account." : "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleprovider);
      const user = userCredential.user;
      await storeUserData(user);
      setAuthSuccess(true);
      setIsPopupOpen(false);
      navigate("/");
      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      setAuthSuccess(false);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPwd = ()=>{
    setShowPwd(!showPwd)
  }

  if (!isPopupOpen) return null;

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <ToastContainer position="top-center" autoClose={3000} hideProgressBar stacked />
  
  <div 
    className="bg-white rounded-lg p-4 md:p-6 w-[90%] sm:w-[95%] max-w-4xl flex flex-col md:flex-row gap-6 overflow-auto"
    style={{ maxHeight: "90vh" }}
  >
    {/* Video Section */}
    <div className="flex-1">
      <video
        autoPlay
        muted
        loop
        className="w-full h-auto rounded-md md:max-w-full sm:max-w-xs"
      >
        <source src={videos.nikeVideo} />
      </video>
    </div>

    {/* Form Section */}
    <div className="flex-1 relative">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        onClick={() => setIsPopupOpen(false)}
      >
        <X />
      </button>
      <h2 className="text-xl font-bold text-center mb-4">
        {newUser ? "Sign Up" : "Log In"}
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border rounded-md py-2 px-3 w-full"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPwd ? "text" : "password"}
              placeholder="Enter your password"
              className="border rounded-md py-2 px-3 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleShowPwd}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none"
            >
              {showPwd ? <LucideEye /> : <LucideEyeOff />}
            </button>
          </div>
        </div>
        <button
          onClick={() => handleAuth(newUser)}
          className="bg-black text-white py-2 rounded-md w-full flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <RingLoader size={25} color="#ffffff" />
          ) : (
            newUser ? "Join" : "Login"
          )}
        </button>
        <button
          onClick={signInWithGoogle}
          className="border border-black py-2 rounded-md w-full"
        >
          Sign in with Google
        </button>
        <p className="text-center">
          {newUser ? "Already have an account?" : "New User?"}{" "}
          <span
            onClick={() => setNewUser(!newUser)}
            className="text-blue-500 cursor-pointer"
          >
            {newUser ? "Log In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  </div>
</div>


  );
};

export default PopupAuth;
