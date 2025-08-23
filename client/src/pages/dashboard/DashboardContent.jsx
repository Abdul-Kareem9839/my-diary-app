import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Calendar from "react-calendar";
import DrawIcon from "@mui/icons-material/Draw";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import StyleIcon from "@mui/icons-material/Style";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "react-calendar/dist/Calendar.css";

export default function DashboardContent({
  currUser,
  toggleSidebar,
  todaysEntries,
  isSidebarOpen,
  handleLogout,
  setIsSidebarOpen,
  showCalendar,
  setShowCalendar,
  onDateChange,
  date,
  renderCardById,
  onShowBookmarks,
  bookmarkEntry,
  showBookmarks,
  handleSearch,
  handleChange,
  query,
  setQuery,
  queryEntries,
  searchQuery,
}) {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col h-screen w-full">
      <svg
        id="visual"
        viewBox="0 0 960 540"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        className="absolute top-0 left-0 w-full h-full -z-10"
        preserveAspectRatio="none"
      >
        <path
          d="M0 152L16 156.5C32 161 64 170 96 191.7C128 213.3 160 247.7 192 233.3C224 219 256 156 288 153.3C320 150.7 352 208.3 384 222.7C416 237 448 208 480 188.2C512 168.3 544 157.7 576 155.8C608 154 640 161 672 188C704 215 736 262 768 271C800 280 832 251 864 226.7C896 202.3 928 182.7 944 172.8L960 163L960 0L944 0C928 0 896 0 864 0C832 0 800 0 768 0C736 0 704 0 672 0C640 0 608 0 576 0C544 0 512 0 480 0C448 0 416 0 384 0C352 0 320 0 288 0C256 0 224 0 192 0C160 0 128 0 96 0C64 0 32 0 16 0L0 0Z"
          fill="#80ffee"
        ></path>
        <path
          d="M0 233L16 234C32 235 64 237 96 256.8C128 276.7 160 314.3 192 303.5C224 292.7 256 233.3 288 225.2C320 217 352 260 384 275.3C416 290.7 448 278.3 480 257.7C512 237 544 208 576 203.5C608 199 640 219 672 246C704 273 736 307 768 311.5C800 316 832 291 864 275.7C896 260.3 928 254.7 944 251.8L960 249L960 161L944 170.8C928 180.7 896 200.3 864 224.7C832 249 800 278 768 269C736 260 704 213 672 186C640 159 608 152 576 153.8C544 155.7 512 166.3 480 186.2C448 206 416 235 384 220.7C352 206.3 320 148.7 288 151.3C256 154 224 217 192 231.3C160 245.7 128 211.3 96 189.7C64 168 32 159 16 154.5L0 150Z"
          fill="#59ffe8"
        ></path>
        <path
          d="M0 320L16 316.3C32 312.7 64 305.3 96 315.2C128 325 160 352 192 342.2C224 332.3 256 285.7 288 278.5C320 271.3 352 303.7 384 314.3C416 325 448 314 480 296C512 278 544 253 576 262C608 271 640 314 672 339.2C704 364.3 736 371.7 768 377.2C800 382.7 832 386.3 864 378.2C896 370 928 350 944 340L960 330L960 247L944 249.8C928 252.7 896 258.3 864 273.7C832 289 800 314 768 309.5C736 305 704 271 672 244C640 217 608 197 576 201.5C544 206 512 235 480 255.7C448 276.3 416 288.7 384 273.3C352 258 320 215 288 223.2C256 231.3 224 290.7 192 301.5C160 312.3 128 274.7 96 254.8C64 235 32 233 16 232L0 231Z"
          fill="#00ffe0"
        ></path>
        <path
          d="M0 433L16 430.3C32 427.7 64 422.3 96 426.8C128 431.3 160 445.7 192 447.5C224 449.3 256 438.7 288 435C320 431.3 352 434.7 384 427.3C416 420 448 402 480 396.7C512 391.3 544 398.7 576 415C608 431.3 640 456.7 672 469.3C704 482 736 482 768 484.7C800 487.3 832 492.7 864 479.2C896 465.7 928 433.3 944 417.2L960 401L960 328L944 338C928 348 896 368 864 376.2C832 384.3 800 380.7 768 375.2C736 369.7 704 362.3 672 337.2C640 312 608 269 576 260C544 251 512 276 480 294C448 312 416 323 384 312.3C352 301.7 320 269.3 288 276.5C256 283.7 224 330.3 192 340.2C160 350 128 323 96 313.2C64 303.3 32 310.7 16 314.3L0 318Z"
          fill="#00ddc2"
        ></path>
        <path
          d="M0 541L16 541C32 541 64 541 96 541C128 541 160 541 192 541C224 541 256 541 288 541C320 541 352 541 384 541C416 541 448 541 480 541C512 541 544 541 576 541C608 541 640 541 672 541C704 541 736 541 768 541C800 541 832 541 864 541C896 541 928 541 944 541L960 541L960 399L944 415.2C928 431.3 896 463.7 864 477.2C832 490.7 800 485.3 768 482.7C736 480 704 480 672 467.3C640 454.7 608 429.3 576 413C544 396.7 512 389.3 480 394.7C448 400 416 418 384 425.3C352 432.7 320 429.3 288 433C256 436.7 224 447.3 192 445.5C160 443.7 128 429.3 96 424.8C64 420.3 32 425.7 16 428.3L0 431Z"
          fill="#00bba4"
        ></path>
      </svg>
      <div className="relative top-0 left-0 w-full z-50 border-1 border-gray-400 rounded-[2rem]">
        <TopBar
          currUser={currUser}
          onProfileClick={toggleSidebar}
          query={query}
          handleChange={handleChange}
        />
      </div>

      {isSidebarOpen && (
        <SideBar
          user={{ email: currUser?.email, username: currUser?.username }}
          onLogout={handleLogout}
          onNewEntry={() => navigate("/cardDesign")}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onToggleCalendar={() => setShowCalendar((prev) => !prev)}
          onBookmark={onShowBookmarks}
        />
      )}

      <div className="flex-1 overflow-auto px-10 py-3 ">
        <div className="flex sm:hidden items-center w-[18rem]  rounded-[2rem] overflow-hidden border border-teal-800 mb-7 ms-8 mt-1 hover:border-1 hover:border-teal-800 hover:scale-105 transition-all duration-300">
          <button className="px-3 py-1 text-teal-600 transition-transform duration-200 hover:scale-110 active:scale-90 focus:outline-none border-0">
            <SearchIcon />
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            placeholder="✨ Search your memories"
            className="flex-grow bg-transparent px-4 py-2 placeholder-teal-600 text-teal-700 focus:outline-none border-0"
          />
        </div>
        <div className="flex justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-teal-600">
            <StyleIcon className=" font-bold text-black" /> My Diary
          </h1>
          <div className="relative flex flex-col items-center">
            <div className="flex text-xs gap-4">
              <div className="flex flex-col justify-center items-center">
                {showBookmarks ? (
                  <button
                    className="border-0 focus:outline-none text-teal-800"
                    onClick={onShowBookmarks}
                  >
                    <BookmarkIcon className="hover:scale-110" />
                  </button>
                ) : (
                  <button
                    className="border-0 focus:outline-none text-teal-800"
                    onClick={onShowBookmarks}
                  >
                    <BookmarkBorderIcon className="hover:scale-110" />
                  </button>
                )}

                <span className="text-teal-950 text-xs">Bookmarks</span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={() => setShowCalendar((prev) => !prev)}
                  className="border-0 focus:outline-none hover:scale-110 transition"
                >
                  <CalendarMonthIcon className="text-teal-800" />
                </button>
                <span className="text-teal-950 text-xs">Calender</span>
              </div>
            </div>

            {showCalendar && (
              <div className="absolute w-[16rem] right-0 mt-12 z-40 bg-teal-300 p-4 rounded-xl shadow-lg">
                <Calendar
                  onChange={onDateChange}
                  value={date}
                  className="text-teal-500 "
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(searchQuery.length > 0
            ? queryEntries
            : showBookmarks
              ? bookmarkEntry
              : todaysEntries
          ).length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              <p className="text-4xl font-medium">
                Start writing your diary...
              </p>
            </div>
          ) : (
            (searchQuery.length > 0
              ? queryEntries
              : showBookmarks
                ? bookmarkEntry
                : todaysEntries
            ).map((entry) => (
              <div
                key={entry._id}
                onClick={() => navigate(`/view/${entry._id}`)}
                className="break-inside-avoid cursor-pointer hover:scale-102 transition-transform p-2"
              >
                {renderCardById(entry, currUser)}
              </div>
            ))
          )}
        </div>
      </div>

      <button
        className="fixed bottom-10 right-10 z-50 bg-teal-600 hover:bg-teal-600 text-white rounded-full p-3 transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none"
        onClick={() => navigate("/cardDesign")}
        title="New Entry"
      >
        <DrawIcon style={{ fontSize: "2rem" }} />
      </button>
    </div>
  );
}
