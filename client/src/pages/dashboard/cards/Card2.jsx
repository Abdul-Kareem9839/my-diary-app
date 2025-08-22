import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { toggleBookmark } from "./Bookmark";

export default function Card2({ entry, userId }) {
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
    <div className="cursor-pointer w-[17rem] h-full bg-gradient-to-tr from-pink-500 via-pink-600 to-purple-700 rounded-3xl border border-pink-400 shadow-lg p-6 flex flex-col justify-between text-white hover:scale-105 transition-transform select-none">
      {/* Date + Time */}
      <div className="flex justify-between mb-4 text-sm opacity-80">
        <div>{entry.date}</div>
        <div>{entry.time}</div>
      </div>

      {/* Emoji + Title + Subtitle */}
      <div>
        <div className="bg-pink-600 rounded-full w-12 h-12 flex items-center justify-center text-3xl mb-3 shadow-md">
          {entry.emoji}
        </div>
        <h3 className="font-serif text-xl font-bold">
          {entry.label || "Untitled"}
        </h3>
        <p className="text-xs opacity-70">
          {entry.description || "No feeling provided"}
        </p>
      </div>

      {/* Content Preview */}
      <div className="bg-pink-900 bg-opacity-30 rounded-xl h-24 mt-4 p-3 text-sm opacity-70 overflow-hidden">
        {entry.content}
      </div>

      {/* Bookmark */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleBookmark}
          className="bg-transparent border-0 focus:outline-none"
        >
          {isBookmark ? (
            <BookmarkIcon className="text-purple-600 text-sm" />
          ) : (
            <BookmarkBorderIcon className="text-white text-sm" />
          )}
        </button>
      </div>
    </div>
  );
}
