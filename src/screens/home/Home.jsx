import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styles from "@/screens/home/home.module.css";

import { useAuth } from "@/context/AuthContext";
import Login from "@/screens/auth/Login";
import Sidebar from "@/components/sidebar/Sidebar";
import Library from "@/screens/library/Library";
import Feed from "@/screens/feed/Feed";
import Player from "@/screens/player/Player";
import CreatePlaylist from "@/screens/createPlaylist/CreatePlaylist";

export default function Home() {
  const { token, loading, handleTokenExchange } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !token) {
      handleTokenExchange(code)
        .then(() => {
          window.history.replaceState({}, document.title, "/"); // limpia URL
        })
        .catch((err) => {
          console.error("Error exchanging code for token in Home:", err);
        });
    }
  }, [token, handleTokenExchange]);

  if (loading) return <p>Cargando...</p>;
  if (!token) return <Login />;

  return (
    <div className={styles.mainBody}>
      <Sidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={<Library />} />
        <Route path="/" element={<Feed />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/player" element={<Player />} />
        <Route path="/createPlaylist" element={<CreatePlaylist />} />
      </Routes>
    </div>
  );
}
