import { FC, useEffect, useState } from "react";

import cls from "classnames";

import { ArrowTurntable } from "../../../assets/icons/arrow-turntable";
import { GamePlaceSvg } from "../../../assets/icons/game-place-svg";
import { GiftTurntable } from "../../../assets/icons/gift-turntable";
import MainGameWheel from "../../../assets/images/wheel.png";
import injectStyle from "./injectStyle";
import styles from "./styles.module.css";

interface IGameWheel {
  isStartPage?: boolean;
  className?: string;
  startCounter?: boolean;
  gameCounter?: boolean | number;
  coefficient?: number;
  onGiveUserGift?: (value: string) => void;
}

const GameWheel: FC<IGameWheel> = ({
  isStartPage = false,
  className,
  gameCounter,
  startCounter,
  coefficient,
  onGiveUserGift,
}) => {
  const [rotation, setRotation] = useState(0);
  const [randomValue, setRandomValue] = useState(0);

  const keyframesStyle = `
        @-webkit-keyframes spin {
          0% {
              transform: rotateZ(0) ;
          }

          100% {
              transform: rotateZ(${rotation}deg) ;
          }
        }
      `;
  injectStyle(keyframesStyle);

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    if (isStartPage) {
      setRotation(360);
    } else if (startCounter === false && gameCounter === false && coefficient) {
      const value = randomIntFromInterval(1, 359);
      setRandomValue(value);
      setTimeout(() => setRotation(coefficient * 720 + value), 3000);
    }
  }, [gameCounter, isStartPage, startCounter, coefficient]);

  useEffect(() => {
    console.log(randomValue);
    let timeout: any;
    if (onGiveUserGift && gameCounter === false) {
      timeout = setTimeout(() => {
        if (randomValue > 19 && randomValue < 76) {
          onGiveUserGift("powerbank");
        } else if (randomValue > 126 && randomValue < 159) {
          onGiveUserGift("flash");
        } else if (randomValue > 209 && randomValue < 251) {
          onGiveUserGift("airpod");
        } else if (randomValue > 254 && randomValue < 276) {
          onGiveUserGift("repeat");
        } else if (randomValue > 277 && randomValue < 343) {
          onGiveUserGift("mug");
        } else {
          onGiveUserGift("nothing");
        }
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [randomValue, onGiveUserGift, gameCounter]);

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
