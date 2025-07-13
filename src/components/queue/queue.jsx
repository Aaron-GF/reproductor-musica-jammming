import React from 'react';
import styles from '@/components/queue/queue.module.css';

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function Queue({ tracks, setCurrentIndex }) {
  return (
    <div className={styles.queueContainer}>
      <div className={styles.queue}>
        <p className={styles.upNext}>Siguiente canción</p>
        <div className={styles.queueList}>
          {
            tracks?.map((track, index) => (
              <div key={index} className={styles.queueItem} onClick={() => setCurrentIndex(index)}>
                <p className={styles.trackName}>{track?.track?.name}</p>
                <p>{formatDuration(track?.track?.duration_ms)}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
