import NavBar from "../NavBar/NavBar";
import classes from "./Header.module.css";
import { useTranslation } from "react-i18next";
function Header() {
  const { t } = useTranslation();
  return (
    <div className={`${classes.header} `}>
      <div className="d-none d-lg-block">
        <svg
          viewBox="0 0 190 100"
          className={`position-absolute ${classes.zBefore} ${classes.bgDiv}`}
        >
          <path
            d="M 0 70 C 200 150 300 0 500 100 L 500 0 L 0 0"
            fill="#0E7452"
            opacity="0.2"
          ></path>
        </svg>
      </div>
      {/* <SearchBar></SearchBar> */}
      <NavBar></NavBar>
      <div className="container mt-3 mt-md-5">
        <div className="row text-start align-items-center">
          <div className="col-sm-12 col-lg-6 px-4 p-md-0">
            <h1 className="h1 my-2">
              <span className={classes.span}>{t("slogan")}</span>
              {t("homeHeaderTitle")}
            </h1>
            <p className="lead my-4">{t("headerIntro")}</p>
            <button className="mybtn mybtnLightSolid my-2">
              {t("homeHeaderBtn")}
            </button>
          </div>
          <div className="col-sm-12 px-5 col-lg-6 text-lg-end text-sm-center">
            <div className={`${classes.bigger} d-none d-lg-block ms-auto`}>
              <div
                className={`${classes.customeImg}  ${classes.headerImg} ms-auto`}
              ></div>
            </div>
          </div>
        </div>
        <div
          className={`${classes.bigger} d-none d-md-block ${classes.smallBorder} ms-auto ${classes.zBefore} position-absolute`}
        >
          <div
            className={`${classes.customeImg} ${classes.shape} ms-auto`}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default Header;
