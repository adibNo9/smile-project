import { FC } from "react";

import cls from "classnames";

import { ScoreSvg } from "../../../assets/icons/score-svg";
import { ScoreWrapperIcon } from "../../../assets/icons/score-wrapper-icon";
import ScoreHand from "../../../assets/images/score-hand.png";
import injectStyle from "../GameWheel/injectStyle";
import styles from "./styles.module.css";

interface IGameScore {
  className?: string;
  coefficient: number;
  score: number;
}

const GameScore: FC<IGameScore> = ({ className, coefficient, score }) => {
  const activeFifth = cls({
    "active-coefficient": coefficient === 5,
  });

  const activeFourth = cls({
    "active-coefficient": coefficient === 4,
  });

  const activeThird = cls({
    "active-coefficient": coefficient === 3,
  });

  const activeSecond = cls({
    "active-coefficient": coefficient === 2,
  });

  const activeFirst = cls({
    "active-coefficient": coefficient === 1,
  });

  const keyframesStyle = `
        @-webkit-keyframes spin {
          0% {
              transform: rotate(-88deg) ;
          }
          100% {
              transform: rotateZ(${-88 + score * 180}deg) ;
          }
        }
      `;
  injectStyle(keyframesStyle);

  return (
    <div className={cls(className, styles["game-score-wrapper"])}>
      <div className={styles.circle} />
      <div className={styles["coefficient-wrapper"]}>
        <div className={cls(styles["coefficient"], styles[activeFifth])}>
          5x
        </div>
        <div className={cls(styles["coefficient"], styles[activeFourth])}>
          4x
        </div>
        <div className={cls(styles["coefficient"], styles[activeThird])}>
          3x
        </div>
        <div className={cls(styles["coefficient"], styles[activeSecond])}>
          2x
        </div>
        <div className={cls(styles["coefficient"], styles[activeFirst])}>
          1x
        </div>
      </div>

      <div className={styles["score"]}>
        <p>Score</p>
      </div>

      <img
        style={{
          transform: `rotate(${-88 + score * 170}deg)  translate(1%, -7%)`,
          objectFit: "cover",
          transition: "transform 5s ease",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 25,
        }}
        src={ScoreHand}
        alt="score-hand"
      />
      <ScoreWrapperIcon className={styles["wrapper-svg"]} />
      <ScoreSvg className={styles["score-svg"]} />
    </div>
  );
};

export default GameScore;
