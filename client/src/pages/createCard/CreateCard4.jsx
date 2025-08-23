import React, { useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import VoiceToText from "./VoiceTotext";
const apiUrl = import.meta.env.VITE_API_URL;

const feelings = [
  { emoji: "🤔", label: "Thoughtful", description: "Deep in reflection" },
  { emoji: "😊", label: "Content", description: "Feeling calm and satisfied" },
  { emoji: "😀", label: "Happy", description: "Filled with joy and happiness" },
  { emoji: "😍", label: "Loved", description: "Heart full of warmth" },
  { emoji: "😔", label: "Sad", description: "Feeling down or unhappy" },
  { emoji: "😡", label: "Angry", description: "Frustrated or upset" },
  { emoji: "😴", label: "Tired", description: "Needing rest or sleep" },
  { emoji: "😎", label: "Cool", description: "Feeling confident and chill" },
  {
    emoji: "😭",
    label: "Emotional",
    description: "Feeling emotional or upset",
  },
];

export default function CreateCard4() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentFeeling, setCurrentFeeling] = useState(feelings[0]);
  const navigate = useNavigate();

  const now = new Date();
  const card_id = "card4";
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
      const res = await fetch(`${apiUrl}/api/dashboard`, {
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
    <div className="w-full min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <motion.div
        className="bg-gradient-to-br from-black via-gray-900 to-black 
        w-[25rem] rounded-3xl border-2 border-yellow-500/60 
        shadow-[0_8px_30px_rgba(255,215,0,0.3)] 
        p-8 space-y-6 font-sans flex flex-col overflow-hidden text-yellow-100"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Date & Time */}
        <div className="flex justify-between border border-yellow-600 p-4 rounded-3xl bg-black text-yellow-400 text-sm font-medium select-none">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Upload Button */}
        <div className="flex justify-end">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer bg-yellow-700/40 hover:bg-yellow-600/50 
            text-yellow-200 px-5 py-2 rounded-3xl flex items-center space-x-2 
            shadow-lg transition duration-300 select-none"
            title="Upload an image"
          >
            <AddPhotoAlternateIcon />
            <span>{image ? "Change Photo" : "Add Photo"}</span>
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
          <div className="h-56 rounded-3xl overflow-hidden shadow-inner border border-yellow-600">
            <img
              src={preview}
              alt="Selected"
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
        )}

        {/* Feeling Section */}
        <div className="border border-yellow-600 rounded-3xl px-4 py-6 bg-black shadow-inner flex items-center justify-between select-none">
          <div className="flex space-x-4">
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-2xl h-16 w-14 flex items-center justify-center text-4xl shadow-md text-yellow-100 select-none">
              {currentFeeling.emoji}
            </div>
            <div className="w-20">
              <h3 className="font-serif text-md italic font-semibold text-yellow-200">
                {currentFeeling.label}
              </h3>
              <p className="text-yellow-400 text-sm italic max-w-xs">
                {currentFeeling.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleChangeFeeling}
            className="bg-yellow-700/40 hover:bg-yellow-600/50 text-yellow-200 px-4 ml-3 py-2 rounded-full flex items-center space-x-2 shadow-md transition duration-300 select-none"
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
            className="block mb-2 font-semibold text-yellow-200 text-lg select-none"
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
            className="bg-black placeholder-yellow-500/50 border h-44 border-yellow-600 text-yellow-100 rounded-3xl p-5 resize-none shadow-inner focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-600 transition duration-300"
          />
        </div>

        {/* Save Button */}
        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={handleSave}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-3 rounded-3xl font-bold shadow-lg transition duration-300 select-none"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
