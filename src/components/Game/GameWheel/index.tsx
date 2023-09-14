import { useEffect, useState } from "react";

import cls from "classnames";

import { ArrowTurntable } from "../../../assets/icons/arrow-turntable";
import { GamePlaceSvg } from "../../../assets/icons/game-place-svg";
import { GiftTurntable } from "../../../assets/icons/gift-turntable";
import MainGameWheel from "../../../assets/images/turntable-game.png";
import injectStyle from "./injectStyle";
import styles from "./styles.module.css";

const GameWheel = ({
  isStartPage = false,
  className,
  isCounterEnded,
  isGameStart,
}: {
  isStartPage?: boolean;
  className?: string;
  isCounterEnded?: boolean;
  isGameStart?: boolean;
}) => {
  const [rotation, setRotation] = useState(0);
  const value = Math.ceil(Math.random() * 360);
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
    // console.log(isGameStart, isCounterEnded);
    if (isStartPage) {
      setRotation(360);
    } else if (isCounterEnded && isGameStart) {
      setRotation(1800 + value);
    }
  }, [value, isStartPage, isCounterEnded, isGameStart]);

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
