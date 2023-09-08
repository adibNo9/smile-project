import { GamePlaceSvg } from "../../assets/icons/game-place-svg";
import { MainGameSvg } from "../../assets/icons/main-game-svg";
import { ScoreSvg } from "../../assets/icons/score-svg";
import FaceSmile from "../../assets/images/face-smile.png";
import GameCounter from "../../components/GameCounter";
import styles from "./styles.module.css";

const GameContainer = () => {
  return (
    <div className={styles["game-container"]}>
      <div className={styles["content-wrapper"]}>
        <div className={styles["score-wrapper"]}>
          <ScoreSvg />
        </div>
        <div className={styles["game-wrapper"]}>
          <MainGameSvg />
          <GamePlaceSvg />
        </div>
        <div className={styles["face-smile-wrapper"]}>
          <img src={FaceSmile} alt="face-smile" />
        </div>
      </div>
      <div className={styles["game-couter"]}>
        <GameCounter
          seconds={10}
          size={200}
          strokeBgColor="#fff"
          strokeColor="#F8461F"
          strokeWidth={4}
        />
      </div>
    </div>
  );
};

export default GameContainer;
