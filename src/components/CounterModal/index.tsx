import { useEffect, useState } from "react";

import { CounterBorderSvg } from "../../assets/icons/counter-border-svg";
import styles from "./styles.module.css";

const CounterModal = ({ onHideModal }: { onHideModal: () => void }) => {
  const [counter, setCounter] = useState(3);

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
