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
    <div className="cursor-pointer w-[17rem] h-full bg-gradient-to-br from-black via-gray-900 to-yellow-700 rounded-3xl border-2 border-yellow-500 shadow-2xl p-6 flex flex-col justify-between text-yellow-100 hover:scale-105 transition-transform select-none">
      {/* Date + Time */}
      <div className="flex justify-between mb-4 text-sm font-bold text-yellow-400">
        <div>{entry.date}</div>
        <div>{entry.time}</div>
      </div>

      {/* Emoji + Title + Feeling */}
      <div>
        <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center text-3xl mb-3 shadow-lg text-black">
          {entry.emoji}
        </div>
        <h3 className="font-serif text-xl font-extrabold drop-shadow-lg text-yellow-300">
          {entry.label || "Untitled"}
        </h3>
        <p className="text-xs text-yellow-200 font-medium opacity-90">
          {entry.description || "No feeling provided"}
        </p>
      </div>

      {/* Content Preview */}
      <div className="bg-black/60 border border-yellow-600 rounded-xl h-24 mt-4 p-3 text-sm text-yellow-100 font-medium overflow-hidden shadow-inner">
        {entry.content}
      </div>

      {/* Bookmark Icon */}
      <div className="flex justify-end mt-3">
        <button
          onClick={handleBookmark}
          className="bg-transparent border-0 focus:outline-none"
        >
          {isBookmark ? (
            <BookmarkIcon className="text-yellow-400 drop-shadow-md" />
          ) : (
            <BookmarkBorderIcon className="text-yellow-600 drop-shadow-md" />
          )}
        </button>
      </div>
    </div>
  );
}
