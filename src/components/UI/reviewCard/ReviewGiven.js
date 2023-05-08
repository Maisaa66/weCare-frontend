import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Rating from "@mui/material/Rating";

const ReviewGiven = ({ review, urlType }) => {
  const token = useSelector((state) => state.user.token);
  const [userName, setUserName] = useState(null);

  const getUserById = async (id) => {
    await axios
      .get(
        `https://wecare-api-pzwn.onrender.com/api/v1/${urlType}/profile/${id}`,
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setUserName(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserById(review.reviewerId);
  }, []);
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-lg-10 col-xl-8">
        <div className="row">
          <div className="col-lg-4 d-flex justify-content-center align-items-center">
            <img
              src={userName && userName.profileImg}
              className="rounded-circle shadow-1 mb-4 mb-lg-0"
              alt="woman avatar"
              width="150"
              height="150"
            />
          </div>
          <div className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
            <div>
              <h4>
                {userName && userName.firstName + " " + userName.lastName}
              </h4>
              <p style={{ fontSize: "0.8rem" }}>
                {review.postDate.split("T")[0]}
              </p>
            </div>

            <p className="mb-0 pb-3">{review && review.comment}</p>
            <Rating
              name="half-rating-read"
              defaultValue={review.rate}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewGiven;
