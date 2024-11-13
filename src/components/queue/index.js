import React from "react";
import "./queue.css";

// Helper function to format the duration from milliseconds to MM:SS
const formatDuration = (durationInMs) => {
  const minutes = Math.floor(durationInMs / 60000);
  const seconds = Math.floor((durationInMs % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

export default function Queue({ tracks, setCurrentIndex }) {
  console.log(tracks);

  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {tracks?.map((track, index) => (
            <div
              key={track?.track?.id || index} // Adding a unique key using track ID or fallback to index
              className="queue-item flex"
              onClick={() => setCurrentIndex(index)}
            >
              <p className="track-name">{track?.track?.name}</p>
              {/* Display dynamic track duration */}
              <p>{formatDuration(track?.track?.duration_ms)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
