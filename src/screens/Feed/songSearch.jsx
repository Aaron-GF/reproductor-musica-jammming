import React, { useEffect, useState } from 'react';
import styles from '@/screens/Feed/songSearch.module.css';
import { AiOutlineSearch } from "react-icons/ai";

export default function SongSearch({ search, setSearch }) {
    
    return (
        <div className={styles.searchWrapper}>
            <input
                type="search"
                placeholder="Buscar canciones..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.searchInput}
            />
            <button className={styles.searchIcon}>
                <AiOutlineSearch />
            </button>
        </div>
    )
}
