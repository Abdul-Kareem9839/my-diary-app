// Toggle bookmark (add/remove)
export async function toggleBookmark(userId, entryId, bookmarkState) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/users/${userId}/bookmark`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entryId, bookmark: bookmarkState }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error(data.error || "Bookmark failed");
      return [];
    }

    console.log("Updated bookmarks:", data.bookmarks);
    return data.bookmarks;
  } catch (err) {
    console.error("Error updating bookmark:", err);
    return [];
  }
}

// Fetch all bookmarked entries
export async function getBookmarkEntries(userId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/users/${userId}/bookmarks`
    );
    if (!response.ok) throw new Error("Failed to fetch bookmarks");
    const data = await response.json();
    return data.bookmarks;
  } catch (err) {
    console.error(err);
    return [];
  }
}
