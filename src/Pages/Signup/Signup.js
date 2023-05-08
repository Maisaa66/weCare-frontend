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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  //states
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const userType = useSelector((state) => state.userInfo.type);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const styles = useStyles();
  // const handleSubmit = (event) => {
  //   console.log(userData);
  //   event.preventDefault();

  //   dispatch(setUserDetails(userData));
  //   navigate("/signup/stepone");
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserData({ ...userData, [name]: value });
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ userData });

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(setUserDetails(data));
    navigate("/signup/stepone");
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
              {t("welcome")}{" "}
              {userType === "Care giver"
                ? t("careGiver")
                : t("careBeneficiary")}
              !
            </Typography>
            <Typography component="h1" variant="h6" sx={{ m: 2 }}>
              {t("formSubTitleOne")}
            </Typography>
            <Box sx={{ m: 3 }}>
              <ProgressBar stepNum={0}></ProgressBar>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="firstName"
                    label={`${t("formFname")}`}
                    sx={{ textAlign: "left" }}
                    {...register("firstName", {
                      required: `${t("firstNameError")}`,
                    })}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName && errors.firstName.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    id="lastName"
                    label={`${t("formLname")}`}
                    sx={{ textAlign: "left" }}
                    {...register("lastName", {
                      required: `${t("lastNameError")}`,
                    })}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName && errors.lastName.message}
                  />
                </Grid>
              </Grid>

              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="email"
                label={`${t("loginEmail")}`}
                sx={{ textAlign: "left" }}
                {...register("email", {
                  required: `${t("emailError")}`,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                error={Boolean(errors.email)}
                helperText={errors.email && errors.email.message}
              />
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="password"
                label={`${t("password")}`}
                type="password"
                sx={{ textAlign: "left" }}
                {...register("password", {
                  required:  `${t("passwordError")}`,
                })}
                error={Boolean(errors.password)}
                helperText={errors.password && errors.password.message}
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
