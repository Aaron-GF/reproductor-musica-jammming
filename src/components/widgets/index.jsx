import React, { useState, useEffect } from "react";
import styles from "@/components/widgets/widgets.module.css";
import WidgetCard from "@/components/widgets/widgetCard";

export default function Widgets({ artistID }) {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const token = localStorage.getItem("access_token");
  console.log(artistID);

  useEffect(() => {
    if (!artistID || !token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Mejores canciones del artista
    fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=ES`, { headers })
      .then(res => res.json())
      .then(data => setTopTracks(data?.tracks?.slice(0, 3) || []))
      .catch(err => console.error(err));

    // Artistas similares
    fetch("https://api.spotify.com/v1/me/player/recently-played?limit=3", { headers })
      .then(res => res.json())
      .then(data => setRecentlyPlayed(data?.items?.map(item => item.track)))
      .catch(err => console.error(err));
  }, [artistID, token]);

  return (
    <div className={styles.widgetsBody}>
      <WidgetCard title="Mejores canciones" topTracks={topTracks} />
      <WidgetCard title="Últimas reproducciones" recentlyPlayed={recentlyPlayed} />
    </div>
  );
}
