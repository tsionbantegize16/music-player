// Trending.js
import React, { useEffect, useState } from "react";
import apiClient from "./../spotify";
import "./trending.css";


const Trending = () => {
    const [trendingPlaylists, setTrendingPlaylists] = useState([]);

    useEffect(() => {
        const fetchTrendingPlaylists = async () => {
            try {
                const response = await apiClient.get("browse/featured-playlists"); // Endpoint for trending playlists
                setTrendingPlaylists(response.data.playlists.items || []);
            } catch (error) {
                console.error("Error fetching trending playlists:", error);
            }
        };

        fetchTrendingPlaylists();
    }, []);

    return (
        <div className="trending">
            {trendingPlaylists.length > 0 ? (
                trendingPlaylists.map((playlist) => (
                    <div key={playlist.id} className="playlist">
                        <img
                            src={playlist.images[0]?.url || "default-image-url.jpg"}
                            alt={playlist.name}
                            className="playlist-image"
                        />
                        <p className="playlist-name">{playlist.name}</p>
                    </div>
                ))
            ) : (
                <p>No trending playlists found</p>
            )}
        </div>
    );
};

export default Trending;
