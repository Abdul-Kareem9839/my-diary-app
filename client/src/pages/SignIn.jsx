import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/signin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
      } else {
        console.log("Login successful:", data);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    }
  };

  const handleProviderSignIn = (provider) => {
    console.log(`Sign in with ${provider}`);
  };

  return (
    <div className="relative flex justify-center w-full px-4 min-h-screen bg-cover bg-center">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dxackokfi/image/upload/v1755536979/priscilla-du-preez-CeW--PHwpGc-unsplash_trqeyq.jpg')",
        }}
      ></div>
      <motion.div
        className="relative z-10 bg-gradient-to-br from-teal-600/30 via-green-700/50 to-white shadow-sm shadow-white border border-white rounded-2xl p-6 m-3 w-full max-w-xs sm:max-w-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: [0.1, 1.2, 0.95, 1] }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      >
        <h1 className="text-center text-2xl font-extrabold text-black mb-6">
          Welcome Back to{" "}
          <span className="text-pink-700 font-bold text-3xl">ZenScribe.</span>
        </h1>

        <form onSubmit={handleSignIn} className="gap-4 flex flex-col">
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-black font-serif">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abcd@gmail.com"
              required
              className="mt-1 block w-full placeholder-gray-700 bg-white/40 border border-black backdrop-blur-sm text-gray-900 rounded-md shadow-sm p-3 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black font-serif">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="mt-1 block w-full placeholder-gray-700 bg-white/40 border border-black backdrop-blur-sm text-gray-900 rounded-md shadow-sm p-3 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 rounded-[2rem] border border-black bg-teal-700 hover:bg-teal-600 text-white font-medium py-2 px-4 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-black"></div>
          <span className="mx-3 text-black text-xs sm:text-sm">
            or sign in with
          </span>
          <div className="flex-grow border-t border-black"></div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => (window.location.href = `/api/user/google`)}
            className="flex items-center justify-center gap-2 w-1/2 bg-white border border-gray-300 rounded-md py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <FcGoogle size={18} /> Google
          </button>
          <button
            onClick={() => handleProviderSignIn("Instagram")}
            className="flex items-center justify-center gap-2 w-1/2 bg-white border border-gray-300 rounded-md py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            <FaInstagram className="text-pink-600" size={18} /> Instagram
          </button>
        </div>

        <p className="mt-6 text-center text-black text-xs sm:text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-teal-700 hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}
