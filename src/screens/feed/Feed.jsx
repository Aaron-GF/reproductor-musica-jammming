import React, { useEffect, useState } from "react";
import global from "@/shared/globalStyles.module.css";
import styles from "@/screens/feed/feed.module.css";
import SongSearch from "@/components/searchBar/SongSearch";
import spotifyService from "@/services/spotifyService";
import { useAuth } from "@/context/AuthContext";

// Cargar las novedades (albums) al inicio
export default function Feed() {
  const [showNewReleases, setShowNewReleases] = useState(true);
  const [albums, setAlbums] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!showNewReleases || !token) return;

    spotifyService
      .getNewReleases()
      .then((items) => setAlbums(items))
      .catch((err) => console.error("Error fetching new releases", err));
  }, [token, showNewReleases]);

  return (
    <div className={global.screenContainer}>
      <div className={styles.fixed}>
        <SongSearch
          onEmptySearch={() => setShowNewReleases(true)}
          onSearchActive={() => setShowNewReleases(false)}
        />
      </div>
      {showNewReleases && (
        <div className={styles.grid}>
          {albums.map((album) => (
            <div
              key={album.id}
              className={styles.card}
              onClick={() => window.open(album.external_urls.spotify, "_blank")}
            >
              <img
                src={album.images[0]?.url}
                alt={album.name}
                className={styles.albumImage}
              />
              <p className={styles.albumName}>{album.name}</p>
              <p className={styles.artists}>
                {album.artists.map((a) => a.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
