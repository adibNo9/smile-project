import { Outlet, useLocation } from "react-router-dom";

import { Iran } from "../../assets/icons/iran";
import { UnitedKingdom } from "../../assets/icons/united-kingdom";
import MciLogoFa from "../../assets/images/mci-fa.png";
import MciLogoEn from "../../assets/images/mci-logo.png";
import ResearchLogoFa from "../../assets/images/research-fa.png";
import ResearchLogoEn from "../../assets/images/research-logo.png";
import SmileLogoEn from "../../assets/images/smilette-logo.png";
import { useTransition } from "../../contexts/useTranslation";
import styles from "./styles.module.css";

const Layout = () => {
  const location = useLocation();
  const { locale, setLocale } = useTransition();
  const pathname = location.pathname;

  return (
    <>
      <div className={styles["layout-container"]}>
        <div className={styles["research-development-wrapper"]}>
          <img
            src={locale === "fa" ? ResearchLogoFa : ResearchLogoEn}
            alt="research-development-logo"
          />
        </div>
        {pathname !== "/game" && (
          <div className={styles["smile-logo"]}>
            <img src={SmileLogoEn} alt="smile-logo" />
          </div>
        )}

        <div className={styles["mci-logo"]}>
          <img src={locale === "fa" ? MciLogoFa : MciLogoEn} alt="mci-logo" />
        </div>
        <div className={styles["locale-control-wapper"]}>
          <button
            onClick={() =>
              setLocale((prevState) => (prevState === "en" ? "fa" : "en"))
            }
          >
            {locale === "en" ? <Iran /> : <UnitedKingdom />}
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
