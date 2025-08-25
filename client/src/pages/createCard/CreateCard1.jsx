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

export default function CreateCard1() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentFeeling, setCurrentFeeling] = useState(feelings[0]);
  const [error, setError] = useState("");

  const now = new Date();
  const istOffset = 5.5 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istTime = new Date(utc + istOffset * 60000);
  const card_id = "card1";
  const formattedDate = istTime.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = istTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
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
    setError("");
    const formData = new FormData();
    formData.append("card_id", card_id);
    formData.append("emoji", currentFeeling.emoji);
    formData.append("label", currentFeeling.label);
    formData.append("description", currentFeeling.description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("content", content);
    formData.append("date", formattedDate);
    formData.append("time", formattedTime);

    try {
      const res = await fetch(`/api/dashboard`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        navigate("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
        console.error("Failed to save entry");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Error saving entry:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-100 via-cyan-200 to-teal-300 flex items-center justify-center px-4 py-10">
      <motion.div
        className="max-w-xl w-[25rem] bg-gradient-to-tr from-teal-400 via-teal-500 to-cyan-600 rounded-3xl shadow-2xl border border-teal-300 p-8 space-y-6 font-sans flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Date & Time */}
        <div className="flex justify-between border border-teal-200 p-5 rounded-3xl shadow-inner bg-gradient-to-tr from-teal-100/50 via-white/30 to-cyan-100/50 text-teal-800 text-sm font-medium select-none">
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
            className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-3xl flex items-center space-x-2 shadow-lg transition-shadow duration-300 select-none"
            title="Upload an image"
          >
            <AddPhotoAlternateIcon />
            <span>{image ? "Change Photo" : "Add Photo"}</span>
          </label>
          <input
            id="imageUpload"
            type="file"
            name="entry[image]"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="h-44 rounded-3xl overflow-hidden shadow-lg border border-teal-300">
            <img
              src={preview}
              alt="Selected"
              className="h-44 w-full object-cover rounded-3xl"
            />
          </div>
        )}

        {/* Feeling Section */}
        <div className="border border-teal-200 rounded-3xl px-4 py-6 bg-gradient-to-tr from-teal-200/40 via-white/30 to-cyan-200/40 shadow-inner flex items-center justify-between select-none">
          <div className="flex space-x-4">
            <div className="bg-teal-500 rounded-full h-16 w-14 text-4xl flex items-center justify-center shadow-lg text-white select-none">
              {currentFeeling.emoji}
            </div>
            <div>
              <h3 className="font-serif text-md text-teal-900 font-semibold">
                {currentFeeling.label}
              </h3>
              <p className="text-teal-800 text-sm italic max-w-xs">
                {currentFeeling.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleChangeFeeling}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-md transition duration-300 select-none"
            title="Change Feeling"
          >
            <span>Change</span>
            <EmojiEmotionsIcon />
          </button>
        </div>

        {/* Content Textarea */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <label
            htmlFor="content"
            className="block mb-2 font-semibold text-teal-800 text-lg select-none"
          >
            Write your thoughts...
            <VoiceToText content={content} setContent={setContent} />
          </label>
          <textarea
            id="content"
            rows={10}
            name="entry[content]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing here..."
            className="w-full h-44 bg-white bg-opacity-70 placeholder-teal-500 border border-teal-300 text-teal-900 rounded-3xl p-5 resize-none shadow-inner focus:outline-teal-400 focus:ring-2 focus:ring-teal-500 transition duration-300"
          />
        </div>

        {/* Save Button */}
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={handleSave}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-3xl font-semibold shadow-lg transition duration-300 select-none"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
