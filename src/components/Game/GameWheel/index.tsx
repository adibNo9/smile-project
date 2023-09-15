import { FC, useEffect, useState } from "react";

import cls from "classnames";

import { ArrowTurntable } from "../../../assets/icons/arrow-turntable";
import { GamePlaceSvg } from "../../../assets/icons/game-place-svg";
import { GiftTurntable } from "../../../assets/icons/gift-turntable";
import MainGameWheel from "../../../assets/images/turntable-game.png";
import injectStyle from "./injectStyle";
import styles from "./styles.module.css";

interface IGameWheel {
  isStartPage?: boolean;
  className?: string;
  startCounter?: boolean;
  gameCounter?: boolean | number;
}

const GameWheel: FC<IGameWheel> = ({
  isStartPage = false,
  className,
  gameCounter,
  startCounter,
}) => {
  const [rotation, setRotation] = useState(0);

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

  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    if (isStartPage) {
      setRotation(360);
    } else if (startCounter === false && gameCounter === false) {
      // const value = randomIntFromInterval(1, 359);
      // console.log(value);

      setRotation(1800);
    }
  }, [gameCounter]);

  const startPageWheel = cls({
    "start-page-wheel": isStartPage,
  });

  return (
    <div className={className}>
      <div className={cls(styles["wheel-game"], styles[startPageWheel])}>
        <div className={styles["arrow-wheel"]}>
          <ArrowTurntable />
        </div>
        <div className={styles["gift-wheel"]}>
          <GiftTurntable />
        </div>
        <img
          style={{
            transform: `rotate(${rotation}deg)`,
            objectFit: "cover",
            transition: "transform 3s ease-in-out",
            WebkitAnimation: `spin 3s linear ${isStartPage ? "infinite" : 1}`,
          }}
          src={MainGameWheel}
          alt="wheel"
          width={555}
          height={555}
        />
      </div>

      {!isStartPage && (
        <div className={styles["wheel-place"]}>
          <GamePlaceSvg />
        </div>
      )}
    </div>
  );
};

export default GameWheel;
