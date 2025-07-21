import React, { useState } from 'react';
import global from '@/shared/globalStyles.module.css';
import styles from '@/screens/CreatePlaylist/createPlaylist.module.css'
import SongSearch from '@/components/searchBar/songSearch';
import TrackList from '@/screens/CreatePlaylist/trackList';
import AudioPlayer from '@/components/audioPlayer/audioPlayer.jsx';
import PlaylistTitleInput from '@/screens/CreatePlaylist/playlistTitleInput';
import { RippleButton } from '@/components/animate-ui/buttons/ripple';

export default function CreatePlaylist() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [playlistItems, setPlaylistItems] = useState([]);
  const [searchIsEmpty, setSearchIsEmpty] = useState(true);
  const [playlistTitle, setPlaylistTitle] = useState('');

  const handleSavePlaylist = () => {
    if (playlistItems.length === 0) {
      alert('Agrega al menos una canción a la playlist');
      return;
    }

    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');

    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistTitle,
        description: 'Playlist creada con la app de Jammming',
        public: true,
      }),
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error.message);
          });
        }
        return res.json();
      })
      .then(data => {
        console.log('Playlist creada:', data);
        alert('Lista de reproducción creada con exito');
        setPlaylistTitle('');
        setPlaylistItems([]);
      })
      .catch(err => {
        alert('Error al crear lista de reproducción: ' + err.message);
      });
  };

  const handleRemoveItem = (itemToRemove) => {
    setPlaylistItems(prev => prev.filter(item => item.id !== itemToRemove.id));
  };

  return (
    <div className={`${global.screenContainerNoScroll} ${global.flex}`}>
      <div className={styles.trackList}>
        <PlaylistTitleInput value={playlistTitle} onTitleChange={setPlaylistTitle} />
        <TrackList
          items={playlistItems}
          onItemSelect={(item) => {
            setPlaylistItems(prev => [...prev, item]);
          }}
          onItemRemove={handleRemoveItem}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
        <RippleButton onClick={handleSavePlaylist}>
          Crear lista
        </RippleButton>
      </div>
      <div className={styles.rightBody}>
        <div className={styles.browser}>
          <SongSearch
            onTrackSelected={setSelectedTrack}
            onEmptySearch={() => {
              setSearchIsEmpty(true);
              setSelectedTrack(null);
            }}
            onSearchActive={() => setSearchIsEmpty(false)}
          />
        </div>
        {searchIsEmpty && (
          <p className={styles.info}>
            ℹ️ Busca las canciones que quieras añadir a tu lista. <br />ℹ️ Puedes hacer click en ellas para escucharlas o arrastrarlas para añadirlas a la lista.
          </p>
        )}
        <div className={styles.audioWrapper}>
          {!searchIsEmpty && selectedTrack && (
            <AudioPlayer currentTrack={selectedTrack} />
          )}
        </div>
      </div>
    </div>
  )
}
