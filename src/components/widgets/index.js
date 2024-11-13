// Widgets.js
import React, { useEffect, useState } from "react";
import "./widgets.css";
import apiClient from "../../spotify";

export default function Widgets({ artistID }) {
    const [similarArtists, setSimilarArtists] = useState([]);
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        apiClient.get(`/artists/${artistID}/related-artists`)
            .then(res => setSimilarArtists(res.data?.artists.slice(0, 3)))
            .catch(err => console.error(err));

        apiClient.get(`/browse/featured-playlists`)
            .then(res => setFeaturedPlaylists(res.data?.playlists.items.slice(0, 3)))
            .catch(err => console.error(err));

        apiClient.get(`/browse/new-releases`)
            .then(res => setNewReleases(res.data?.albums.items.slice(0, 3)))
            .catch(err => console.error(err));
    }, [artistID]);

    return (
        <div className="widgets-body">
            <div className="widget-container">
                <WidgetSection title="Similar Artists" items={similarArtists} />
                <WidgetSection title="Made For You" items={featuredPlaylists} />
                <WidgetSection title="New Releases" items={newReleases} />
            </div>
        </div>
    );
}

function WidgetSection({ title, items }) {
    return (
        <div className="widget-section">
            <h3>{title}</h3>
            <div className="widget-items">
                {items.map((item, index) => (
                    <div key={index} className="widget-item">
                        <p>{item.name}</p>
                        {item.images && item.images[0] && (
                            <img src={item.images[0].url} alt={item.name} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
