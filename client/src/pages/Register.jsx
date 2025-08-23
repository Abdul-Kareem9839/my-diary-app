import * as React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export default function RegisterPage() {
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error(data.error || "Registration failed");
        alert(data.error || "Registration failed");
        return;
      }
      console.log("User registered:", data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  const handleProviderSignIn = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <div className="relative flex justify-center w-full px-4 min-h-screen bg-cover bg-center">
      <div
        className="absolute inset-0 bg-cover bg-black blur-sm"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dxackokfi/image/upload/v1755536979/priscilla-du-preez-CeW--PHwpGc-unsplash_trqeyq.jpg')",
        }}
      ></div>
      <motion.div
        className="relative z-10 bg-gradient-to-br from-teal-600/30 via-green-700/50 to-white
 shadow-lg border border-teal-600 shadow-black rounded-t-[2rem] p-6 mt-3 w-full max-w-xs sm:max-w-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: [0.1, 1.2, 0.95, 1] }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      >
        <h1 className="text-center text-2xl font-extrabold text-black mb-6 ">
          Create an account on{" "}
          <span className="text-pink-700 font-bold text-3xl">ZenScribe.</span>
        </h1>

        <form onSubmit={handleRegister} className="gap-4 flex flex-col">
          <div>
            <label className="block text-sm font-medium text-black font-serif">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              className="mt-1 block w-full placeholder-gray-700 bg-white/40 border border-black backdrop-blur-sm text-gray-900 rounded-md shadow-sm p-3 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black font-serif">
              Email Address
            </label>
            <input
              type="email"
              name="email"
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
              placeholder="Enter a strong password"
              required
              className="mt-1 block w-full placeholder-gray-700 bg-white/40 border border-black backdrop-blur-sm text-gray-900 rounded-md shadow-sm p-3 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 rounded-[2rem] border border-black bg-teal-700 hover:bg-teal-600 text-white font-medium py-2 px-4 transition-colors"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-black"></div>
          <span className="mx-3 text-black text-xs sm:text-sm">
            or register with
          </span>
          <div className="flex-grow border-t border-black"></div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              (window.location.href = "http://localhost:8080/api/user/google")
            }
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
          Already have an account?{" "}
          <a href="/signin" className="text-teal-700 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
