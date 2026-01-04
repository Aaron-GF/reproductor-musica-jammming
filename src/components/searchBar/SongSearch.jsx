import React, { useEffect, useState } from "react";
import styles from "@/components/searchBar/songSearch.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import spotifyService from "@/services/spotifyService";
import { useAuth } from "@/context/AuthContext";

export default function SongSearch({
  onEmptySearch,
  onSearchActive,
  onTrackSelected,
}) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [search]);

  useEffect(() => {
    if (!search.trim() || !token) {
      setResults([]);
      onEmptySearch?.();
      return;
    }

    onSearchActive?.();

    const delay = setTimeout(() => {
      spotifyService
        .searchSongs(search)
        .then((items) => setResults(items))
        .catch((err) => {
          console.error("Error en la busqueda:", err);
          setResults([]);
        });
    }, 400);
    return () => clearTimeout(delay);
  }, [search, token]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <input
          type="search"
          placeholder="Buscar canciones..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>
          <AiOutlineSearch />
        </span>
      </div>

      <div className={styles.grid}>
        {results.map((track) => (
          <div
            key={track.id}
            className={styles.card}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("application/json", JSON.stringify(track));
            }}
            onClick={() => onTrackSelected?.(track)}
          >
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              className={styles.albumImage}
            />
            <p className={styles.albumName}>{track.name}</p>
            <p className={styles.artists}>
              {track.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
