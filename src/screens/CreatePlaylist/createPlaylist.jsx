import React, { useState } from 'react';
import global from '@/shared/globalStyles.module.css';
import styles from '@/screens/CreatePlaylist/createPlaylist.module.css'
import SongSearch from '@/components/searchBar/songSearch';
import TrackList from './trackList.jsx';

export default function CreatePlaylist() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];

  return (
    <div className={global.screenContainer}>
      <SongSearch />
      <div className={styles.trackList}>
        <TrackList
          items={items}
          onItemSelect={(item, index) => console.log(item, index)}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
          
        />
      </div>
    </div>
  )
}
