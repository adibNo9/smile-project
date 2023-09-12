import { useState } from "react";

import CounterModal from "../../components/CounterModal";
import Steps from "../../components/Steps";
import styles from "./styles.module.css";

const StartContainer = () => {
  const [isGameStart, setGameStart] = useState(false);

  return (
    <div className={styles["start-container"]}>
      <div className={styles["content-wrapper"]}>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
          voluptatibus accusantium quidem placeat voluptates expedita a est quis
          fuga.
        </p>
        <button
          className={styles["start-button"]}
          onClick={() => {
            setGameStart(true);
          }}
        >
          Start
        </button>
        <Steps />
      </div>
      {isGameStart && <CounterModal />}
    </div>
  );
};

export default StartContainer;
