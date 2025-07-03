import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from '@/screens/Library/library';
import Feed from '@/screens/Feed/feed';
import Trending from '@/screens/Trending/trending';
import Favorites from '@/screens/Favorites/favorites';
import Player from '@/screens/Player/player';
import styles from '@/screens/Home/home.module.css';
import Sidebar from '@/components/Sidebar';
import Login from '@/screens/auth/login';
import { setClientToken } from '@/spotify';

export default function Home() {
    const [token, setToken] = useState("");

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const hash = window.location.hash;
        window.location.hash = "";
        if (!token && hash) {
            const _token = hash.split("&")[0].split("=")[1];
            window.localStorage.setItem("token", _token);
            setToken(_token);
            setClientToken(_token);
        } else {
            setToken(token);
            setClientToken(token);
        }
    }, []);

    return !token ? (
        <Login />
    ) : (
        <Router>
            <div className="main-body">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Library />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/player" element={<Player />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </Router>
    );
}