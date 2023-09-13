import { useEffect, useState } from "react";

import cls from "classnames";

import { ArrowTurntable } from "../../../assets/icons/arrow-turntable";
import { GamePlaceSvg } from "../../../assets/icons/game-place-svg";
import { GiftTurntable } from "../../../assets/icons/gift-turntable";
import MainGameTurntable from "../../../assets/images/turntable-game.png";
import injectStyle from "./injectStyle";
import styles from "./styles.module.css";

const GameTurntable = ({ isStartPage = false }: { isStartPage?: boolean }) => {
  const [rotation, setRotation] = useState(0);
  const value = Math.ceil(Math.random() * 3600);
  const keyframesStyle = `
        @-webkit-keyframes spin {
          0% {
              transform: rotateZ(0) ;
          }
          10% {
              transform: rotateZ(-35deg) ;
          }
          100% {
              transform: rotateZ(${rotation}deg) ;
          }
        }
      `;
  injectStyle(keyframesStyle);

  useEffect(() => {
    if (isStartPage) {
      setRotation(360);
    } else {
      setRotation(1840);
    }
  }, [value, isStartPage]);

  const startPageWheel = cls({
    "start-page-wheel": isStartPage,
  });

  return (
    <>
      <div className={cls(styles["turntable-game"], styles[startPageWheel])}>
        <div className={styles["arrow-turntable"]}>
          <ArrowTurntable />
        </div>
        <div className={styles["gift-turntable"]}>
          <GiftTurntable />
        </div>
        <img
          style={{
            transform: `rotate(${rotation}deg)`,
            objectFit: "cover",
            transition: "transform 3s ease-in-out",
            WebkitAnimation: `spin 3s linear ${isStartPage ? "infinite" : 1}`,
          }}
          src={MainGameTurntable}
          alt="turntable"
          width={555}
          height={555}
        />
      </div>

      {!isStartPage && (
        <div className={styles["turntable-place"]}>
          <GamePlaceSvg />
        </div>
      )}
    </>
  );
};

export default GameTurntable;
