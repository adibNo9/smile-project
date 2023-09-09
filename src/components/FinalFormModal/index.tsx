import { GiftPlace } from "../../assets/icons/gift-place";
import powerBank from "../../assets/images/power-bank.png";
import FinalForm from "../FinalForm";
import styles from "./styles.module.css";

const FinalFormModal = () => {
  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles["final-form-modal"]}>
        <div className={styles["gift-wrapper"]}>
          <img src={powerBank} alt="power-bank" />
          <GiftPlace />
        </div>
        <FinalForm />
      </div>
    </>
  );
};

export default FinalFormModal;
