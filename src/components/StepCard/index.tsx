import { FC, ReactNode } from "react";

import cls from "classnames";

import GameSvg from "../../assets/icons/game-svg";
import styles from "./styles.module.css";

interface IStepCard {
  children: ReactNode;
  className: string;
}

const StepCard: FC<IStepCard> = ({ children, className }) => {
  return (
    <div className={cls(styles["step-card"], className)}>
      <GameSvg className={styles.border} />
      {children}
    </div>
  );
};

export default StepCard;
