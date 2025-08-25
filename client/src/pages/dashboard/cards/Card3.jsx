import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { toggleBookmark } from "./Bookmark";

export default function Card4({ entry, userId }) {
  const [isBookmark, setIsBookmark] = useState(entry.isBookmarked || false);

  const handleBookmark = async (e) => {
    e.stopPropagation();
    const newBookmarkState = !isBookmark;
    setIsBookmark(newBookmarkState);
    try {
      await toggleBookmark(userId, entry._id, newBookmarkState);
    } catch (err) {
      setIsBookmark(!newBookmarkState);
    }
  };

  return (
    <div
      className="cursor-pointer w-[17rem] h-full 
        bg-gradient-to-br from-black via-gray-800 to-gray-300
        rounded-3xl border border-gray-400/70
        shadow-[0_0_25px_rgba(180,180,180,0.6)] 
        p-6 flex flex-col justify-between 
        text-gray-100 hover:scale-105 transition-transform select-none"
    >
      {/* Date + Time */}
      <div className="flex justify-between mb-4 text-sm font-medium text-gray-300">
        <div>{entry.date}</div>
        <div>{entry.time}</div>
      </div>

      {/* Emoji + Title + Feeling */}
      <div>
        <div
          className="bg-gradient-to-tr from-gray-200 to-black 
            rounded-full w-12 h-12 flex items-center justify-center 
            text-3xl mb-3 shadow-md text-white border border-gray-400"
        >
          {entry.emoji}
        </div>
        <h3 className="font-serif text-xl font-bold text-gray-100 drop-shadow-sm">
          {entry.label || "Untitled"}
        </h3>
        <p className="text-xs text-gray-400 italic">
          {entry.description || "No feeling provided"}
        </p>
      </div>

      {/* Content Preview */}
      <div
        className="bg-gradient-to-r from-black/70 via-gray-700/50 to-gray-300/30 
          border border-gray-400 
          rounded-xl h-24 mt-4 p-3 text-sm text-gray-300 
          overflow-hidden shadow-inner"
      >
        {entry.content}
      </div>

      {/* Bookmark Icon */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleBookmark}
          className="bg-transparent border-0 focus:outline-none"
        >
          {isBookmark ? (
            <BookmarkIcon className="text-gray-200 drop-shadow-md" />
          ) : (
            <BookmarkBorderIcon className="text-white drop-shadow-md" />
          )}
        </button>
      </div>
    </div>
  );
}
