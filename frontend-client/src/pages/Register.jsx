// // Register.jsx
// import React from 'react';

// const Register = () => {
//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gray-50 py-16 px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Create a New Account</h2>
//         <form className="space-y-5">
//           <div>
//             <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="John Doe"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
//             <input
//               type="email"
//               id="email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="you@example.com"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="••••••••"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
//           >
//             Register
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-500 mt-4">
//           Already have an account? <a href="/login" className="text-indigo-600 font-medium">Login</a>
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="container mx-auto justify-center items-center flex h-screen ">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="font-roboto text-4xl font-bold text-center text-gray-800 mb-12">
          Sign Up
        </h1>
        <form>
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="name"
              className="text-[#5a7184] font-semibold block"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
            />
          </div>

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
              {showPassword ? <IoEyeOutline />: <FaRegEyeSlash />} 
            </span>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6"
          >
            Register
          </button>

          <p className="text-sm font-semibold text-[#5a7184] text-left">
            You have an account?{" "}
            <span
               onClick={() => navigate("/login")}
            className="text-indigo-600 text-base cursor-pointer">
              Login now
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
