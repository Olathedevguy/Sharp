import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = () => {
    toast.success("Operation was successful!");
  };

  const handleError = () => {
    toast.error("Something went wrong!");
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <button onClick={handleSuccess}>Show Success</button>
        <button onClick={handleError}>Show Error</button>
      </div>
    </div>
  );
};

export default Test;
