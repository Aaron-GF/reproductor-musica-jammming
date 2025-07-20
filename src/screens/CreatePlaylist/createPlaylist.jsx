import React, { useState } from 'react';
import global from '@/shared/globalStyles.module.css';
import styles from '@/screens/CreatePlaylist/createPlaylist.module.css'
import SongSearch from '@/components/searchBar/songSearch';
import TrackList from '@/screens/CreatePlaylist/trackList';
import AudioPlayer from '@/components/audioPlayer/audioPlayer.jsx';

export default function CreatePlaylist() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'];
  const [selectedTrack, setSelectedTrack] = useState(null);

  return (
    <div className={`${global.screenContainerNoScroll} ${global.flex}`}>
      <div className={styles.trackList}>
        <TrackList
          items={items}
          onItemSelect={(item, index) => console.log(item, index)}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
      </div>
      <div className={styles.rightBody}>
        <div className={styles.browser}>
          <SongSearch onTrackSelected={setSelectedTrack} />
        </div>
        <div className={styles.audioWrapper}>
          {selectedTrack && (
            <AudioPlayer currentTrack={selectedTrack} />
          )}
        </div>
      </div>
    </div>
  )
}
