import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import global from "@/shared/globalStyles.module.css";
import styles from "@/screens/player/player.module.css";
import SongCard from "@/components/songCard/SongCard";
import Queue from "@/components/queue/Queue";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
import spotifyService from "@/services/spotifyService";
import { useAuth } from "@/context/AuthContext";

export default function Player() {
  const { id } = useParams();
  const [libraryPlaylists, setLibraryPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const { token } = useAuth();

  // Obtener playlists de la biblioteca
  useEffect(() => {
    if (!token) return;

    spotifyService
      .getUserPlaylists(10)
      .then((items) => setLibraryPlaylists(items))
      .catch((err) => console.error("Error fetching playlists:", err));
  }, [token]);

  // Decidir qué playlist cargar: id de URL o la primera de la biblioteca
  useEffect(() => {
    if (id) {
      setPlaylistId(id);
    } else if (libraryPlaylists.length > 0) {
      const random = Math.floor(Math.random() * libraryPlaylists.length);
      setPlaylistId(libraryPlaylists[random].id);
    }
  }, [id, libraryPlaylists]);

  // Cargar tracks de la playlist seleccionada
  useEffect(() => {
    if (!playlistId || !token) return;

    spotifyService
      .getPlaylistTracks(playlistId)
      .then((items) => {
        setTracks(items);
        setCurrentTrack(items[0]?.track);
        setCurrentIndex(0);
      })
      .catch((err) => console.error("Error fetching tracks:", err));
  }, [playlistId, token]);

  useEffect(() => {
    if (tracks.length > 0) {
      setCurrentTrack(tracks[currentIndex]?.track);
    }
  }, [currentIndex, tracks]);

  return (
    <div className={`${global.screenContainer} ${global.flex}`}>
      <div className={styles.leftBody}>
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Queue
          artist={currentTrack?.artist}
          tracks={tracks}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
      <div className={styles.rightBody}>
        <SongCard album={currentTrack?.album} />
      </div>
    </div>
  );
}
