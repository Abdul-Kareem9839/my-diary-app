import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Showcard1Content from "./ShowCard1Content";
const apiUrl = import.meta.env.VITE_API_URL;

export default function ViewEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  // Fetch entry from backend
  useEffect(() => {
    fetch(`${apiUrl}/api/view/${id}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setEntry(data);
        setEditContent(data.content || "");
      })
      .catch((err) => console.error("Error fetching entry:", err));
  }, [id]);

  // Handle content update
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/view/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });
      if (res.ok) {
        setEntry((prev) => ({ ...prev, content: editContent }));
        setIsEditing(false);
        alert("Entry updated successfully!");
      } else {
        alert("Failed to update entry.");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // Handle entry deletion
  const handleDelete = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/view/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert("Failed to delete entry.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      // TODO: Upload file to backend if needed
    }
  };

  if (!entry) {
    return <div className="p-6 text-gray-400">Loading...</div>;
  }

  return (
    <>
      <Showcard1Content
        entry={entry}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editContent={editContent}
        setEditContent={setEditContent}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        uploadedImage={uploadedImage}
      />
    </>
  );
}
