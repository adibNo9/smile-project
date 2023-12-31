import { useCallback, useEffect, useState } from "react";

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
  const [coefficient, setCoefficient] = useState(0);
  const [backendScore, setBackendScore] = useState(0);
  const [userGift, setUserGift] = useState<string>();

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        userGift && userGift === "repeat"
          ? window.location.reload()
          : userGift && userGift !== "repeat" && showFormHandler(),
      7000
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [userGift]);
  const giveUserGiftHandler = (value: string) => {
    setUserGift(value);
  };

  const increaseBackendScoreHandler = useCallback((value: string) => {
    setBackendScore((prevScore) => {
      if (prevScore < 30) {
        return prevScore + +value;
      } else {
        return 30;
      }
    });
  }, []);

  const changeCoefficientHandler = (backendScore: number) => {
    if (backendScore > 24 && backendScore < 30) {
      setCoefficient(5);
    } else if (backendScore > 18 && backendScore < 24) {
      setCoefficient(4);
    } else if (backendScore > 12 && backendScore < 18) {
      setCoefficient(3);
    } else if (backendScore > 6 && backendScore < 12) {
      setCoefficient(2);
    } else if (backendScore > 0 && backendScore < 6) {
      setCoefficient(1);
    }
  };

  useEffect(() => {
    changeCoefficientHandler(backendScore);
  }, [backendScore]);

  const startGameHandler = () => {
    setGameCounter(true);
  };

  const stopGameCounterHandler = () => {
    setGameCounter(false);
  };

  const hideStartCounterHandler = () => {
    setStartCounter(false);
  };

  const showFormHandler = () => {
    setIsShowForm(true);
  };

  useEffect(() => {
    !startCounter && startGameHandler();
  }, [startCounter]);

  return (
    <div className={styles["game-container"]}>
      <div className={styles["content-wrapper"]}>
        <GameScore
          score={backendScore}
          coefficient={coefficient}
          className={cls(
            styles["item-wrapper"],
            styles["backendScore-wrapper"]
          )}
        />

        <GameWheel
          onGiveUserGift={giveUserGiftHandler}
          coefficient={coefficient}
          startCounter={startCounter}
          gameCounter={gameCounter}
          className={cls(styles["wheel-wrapper"], styles["item-wrapper"])}
        />

        <GameRecorder
          onIncreaseBackendScore={increaseBackendScoreHandler}
          gameCounter={gameCounter}
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
          isCounterStart={gameCounter}
          onStopCounter={stopGameCounterHandler}
        />
      </div>
      {startCounter && (
        <CounterModal onHideModal={hideStartCounterHandler} seconds={3} />
      )}
      {isShowForm && <FinalFormModal userGift={userGift} />}
    </div>
  );
};

export default GameContainer;
