import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import classes from "../../../Pages/Provider/ProviderCard/ProviderCard.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import AntSwitch from "../ToggleButton/ToggleButton";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import PayButton from "../Checkout/PayButton/PayButton";
import Alert from "@mui/material/Alert";

export default function RequestForm({ providerId, hourlyRate }) {
  const token = useSelector((state) => state.user.token);

  // get customer id from redux store
  const customerId = useSelector((state) => state.user.id);

  // req schema, this will be sent to backend to create a new request
  const reqSchema = {
    totalHrs: "",
    startDate: "",
    endDate: "",
    providerId: providerId,
    hourlyRate: hourlyRate,
    customerId: customerId,
    reqDescription: "",
    recurring: false,
  };

  // state to store request data
  const [open, setOpen] = React.useState(false);
  const [sDate, setStartDate] = React.useState(new Date());
  const [eDate, setEndDate] = React.useState(new Date());
  const [reqData, setReqData] = React.useState({
    totalHrs: "",
    startDate: "",
    endDate: "",
    providerId: providerId,
    hourlyRate: hourlyRate,
    customerId: customerId,
    reqDescription: "",
    recurring: false,
  });
  const userType = useSelector((state) => state.user.userType);
  const [checked, setChecked] = React.useState(false);
  // handle open and close of dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // handle request
  const handleRequest = async () => {
    if (!userType || userType === "serviceProvider") {
      setChecked(true);
    } else {
      axios
        .post("https://wecare-api-pzwn.onrender.com/api/v1/requests", reqData, {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      setChecked(false);
      setReqData({ ...reqSchema });
      setOpen(false);
    }
  };

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
      MuiTextField: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            color: "var(--mainColor)",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          onClick={handleClickOpen}
          className={`btn btn-rounded waves-effect w-md waves-light text-muted ${classes.button_color}`}
        >
          Request a service
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Get the care you need now</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To request a service, please enter all your request information
              here. We will send updates
            </DialogContentText>
            <Grid container spacing={2} className="mt-3">
              <Grid item xs={12} sm={6}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label mt-4"
                  sx={{ textAlign: "left" }}
                >
                  Please enter start date
                </FormLabel>
                <DatePicker
                  selected={sDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setReqData({ ...reqData, startDate: date });
                    console.log(date);
                  }}
                  className="form-control"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label mt-4"
                  sx={{ textAlign: "left" }}
                >
                  Please enter end date
                </FormLabel>
                <DatePicker
                  selected={eDate}
                  onChange={(date) => {
                    setEndDate(date);
                    setReqData({ ...reqData, endDate: date });
                    console.log(date);
                  }}
                  className="form-control z-3"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} alignItems="center">
                <div className="d-flex  mt-4 justify-content-between align-items-center">
                  <Typography sx={{ mr: 2, fontSize: "0.9rem" }}>
                    One Time Service
                  </Typography>
                  <AntSwitch
                    // defaultChecked
                    checked={reqData.recurring}
                    onChange={(e) => {
                      setReqData({ ...reqData, recurring: e.target.checked });
                    }}
                    inputProps={{ "aria-label": "ant design" }}
                    sx={{ mr: 2 }}
                  />
                  <Typography sx={{ fontSize: "0.9rem" }}>Recurring</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="totalHrs"
                  label="Total Hours Needed"
                  type="number"
                  fullWidth
                  variant="outlined"
                  name="totalHrs"
                  value={reqData.totalHrs}
                  onChange={(e) => {
                    setReqData({ ...reqData, totalHrs: +e.target.value });
                  }}
                  className="mt-md-3"
                  size="small"
                  InputLabelProps={{
                    style: {
                      fontSize: "0.8rem",
                      zIndex: 0,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextareaAutosize
              maxRows={4}
              aria-label="maximum height"
              placeholder="If you have special requests, please enter here."
              variant="standard"
              className="form-control mt-3 w-100"
              value={reqData.reqDescription}
              onChange={(e) => {
                setReqData({ ...reqData, reqDescription: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions className="d-flex flex-column align-items-end">
            {checked && (
              <div className="align-self-center w-75  mb-3">
                <Alert severity="error">Please Login !</Alert>
              </div>
            )}
            <div>
              <Button onClick={handleClose}>Cancel</Button>
              {/* <Button onClick={handleRequest}>Request</Button> */}
              <PayButton
                requestDetails={{ sDate, eDate, reqData }}
                onClick={handleRequest}
              />
            </div>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
