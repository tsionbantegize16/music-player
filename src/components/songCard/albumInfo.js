import React from "react";
import "./albumInfo.css";

export default function AlbumInfo({ album }) {
  const artists = [];
  // Fix the usage of optional chaining and the forEach method
  album?.artists?.forEach((element) => {
    artists.push(element.name);
  });

  return (
    <div className="album-info-card">
      <div className="albumName-container">
        <div className="marquee">
        <p>{album?.name + " _ " + artists.join(", ")}</p></div>
      </div>
      <div className="album-info">
        <p>{`${album?.name} is an ${album?.album_type} by ${artists.join(", ")} with ${album?.total_tracks} track(s)`}</p>
      </div>
      <div className="album-release">
        {/* Corrected the release date property */}
        <p>Release Date: {album?.release_date || "Unknown Release Date"}</p>
      </div>
    </div>
  );
}
