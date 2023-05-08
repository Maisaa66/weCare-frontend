import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classes from "./signup.module.css";
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../Redux Store/slices/userInfo";
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from "@mui/material";
import axios from "axios";
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

export default function StepFive() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    documents: [],
  });
  const [isError, setIsError] = useState({ status: false, message: "" });

  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userInfo.userDetails);

  const handleClick = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    // append the files to FormData
    if (file) {
      Object.values(file).forEach((file) => {
        formData.append(file.name, file);
      });
      // formData.append("file", file);
      formData.append("email", userDetails.email);
      console.log(file);
      // setUserData({ ...userData, documents: formData });
      await axios
        .post("https://wecare-api-pzwn.onrender.com/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setUserData({
            ...userData,
            documents: userData.documents.push(...res.data.filePath), //res.data.filePath[0
          });

          console.log("file paths: ", res.data.filePath);
        })
        .catch((err) => console.log("from file axios: ", err));

      console.log(userData);
      dispatch(setUserDetails(userData));
      navigate("/signup/stepthree");
    } else {
      setIsError({ status: true, message: "Please upload your files" });
    }
  };

  const [file, setFile] = React.useState(null);
  const [filename, setFilename] = React.useState(`${t("formDocuments")}`);
  const onChange = (e) => {
    e.preventDefault();
    // console.log(e.target.files);
    // array of files
    setFile(e.target.files);
    // setFilename(e.target.files[0].name);
    // setFilename(e.target.files.map((file) => file.name));
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
              {t("formSubTitleFive")}
            </Typography>
            <Box sx={{ m: 3 }}>
              <ProgressBar stepNum={4}></ProgressBar>
            </Box>
            <Box>
              {/* <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p
                    style={{
                      backgroundColor: "#daefea",
                      padding: "50px",
                      borderRadius: "10px",
                    }}
                  >
                    Drag 'n' drop some files here, or click to select files
                  </p>
                </div>
                <aside>
                  {files.length !== 0 && <h4>Uploaded Files</h4>}
                  <ul>{files}</ul>
                </aside>
              </section> */}
              <div className="custom-file mb-4">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  multiple
                  onChange={onChange}
                />

                <label className="custom-file-label" htmlFor="customFile">
                  {filename}
                </label>
              </div>
            </Box>
            <div>
              {isError.status && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {isError.message}
                </Alert>
              )}
              <button onClick={handleClick} className={`${classes.btn}`}>
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
                <span>{`${t("upload")}`}</span>
              </button>
            </div>
          </Box>

          <Copyright sx={{ mt: 2, mb: 5 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
