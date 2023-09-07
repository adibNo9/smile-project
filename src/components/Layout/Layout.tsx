import { Outlet } from "react-router-dom";

import MciLogo from "../../assets/images/mci-logo.png";
import ResearchDevelopmentLogo from "../../assets/images/research-development-logo.png";
import ResearchDevelopment from "../../assets/images/research-development-text.png";
import SmileLogo from "../../assets/images/smile-logo.png";
import styles from "./styles.module.css";

const Layout = () => {
  return (
    <>
      <div className={styles["layout-container"]}>
        <div className={styles["research-development-wrapper"]}>
          <img src={ResearchDevelopmentLogo} alt="research-development-logo" />
          <img src={ResearchDevelopment} alt="research-development-text" />
        </div>
        <div className={styles["smile-logo"]}>
          <img src={SmileLogo} alt="smile-logo" />
        </div>
        <div className={styles["mci-logo"]}>
          <img src={MciLogo} alt="mci-logo" />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
