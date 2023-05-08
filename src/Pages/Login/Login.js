import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LinkMu from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classes from "./login.module.css";
import { Link } from "react-router-dom";
import DropDown from "../../components/UI/DropDown/DropDown";
import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, setToken } from "../../Redux Store/slices/userSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function Copyright(props) {
  // localaization
  const { t } = useTranslation();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {`${t("copyright")} © `}
      <LinkMu color="inherit">
        <Link to="/" style={{ color: "var(--mainColor)" }}>
          {t("slogan")}
        </Link>
      </LinkMu>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#66b9a6",
    },
  },
  typography: {
    fontFamily: "var(--textFont)",
  },

  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: "var(--mainColor)",
          border: "2px solid var(--mainColor)",
          fontWeight: 600,
          borderRadius: "20px",
          "&:hover": {
            backgroundColor: "transparent",
            border: "2px solid var(--mainColor)",
            color: "var(--mainColor)",
            fontWeight: 600,
          },
        },
      },
    },
  },
});

export default function SignIn() {
  // localaization
  const { t } = useTranslation();

  // states
  const [userType, setUserType] = useState("");
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState({ status: false, message: "" });
  // const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropDownObj = {
    title: `${t("loginType")}`,
    options: [`${t("careGiver")}`, `${t("careBeneficiary")}`],
  };

  // Functions
  const onSubmit = async (event) => {
    event.preventDefault();
    const expires = new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000
    ).toUTCString(); // 2 days from now

    if (userType === "") {
      setIsError({
        status: true,
        message: `${t("choosingWarning")}`,
      });
    } else if (!userData.email && !userData.password) {
      setIsError({
        status: true,
        message: `${t("loginEmptyError")}`,
      });
    } else if (!userData.email) {
      setIsError({ status: true, message: `${t("emailError")}` });
    } else if (!userData.password) {
      setIsError({ status: true, message: `${t("passwordError")}` });
    } else {
      if (userType === "Care Giver") {
        console.log("giver");
        await axios
          .post(
            "https://wecare-api-pzwn.onrender.com/api/v1/providers/login",
            userData
          )
          .then((res) => {
            document.cookie = `jwt=${res.data.cookie}; expires=${expires}`;
            dispatch(setToken());
            navigate("/");
          })
          .catch((error) =>
            setIsError({ status: true, message: error.response.data })
          );
      } else if (userType === "Care Beneficiary") {
        await axios
          .post(
            "https://wecare-api-pzwn.onrender.com/api/v1/users/login",
            userData
          )
          .then((res) => {
            document.cookie = `jwt=${res.data.cookie}; expires=${expires}`;
            dispatch(setToken());

            navigate("/");
          })
          .catch((error) =>
            setIsError({ status: true, message: error.response.data })
          );
      } else {
        setIsError({ status: true, message: `${t("loginInvalidError")}` });
      }
    }
  };
  const handleDropDownChange = (value) => {
    setUserType(value);
  };
  // Collect user Data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  // // onClick
  // const handleLogin = async () => {
  //   const jwt = Cookies.get("jwt");
  //   const expires = new Date(
  //     Date.now() + 2 * 24 * 60 * 60 * 1000
  //   ).toUTCString(); // 2 days from now

  //   if (userType === "Care Giver") {
  //     console.log("giver");
  //     await axios
  //       .post("http://localhost:7000/api/v1/providers/login", userData)
  //       .then((res) => (document.cookie = `jwt=${res.data.cookie}`))
  //       .catch((error) =>
  //         setIsError({ status: true, message: error.response.data })
  //       );
  //   } else if (userType === "Care Beneficiary") {
  //     await axios
  //       .post("http://localhost:7000/api/v1/users/login", userData)
  //       .then(
  //         (res) =>
  //           (document.cookie = `jwt=${res.data.cookie}; expires=${expires}`)
  //       )
  //       .catch((error) =>
  //         setIsError({ status: true, message: error.response.data })
  //       );
  //   } else {
  //     setIsError({ status: true, message: "Please choose user type" });
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={`${classes.box}`}
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
            padding: "5px",
            borderRadius: "20px",
            bgcolor: "white",
            mt: 3,
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "var(--mainColor)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("loginTitle")}
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{ margin: "auto", marginBottom: "20px" }}
                >
                  <DropDown
                    dropDownObj={dropDownObj}
                    handleDropDownChange={handleDropDownChange}
                  ></DropDown>
                </Grid>
              </Grid>
              <TextField
                value={userData.email}
                onChange={handleChange}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label={t("loginEmail")}
                autoComplete="email"
                sx={{ textAlign: "left" }}
              />
              <TextField
                value={userData.password}
                onChange={handleChange}
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("password")}
                type="password"
                id="password"
                autoComplete="current-password"
                color="primary"
                sx={{ textAlign: "left" }}
              />
              {isError.status && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {isError.message}
                </Alert>
              )}
              <div>
                <button type="submit" className={`${classes.btn}`}>
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
                  <span>{t("loginTitle")}</span>
                </button>
              </div>

              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h4" textAlign="center" fullWidth>
                    <span style={{ fontSize: "0.9rem" }}>
                      {t("donotHaveAccount")}
                    </span>
                    <LinkMu
                      href="#"
                      variant="body2"
                      style={{ color: "var(--mainColor)" }}
                      sx={{ fontWeight: "bold" }}
                    >
                      <Link
                        to="/checkuser"
                        style={{ color: "var(--mainColor)" }}
                      >
                        {" "}
                        {t("signupTitle")}
                      </Link>
                    </LinkMu>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
