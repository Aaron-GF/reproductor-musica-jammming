import React from "react";
import styles from "@/components/audioPlayer/audioPlayer.module.css";

export default function AudioPlayer({ currentTrack }) {
    if (!currentTrack) return null;

    const trackId = currentTrack?.id;
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

    return (
        <div className={styles.playerBody}>
            <div className={styles.iframeWrapper}>
                <iframe
                    style={{ borderRadius: "12px" }}
                    src={embedUrl}
                    width="70%"
                    height="200px"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
}
