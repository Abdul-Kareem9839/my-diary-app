import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CallToAct() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 px-6 bg-teal-600 text-white text-center overflow-hidden">
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-teal-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <motion.div
        ref={ref}
        className="relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="mb-3 inline-block bg-white text-teal-600 px-4 py-1 rounded-full text-sm font-medium shadow">
          Free Forever — No Credit Card Needed
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Start Journaling Today
        </h2>

        <p className="text-lg mb-6 text-teal-100">
          Join thousands of people using ZenScribe to track their thoughts and
          emotions.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/register")}
          className="px-8 py-3 bg-white text-teal-700 font-semibold rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Create Your Free Account
        </motion.button>

        <div className="mt-6 flex justify-center -space-x-3">
          <img
            src="https://i.pravatar.cc/40?img=1"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <img
            src="https://i.pravatar.cc/40?img=10"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <img
            src="https://i.pravatar.cc/40?img=12"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="text-sm text-white ml-3 mt-2">
            + 10,000 happy users
          </span>
        </div>
      </motion.div>
    </section>
  );
}
