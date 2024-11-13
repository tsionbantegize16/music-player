import React, { useEffect, useState } from "react";
import APIKit from './../spotify'; 
import './library.css';
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from 'react-icons/ai'; // Don't forget to import this
import { useNavigate } from "react-router-dom";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    APIKit.get('me/playlists')
      .then(function(response) {
        setPlaylists(response.data.items);
        console.log(response.data.items); 
      })
      .catch(error => console.error("Error fetching playlists", error));
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate('/player', { state: { id: id } });
  };

  return (
    <div className="screen-container">
      <div className="library-body">
         {playlists?.map((playlist) => (
            <div 
              className="playlist-card" 
              key={playlist.id}
              onClick={() => playPlaylist(playlist.id)} // Fixed typo here
            >
              <img 
                src={playlist.images[0].url} 
                className="playlist-image" 
                alt="playlist-art" 
              />
              <p className="playlist-title">{playlist.name}</p>
              <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
              <div className="playlist-fade">
                <IconContext.Provider value={{ size: "50", color: "aqua" }}>
                  <AiFillPlayCircle className="play-icon" />
                </IconContext.Provider>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
