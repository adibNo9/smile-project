import { useEffect, useState } from "react";

import { ArrowTurntable } from "../../../assets/icons/arrow-turntable";
import { GamePlaceSvg } from "../../../assets/icons/game-place-svg";
import { GiftTurntable } from "../../../assets/icons/gift-turntable";
import MainGameTurntable from "../../../assets/images/turntable-game.png";
import injectStyle from "./injectStyle";
import styles from "./styles.module.css";

const GameTurntable = () => {
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
    setRotation(1840);
  }, [value]);

  return (
    <>
      <div className={styles["turntable-game"]}>
        <div className={styles["arrow-turntable"]}>
          <ArrowTurntable />
        </div>
        <div className={styles["gift-turntable"]}>
          <GiftTurntable />
        </div>
        <img
          style={{
            transform: `rotate(${rotation}deg)`,
            marginTop: "-100px",
            width: "755px",
            height: "755px",
            objectFit: "cover",
            transition: "transform 3s ease-in-out",
            WebkitAnimation: "spin 3s linear 1",
          }}
          src={MainGameTurntable}
          alt="turntable"
          width={555}
          height={555}
        />
      </div>

      <div className={styles["turntable-place"]}>
        <GamePlaceSvg />
      </div>
    </>
  );
};

export default GameTurntable;
