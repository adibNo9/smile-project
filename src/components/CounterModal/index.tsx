import { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { CounterBorderSvg } from "../../assets/icons/counter-border-svg";
import styles from "./styles.module.css";

const CounterModal = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);

  const navigateToDestination = useCallback(() => {
    navigate("/game");
  }, [navigate]);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    counter === 0 && navigateToDestination();
  }, [counter, navigateToDestination]);

  return (
    <>
      <div className={styles.backdrop}>CounterModal</div>
      <div className={styles["counter-modal"]}>
        <CounterBorderSvg />
        <p className={styles["counter-number"]}>{counter}</p>
      </div>
    </>
  );
};

export default CounterModal;
