import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PaletteIcon from "@mui/icons-material/Palette";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function Sidebar({
  user,
  isOpen = true,
  onClose,
  onNavigate,
  active = "dashboard",
  onNewEntry,
  onLogout,
  onToggleCalendar,
  onBookmark,
}) {
  const NavItem = ({ icon: Icon, label, keyName, onClick }) => {
    const isActive = active === keyName;
    return (
      <button
        onClick={() => {
          onNavigate?.(keyName);
          if (onClick) onClick();
        }}
        className={`group w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition
          ${isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`}
      >
        <Icon
          className={`text-base ${isActive ? "text-white" : "text-gray-600 group-hover:text-gray-900"}`}
        />
        <span className="truncate">{label}</span>
      </button>
    );
  };

  return (
    <aside
      className={`bg-teal-200
        fixed z-50 inset-y-0 left-0
        w-72 bg-white/90 backdrop-blur border-r border-gray-200
        flex flex-col
        transition-transform duration-300 ease-out
        md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      aria-label="Sidebar"
    >
      {/* Mobile close button */}
      <div className="absolute right-2 top-2">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <CloseIcon fontSize="small" className="text-black" />
        </button>
      </div>

      {/* Header / Profile */}
      <div className="px-4 pt-5 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border">
              <AccountCircleIcon className="text-gray-500" />
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {user?.username || "My Profile"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "Not signed in"}
            </p>
          </div>
        </div>

        <button
          onClick={onNewEntry}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                     bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <EditNoteIcon fontSize="small" />
          <span>New Entry</span>
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NavItem icon={DashboardIcon} label="Dashboard" keyName="dashboard" />
        <NavItem
          icon={CalendarMonthIcon}
          label="Calendar"
          keyName="calendar"
          onClick={onToggleCalendar}
        />
        <NavItem
          icon={BookmarkIcon}
          label="Bookmarks"
          keyName="bookmarks"
          onClick={onBookmark}
        />
        <NavItem icon={SettingsIcon} label="Settings" keyName="settings" />
      </nav>

      <div className="px-3 pb-4 pt-2 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition"
        >
          <LogoutIcon fontSize="small" />
          <span>Log Out</span>
        </button>
        <p className="mt-2 text-[10px] text-gray-500 px-1">
          © {new Date().getFullYear()} ZenScribe
        </p>
      </div>
    </aside>
  );
}
