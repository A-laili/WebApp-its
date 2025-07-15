import React, { useState } from "react";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    // TODO: connect to backend
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-800 px-6">
      <div className="md:w-1/2 max-w-sm mb-8 md:mb-0">
        <Lottie animationData={registerAnimation} className="w-full h-full" loop={true} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="md:w-1/3 max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome to ITS-webAPP
        </h2>

        <input
          className="text-sm w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          required
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={`text-sm w-full px-4 py-2 mt-4 border rounded focus:outline-none ${
            passwordFocused ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300"
          }`}
          type="password"
          required
          placeholder="Password"
          value={password}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mt-4 flex justify-between text-sm font-medium">
          <label className="flex items-center text-gray-600">
            <input type="checkbox" className="mr-2" />
            Remember Me
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold uppercase text-sm tracking-wide"
        >
          Login
        </button>

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
