import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoreVertical, FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Showcard1Content({
  entry,
  handleDelete,
  isEditing,
  setIsEditing,
  editContent,
  setEditContent,
  handleUpdate,
  uploadedImage,
  handleImageChange,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-10">
      <motion.div
        className="relative w-full max-w-5xl rounded-3xl border border-gray-700 shadow-lg p-8 space-y-6 font-sans text-gray-100 bg-gray-800/60 backdrop-blur-lg flex flex-col lg:flex-row lg:space-x-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left: Entry content */}
        <div className="flex-1 flex flex-col space-y-6">
          {/* Menu */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-gray-700/50 transition border-0 bg-transparent outline-none focus:outline-none focus:ring-0"
            >
              <FiMoreVertical size={20} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-2 w-40 bg-gray-700/90 backdrop-blur-md rounded-lg shadow-lg py-2 z-10 border border-gray-600"
                >
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setIsEditing(true);
                    }}
                    className="flex items-center px-4 py-2 hover:bg-gray-600 w-full text-left border-0 bg-transparent outline-none focus:outline-none focus:ring-0"
                  >
                    <FiEdit2 className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleDelete();
                    }}
                    className="flex items-center px-4 py-2 hover:bg-red-600 w-full text-left text-red-300 border-0 bg-transparent outline-none focus:outline-none focus:ring-0"
                  >
                    <FiTrash2 className="mr-2" /> Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Entry info */}
          {entry && (
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="text-6xl">{entry.emoji}</div>
              <h1 className="text-2xl font-bold">{entry.label}</h1>
              <p className="text-gray-400 text-sm italic max-w-sm">
                {entry.description}
              </p>
            </div>
          )}

          {/* Date & Time */}
          <div className="flex justify-center space-x-4">
            <span className="flex items-center space-x-2 bg-gray-900/70 px-3 py-1 rounded-full border border-gray-700 text-gray-300 text-sm">
              <FaCalendarAlt /> <span>{entry.date}</span>
            </span>
            <span className="flex items-center space-x-2 bg-gray-900/70 px-3 py-1 rounded-full border border-gray-700 text-gray-300 text-sm">
              <FaClock /> <span>{entry.time}</span>
            </span>
          </div>

          {/* Thoughts */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-100 text-lg">
              Thoughts
            </label>
            {isEditing ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-gray-800/80 border border-gray-700 text-gray-200 rounded-3xl p-5 shadow-inner resize-none focus:outline-none focus:border-blue-500"
                  rows={8}
                />
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={handleUpdate}
                    className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white"
                  >
                    <FiSave className="mr-2" /> Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(entry.content);
                    }}
                    className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl text-white"
                  >
                    <FiX className="mr-2" /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-gray-800/80 border border-gray-700 text-gray-200 rounded-3xl p-5 shadow-inner whitespace-pre-wrap">
                {entry.content || "No content available"}
              </div>
            )}
          </div>
        </div>

        {/* Right: Image gallery */}
        <div className="flex flex-col flex-shrink-0 space-y-4 w-full lg:w-64">
          <h2 className="text-lg font-semibold text-gray-200">Images</h2>

          {/* Preview uploaded image or backend image */}
          {uploadedImage || entry.image ? (
            <div className="h-48 w-full overflow-hidden rounded-2xl border border-gray-700 shadow-inner">
              <img
                src={uploadedImage || (entry.image && entry.image.url)}
                alt="Entry"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-48 w-full flex items-center justify-center bg-gray-700/40 text-gray-400 rounded-2xl">
              No Images
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
