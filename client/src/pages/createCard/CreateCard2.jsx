import React, { useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import VoiceToText from "./VoiceTotext";

const feelings = [
  { emoji: "😍", label: "Loved", description: "Heart full of warmth" },
  { emoji: "😊", label: "Content", description: "Feeling calm and satisfied" },
  { emoji: "😔", label: "Sad", description: "Feeling down or unhappy" },
  { emoji: "😡", label: "Angry", description: "Frustrated or upset" },
  { emoji: "😀", label: "Happy", description: "Filled with joy and happiness" },
  { emoji: "😴", label: "Tired", description: "Needing rest or sleep" },
  { emoji: "😎", label: "Cool", description: "Feeling confident and chill" },
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

export default function CreateCard2() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // File object
  const [preview, setPreview] = useState(null); // Preview URL
  const [currentFeeling, setCurrentFeeling] = useState(feelings[0]);

  // Format date and time
  const now = new Date();
  const card_id = "card2";
  const formattedDate = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file); // real file for backend
      setPreview(URL.createObjectURL(file)); // preview for UI
    }
  };

  // Change random feeling
  const handleChangeFeeling = () => {
    let newFeeling;
    do {
      newFeeling = feelings[Math.floor(Math.random() * feelings.length)];
    } while (newFeeling.emoji === currentFeeling.emoji);
    setCurrentFeeling(newFeeling);
  };

  // Save entry
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
      const res = await fetch(`/api/dashboard`, {
        method: "POST",
        credentials: "include",
        body: formData, // send FormData, not JSON
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
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-700 via-purple-700 to-pink-900 flex items-center justify-center px-4 py-10">
      <motion.div
        className="max-w-xl w-[25rem] bg-gradient-to-b from-pink-600 via-purple-700 to-pink-900 rounded-3xl shadow-2xl border border-pink-400 p-8 space-y-6 font-sans flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Date & Time */}
        <div className="flex justify-between border border-pink-400 p-5 rounded-3xl shadow-inner bg-gradient-to-tr from-pink-500/50 via-purple-900/40 to-pink-900/40 text-pink-200 text-sm font-medium select-none">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Image Upload */}
        <div className="flex justify-end">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-3xl flex items-center space-x-2 shadow-lg transition-shadow duration-300 select-none"
            title="Upload an image"
          >
            <AddPhotoAlternateIcon />
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
          <div className="h-56 rounded-3xl overflow-hidden shadow-lg border border-pink-400">
            <img
              src={preview}
              alt="Selected"
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
        )}

        {/* Feeling Section */}
        <div className="border border-pink-500 rounded-3xl py-6 px-4 bg-gradient-to-tr from-pink-500/30 via-purple-900/30 to-pink-900/50 shadow-inner flex items-center justify-between select-none">
          <div className="flex space-x-4">
            <div className="bg-pink-500 rounded-2xl h-16 w-14 text-4xl flex items-center justify-center shadow-lg text-white select-none">
              {currentFeeling.emoji}
            </div>
            <div className="w-20">
              <h3 className="font-serif text-2xl text-pink-200 font-semibold">
                {currentFeeling.label}
              </h3>
              <p className="text-pink-300 text-sm italic mt-1 max-w-xs">
                {currentFeeling.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleChangeFeeling}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 ml-3 py-2 rounded-full flex items-center space-x-2 shadow-md transition duration-300 select-none"
            title="Change Feeling"
          >
            <span>Change</span>
            <EmojiEmotionsIcon />
          </button>
        </div>

        {/* Content Textarea */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <label
            htmlFor="content"
            className="block mb-2 font-semibold text-pink-200 text-lg select-none"
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
            className="h-44 bg-pink-900 bg-opacity-70 placeholder-pink-400 border border-pink-600 text-pink-100 rounded-3xl p-5 resize-none shadow-inner focus:outline-pink-400 focus:ring-2 focus:ring-pink-500 transition duration-300"
          />
        </div>

        {/* Save Button */}
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={handleSave}
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-3xl font-semibold shadow-lg transition duration-300 select-none"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
