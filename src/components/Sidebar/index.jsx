import React from 'react';
import styles from '@/components/Sidebar/sidebar.module.css';
import SidebarButton from '@/components/sidebar/sidebarButton';
import { MdSpaceDashboard } from 'react-icons/md';
import { IoLibrary } from 'react-icons/io5';
import { FaPlay, FaSignOutAlt } from 'react-icons/fa';
import LogOutButton from '@/components/sidebar/logOutButton';
import { RiPlayListAddFill } from 'react-icons/ri';

export default function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <div>
        <SidebarButton title="Novedades" to="/Feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Reproducir" to="/Player" icon={<FaPlay />} />
        <SidebarButton title="Crear lista" to="/CreatePlaylist" icon={<RiPlayListAddFill />} />
        <SidebarButton title="Biblioteca" to="/Library" icon={<IoLibrary />} />
      </div>
      <LogOutButton title="Cerrar sesión" icon={<FaSignOutAlt />} />
    </div>
  )
}
