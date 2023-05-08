import React from "react";

import classes from "./AlbumSection.module.css";
import Photo from "../Photo/Photo";
import { useTranslation } from "react-i18next";
const AlbumSection = () => {
  const { t } = useTranslation();
  return (
    // className={`${classes.background}`}
    <div>
      <div className="container p-5">
        <div className={classes.style}></div>
        <h1>
          {t("beatifulMomentTitle")}
          <span className={classes.colorized}>{t("moments")}</span>
        </h1>
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center mt-4">
          <div className="d-flex flex-column">
            <Photo img="https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
            <Photo img="https://images.unsplash.com/photo-1524117853209-a2fcab240719?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
          </div>
          <div className="d-flex flex-column">
            <Photo img="https://images.unsplash.com/photo-1532329683184-6ffd13057d1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80" />
            <Photo img="https://images.unsplash.com/photo-1545603343-8356d34ed7bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
          </div>
          <div>
            <Photo
              height="516px"
              img="https://images.unsplash.com/photo-1498757581981-8ddb3c0b9b07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumSection;
