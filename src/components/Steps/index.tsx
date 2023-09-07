import GameSvg from "../../assets/icons/game-svg";
import StepCard from "../StepCard";
import styles from "./styles.module.css";

const Steps = () => {
  return (
    <div className={styles["steps-container"]}>
      <StepCard>
        <GameSvg />
      </StepCard>
      <StepCard>
        <GameSvg />
      </StepCard>
      <StepCard>
        <GameSvg />
      </StepCard>
    </div>
  );
};

export default Steps;
