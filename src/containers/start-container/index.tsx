import { useNavigate } from "react-router-dom";

import Steps from "../../components/Steps";
import styles from "./styles.module.css";

const StartContainer = () => {
  const navigate = useNavigate();
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
            navigate("/game");
          }}
        >
          Start
        </button>
        <Steps />
      </div>
    </div>
  );
};

export default StartContainer;
