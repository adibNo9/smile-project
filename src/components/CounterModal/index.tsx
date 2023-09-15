import { FC, useEffect, useState } from "react";

import { CounterBorderSvg } from "../../assets/icons/counter-border-svg";
import styles from "./styles.module.css";

interface ICounterModal {
  seconds: number;
  onHideModal: () => void;
}

const CounterModal: FC<ICounterModal> = ({ onHideModal, seconds }) => {
  const [counter, setCounter] = useState(seconds);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    counter === 0 && onHideModal();
  }, [counter, onHideModal]);

  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles["counter-modal"]}>
        <CounterBorderSvg />
        <div className={styles["number-wrapper"]}>
          <p className={styles["counter-number"]}>{counter}</p>
        </div>
      </div>
    </>
  );
};

export default CounterModal;
