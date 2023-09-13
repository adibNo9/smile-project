import { useState } from "react";

import { ScoreSvg } from "../../assets/icons/score-svg";
import FinalFormModal from "../../components/FinalFormModal";
import GameCounter from "../../components/Game/GameCounter";
import GameMediaRecorder from "../../components/Game/GameMediaRecorder";
import GameTurntable from "../../components/Game/GameTurntable";
import styles from "./styles.module.css";

const GameContainer = () => {
  const [isShowForm, setIsShowForm] = useState(false);

  const showFormHandler = () => {
    // setIsShowForm(true);
    // setIsShowForm(false);
  };

  return (
    <div className={styles["game-container"]}>
      <div className={styles["content-wrapper"]}>
        <div className={styles["score-wrapper"]}>
          <ScoreSvg />
        </div>
        <div className={styles["game-wrapper"]}>
          <GameTurntable />
        </div>
        <div className={styles["game-media-recorder"]}>
          <GameMediaRecorder />
        </div>
      </div>
      <div className={styles["game-couter"]}>
        <GameCounter
          seconds={10}
          size={200}
          strokeBgColor="#fff"
          strokeColor="#F8A61F"
          strokeWidth={4}
          onShowForm={showFormHandler}
        />
      </div>
      {isShowForm && <FinalFormModal />}
    </div>
  );
};

export default GameContainer;
