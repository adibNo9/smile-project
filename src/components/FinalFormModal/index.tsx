import { FC } from "react";

import { GiftPlace } from "../../assets/icons/gift-place";
import airpod from "../../assets/images/airpod.png";
import flash from "../../assets/images/flash.png";
import mug from "../../assets/images/mug.png";
import nothing from "../../assets/images/nothing.png";
import powerBank from "../../assets/images/power-bank.png";
import FinalForm from "../FinalForm";
import styles from "./styles.module.css";

interface IFinalForm {
  userGift?: string;
}

const FinalFormModal: FC<IFinalForm> = ({ userGift }) => {
  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles["final-form-modal"]}>
        <div className={styles["gift-wrapper"]}>
          {userGift === "powerbank" ? (
            <img src={powerBank} alt="power-bank" />
          ) : userGift === "airpod" ? (
            <img src={airpod} alt="airpod" />
          ) : userGift === "mug" ? (
            <img src={mug} alt="mug" />
          ) : userGift === "flash" ? (
            <img src={flash} alt="flash" />
          ) : (
            <img src={nothing} alt="nothing" />
          )}
          <GiftPlace />
        </div>
        <FinalForm />
      </div>
    </>
  );
};

export default FinalFormModal;
