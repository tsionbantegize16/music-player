import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { MdSpaceDashboard } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import apiClient from "../../spotify"; // Import the API client

export default function Sidebar() {
  const [image, setImage] = useState(
    "https://via.placeholder.com/150" // Placeholder image
  );

  useEffect(() => {
    // Fetch user profile data from Spotify
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0]?.url || "https://via.placeholder.com/150");
    }).catch((error) => {
      console.error("Error fetching profile data:", error);
    });
  }, []);

  return (
    <div className="sidebar-container">
      <img className="profile-img" src={image} alt="profile" />
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />} />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
    </div>
  );
}
