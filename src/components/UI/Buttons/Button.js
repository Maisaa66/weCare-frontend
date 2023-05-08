import React from "react";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className="mybtn mybtnMainSolid">
      {props.children}
    </button>
  );
};

export default Button;
