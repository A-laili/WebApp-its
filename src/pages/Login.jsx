import React, { useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { GoogleLogin } from "@react-oauth/google";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    // TODO: Add actual authentication logic
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center items-stretch bg-gradient-to-r from-purple-800 to-blue-700 text-white px-6 py-10">
      <div className="md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
        <Lottie
          animationData={registerAnimation}
          className="w-full max-w-sm"
          loop={true}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 flex flex-col justify-center bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl h-full"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Welcome Back</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in with your credentials
        </p>

        <div className="text-center mb-6">
          <p className="text-gray-700 mb-3 font-semibold">Sign in with</p>
          <div className="flex justify-center gap-6">
            {/* Google Sign-In */}
            <GoogleLogin
              onSuccess={(response) => console.log(response)}
              onError={(error) => console.error(error)}
              shape="circle"
              theme="outline"
              useOneTap
              className="h-12 w-12 bg-white text-gray-700 rounded-full"
            />
            <button
              type="button"
              className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700"
            >
              <BiLogoFacebook size={24} />
            </button>
            <button
              type="button"
              className="h-12 w-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500"
            >
              <AiOutlineTwitter size={24} />
            </button>
          </div>
        </div>

        <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 text-center font-semibold text-sm text-gray-500">OR</p>
        </div>

        {/* Email Input with example */}
        <input
          className="text-sm w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-700"
          type="email"
          required
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input with toggle visibility */}
        <div className="relative">
          <input
            className={`text-sm w-full px-4 py-2 border rounded focus:outline-none ${
              passwordFocused ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300"
            } mb-6 text-gray-700`}
            type={showPassword ? "text" : "password"} // Toggle password visibility
            required
            placeholder="Password"
            value={password}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Eye Icon to toggle password visibility */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        <div className="mt-4 flex justify-between text-sm font-medium text-gray-600">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember Me
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold uppercase text-sm"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-red-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </section>
  );
};

export default Login;
