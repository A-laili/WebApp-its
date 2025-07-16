import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiLogoGithub } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json";
import { auth, googleProvider, githubProvider, signInWithPopup } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with credentials:", { email, password });
    // Replace with email/password auth (if needed)
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user:", result.user);
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log("GitHub user:", result.user);
    } catch (err) {
      console.error("GitHub login error:", err);
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center items-stretch bg-gradient-to-r from-purple-800 to-blue-700 text-white px-6 py-10">
      <div className="md:w-1/2 flex items-center justify-center">
        <Lottie animationData={registerAnimation} className="w-full max-w-sm" loop />
      </div>

      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 flex flex-col justify-center bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl h-full"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in with your account
        </p>

        {/* Firebase OAuth Buttons */}
        <div className="text-center mb-6">
          <p className="text-gray-700 mb-3 font-semibold">Sign in with</p>
          <div className="flex justify-center gap-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="h-12 w-12 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
            >
              <FcGoogle size={24} />
            </button>
            <button
              type="button"
              onClick={handleGitHubLogin}
              className="h-12 w-12 bg-gray-800 text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
            >
              <BiLogoGithub size={24} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 text-center font-semibold text-sm text-gray-500">OR</p>
        </div>

        {/* Email */}
        <input
          className="text-sm w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-700"
          type="email"
          required
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <div className="relative">
          <input
            className={`text-sm w-full px-4 py-2 border rounded focus:outline-none ${
              passwordFocused ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300"
            } mb-6 text-gray-700`}
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            value={password}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        {/* Remember + Forgot */}
        <div className="mt-4 flex justify-between text-sm font-medium text-gray-600">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember Me
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold uppercase text-sm"
        >
          Login
        </button>

        {/* Register */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-red-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </section>
  );
};

export default Login;
