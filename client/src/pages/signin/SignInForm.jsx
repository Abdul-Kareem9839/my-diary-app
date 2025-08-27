import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram } from "react-icons/fa";

export default function SignInForm({ onSignIn, navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/signin`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
    <>
      <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-black font-serif">
            Email Address
          </label>
          <input
            type="email"
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

      {/* Social Login */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-black"></div>
        <span className="mx-3 text-black text-xs sm:text-sm">
          or sign in with
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
