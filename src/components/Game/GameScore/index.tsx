import cls from "classnames";

import { ScoreHand } from "../../../assets/icons/score-hand";
import { ScoreSvg } from "../../../assets/icons/score-svg";
import { ScoreWrapperIcon } from "../../../assets/icons/score-wrapper-icon";
import styles from "./styles.module.css";

const GameScore = ({
  className,
  coefficient,
}: {
  className?: string;
  coefficient: number;
}) => {
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
    "active-coefficient": coefficient === 2,
  });

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

      <ScoreHand className={styles["score-hand"]} />
      <ScoreWrapperIcon className={styles["wrapper-svg"]} />
      <ScoreSvg className={styles["score-svg"]} />
    </div>
  );
};

export default GameScore;
