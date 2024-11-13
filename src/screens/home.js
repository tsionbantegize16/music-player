import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "./library";
import Feed from "./feed";
import Trending from "./trending";
import Player from "./player";
import Favorites from "./favorites";
import "./home.css";
import Sidebar from "../components/sidebar";
import Login from "./auth/login";
import { setClientToken } from "../spotify"; // Import the token setter function

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = ""; // Clear the hash from the URL after extraction

    if (!tokenFromStorage && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      if (_token) {
        window.localStorage.setItem("token", _token);
        setToken(_token);
        setClientToken(_token); // Set token for API requests
      }
    } else if (tokenFromStorage) {
      setToken(tokenFromStorage);
      setClientToken(tokenFromStorage); // Set token for API requests
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}
