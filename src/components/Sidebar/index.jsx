import React from 'react';
import styles from '@/components/Sidebar/sidebar.module.css';
import SidebarButton from '@/components/sidebar/sidebarButton';
import { MdFavorite, MdSpaceDashboard } from 'react-icons/md';
import { IoLibrary } from 'react-icons/io5';
import { FaPlay, FaSignOutAlt } from 'react-icons/fa';
import { BsFire } from 'react-icons/bs';
import LogOutButton from '@/components/sidebar/logOutButton';

export default function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <div>
        <SidebarButton title="Novedades" to="/Feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Popular" to="/Trending" icon={<BsFire />} />
        <SidebarButton title="Reproducir" to="/Player" icon={<FaPlay />} />
        <SidebarButton title="Favoritas" to="/Favorites" icon={<MdFavorite />} />
        <SidebarButton title="Biblioteca" to="/Library" icon={<IoLibrary />} />
      </div>
      <LogOutButton title="Cerrar sesión" to="" icon={<FaSignOutAlt />} />
    </div>
  )
}
