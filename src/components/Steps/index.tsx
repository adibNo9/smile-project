import faceGif from "../../assets/gifs/face-gif.gif";
import { ArrowSvg } from "../../assets/icons/arrow-svg";
import { GiftPlace } from "../../assets/icons/gift-place";
import { SingleGift } from "../../assets/icons/single-gift";
import GameTurntable from "../Game/GameTurntable";
import StepCard from "../StepCard";
import styles from "./styles.module.css";

const Steps = () => {
  return (
    <div className={styles["steps-container"]}>
      <StepCard className={styles["face-wrapper"]}>
        <img src={faceGif} alt="face-analyser" />
      </StepCard>
      <ArrowSvg className={styles.arrow} />
      <StepCard className={styles["wheel-wrapper"]}>
        <GameTurntable isStartPage={true} />
      </StepCard>
      <ArrowSvg className={styles.arrow} />
      <StepCard className={styles["gift-wrapper"]}>
        <SingleGift className={styles["single-gift"]} />
        <GiftPlace className={styles["gift-place"]} />
      </StepCard>
    </div>
  );
};

export default Steps;
