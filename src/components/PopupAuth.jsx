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

const PopupAuth = () => {
  const navigate = useNavigate();
  const { setAuthSuccess } = useContext(GlobalContext);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(false);

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

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ToastContainer />
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={() => setIsPopupOpen(false)}
        >
          &times;
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border rounded-md py-2 px-3 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleAuth(newUser)}
            className="bg-black text-white py-2 rounded-md w-full"
            disabled={isLoading}
          >
            {isLoading ? <InfinitySpin width="50" color="#fff" /> : newUser ? "Join" : "Login"}
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
  );
};

export default PopupAuth;
