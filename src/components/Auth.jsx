import React, { useContext, useState } from "react";
import { images } from "../assets/asset";
import { auth, googleprovider, db } from "../config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { InfinitySpin } from "react-loader-spinner";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/Appcontext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthSuccess } = useContext(GlobalContext);
  const [newUser, setNewUser] = useState(false);

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

  return (
    <div className="flex items-center justify-center bg-custom-image2 min-h-screen px-4">
      
      <div className="flex flex-col md:flex-row items-center bg-white rounded-xl p-6 md:p-12 gap-8">
      <ToastContainer />
        <div className="w-full md:w-1/2">
          <img
            className="rounded-xl w-full"
            src={images.authpageImg2}
            alt="Authentication Page"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border rounded-md py-3 px-4 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border rounded-md py-3 px-4 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Enter your password"
            />
          </div>
          <button
            onClick={() => handleAuth(newUser)}
            className="bg-black text-white py-3 rounded-md w-full"
            disabled={isLoading}
            aria-label={newUser ? "Sign up" : "Log in"}
          >
            {isLoading ? <InfinitySpin width="50" color="#fff" /> : newUser ? "Join" : "Login"}
          </button>
          <button
            onClick={signInWithGoogle}
            className="border border-black py-3 rounded-md w-full"
          >
            Sign in with Google
          </button>
          <p className="text-center">
            {newUser ? "Already have an account?" : "New User?"}{" "}
            <span
              onClick={() => setNewUser(!newUser)}
              className="underline cursor-pointer text-blue-600"
            >
              {newUser ? "Sign in" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
