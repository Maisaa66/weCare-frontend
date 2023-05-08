import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import classes from "./ReviewForm.module.css";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Rating from "@mui/material/Rating";

export default function ReviewForm({ revieweeName }) {
  const token = useSelector((state) => state.user.token);

  // get reviewer id from redux store
  const reviewerID = useSelector((state) => state.user.id);

  // get reviewee id
  const revieweeID = useSelector((state) => state.user.profileID);

  // review schema, this will be sent to backend to create a new review
  const reviewSchema = {
    reviewerId: reviewerID,
    revieweeId: revieweeID,
    postDate: new Date(),
    rate: "",
    comment: "",
  };

  // state to store request data
  const [open, setOpen] = React.useState(false);
  const [reviewData, setReviewData] = React.useState({
    reviewerId: reviewerID,
    revieweeId: revieweeID,
    postDate: new Date(),
    rate: "",
    comment: "",
  });

  // handle open and close of dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // collect data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  // handle review
  const handleReview = async () => {
    axios
      .post("https://wecare-api-pzwn.onrender.com/api/v1/reviews", reviewData, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    console.log(reviewData);
    setReviewData({ ...reviewSchema });
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
        <Button
          onClick={handleClickOpen}
          className={`h-50 p-2 rounded-pill ${classes.button}`}
        >
          Add Review
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Get the care you need now</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Describe your experience with {revieweeName}
            </DialogContentText>
            <Grid container spacing={2} className="mt-3">
              <Grid item xs={12} sm={12}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label mt-4"
                  sx={{ textAlign: "left" }}
                >
                  Please rate your experience
                </FormLabel>
                <Rating
                  name="rate"
                  value={reviewData.rate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label mt-4"
                  sx={{ textAlign: "left" }}
                >
                  Please enter your review
                </FormLabel>
                <TextareaAutosize
                  maxRows={4}
                  aria-label="maximum height"
                  placeholder="Feel free to describe your experience"
                  variant="standard"
                  className="form-control mt-3 w-100"
                  name="comment"
                  value={reviewData.comment}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReview}>Submit Review</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
