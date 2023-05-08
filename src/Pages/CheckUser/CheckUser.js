import classes from "./CheckUser.module.css";
import { faHandHoldingHand } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import LinkMu from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../Redux Store/slices/userInfo";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CheckUser() {
  const [userType, setUserType] = useState("");
  const dispatch = useDispatch();

  // localaization
  const { t } = useTranslation();

  return (
    <div className={`${classes.box}`}>
      <div className={`${classes.container}`}>
        <h1>{t("signupFormTitle")}</h1>

        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12">
            <label>
              <input
                type="radio"
                name="user"
                className={`${classes.cardInputElement}`}
                onClick={() => {
                  setUserType(`${t("signupBene")}`);
                  dispatch(setUserInfo("Care Beneficiary"));
                }}
              />

              <div className={`${classes.cardInput}`}>
                <FontAwesomeIcon
                  icon={faHandHoldingHand}
                  style={{
                    color: "var(--mainColor)",
                    height: "30px",
                    margin: "10px",
                  }}
                />
                <div>{t("careBeneficiary")}</div>
              </div>
            </label>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12">
            <label>
              <input
                type="radio"
                name="user"
                className={`${classes.cardInputElement}`}
                onClick={() => {
                  setUserType(`${t("signupGiver")}`);
                  dispatch(setUserInfo("Care giver"));
                }}
              />

              <div className={`${classes.cardInput}`}>
                <FontAwesomeIcon
                  icon={faHandHoldingHeart}
                  style={{
                    color: "var(--mainColor)",
                    height: "30px",
                    margin: "10px",
                  }}
                />
                <div>{t("careGiver")}</div>
              </div>
            </label>
          </div>
        </div>
        <div>
          {!userType && <Alert severity="error">{t("choosingWarning")}</Alert>}
          {userType && (
            <Link to="/signup" className={`${classes.btn}`}>
              <svg width="277" height="62">
                <defs>
                  <linearGradient id="grad1">
                    <stop offset="0%" stopColor="#66b9a6" />
                    <stop offset="100%" stopColor="#5fe4c5" />
                  </linearGradient>
                </defs>
                <rect
                  x="5"
                  y="5"
                  rx="25"
                  fill="none"
                  stroke="url(#grad1)"
                  width="266"
                  height="50"
                ></rect>
              </svg>
              <span>
                {t("signupTitle")} {userType}
              </span>
            </Link>
          )}
        </div>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" textAlign="center" fullWidth>
              <span style={{ fontSize: "0.9rem" }}>{t("haveAccount")}</span>
              <LinkMu
                href="#"
                variant="body2"
                style={{ color: "var(--mainColor)" }}
                sx={{ fontWeight: "bold" }}
              >
                <Link to="/login" style={{ color: "var(--mainColor)" }}>
                  {t("loginTitle")}
                </Link>
              </LinkMu>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
