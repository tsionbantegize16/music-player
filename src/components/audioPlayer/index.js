import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";

export default function AudioPlayer({
    currentTrack,
    currentIndex,
    setCurrentIndex,
    total
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const audioSrc = total[currentIndex]?.track.preview_url;

    const audioRef = useRef(new Audio(audioSrc)); // Reference to the audio object
    const intervalRef = useRef();
    const isReady = useRef(false);
    
    const { duration } = audioRef.current;
    const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

    const startTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                handleNext();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    };

    useEffect(() => {
        // Pause and load the new track when the source changes
        if (audioRef.current) {
            audioRef.current.pause();
        }
        
        audioRef.current = new Audio(audioSrc);
        setTrackProgress(0);

        // Wait for audio to be ready to play
        audioRef.current.oncanplay = () => {
            isReady.current = true;
            if (isPlaying) {
                audioRef.current.play();
                startTimer();
            }
        };

        return () => {
            audioRef.current.oncanplay = null;
        };
    }, [audioSrc, currentIndex]);

    useEffect(() => {
        if (isReady.current) {
            if (isPlaying) {
                audioRef.current.play();
                startTimer();
            } else {
                audioRef.current.pause();
                clearInterval(intervalRef.current);
            }
        }
    }, [isPlaying]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % total.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? total.length - 1 : prevIndex - 1
        );
    };

    const addZero = (n) => (n > 9 ? "" + n : "0" + n);

    const artists = currentTrack?.album?.artists.map(artist => artist.name) || [];

    return (
        <div className="player-body">
            <div className="player-left-body">
                <ProgressCircle
                    percentage={currentPercentage}
                    isPlaying={isPlaying}
                    image={currentTrack?.album?.images[0]?.url}
                    size={300}
                    color="#1E2A3E"
                />
            </div>
            <div className="player-right-body flex">
                <p className="song-title">{currentTrack?.name}</p>
                <p className="song-artist">{artists.join(" | ")}</p>
                <div className="player-right-bottom">
                    <div className="song-duration flex">
                        <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className="duration">0:{addZero(Math.round(duration || 0))}</p>
                    </div>
                    <Controls
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        total={total}
                    />
                </div>
            </div>
        </div>
    );
}
