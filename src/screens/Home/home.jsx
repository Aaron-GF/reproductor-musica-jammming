import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from '../Library/library';
import Feed from '../Feed/feed';
import Trending from '../Trending/trending';
import Favorites from '../Favorites/favorites';
import Player from '../Player/player';
import styles from './home.module.css';
import Sidebar from '../../components/Sidebar';

export default function Home() {
    return (
        <Router>
            <div className={styles.mainBody}>
                <Sidebar />
                <Routes>
                    <Route path='/library' element={<Library />} />
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/player' element={<Player />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/trending' element={<Trending />} />
                </Routes>
            </div>
        </Router>
    )
}