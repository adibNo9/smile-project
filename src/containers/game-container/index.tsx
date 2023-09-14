import { useEffect, useState } from "react";

import cls from "classnames";

import CounterModal from "../../components/CounterModal";
import FinalFormModal from "../../components/FinalFormModal";
import GameCounter from "../../components/Game/GameCounter";
import GameRecorder from "../../components/Game/GameRecorder";
import GameScore from "../../components/Game/GameScore";
import GameWheel from "../../components/Game/GameWheel";
import styles from "./styles.module.css";

const GameContainer = () => {
  const [isGameStart, setGameStart] = useState(true);
  const [isCounterStart, setIsCounterStart] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);

  const startCounterHandler = () => {
    setIsCounterStart(true);
  };

  useEffect(() => {
    !isGameStart && startCounterHandler();
  }, [isGameStart]);

  const stopCounterHandler = () => {
    setIsCounterStart(false);
  };

  const hideGameCounterHandler = () => {
    setGameStart(false);
  };

  const showFormHandler = () => {
    // setIsShowForm(true);
    // setIsShowForm(false);
  };

  return (
    <div className={styles["game-container"]}>
      <div className={styles["content-wrapper"]}>
        <GameScore
          coefficient={5}
          className={cls(styles["item-wrapper"], styles["score-wrapper"])}
        />

        <GameWheel
          isGameStart={!isGameStart}
          isCounterEnded={!isCounterStart}
          className={cls(styles["wheel-wrapper"], styles["item-wrapper"])}
        />

        <GameRecorder
          className={cls(styles["game-recorder"], styles["item-wrapper"])}
        />
      </div>
      <div className={styles["game-couter"]}>
        <GameCounter
          seconds={5}
          size={150}
          strokeBgColor="#fff"
          strokeColor="#F8A61F"
          strokeWidth={4}
          onShowForm={showFormHandler}
          isCounterStart={isCounterStart}
          onStopCounter={stopCounterHandler}
        />
      </div>
      {isGameStart && <CounterModal onHideModal={hideGameCounterHandler} />}
      {isShowForm && <FinalFormModal />}
    </div>
  );
};

export default GameContainer;
