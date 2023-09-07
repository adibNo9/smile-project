import { FC, ReactNode } from "react";

import styles from "./styles.module.css";

interface IStepCard {
  children: ReactNode;
}

const StepCard: FC<IStepCard> = ({ children }) => {
  return <div className={styles["step-card"]}>{children}</div>;
};

export default StepCard;
