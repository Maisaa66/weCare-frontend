import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Rating from "@mui/material/Rating";

const ReviewGiven = ({ review, urlType }) => {
  const token = useSelector((state) => state.user.token);

  // const userType = useSelector((state) => state.user.userType);
  // we get the profile id from the redux store because we need it to fetch the user profile data
  // the profile id is the id of the user that we want to see his profile
  // const profileId = useSelector((state)=> state.user.id);
  // let urlType =""
  const [userName, setUserName] = useState(null);

  const getUserById = async (id) => {
    // console.log("user type: ", userType);
    // console.log("profile id from review card: ", profileId);
    // console.log("from feview gived card: ",id);
    // if the user is logged in and he is trying to see his own profile, we will fetch his data from the users collection
    // if the user is logged in and he is trying to see another user profile, we will fetch his data from the providers collection
    // if the user is not logged in, we will fetch the data from the providers collection
    // if(id !== profileId ){
    //   urlType = userType === "user" ? "users" : "providers"
    // }
    // else if ( id === profileId) {
    //   urlType = userType === "user" ? "providers" : "users"
    //   }
    //   else{
    //     urlType = "providers"
    //   }
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
    // console.log(info);
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
