import axios from "axios";
import classes from "./PayButton.module.css";
import { useState } from "react";

const PayButton = ({ requestDetails, onClick }) => {
  const handleCheckout = () => {
    axios
      .post(
        "https://wecare-api-pzwn.onrender.com/api/v1/stripe/create-checkout-session",
        {
          requestDetails,
        }
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button
        className={classes.payBtn}
        onClick={() => {
          handleCheckout();
          onClick();
        }}
      >
        CHECKOUT
      </button>
    </>
  );
};

export default PayButton;
