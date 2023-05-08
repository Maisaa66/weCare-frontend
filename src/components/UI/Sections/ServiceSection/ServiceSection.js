import React from "react";

import Service from "../Service/Service";
import classes from "./ServiceSection.module.css";
import { useTranslation } from "react-i18next";
const ServiceSection = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1 className={`${classes.head_width}`}>
        {t("serviceSecTitle")}{" "}
        <span className={classes.colorized}>{t("qualityCare")}</span>
      </h1>
      <div
        className={`d-flex flex-column flex-md-row align-items-center justify-content-md-around mt-5`}
      >
        <div className={`row justify-content-center ${classes.containeer}`}>
          <Service
            ico="fa-solid fa-user-nurse"
            provider={t("nurseCardTitle")}
            sDesc={t("nurseCardDescrip")}
          />
          <Service
            ico="fa-solid fa-user-nurse"
            provider={t("companionCardTitle")}
            sDesc={t("companionCardDescrip")}
          />
          <Service
            ico="fa-solid fa-user-doctor"
            provider={t("physioCardTitle")}
            sDesc={t("physioCardDescrip")}
          />
          <Service
            ico="fa-solid fa-user-nurse"
            provider={t("nannyCardTitle")}
            sDesc={t("nannyCardDescrip")}
          />
          <Service
            ico="fa-solid fa-shield-virus"
            provider={t("autismCardTitle")}
            sDesc={t("autismCardDescrip")}
          />
          <Service
            ico="fa-solid fa-shield-virus"
            provider={t("alzheimerCardTitle")}
            sDesc={t("alzheimerCardDescrip")}
          />
          <Service
            ico="fa-solid fa-shield-virus"
            provider={t("adhdCardTitle")}
            sDesc={t("adhdCardDescrip")}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
