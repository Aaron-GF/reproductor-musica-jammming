import React from "react";
import styles from "@/components/widgets/widgetEntry.module.css";

export default function WidgetEntry({ title, subtitle, image }) {
  return (
    <div className={styles.entryBody}>
      <img src={image} alt={title} className={styles.entryImage} />
      <div className={styles.entryRightBody}>
        <p className={styles.entryTitle}>{title}</p>
        <p className={styles.entrySubtitle}>{subtitle}</p>
      </div>
    </div>
  );
}
