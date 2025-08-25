import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { motion } from "framer-motion";
import VoiceToText from "./VoiceTotext";

const feelings = [
  { emoji: "😀", label: "happy", description: "Filled with joy and happiness" },
  { emoji: "😊", label: "content", description: "Feeling calm and satisfied" },
  { emoji: "😔", label: "sad", description: "Feeling down or unhappy" },
  { emoji: "😡", label: "angry", description: "Frustrated or upset" },
  { emoji: "😍", label: "loved", description: "Feeling love and warmth" },
  { emoji: "😴", label: "tired", description: "Needing rest or sleep" },
  { emoji: "😎", label: "cool", description: "Feeling confident and chill" },
  {
    emoji: "🤔",
    label: "thoughtful",
    description: "Deep in thought or curious",
  },
  {
    emoji: "😭",
    label: "emotional",
    description: "Feeling emotional or upset",
  },
];

export default function CreateCard5() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // File object
  const [preview, setPreview] = useState(null); // Preview URL
  const [currentFeeling, setCurrentFeeling] = useState(feelings[0]);

  const now = new Date();
  const card_id = "card5";
  const formattedDate = now.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const formattedTime = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Store file
      setPreview(URL.createObjectURL(e.target.files[0])); // Store preview
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
    try {
      const formData = new FormData();
      formData.append("card_id", card_id);
      formData.append("emoji", currentFeeling.emoji);
      formData.append("label", currentFeeling.label);
      formData.append("description", currentFeeling.description);
      if (image) formData.append("image", image); // File gets appended here
      formData.append("content", content);
      formData.append("date", formattedDate);
      formData.append("time", formattedTime);

      const res = await fetch(`/api/dashboard`, {
        method: "POST",
        credentials: "include",
        body: formData, // No headers needed, browser sets them
      });

      if (res.ok) {
        navigate("/dashboard");
      } else {
        console.error("Failed to save entry");
      }
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center px-4 py-10">
      <motion.div
        className="max-w-xl w-[25rem] bg-gradient-to-b from-amber-600 via-orange-700 to-red-700 rounded-3xl shadow-2xl border border-amber-400 p-8 space-y-6 font-sans flex flex-col overflow-hidden text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Date & Time */}
        <div className="flex justify-between rounded-xl p-4 bg-amber-900 bg-opacity-30 text-sm font-medium select-none">
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
            className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl flex items-center space-x-2 shadow-lg transition-shadow duration-300 select-none"
            title="Upload an image"
          >
            <AddPhotoAlternateIcon />
            <span>{preview ? "Change Photo" : "Add Photo"}</span>
          </label>
          <input
            id="imageUpload"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="h-56 rounded-3xl overflow-hidden shadow-lg border border-amber-400">
            <img
              src={preview}
              alt="Selected"
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
        )}

        {/* Feeling Section */}
        <div className="rounded-xl px-4 py-6 bg-amber-900 bg-opacity-30 flex items-center justify-between select-none">
          <div className="flex space-x-4">
            <div className="bg-amber-700 rounded-xl h-16 w-14 text-4xl flex items-center justify-center shadow-lg">
              {currentFeeling.emoji}
            </div>
            <div>
              <h3 className="font-serif text-md font-semibold">
                {currentFeeling.label}
              </h3>
              <p className="text-sm italic max-w-xs opacity-80">
                {currentFeeling.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleChangeFeeling}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md transition duration-300 select-none"
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
            className="block mb-2 font-semibold text-lg select-none"
          >
            Write your thoughts...
            <VoiceToText content={content} setContent={setContent} />
          </label>
          <textarea
            id="content"
            rows={10}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing here..."
            className="w-full h-44 bg-black bg-opacity-40 placeholder-amber-200 border border-amber-400 rounded-xl p-5 resize-none shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-300 transition duration-300"
          />
        </div>

        {/* Save Button */}
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={handleSave}
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition duration-300 select-none"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
