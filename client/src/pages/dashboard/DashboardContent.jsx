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
        <div className="flex sm:hidden items-center w-[18rem] rounded-[2rem] overflow-hidden border border-teal-800 mb-7 ms-8 mt-1 hover:border-1 hover:border-teal-800 hover:scale-105 transition-all duration-300">
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
          ).map((entry) => (
            <div
              key={entry._id}
              onClick={() => navigate(`/view/${entry._id}`)}
              className="break-inside-avoid cursor-pointer hover:scale-102 transition-transform p-2"
            >
              {renderCardById(entry, currUser)}
            </div>
          ))}
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
