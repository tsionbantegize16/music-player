// Favorites.js
import React, { useEffect, useState } from "react";
import apiClient from "./../spotify";
import "./favorites.css";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await apiClient.get("me/tracks"); // Endpoint for user’s saved tracks
                setFavorites(response.data.items || []);
            } catch (error) {
                console.error("Error fetching favorite tracks:", error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="feed"> {/* Updated to match the CSS feed container */}
            {favorites.length > 0 ? (
                favorites.map((track) => (
                    <div key={track.track.id} className="playlist"> {/* Updated to match the playlist card */}
                        <img
                            src={track.track.album.images[0]?.url || "default-image-url.jpg"}
                            alt={track.track.name}
                            className="playlist-image" 
                        />
                        <p className="playlist-name">{track.track.name}</p> {/* Updated to match track name */}
                        <p className="playlist-artist">{track.track.artists[0].name}</p> {/* Updated to match artist name */}
                    </div>
                ))
            ) : (
                <p>No favorite tracks found</p>
            )}
        </div>
    );
};

export default Favorites;