import Steps from "../../components/Steps";
import styles from "./styles.module.css";

const StartContainer = () => {
  return (
    <div className={styles["start-container"]}>
      <div className={styles["content-wrapper"]}>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
          voluptatibus accusantium quidem placeat voluptates expedita a est quis
          fuga.
        </p>
        <button className={styles["start-button"]}>Start</button>
        <Steps />
      </div>
    </div>
  );
};

export default StartContainer;
