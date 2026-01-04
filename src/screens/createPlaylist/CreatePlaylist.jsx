import React, { useState } from "react";
import global from "@/shared/globalStyles.module.css";
import styles from "@/screens/createPlaylist/createPlaylist.module.css";
import SongSearch from "@/components/searchBar/SongSearch";
import TrackList from "@/screens/createPlaylist/TrackList";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
import PlaylistTitleInput from "@/screens/createPlaylist/PlaylistTitleInput";
import { RippleButton } from "@/components/animate-ui/buttons/Ripple";
import spotifyService from "@/services/spotifyService";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function CreatePlaylist() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [playlistItems, setPlaylistItems] = useState([]);
  const [searchIsEmpty, setSearchIsEmpty] = useState(true);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const { token, user } = useAuth();

  const getNextDefaultPlaylistName = () => {
    return spotifyService.getUserPlaylists().then((items) => {
      const defaultPlaylists = items.filter((p) =>
        p.name?.startsWith("Mi lista n.º")
      );
      const nextNumber = defaultPlaylists.length + 1;
      return `Mi lista n.º ${nextNumber}`;
    });
  };

  const handleSavePlaylist = () => {
    if (playlistItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Agregar al menos una canción a la lista de reproducción",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const userId = user?.id;

    let nameToUse = playlistTitle.trim();

    const createPlaylist = (finalName) => {
      spotifyService
        .createPlaylist(userId, finalName)
        .then((data) => {
          const uris = playlistItems.map((item) => `spotify:track:${item.id}`);
          return spotifyService.addTracksToPlaylist(data.id, uris);
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Lista de reproducción creada con éxito. Las canciones de la lista pueden tardar unos segundos en aparecer en la biblioteca",
            confirmButtonText: "Aceptar",
          });
          setPlaylistTitle("");
          setPlaylistItems([]);
        })
        .catch((err) => {
          alert("Error al crear lista de reproducción: " + err.message);
        });
    };

    if (!nameToUse) {
      getNextDefaultPlaylistName()
        .then((name) => createPlaylist(name))
        .catch((err) =>
          alert("Error al generar nombre por defecto: " + err.message)
        );
    } else {
      createPlaylist(nameToUse);
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setPlaylistItems((prev) =>
      prev.filter((item) => item.id !== itemToRemove.id)
    );
  };

  return (
    <div className={`${global.screenContainerNoScroll} ${global.flex}`}>
      <div className={styles.trackList}>
        <PlaylistTitleInput
          value={playlistTitle}
          onTitleChange={setPlaylistTitle}
        />
        <TrackList
          items={playlistItems}
          onItemSelect={(item) => {
            setPlaylistItems((prev) => [...prev, item]);
          }}
          onItemRemove={handleRemoveItem}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
        <RippleButton onClick={handleSavePlaylist}>Crear lista</RippleButton>
      </div>
      <div className={styles.rightBody}>
        <div className={styles.browser}>
          <SongSearch
            onTrackSelected={(track) => {
              setSelectedTrack(track);
            }}
            onEmptySearch={() => {
              setSearchIsEmpty(true);
              setSelectedTrack(null);
            }}
            onSearchActive={() => setSearchIsEmpty(false)}
            className={styles.dragHandle}
          />
        </div>
        {searchIsEmpty && (
          <p className={styles.info}>
            ℹ️ Busca las canciones que quieras añadir a tu lista. <br />
            ℹ️ Puedes hacer click en ellas para escucharlas o arrastrarlas para
            añadirlas a la lista.
          </p>
        )}
        <div className={styles.audioWrapper}>
          {!searchIsEmpty && selectedTrack && (
            <AudioPlayer currentTrack={selectedTrack} />
          )}
        </div>
      </div>
    </div>
  );
}
