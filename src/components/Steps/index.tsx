import faceGif from "../../assets/gifs/face-gif.gif";
import { ArrowSvg } from "../../assets/icons/arrow-svg";
import GameSvg from "../../assets/icons/game-svg";
import StepCard from "../StepCard";
import styles from "./styles.module.css";

const Steps = () => {
  return (
    <div className={styles["steps-container"]}>
      <StepCard>
        <div className={styles["face-wrapper"]}>
          <img src={faceGif} alt="face-analyser" />
          <GameSvg />
        </div>
      </StepCard>
      <ArrowSvg />
      <StepCard>
        <GameSvg />
      </StepCard>
      <ArrowSvg />
      <StepCard>
        <GameSvg />
      </StepCard>
    </div>
  );
};

export default Steps;
