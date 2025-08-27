import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";

export default function Topbar({
  currUser,
  onProfileClick,
  query,
  handleChange,
}) {
  return (
    <div className="sticky px-3 py-2 flex items-center justify-between border border-gray-400 shadow-sm">
      <div className="flex items-center gap-2 ">
        <button
          onClick={onProfileClick}
          className="p-2 rounded hover:scale-110 text-xl text-black border-0 bg-transparent outline-none focus:outline-none focus:ring-0 "
        >
          ☰
        </button>
        <div className="border border-gray-500 rounded-3xl flex gap-2 py-1 px-3">
          <div className="w-8 h-8 rounded-full overflow-hidden ">
            <img
              src="/LogoNew.jpg"
              alt="ZenScribe Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="text-pink-900 text-lg font-bold">ZenScribe.</span>
        </div>
      </div>

      <div className="hidden sm:flex items-center w-[28rem] rounded-[2rem] overflow-hidden border border-teal-800 mt-2 mb-2 hover:border-1 hover:scale-105 hover:border-teal-900 transition-all duration-300">
        <button className="p-3 text-teal-800 transition-transform duration-200 hover:scale-110 active:scale-90 border-0 bg-transparent outline-none focus:outline-none focus:ring-0">
          <SearchIcon />
        </button>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="✨ Search your memories"
          className="flex-grow bg-transparent px-4 py-2 placeholder-teal-500 text-teal-700 focus:outline-none border-0"
        />
      </div>

      <div className="flex items-center cursor-pointer gap-2 mr-6">
        <span className="hidden sm:flex font-medium text-black text-sm">
          Hye! @{currUser?.username || "Guest"}
        </span>
        <FaUserCircle className="text-3xl text-teal-700" />
      </div>
    </div>
  );
}
