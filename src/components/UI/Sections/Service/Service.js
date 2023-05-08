import React from "react";

import classes from "./Service.module.css";

const Service = ({ ico, provider, sDesc }) => {
  return (
    <div className="col-8 col-md-6 col-lg-4">
      <div className={`${classes.card} d-flex flex-column justify-content-around m-auto mt-5 px-3`}>
        <div className="icon">
          <div className={`${classes.icon_container}`}>
            <i className={`${ico} ${classes.icon_size}`}></i>
          </div>
        </div>
        <h3 className={classes.header}>{provider}</h3>
        <p>{sDesc}</p>
      </div>
    </div>
  );
};

export default Service;
