import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classes from "./signup.module.css";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";
import DropDown from "../../components/UI/DropDown/DropDown";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Redux Store/slices/userInfo";
import { useForm } from "react-hook-form";
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
      <Link color="inherit" to="/">
        {t("slogan")}
      </Link>{" "}
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

export default function StepOne() {
  // localaization
  const { t } = useTranslation();
  const dropDownObj = {
    title: `${t("formGender")}`,
    options: ["female", "male"],
  };

  //states
  const [userData, setUserData] = useState({
    phoneNum: "",
    nationalID: "",
    gender: "",
  });
  const [drowpdownError, setDropdownError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ userData });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const styles = useStyles();
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   dispatch(setUserDetails(userData));

  // };
  const onSubmit = (data) => {
    console.log("1", data);
    if (userData.gender === "") {
      console.log("2", data);

      setDropdownError(true);
      console.log(drowpdownError);
    } else {
      console.log("3", data);

      data.gender = userData.gender;
      console.log("4", data);
      dispatch(setUserDetails(data));
      navigate("/signup/steptwo");
    }
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserData({ ...userData, [name]: value });
  // };

  const handleDropDownChange = (value) => {
    if (value) {
      setDropdownError(false);
    }

    setUserData({ ...userData, gender: value });
  };

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
          maxWidth="md"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
            borderRadius: "20px",
            bgcolor: "white",
            padding: "0px 20px",
            [theme.breakpoints.down("sm")]: {
              padding: "30px",
            },
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "var(--mainColor)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ m: 2 }}>
              {t("formSubTitleTwo")}
            </Typography>
            <Box sx={{ m: 3 }}>
              <ProgressBar stepNum={1}></ProgressBar>
            </Box>

            <Box
              component="form"
              onSubmit={(e) => {
                handleSubmit(onSubmit)(e);
                userData.gender === ""
                  ? setDropdownError(true)
                  : setDropdownError(false);
              }}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="phoneNum"
                    label={`${t("formPhone")}`}
                    sx={{ textAlign: "left" }}
                    {...register("phoneNum", {
                      required: `${t("phoneError")}`,
                      minLength: {
                        value: 11,
                        message: "Phone number must be at least 11 digits",
                      },
                    })}
                    error={Boolean(errors.phoneNum)}
                    helperText={errors.phoneNum && errors.phoneNum.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DropDown
                    dropDownObj={dropDownObj}
                    handleDropDownChange={handleDropDownChange}
                    error={drowpdownError}
                  ></DropDown>
                </Grid>
              </Grid>

              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="nationalID"
                label={`${t("NationalID")}`}
                sx={{ textAlign: "left" }}
                {...register("nationalID", {
                  required: `${t("nationalIDError")}`,
                })}
                error={Boolean(errors.nationalID)}
                helperText={errors.nationalID && errors.nationalID.message}
                // value={userData.nationalID}
                // onChange={handleChange}
              />
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
                  <span>{t("nextStep")}</span>
                </button>
              </div>
            </Box>
          </Box>
          <Copyright sx={{ mt: 2, mb: 5 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
