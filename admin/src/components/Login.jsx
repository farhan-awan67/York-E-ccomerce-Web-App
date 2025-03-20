import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Login = ({ setToken }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    //checking validation result
    let isValid = validateData(data);

    //stoping form from submission
    if (!isValid) {
      return;
    }

    //sending data
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/admin`,
        data
      );
      setToken(res.data.token);
      ;

      console.log(res.data.token);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right", // Position of the toast
        autoClose: 5000, // Auto close after 5 seconds
        hideProgressBar: false, // Hide progress bar
        closeOnClick: true, // Close on click
        pauseOnHover: true, // Pause on hover
        draggable: false, // Allow drag
        style: {
          backgroundColor: "white", // Set background color (Tomato red)
          color: "red", // Set text color (white)
          fontWeight: "bold", // Set font weight
          borderRadius: "10px", // Rounded corners
          marginTop: "2px", // margin top
        },
      });
    }
  };

  const getData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validateConfig = {
    email: [{ message: "Email is required", required: true }],
    password: [{ message: "Password is required", required: true }],
  };

  const validateData = (data) => {
    const errorData = {};
    let isValid = true;
    Object.entries(data).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          toast.error(rule.message, {
            position: "top-right", // Position of the toast
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false, // Hide progress bar
            closeOnClick: true, // Close on click
            pauseOnHover: true, // Pause on hover
            draggable: false, // Allow drag
            style: {
              backgroundColor: "white", // Set background color (Tomato red)
              color: "red", // Set text color (white)
              fontWeight: "bold", // Set font weight
              borderRadius: "10px", // Rounded corners
              marginTop: "2px", // margin top
            },
          });
          isValid = false; // ✅ Now only set false if validation fails
        }
      });
    });
    setError(errorData);
    return isValid;
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              name="email"
              onChange={getData}
              value={data.email}
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={getData}
              value={data.password}
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
