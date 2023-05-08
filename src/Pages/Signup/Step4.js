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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

export default function StepFour() {
  // localaization
  const { t } = useTranslation();

  const [userData, setUserData] = useState({
    serviceType: "",
    title: "",
    experties: "",
    hourlyRate: "",
    nightShift: false,
    dateOfBirth: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [drowpdownError, setDropdownError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ userData });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setUserData({ ...userData, dateOfBirth: startDate });
  //   dispatch(setUserDetails(userData));
  //   navigate("/signup/stepfive");
  // };

  const onSubmit = (data) => {
    if (userData.serviceType === "") {
      setDropdownError(true);
    } else {
      data.serviceType = userData.serviceType;
      data.nightShift = userData.nightShift;
      dispatch(setUserDetails({ ...data, dateOfBirth: startDate }));
      navigate("/signup/stepfive");
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const dropDownObj = {
    title: `${t("formServiceType")}`,
    options: [
      "nurse",
      "companion",
      "nanny",
      "physiotherapist",
      "special-care:autism",
      "special-care:ADHD",
      "special-care:Alzheimer's and Dementia",
    ],
  };
  const handleDropDownChange = (value) => {
    if (value) {
      setDropdownError(false);
    }
    setUserData({ ...userData, serviceType: value });
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
              {t("formSubTitleFour")}
            </Typography>
            <Box sx={{ m: 3 }}>
              <ProgressBar stepNum={3}></ProgressBar>
            </Box>

            <Box
              component="form"
              onSubmit={(e) => {
                handleSubmit(onSubmit)(e);
                userData.serviceType === ""
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
                    id="title"
                    label={`${t("formTitle")}`}
                    // name="title"
                    autoComplete="title"
                    sx={{ textAlign: "left" }}
                    {...register("title", {
                      required: "Please enter your title",
                    })}
                    error={Boolean(errors.title)}
                    helperText={errors.title && errors.title.message}
                    // value={userData.title}
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
                    id="experties"
                    label={`${t("formExpertise")}`}
                    // name="experties"
                    autoComplete="experties"
                    sx={{ textAlign: "left" }}
                    {...register("experties", {
                      required: "Please enter your expertise",
                    })}
                    error={Boolean(errors.experties)}
                    helperText={errors.experties && errors.experties.message}
                    // value={userData.experties}
                    // onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="hourlyRate"
                    label={`${t("formHourlRate")}`}
                    // name="hourlyRate"
                    autoComplete="hourlyRate"
                    sx={{ textAlign: "left" }}
                    {...register("hourlyRate", {
                      required: "Please enter your hourly rate",
                    })}
                    error={Boolean(errors.hourlyRate)}
                    helperText={errors.hourlyRate && errors.hourlyRate.message}
                    // value={userData.hourlyRate}
                    // onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    sx={{ mt: 4, textAlign: "left" }}
                  >
                    {t("formNightShift")}
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="nightShift"
                    // {...register("nightShift", {
                    //   required:
                    //     "Please enter your availability for night shift",
                    // })}
                    // error={Boolean(errors.nightShift)}
                    // helperText={errors.nightShift && errors.nightShift.message}
                    onChange={handleChange}
                    value={userData.nightShift}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label={`${t("yes")}`}
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label={`${t("no")}`}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    sx={{ mb: 3, mt: 4, textAlign: "left" }}
                  >
                    {t("formBOD")}
                  </FormLabel>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setUserData({ ...userData, dateOfBirth: date });
                    }}
                  />
                </Grid>
              </Grid>

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
