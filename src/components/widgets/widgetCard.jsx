import React from "react";
import styles from "@/components/widgets/widgetCard.module.css";
import WidgetEntry from "@/components/widgets/widgetEntry";
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

export default function WidgetCard({ title, recentlyPlayed, topTracks, newRelease }) {
  return (
    <div className={styles.widgetCardBody}>
      <p className={styles.widgetTitle}>{title}</p>

      {recentlyPlayed?.map((item) => (
        <WidgetEntry
          key={item.id}
          title={item?.name}
          subtitle={item?.artists?.map((artist) => artist.name).join(", ")}
          image={item?.album?.images?.[0]?.url}
        />
      ))}

      {topTracks?.map((track) => (
        <WidgetEntry
          key={track.id}
          title={track?.name}
          subtitle={track?.album?.artists?.map(artist => artist.name).join(", ")}
          image={track?.album?.images[0]?.url}
        />
      ))}

      <div className={styles.widgetFade}>
        <div className={styles.fadeButton}>
          <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
            <FiChevronRight />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
