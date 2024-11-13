import React from "react";
import { loginEndpoint } from "../../spotify"; // Make sure this path is correct relative to your project structure
import './login.css'; // Ensure you have the correct path for your CSS

export default function Login() {
  return (
    <div className="login-page">
        {/* Spotify Logo */}
        <img 
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
        alt="logo-spotify" 
        className="logo"
        />

        {/* Login Button */}
        <a href={loginEndpoint}>
            <div className="login-btn">LOG IN</div>
        </a>
    </div>
  );
}
