import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-datepicker/dist/react-datepicker.css";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

export default function RequestDetail({
  request,
  handleUpdateStatus,
  reqStatus,
}) {
  const token = useSelector((state) => state.user.token);
  const userType = useSelector((state) => state.user.userType);

  // state to store request data
  const [open, setOpen] = React.useState(false);

  // handle open and close of dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = (status) => {
    axios
      .patch(
        `https://wecare-api-pzwn.onrender.com/api/v1/requests/${request._id}`,
        {
          reqStatus: status,
        },
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handleUpdateStatus(status);
      })
      .catch((err) => console.log(err));

    setOpen(false);
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
        <Button onClick={handleClickOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{
              width: "1.8rem",
              fill: "var(--mainColor)",
              cursor: "pointer",
            }}
          >
            <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
          </svg>
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth="true">
          {/* <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            className="border border-primary w-10"
          >
            <CloseIcon />
          </IconButton> */}
          <Box>
            {/* <DialogTitle>Request Details: </DialogTitle> */}
            <DialogTitle sx={{ m: 0, p: 2 }}>
              Request Details:
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ color: "black" }}>
                {request.reqDescription}
              </DialogContentText>
              <Grid container spacing={2} className="mt-3">
                <Grid item xs={12} sm={6}>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label mt-4"
                    sx={{ textAlign: "left" }}
                  >
                    Start Date
                  </FormLabel>
                  <DialogContentText style={{ color: "black" }}>
                    {request.startDate.split("T")[0]}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label mt-4"
                    sx={{ textAlign: "left" }}
                  >
                    End Date
                  </FormLabel>
                  <DialogContentText style={{ color: "black" }}>
                    {request.endDate.split("T")[0]}
                  </DialogContentText>
                </Grid>
              </Grid>
              <Grid container spacing={2} className="mt-3">
                <Grid item xs={12} sm={6}>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label mt-4"
                    sx={{ textAlign: "left" }}
                  >
                    Service Type
                  </FormLabel>
                  <DialogContentText style={{ color: "black" }}>
                    {request.recurring
                      ? "Opportunity to Recurring"
                      : "One Time Service"}
                  </DialogContentText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel
                    id="demo-row-radio-buttons-group-label mt-4"
                    sx={{ textAlign: "left" }}
                  >
                    Total Hours
                  </FormLabel>
                  <DialogContentText style={{ color: "black" }}>
                    {request.totalHrs}
                  </DialogContentText>
                </Grid>
              </Grid>
              {reqStatus === "pending" && userType === "serviceProvider" && (
                <Grid
                  container
                  spacing={2}
                  className="mt-3"
                  sx={{
                    display: "flex",
                    justifyContent: "between",
                    m: "auto",
                    width: "fit-content",
                  }}
                >
                  <Grid item xs={12} sm={6} alignItems="center">
                    <button
                      onClick={() => handleUpdate("approved")}
                      type="button"
                      class="btn btn-success"
                    >
                      Approve
                    </button>
                  </Grid>
                  <Grid item xs={12} sm={6} alignItems="center">
                    <button
                      onClick={() => handleUpdate("rejected")}
                      type="button"
                      class="btn btn-danger"
                    >
                      Reject
                    </button>
                  </Grid>
                </Grid>
              )}
            </DialogContent>
          </Box>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
