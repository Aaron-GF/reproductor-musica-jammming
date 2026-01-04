import React, { useState, useEffect } from "react";
import defaultImage from "@/assets/fondo-por-defecto-playlist.jpg";
import background from "@/shared/globalStyles.module.css";
import styles from "@/screens/library/library.module.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import spotifyService from "@/services/spotifyService";
import { useAuth } from "@/context/AuthContext";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    spotifyService
      .getUserPlaylists()
      .then((items) => setPlaylists(items))
      .catch((err) => console.error(err));
  }, [token]);

  const navigate = useNavigate();
  const playPlaylist = (id) => {
    navigate(`/player/${id}`);
  };

  return (
    <div className={background.screenContainer}>
      <div className={styles.libraryBody}>
        {playlists?.map((playlist) => (
          <div
            key={playlist.id}
            className={styles.playlistCard}
            onClick={() => playPlaylist(playlist.id)}
          >
            <img
              src={playlist.images?.[0]?.url || defaultImage}
              alt={`Imagen de ${playlist.name}`}
              className={styles.playlistImage}
            />
            <p className={styles.playlistTitle}>{playlist.name}</p>
            <p className={styles.playlistSubtitle}>
              {playlist.tracks.total} Canciones
            </p>
            <div className={styles.playlistFade}>
              <IconContext.Provider value={{ size: "50px", color: "#E99072" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
