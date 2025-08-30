import React, { useEffect, useRef } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import UserSec from "./UserSec";

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
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const NavItem = ({ icon: Icon, label, keyName, onClick }) => {
    const isActive = active === keyName;
    return (
      <button
        onClick={() => {
          onNavigate?.(keyName);
          if (onClick) onClick();
          onClose?.();
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
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}
      <aside
        ref={sidebarRef}
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
        <div className="absolute right-2 top-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <CloseIcon fontSize="small" className="text-black" />
          </button>
        </div>

        <UserSec user={user} onNewEntry={onNewEntry} />

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
    </div>
  );
}
