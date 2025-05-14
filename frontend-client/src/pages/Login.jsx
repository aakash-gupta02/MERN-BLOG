import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  return (
    <section className="container mx-auto justify-center items-center flex h-screen">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="font-roboto text-4xl font-bold text-center text-gray-800 mb-12">
          Login
        </h1>
        <form>
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
            />
          </div>

          <div className="flex flex-col mb-6 w-full relative">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-[52px] text-xl font-medium text-indigo-600 cursor-pointer"
            >
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </span>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6"
          >
            Login
          </button>

          <p 
          
          className="text-sm font-semibold text-[#5a7184] text-left">
            Don’t have an account?{" "}
            <span
               onClick={() => navigate("/register")}
            className="text-indigo-600 text-base cursor-pointer">
              Register now
            </span>
          </p>


        </form>
      </div>
    </section>
  );
};

export default LoginPage;
