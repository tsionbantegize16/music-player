import React from "react";
import "./albumImage.css";

export default function AlbumImage({ url }) {
  return (
    <div className="albumImage-container">
      <div className="albumImage">
        <img src={url} alt="album art" className="albumImage-art" />
      </div>
      <div className="albumImage-shadow"></div>
    </div>
  );
}
