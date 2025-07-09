import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from '@/screens/Home/home.module.css';

import { exchangeCodeForToken } from '@/spotify';
import Login from '@/screens/auth/login';
import Sidebar from '@/components/Sidebar';
import Library from '@/screens/Library/library';
import Feed from '@/screens/Feed/feed';
import Trending from '@/screens/Trending/trending';
import Favorites from '@/screens/Favorites/favorites';
import Player from '@/screens/Player/player';

export default function Home() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const localToken = localStorage.getItem('access_token');

    if (localToken) {
      setToken(localToken);
      setLoading(false);
      return;
    }

    if (!code) {
      setLoading(false);
      return;
    }

    // intercambiar código por token
    exchangeCodeForToken(code)
      .then(token => {
        setToken(token);
        window.history.replaceState({}, document.title, '/'); // limpia URL
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!token) return <Login />;

  return (
      <div className={styles.mainBody}>
        <Sidebar />
        <Routes>
          <Route path="/library" element={<Library />} />
          <Route path="/" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
  );
}