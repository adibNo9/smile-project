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
  const [score, setScore] = useState(0);
  const [screenshot, setScreenshot] = useState<string | null>("");
  const [coefficient, setCoefficient] = useState(0);
  const [backendScore, setBackendScore] = useState(0);
  const [userGift, setUserGift] = useState<string>();

  useEffect(() => {
    userGift && userGift !== "repeat" && showFormHandler();
    userGift && userGift === "repeat" && window.location.reload();
  }, [userGift]);
  const giveUserGiftHandler = (value: string) => {
    setUserGift(value);
  };

  const increaseBackendScoreHandler = useCallback((value: string) => {
    setBackendScore((prevScore) => {
      if (prevScore < 0.99) {
        return prevScore + +value;
      } else {
        return 0.99;
      }
    });
  }, []);

  const changeCoefficientHandler = (score: number) => {
    if (score > 0.8 && score < 1) {
      setCoefficient(5);
    } else if (score > 0.6 && score < 0.8) {
      setCoefficient(4);
    } else if (score > 0.4 && score < 0.6) {
      setCoefficient(3);
    } else if (score > 0.2 && score < 0.4) {
      setCoefficient(2);
    } else if (score > 0 && score < 0.2) {
      setCoefficient(1);
    }
  };

  useEffect(() => {
    changeCoefficientHandler(score);
  }, [score]);

  const screenshotHandler = (value: string | null) => {
    setScreenshot(value);
  };

  const increaseScoreHandler = useCallback((value: number) => {
    setScore((prevScore) => {
      if (prevScore < 0.99) {
        return prevScore + value;
      } else {
        return 0.99;
      }
    });
  }, []);

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
    score === 0.02 && startGameHandler();
  }, [score]);

  return (
    <div className={styles["game-container"]}>
      <div className={styles["content-wrapper"]}>
        <GameScore
          score={score}
          coefficient={coefficient}
          className={cls(styles["item-wrapper"], styles["score-wrapper"])}
        />

        <GameWheel
          onGiveUserGift={giveUserGiftHandler}
          coefficient={coefficient}
          startCounter={startCounter}
          gameCounter={gameCounter}
          className={cls(styles["wheel-wrapper"], styles["item-wrapper"])}
        />

        {gameCounter !== false ? (
          <GameRecorder
            onIncreaseBackendScore={increaseBackendScoreHandler}
            onScreenshot={screenshotHandler}
            onIncreaseScore={increaseScoreHandler}
            gameCounter={gameCounter}
            onStartGame={startGameHandler}
            className={cls(styles["game-recorder"], styles["item-wrapper"])}
          />
        ) : (
          <div className={styles["screenshot-wrapper"]}>
            {screenshot ? <img src={screenshot} alt="screenshot" /> : <></>}
          </div>
        )}
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
        <CounterModal onHideModal={hideStartCounterHandler} seconds={5} />
      )}
      {isShowForm && <FinalFormModal userGift={userGift} />}
    </div>
  );
};

export default GameContainer;
