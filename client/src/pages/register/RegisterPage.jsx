import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();

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
        className="relative z-10 h-[40rem] bg-gradient-to-br from-teal-600/30 via-green-700/50 to-white
                   shadow-lg border border-teal-600 shadow-black rounded-[2rem] p-6 m-8 w-full max-w-xs sm:max-w-sm"
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

        <RegisterForm navigate={navigate} />

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
