import { Outlet, useLocation } from "react-router-dom";

import MciLogo from "../../assets/images/mci-logo.png";
import ResearchLogo from "../../assets/images/research-logo.png";
import SmileLogo from "../../assets/images/smilette-logo.png";
import styles from "./styles.module.css";

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <>
      <div className={styles["layout-container"]}>
        <div className={styles["research-development-wrapper"]}>
          <img src={ResearchLogo} alt="research-development-logo" />
        </div>
        {pathname !== "/game" && (
          <div className={styles["smile-logo"]}>
            <img src={SmileLogo} alt="smile-logo" />
          </div>
        )}

        <div className={styles["mci-logo"]}>
          <img src={MciLogo} alt="mci-logo" />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
