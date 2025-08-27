import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa";

export default function RegisterForm({ navigate }) {
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      console.log("User registered:", data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong!");
    }
  };

  const handleProviderSignIn = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <>
      <form onSubmit={handleRegister} className="gap-4 flex flex-col">
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

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
            (window.location.href =
              process.env.NODE_ENV === "production"
                ? "https://my-diary-app-zenscribe.onrender.com/api/auth/google"
                : "http://localhost:8080/api/auth/google")
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
    </>
  );
}
