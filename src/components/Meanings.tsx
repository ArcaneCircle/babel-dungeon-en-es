import { useState } from "react";
import PixelRefreshSolid from "~icons/pixel/refresh-solid";

import { clickSfx } from "~/lib/sounds";
import { getSFXEnabled } from "~/lib/storage";
import { BG_PRIMARY, TEXT_PRIMARY } from "~/lib/theme";

import styles from "./Meanings.module.css";

export default function Meanings({ meanings }: { meanings: string[] }) {
  const [index, setIndex] = useState(0);
  const count = meanings.length;
  const onSwitch = () => {
    if (getSFXEnabled()) clickSfx.play();
    setIndex((index) => (index + 1) % count);
  };
  const fontSize = meanings[index].length > 80 ? "0.9em" : undefined;

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <span className="selectable" style={{ fontSize, lineHeight: "1.5em" }}>
          {meanings[index]}
        </span>{" "}
        {count > 1 ? (
          <button
            className={"pixel-corners4 " + styles.switchBtn}
            onClick={onSwitch}
          >
            [{index + 1}/{count}]
            <PixelRefreshSolid />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
