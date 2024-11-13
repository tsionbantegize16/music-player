// Feed.js
import React, { useEffect, useState } from "react";
import apiClient from "./../spotify"; 
import  "./feed.css";

const Feed = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await apiClient.get("me/playlists");
                setPlaylists(response.data.items || []); // Set playlists or an empty array to avoid undefined
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };

        fetchPlaylists();
    }, []);

    return (
        <div className="feed">
            {playlists.length > 0 ? (
                playlists.map((playlist) => (
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
                <p>No playlists found</p>
            )}
        </div>
    );
};

export default Feed;
