import * as React from "react";
import classes from "./BetterLiving.module.css";
import BTImg from "../../../assets/images/patient.jpg";
import { CheckCircle } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
const BetterLiving = () => {
  const { t } = useTranslation();
  return (
    <div className={`${classes.betterLiving}`}>
      <div className="container">
        <div className="row py-5 align-items-center">
          <div className={`${classes["img-container"]} col-lg-6`}>
            <div className={`overflow-hidden ${classes.betterLivingInfo} w-100`}></div>
          </div>
          <div className="col-lg-6 text-center text-md-start ps-4 py-3">
            <h3 className="fs-1 py-2 fw-bolder">
              {t("betterLivingTitle")}
              <span className={`${classes.spanHeading}`}>{t("betterLiving")}</span>{" "}
            </h3>
            <p className="py-2">{t("betterLivingDesc")}</p>
            <ul className="py-2 list-unstyled">
              <li>
                <CheckCircle className={`${classes.CheckCircle} fs-3 pe-2`}></CheckCircle>
                {t("benefitOne")}
              </li>
              <li>
                <CheckCircle className={`${classes.CheckCircle} fs-3 pe-2`}></CheckCircle>
                {t("benefitTwo")}
              </li>
              <li>
                <CheckCircle className={`${classes.CheckCircle} fs-3 pe-2`}></CheckCircle>
                {t("benefitThree")}
              </li>
              <li>
                <CheckCircle className={`${classes.CheckCircle} fs-3 pe-2`}></CheckCircle>
                {t("benefitFour")}
              </li>
            </ul>
            <button className="mybtn mybtnMainSolid m-auto m-md-0">{t("homeHeaderBtn")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetterLiving;
