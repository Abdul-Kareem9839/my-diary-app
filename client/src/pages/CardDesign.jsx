import React from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Static simplified preview divs for each card design:

const CardPreview1 = () => (
  <div className="w-full h-full bg-gradient-to-tr from-teal-400 via-teal-500 to-cyan-600 rounded-3xl border border-teal-300 shadow-lg p-6 flex flex-col justify-between text-white select-none">
    <div>
      <div className="flex justify-between mb-4 text-sm text-teal-900 font-medium opacity-80">
        <div>Aug 10, 2025</div>
        <div>03:30 PM</div>
      </div>
      <div className="bg-teal-500 rounded-2xl w-12 h-12 flex items-center justify-center text-3xl mb-3 shadow-lg">
        😊
      </div>
      <h3 className="font-serif text-xl font-bold text-teal-900">
        Feeling Happy
      </h3>
      <p className="text-xs text-teal-800 opacity-80">Joy and smiles all day</p>
    </div>
    <div className="bg-white bg-opacity-70 border border-teal-300 rounded-xl h-24 mt-4 p-3 text-sm text-teal-900 opacity-80 shadow-inner">
      Sample diary content preview goes here...
    </div>
  </div>
);

const CardPreview2 = () => (
  <div className="w-full h-full bg-gradient-to-tr from-pink-500 via-pink-600 to-purple-700 rounded-3xl border border-pink-400 shadow-lg p-6 flex flex-col justify-between text-white select-none">
    <div>
      <div className="flex justify-between mb-4 text-sm opacity-80">
        <div>Aug 10, 2025</div>
        <div>03:30 PM</div>
      </div>
      <div className="bg-pink-600 rounded-full w-12 h-12 flex items-center justify-center text-3xl mb-3 shadow-md">
        😍
      </div>
      <h3 className="font-serif text-xl font-bold">Feeling Loved</h3>
      <p className="text-xs opacity-70">Heart full of warmth</p>
    </div>
    <div className="bg-pink-900 bg-opacity-30 rounded-xl h-24 mt-4 p-3 text-sm opacity-70">
      Sample diary content preview goes here...
    </div>
  </div>
);

const CardPreview3 = () => (
  <div
    className="w-[18rem] h-full 
                  bg-gradient-to-br from-black via-gray-800 to-gray-200 
                  rounded-3xl border border-gray-400/80 shadow-xl 
                  p-6 flex flex-col justify-between text-gray-100 select-none"
  >
    <div className="flex justify-between mb-4 text-sm text-gray-300">
      <div>Aug 10, 2025</div>
      <div>03:30 PM</div>
    </div>
    <div>
      <div
        className="bg-gradient-to-tr from-gray-200 to-black 
                      rounded-full w-12 h-12 flex items-center justify-center 
                      text-3xl mb-3 shadow-md text-white"
      >
        🤔
      </div>
      <h3 className="font-serif text-xl font-bold text-gray-100">Thoughtful</h3>
      <p className="text-xs text-gray-400 italic">Deep in reflection</p>
    </div>
    <div
      className="bg-gradient-to-r from-black/70 via-gray-700/50 to-gray-300/30 
                    rounded-xl h-24 mt-4 p-3 text-sm text-gray-300 overflow-hidden shadow-inner"
    >
      Sample diary content preview goes here...
    </div>
  </div>
);

const CardPreview4 = () => (
  <div
    className="w-full h-full 
    bg-gradient-to-br from-black via-gray-900 to-black
    rounded-3xl border-2 border-yellow-500 shadow-[0_0_25px_rgba(255,215,0,0.5)] 
    p-6 flex flex-col justify-between text-yellow-100 select-none"
  >
    <div>
      <div className="flex justify-between mb-4 text-sm text-yellow-400 font-semibold">
        <div>Aug 10, 2025</div>
        <div>03:30 PM</div>
      </div>
      <div
        className="bg-gradient-to-br from-yellow-500 to-yellow-700 
        rounded-full w-12 h-12 flex items-center justify-center 
        text-3xl mb-3 shadow-[0_0_15px_rgba(255,215,0,0.6)] text-black"
      >
        🤔
      </div>
      <h3 className="font-serif text-xl font-bold text-yellow-300 drop-shadow-sm">
        Feeling Thoughtful
      </h3>
      <p className="text-xs text-yellow-200 opacity-80">Deep in reflection</p>
    </div>
    <div
      className="bg-gradient-to-br from-yellow-500/10 to-yellow-700/20 
      border border-yellow-500/30 rounded-xl 
      h-24 mt-4 p-3 text-sm text-yellow-200 font-medium 
      overflow-hidden shadow-inner"
    >
      Sample diary content preview goes here...
    </div>
  </div>
);

const CardPreview5 = () => (
  <div className="w-full h-full bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 rounded-3xl border border-amber-400 shadow-lg p-6 flex flex-col justify-between text-white select-none">
    <div>
      <div className="flex justify-between mb-4 text-sm opacity-80">
        <div>Aug 10, 2025</div>
        <div>07:45 PM</div>
      </div>
      <div className="bg-amber-700 rounded-full w-12 h-12 flex items-center justify-center text-3xl mb-3 shadow-md">
        🔥
      </div>
      <h3 className="font-serif text-xl font-bold">Feeling Motivated</h3>
      <p className="text-xs opacity-70">Energy at its peak</p>
    </div>
    <div className="bg-amber-900 bg-opacity-30 rounded-xl h-24 mt-4 p-3 text-sm opacity-70">
      Ready to conquer new challenges...
    </div>
  </div>
);

const CardPreview6 = () => (
  <div className="w-full h-full bg-gradient-to-tr from-indigo-700 via-violet-600 to-fuchsia-500 rounded-3xl border border-violet-400 shadow-lg p-6 flex flex-col justify-between text-white select-none">
    <div>
      <div className="flex justify-between mb-4 text-sm opacity-80">
        <div>Aug 10, 2025</div>
        <div>11:20 AM</div>
      </div>
      <div className="bg-violet-700 rounded-2xl w-12 h-12 flex items-center justify-center text-3xl mb-3 shadow-md">
        ✨
      </div>
      <h3 className="font-serif text-xl font-bold">Feeling Inspired</h3>
      <p className="text-xs opacity-70">Ideas flowing like magic</p>
    </div>
    <div className="bg-violet-900 bg-opacity-30 rounded-xl h-24 mt-4 p-3 text-sm opacity-70">
      Creativity knows no bounds today...
    </div>
  </div>
);

const CardPreview7 = () => (
  <div className="w-full h-full bg-gradient-to-b from-emerald-700 via-green-600 to-lime-500 rounded-3xl border border-emerald-400 shadow-lg p-6 flex flex-col justify-between text-white select-none">
    <div>
      <div className="flex justify-between mb-4 text-sm opacity-80">
        <div>Aug 10, 2025</div>
        <div>05:00 PM</div>
      </div>
      <div className="bg-emerald-700 rounded-full w-12 h-12 flex items-center justify-center text-3xl mb-3 shadow-md">
        🌱
      </div>
      <h3 className="font-serif text-xl font-bold">Feeling Fresh</h3>
      <p className="text-xs opacity-70">A new start every moment</p>
    </div>
    <div className="bg-emerald-900 bg-opacity-30 rounded-xl h-24 mt-4 p-3 text-sm opacity-70">
      Breathing in peace and positivity...
    </div>
  </div>
);

export default function CardDesign() {
  const navigate = useNavigate();
  const previewCards = [
    CardPreview1,
    CardPreview2,
    CardPreview3,
    CardPreview4,
    CardPreview5,
    CardPreview6,
    CardPreview7,
  ];

  const proCardsCount = 4;

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-8 rounded-[2rem] px-8 py-2 shadow-md bg-gradient-to-r from-pink-200 via-purple-100 to-blue-100">
        Choose your template
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-7xl w-[20rem] md:w-full">
        {/* First 4 clickable previews */}
        {previewCards.map((CardComp, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer rounded-xl shadow-lg overflow-hidden border-0 min-h-[260px] p-4"
            onClick={() => navigate(`/card${i + 1}`)}
          >
            <CardComp />
          </motion.div>
        ))}

        {/* 4 Pro cards - same previews but blurred + dark overlay + Pro button */}
        {previewCards.slice(0, proCardsCount).map((CardComp, i) => (
          <div
            key={`pro-${i}`}
            className="relative rounded-xl overflow-hidden border border-gray-300 min-h-[260px] shadow-lg"
          >
            {/* Blurred preview */}
            <div className="pointer-events-none opacity-70 filter blur-sm">
              <CardComp />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70 rounded-xl" />

            {/* Centered Pro Button */}
            <button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-3 bg-gray-900 bg-opacity-90 rounded-full flex items-center space-x-3 text-white font-semibold text-lg hover:bg-gray-800 transition"
              title="Pro Feature"
              onClick={() => alert("Pro feature!")}
            >
              <BsShieldLockFill size={24} />
              <span>Pro</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
