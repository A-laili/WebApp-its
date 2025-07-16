import React, { useState } from "react";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword  , sendEmailVerification} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    birthdate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Real-time password validations
 const validatePassword = (password) => {
  return {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),  // ✅ updated
  };
};


  const passwordChecks = validatePassword(form.password);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCred.user;
 // Send email verification
    await sendEmailVerification(user);
    alert("A verification email has been sent. Please check your inbox.");

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: form.fullName,
        email: form.email,
        birthdate: form.birthdate,
        createdAt: new Date(),
      });

      alert("Registration successful!");
    } catch (err) {
      console.error("Registration error:", err.message);
      alert(err.message);
    }
  };

  return (
    <section className="h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-purple-800 to-blue-700">
      {/* Left side - animation */}
      <div className="md:w-1/2 flex justify-center items-center p-6">
        <Lottie animationData={registerAnimation} className="w-full max-w-sm" loop />
      </div>

      {/* Right side - form */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl text-gray-800"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>

          {/* Name */}
          <input
            type="text"
            name="fullName"
            required
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Birthdate */}
          <label className="text-sm font-semibold mb-1">Birthdate</label>
          <input
            type="date"
            name="birthdate"
            required
            value={form.birthdate}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Password */}
          <div className="relative mb-1">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Password feedback */}
          <ul className="text-xs mb-4 ml-1 space-y-1">
            <li className={passwordChecks.length ? "text-green-600" : "text-red-500"}>
              • At least 8 characters
            </li>
            <li className={passwordChecks.uppercase ? "text-green-600" : "text-red-500"}>
              • One uppercase letter
            </li>
            <li className={passwordChecks.lowercase ? "text-green-600" : "text-red-500"}>
              • One lowercase letter
            </li>
            <li className={passwordChecks.number ? "text-green-600" : "text-red-500"}>
              • One number
            </li>
            <li className={passwordChecks.special ? "text-green-600" : "text-red-500"}>
              • One special character
            </li>
          </ul>

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg font-semibold transition"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
