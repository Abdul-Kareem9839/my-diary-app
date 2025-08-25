import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./TopSec.css";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export default function TopSec({ currUser }) {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center animate-gradient text-zinc-800 overflow-hidden px-4 scroll-smooth"
    >
      <svg
        id="visual"
        viewBox="0 0 960 540"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        className="absolute top-0 left-0 w-full h-full -z-10"
        preserveAspectRatio="none"
      >
        <rect x="0" y="0" width="960" height="540" fill="#FFFFFF"></rect>
        <g fill="#009473">
          <circle r="162" cx="133" cy="275"></circle>
          <circle r="71" cx="946" cy="27"></circle>
          <circle r="79" cx="526" cy="321"></circle>
          <circle r="91" cx="851" cy="400"></circle>
        </g>
      </svg>
      <div className="fixed top-0 w-full left-0 bg-white/80 backdrop-blur-lg z-50 flex">
        <div className=" relative max-w-6xl mx-auto flex justify-center space-x-6 py-3 mt-1 text-xs w-[15rem] ">
          <a
            href="#home"
            className="text-gray-400 font-medium hover:text-teal-600 transition"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-gray-400 font-medium hover:text-teal-600 transition"
          >
            Features
          </a>
          <a
            href="#why"
            className="text-gray-400 font-medium hover:text-teal-600 transition"
          >
            Why?
          </a>
          <a
            href="#feedback"
            className="text-gray-400 font-medium hover:text-teal-600 transition"
          >
            Feedback
          </a>
        </div>
        <div className="flex flex-row items-center justify-center">
          <motion.button
            className="text-gray-700 font-bold hover:text-teal-600 transition cursor-pointer  border-0 bg-transparent outline-none focus:outline-none focus:ring-0 mr-4"
            onClick={currUser}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
          >
            My Diary
            <DoubleArrowIcon />
          </motion.button>
        </div>
      </div>

      {/* ✅ Hero Content */}
      <motion.h1
        className="text-4xl md:text-5xl font-serif font-bold text-center tracking-wide drop-shadow-sm mb-4  mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span className="shine-text">Welcome to </span>
        <span className="text-5xl md:text-7xl text-pink-700">ZenScribe.</span>
      </motion.h1>

      <motion.p
        className="relative z-10 text-lg md:text-xl text-center text-gray-800 max-w-2xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Your personal space to write, reflect, and save memories — securely and
        effortlessly.
      </motion.p>

      <motion.div
        className="max-w-4xl mb-5 mx-auto text-center px-4 py-6 bg-white bg-opacity-50 backdrop-blur-md rounded-xl shadow-lg border border-white/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 tracking-tight mb-2 drop-shadow-sm relative inline-block">
          A Diary Made For You
        </h2>

        <p className="text-green-800 text-md md:text-lg leading-relaxed italic">
          Write with ease, bookmark what matters, and access your entries
          anytime. A secure diary with voice-to-text and a personalized
          dashboard — designed for you.
        </p>
        <div className="flex justify-center space-x-2 mt-4">
          <motion.div
            className="w-3 h-3 rounded-full bg-green-600"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-green-600"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
              delay: 0.33,
            }}
          />
          <motion.div
            className="w-3 h-3 rounded-full bg-green-600"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
              delay: 0.66,
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-4 mt-3"
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 border-2 border-teal-300 bg-teal-600 text-white hover:bg-transparent hover:text-teal-600 hover:border-white rounded-full font-semibold shadow-sm transition"
        >
          Start your journey now
          <KeyboardDoubleArrowRightIcon className="inline ml-2" />
        </button>
      </motion.div>
    </section>
  );
}
