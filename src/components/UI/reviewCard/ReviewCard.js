import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { setProfileId } from "../../../Redux Store/slices/userSlice";

const ReviewCard = ({ review }) => {
  const token = useSelector((state) => state.user.token);

  const userType = useSelector((state) => state.user.userType);
  let urlType = userType === "user" ? "providers" : "users";
  const [userName, setUserName] = useState(null);
  const dispatch = useDispatch();

  const getUserById = async (id) => {
    console.log(id);
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
    getUserById(review.revieweeId);
  }, []);

  return (
    //   <div className="row d-flex justify-content-center">
    //   <div className="col-lg-10 col-xl-8">
    //     <div className="row">
    //       <div className="col-lg-4 d-flex justify-content-center align-items-center">
    //         <img
    //           src={userName && userName.profileImg}
    //           className="rounded-circle shadow-1 mb-4 mb-lg-0"
    //           alt="woman avatar"
    //           width="150"
    //           height="150"
    //         />
    //       </div>
    //       <div className="col-9 col-md-9 col-lg-7 col-xl-8 text-center text-lg-start mx-auto mx-lg-0">
    //         <h4 className="mb-4">
    //           {userName && userName.firstName + " "+ userName.lastName}
    //         </h4>
    //         <p className="mb-0 pb-3">
    //           {review && review.comment}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      {userName && review && (
        <tr>
          <td>
            {" "}
            <img
              src={
                userName.profileImg
                  ? userName.profileImg
                  : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              }
              className="rounded-circle"
              style={{ width: "50px" }}
              alt="Avatar"
            />
          </td>
          <td>
            <Link
              to={userType === "user" ? "/providerProfile" : "/userProfile"}
              onClick={() => dispatch(setProfileId(userName._id))}
            >
              {userName.firstName + " " + userName.lastName}
            </Link>
          </td>
          <td>{review.rate}</td>
          <td>{review.comment}</td>
          <td>{review.postDate.split("T")[0]}</td>
        </tr>
      )}
    </>
  );
};

export default ReviewCard;
