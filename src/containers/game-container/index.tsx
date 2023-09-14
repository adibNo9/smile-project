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
  const [startCounter, setStartCounter] = useState(true);
  const [gameCounter, setGameCounter] = useState<boolean | undefined>();
  const [isShowForm, setIsShowForm] = useState(false);

  const startGameCounterHandler = () => {
    setGameCounter(true);
  };

  useEffect(() => {
    !startCounter && startGameCounterHandler();
  }, [startCounter]);

  const stopGameCounterHandler = () => {
    setGameCounter(false);
  };

  const hideStartCounterHandler = () => {
    setStartCounter(false);
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
          startCounter={startCounter}
          gameCounter={gameCounter}
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
          isCounterStart={gameCounter}
          onStopCounter={stopGameCounterHandler}
        />
      </div>
      {startCounter && <CounterModal onHideModal={hideStartCounterHandler} />}
      {isShowForm && <FinalFormModal />}
    </div>
  );
};

export default GameContainer;
