import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card1 from "./cards/Card1";
import Card2 from "./cards/Card2";
import Card3 from "./cards/Card3";
import Card4 from "./cards/Card4";
import Card5 from "./cards/Card5";
import Card6 from "./cards/Card6";
import Card7 from "./cards/Card7";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import DashboardContent from "./DashboardContent";
import { getBookmarkEntries } from "./cards/Bookmark";

const Dashboard = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [todaysEntries, setTodaysEntries] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookmarkEntry, setBookmarkEntry] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // entries + current user
  useEffect(() => {
    const fetchEntriesAndUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/entries`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.entries) setEntries(data.entries);

        const userRes = await fetch(`${apiUrl}/api/current-user`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (userRes.status === 401) {
          navigate("/signin");
          return;
        }
        const userData = await userRes.json();
        setCurrUser(userData.user);
      } catch (err) {
        console.error("Error fetching entries or user:", err);
      }
    };

    fetchEntriesAndUser();
  }, [navigate]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const queryEntries = entries.filter((entry) =>
    entry.label.toLowerCase().includes(searchQuery)
  );

  useEffect(() => {
    const todayStr = format(date, "MMM dd, yyyy");
    const filtered = entries.filter((entry) => entry.date === todayStr);
    setTodaysEntries(filtered);
  }, [entries, date]);

  const onDateChange = (selectedDate) => {
    setDate(selectedDate);
    setShowCalendar(false);
    setShowBookmarks(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) navigate("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const renderCardById = (entry, user) => {
    if (!user) return null;
    switch (entry.card_id) {
      case "card1":
        return <Card1 entry={entry} userId={user._id} />;
      case "card2":
        return <Card2 entry={entry} userId={user._id} />;
      case "card3":
        return <Card3 entry={entry} userId={user._id} />;
      case "card4":
        return <Card4 entry={entry} userId={user._id} />;
      case "card5":
        return <Card5 entry={entry} userId={user._id} />;
      case "card6":
        return <Card6 entry={entry} userId={user._id} />;
      case "card7":
        return <Card7 entry={entry} userId={user._id} />;
      default:
        return <Card1 entry={entry} userId={user._id} />;
    }
  };

  const loadBookmarks = async () => {
    if (!currUser) return;
    try {
      const data = await getBookmarkEntries(currUser._id);
      console.log("Fetched Bookmarks:", data);

      setBookmarkEntry(Array.isArray(data) ? data : []);
      setShowBookmarks(true);
      if (showBookmarks) {
        setShowBookmarks(false);
        return;
      }
    } catch (e) {
      console.error("Failed to load bookmarks", e);
      setBookmarkEntry([]);
      setShowBookmarks(true);
    }
  };

  const showTodayView = () => setShowBookmarks(false);

  return (
    <>
      <DashboardContent
        currUser={currUser}
        toggleSidebar={toggleSidebar}
        todaysEntries={todaysEntries}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        onDateChange={onDateChange}
        date={date}
        handleLogout={handleLogout}
        renderCardById={renderCardById}
        bookmarkEntry={bookmarkEntry}
        showBookmarks={showBookmarks}
        onShowBookmarks={loadBookmarks}
        onShowToday={showTodayView}
        //for searching setup
        handleSearch={handleSearch} //function
        queryEntries={queryEntries} //filtered entries
        searchQuery={searchQuery}
        handleChange={handleChange} //handling changes in search bar
        setQuery={setQuery}
        query={query}
      />
    </>
  );
};

export default Dashboard;
