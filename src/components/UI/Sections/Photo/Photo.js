import React from "react";

import classes from "./Photo.module.css";

const Photo = ({ img, height }) => {
  const style = {
    width: "250px",
    height: `${height || "250px"}`,
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div>
      <div className={`${classes.img_container} rounded-5 shadow m-2`} style={style}></div>
    </div>
  );
};

export default Photo;
