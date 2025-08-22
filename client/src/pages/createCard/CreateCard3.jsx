import React, { useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import VoiceToText from "./VoiceTotext";

const feelings = [
  { emoji: "😎", label: "Cool", description: "Feeling confident and chill" },
  { emoji: "😊", label: "Content", description: "Feeling calm and satisfied" },
  { emoji: "😔", label: "Sad", description: "Feeling down or unhappy" },
  { emoji: "😡", label: "Angry", description: "Frustrated or upset" },
  { emoji: "😍", label: "Loved", description: "Heart full of warmth" },
  { emoji: "😴", label: "Tired", description: "Needing rest or sleep" },
  { emoji: "😀", label: "Happy", description: "Filled with joy and happiness" },
  {
    emoji: "🤔",
    label: "Thoughtful",
    description: "Deep in thought or curious",
  },
  {
    emoji: "😭",
    label: "Emotional",
    description: "Feeling emotional or upset",
  },
];

export default function CreateCard3() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentFeeling, setCurrentFeeling] = useState(feelings[0]);
  const navigate = useNavigate();

  const now = new Date();
  const card_id = "card3";
  const formattedDate = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChangeFeeling = () => {
    let newFeeling;
    do {
      newFeeling = feelings[Math.floor(Math.random() * feelings.length)];
    } while (newFeeling.emoji === currentFeeling.emoji);
    setCurrentFeeling(newFeeling);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("card_id", card_id);
    formData.append("emoji", currentFeeling.emoji);
    formData.append("label", currentFeeling.label);
    formData.append("description", currentFeeling.description);
    formData.append("content", content);
    formData.append("date", formattedDate);
    formData.append("time", formattedTime);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:8080/api/dashboard", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        console.log("Entry saved!");
        navigate("/dashboard");
      } else {
        console.error("Failed to save entry");
      }
    } catch (err) {
      console.error("Error saving entry:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-10">
      <motion.div
        className="max-w-xl w-[25rem] 
             bg-gradient-to-tr from-black via-gray-800 to-gray-300 
             backdrop-blur-md rounded-3xl shadow-2xl 
             border border-gray-400/80 p-8 space-y-6 font-sans flex flex-col overflow-hidden
             relative"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Inner Glow Border Effect */}
        <div className="absolute inset-0 rounded-3xl border border-gray-500/40 pointer-events-none" />

        {/* Date & Time */}
        <div
          className="flex justify-between p-5 rounded-2xl 
                  bg-gradient-to-r from-gray-200/80 via-black/70 to-gray-300/60
                  text-gray-100 text-sm font-medium shadow-inner"
        >
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-300" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="text-gray-300" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex justify-end">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer bg-gradient-to-r from-gray-300 via-black to-gray-400
                 hover:from-gray-200 hover:to-gray-500 
                 text-white px-5 py-2 rounded-2xl flex items-center space-x-2 
                 shadow-md transition duration-300"
          >
            <AddPhotoAlternateIcon className="text-gray-100" />
            <span>{preview ? "Change Photo" : "Add Photo"}</span>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="h-56 rounded-2xl overflow-hidden shadow-lg border border-gray-400/60">
            <img
              src={preview}
              alt="Selected"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        )}

        {/* Feeling Section */}
        <div
          className="rounded-2xl px-4 py-6 
                  bg-gradient-to-r from-black/80 via-gray-300/30 to-gray-200/60
                  flex items-center justify-between shadow-inner"
        >
          <div className="flex space-x-4">
            <div
              className="bg-gradient-to-br from-gray-200 to-black w-14 h-16 rounded-xl 
                      text-4xl flex items-center justify-center shadow-lg text-white"
            >
              {currentFeeling.emoji}
            </div>
            <div className="w-20">
              <h3 className="font-serif text-2xl text-gray-100 font-semibold">
                {currentFeeling.label}
              </h3>
              <p className="text-gray-300 text-sm italic mt-1 max-w-xs">
                {currentFeeling.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleChangeFeeling}
            className="bg-gradient-to-r from-gray-300 via-black to-gray-400 
                 hover:from-gray-200 hover:to-gray-500 
                 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 
                 shadow-md transition duration-300"
          >
            <span>Change</span>
            <EmojiEmotionsIcon />
          </button>
        </div>

        {/* Content Textarea */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <label
            htmlFor="content"
            className="block mb-2 font-semibold text-gray-200 text-lg"
          >
            Write your thoughts...
            <VoiceToText content={content} setContent={setContent} />
          </label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing here..."
            className="h-44 bg-gradient-to-tr from-black via-gray-900 to-gray-400/30
                 placeholder-gray-400 border border-gray-500/70 
                 text-gray-100 rounded-2xl p-5 resize-none shadow-inner 
                 focus:outline-gray-400 focus:ring-2 focus:ring-gray-400 transition duration-300"
          />
        </div>

        {/* Save Button */}
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={handleSave}
            className="bg-gradient-to-r from-black via-gray-400 to-gray-200 
                 hover:from-gray-700 hover:to-gray-300 
                 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition duration-300"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
