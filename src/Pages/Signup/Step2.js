import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classes from "./signup.module.css";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";
import DropDown from "../../components/UI/DropDown/DropDown";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../Redux Store/slices/userInfo";
import { addUser } from "../../Redux Store/slices/userSlice";
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

export default function StepTwo() {
  const { t } = useTranslation();
  const dropDownObj = {
    title: `${t("formCountry")}`,
    options: ["Egypt", "Canada"],
  };
  const navigate = useNavigate();
  const userType = useSelector((state) => state.userInfo.type);

  //states
  const [userData, setUserData] = useState({});

  const [address, setAddress] = useState(
    userType === "Care Beneficiary"
      ? {
          country: "",
          governate: "",
          area: "",
          street: "",
          buildingNum: "",
          apartmentNum: "",
        }
      : {
          country: "",
          governate: "",
        }
  );

  const [drowpdownError, setDropdownError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ address });

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userInfo.userDetails);

  //   const styles = useStyles();
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setUserData({ ...userData, address });
  //   dispatch(setUserDetails({ ...userData, address }));
  //   if (userType === "Care giver") {
  //     navigate("/signup/stepfour");
  //   } else if (userType === "Care Beneficiary") {
  //     dispatch(addUser({...userDetails, address:address}));
  //     navigate("/signup/stepthree");
  //   }
  // };

  const onSubmit = (data) => {
    if (address.country === "") {
      setDropdownError(true);
      console.log(drowpdownError);
    } else {
      data.country = address.country;

      dispatch(setUserDetails({ ...userDetails, address: data }));
      if (userType === "Care giver") {
        navigate("/signup/stepfour");
      } else if (userType === "Care Beneficiary") {
        console.log("added user: ", { ...userDetails, address: data });
        dispatch(addUser({ ...userDetails, address: data }));
        navigate("/signup/stepthree");
      }
    }
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setAddress({ ...address, [name]: value });
  //   setUserData({ ...userData, address: { ...address, [name]: value } });
  // };

  const handleDropDownChange = (value) => {
    if (value) {
      setDropdownError(false);
    }
    setAddress({ ...address, country: value });
    // setUserData({ ...userData, address: { ...address, country: value } });
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
              {t("formSubTitleThree")}
            </Typography>
            <Box sx={{ m: 3 }}>
              <ProgressBar stepNum={2}></ProgressBar>
            </Box>

            <Box
              component="form"
              onSubmit={(e) => {
                handleSubmit(onSubmit)(e);
                address.country === ""
                  ? setDropdownError(true)
                  : setDropdownError(false);
              }}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DropDown
                    dropDownObj={dropDownObj}
                    handleDropDownChange={handleDropDownChange}
                    error={drowpdownError}
                  ></DropDown>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="governate"
                    label={`${t("governate")}`}
                    autoComplete="governate"
                    sx={{ textAlign: "left" }}
                    {...register("governate", {
                      required: "Please enter your governate",
                    })}
                    error={Boolean(errors.governate)}
                    helperText={errors.governate && errors.governate.message}
                    // value={userData.nationalID}
                    // onChange={handleChange}
                  />
                </Grid>
              </Grid>
              {userType === "Care Beneficiary" && (
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="area"
                        label={`${t("area")}`}
                        autoComplete="area"
                        sx={{ textAlign: "left" }}
                        {...register("area", {
                          required: "Please enter your area",
                        })}
                        error={Boolean(errors.area)}
                        helperText={errors.area && errors.area.message}
                        // value={address.area}
                        // onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="street"
                        label={`${t("street")}`}
                        autoComplete="street"
                        sx={{ textAlign: "left" }}
                        {...register("street", {
                          required: "Please enter your street",
                        })}
                        error={Boolean(errors.street)}
                        helperText={errors.street && errors.street.message}
                        // value={address.street}
                        // onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="buildingNum"
                        label={`${t("building")}`}
                        // name="buildingNum"
                        autoComplete="buildingNum"
                        sx={{ textAlign: "left" }}
                        {...register("buildingNum", {
                          required: "Please enter your building number",
                        })}
                        error={Boolean(errors.buildingNum)}
                        helperText={
                          errors.buildingNum && errors.buildingNum.message
                        }
                        // value={address.buildingNum}
                        // onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="apartmentNum"
                        label={`${t("apartment")}`}
                        // name="apartmentNum"
                        autoComplete="apartmentNum"
                        sx={{ textAlign: "left" }}
                        {...register("apartmentNum", {
                          required: "Please enter your apartment number",
                        })}
                        error={Boolean(errors.apartmentNum)}
                        helperText={
                          errors.apartmentNum && errors.apartmentNum.message
                        }
                        // value={address.apartmentNum}
                        // onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Box>
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
