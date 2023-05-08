import React, { useEffect, useState } from "react";
import classes from "./userDashBoard.module.css";
import FormDialog from "../../components/UI/FormDialog/FormDialog";
import NavBar from "../../components/Layout/NavBar/NavBar";
import styled from "@emotion/styled";
import ReviewCard from "../../components/UI/reviewCard/ReviewCard";
import RequestCard from "../../components/UI/RequestCard/RequestCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setToken,
  setInfo,
  setProfileId,
} from "../../Redux Store/slices/userSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const UserDashBoard = () => {
  const state = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);

  const [user, setUserDetails] = useState(null);
  const [requests, setRequests] = useState(null);
  const [flag, setFlag] = useState(false);
  const [reviewsMade, setReviewsMade] = useState(null);
  const dispatch = useDispatch();

  const getUserById = async (id) => {
    const response = await axios.get(
      `https://wecare-api-pzwn.onrender.com/api/v1/users/${id}`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(info);
    dispatch(setInfo(response.data.data));
    setUserDetails(response.data.data);
  };

  const getUserRequest = async (id) => {
    const response = await axios.get(
      `https://wecare-api-pzwn.onrender.com/api/v1/requests/user/${id}`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(info);
    setRequests(response.data.data);
  };

  const updateData = (data) => {
    setUserDetails({ ...user, ...data });
    if (Object.keys(data)[0].includes("address")) {
      setUserDetails({
        ...user,
        address: {
          ...user.address,
          [Object.keys(data)[0].split(".")[1]]: data[Object.keys(data)[0]],
        },
      });
    } else {
      setUserDetails({ ...user, ...data });
    }
  };

  const deleteRequest = (id) => {
    axios
      .delete(`https://wecare-api-pzwn.onrender.com/api/v1/requests/${id}`, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFlag(!flag);
      })
      .catch((err) => console.log(err));
  };

  const getReviewsMade = async (id) => {
    await axios
      .get(
        `https://wecare-api-pzwn.onrender.com/api/v1/reviews/reviewer/${id}`,
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setReviewsMade(res.data.data.reviews))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // console.log(state);
    getUserById(state);
    getUserRequest(state);
    getReviewsMade(state);
  }, []);

  console.log(reviewsMade);
  // console.log(requests.requests[0].reqStatus);

  return (
    <>
      {user && (
        <div className={`d-flex flex-column w-100  ${classes.mainBox}`}>
          <div className="shadow">
            <NavBar />
          </div>
          <div className="card my-3" style={{ width: "70%", margin: "auto" }}>
            <div className="card-body">
              <div className="d-flex align-items-center pb-4 border-bottom">
                <div className="position-relative">
                  <div
                    className="position-absolute top-100 start-100 translate-middle
    "
                  >
                    <FormDialog
                      data={{
                        label: "Image url",
                        name: "profileImg",
                        value: user.profileImg,
                      }}
                    />
                  </div>

                  <img
                    src={
                      user.profileImg
                        ? user.profileImg
                        : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    }
                    className="rounded-circle"
                    style={{ width: "100px" }}
                    alt="Avatar"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="ms-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="fs-3">
                        {user.firstName} {user.lastName}
                      </div>
                      {user.rating && (
                        <div
                          className="d-flex ms-3 rounded-pill px-2"
                          style={{
                            border: "1px solid #e8e6e6",
                            backgroundColor: "#e8e6e6",
                          }}
                        >
                          <div style={{ fontSize: "1rem" }}>{user.rating}</div>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            style={{ width: "20px", fill: "#ffdf00" }}
                            className="ms-1"
                          >
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        style={{ width: "15px" }}
                      >
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                      </svg>
                      <div className="ms-2">
                        {user.address.governate}, {user.address.country}
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/userProfile"
                    className={`h-50 p-2 rounded-pill ${classes.button}`}
                    onClick={() => dispatch(setProfileId(state))}
                  >
                    See Public View
                  </Link>
                </div>
              </div>
              <div className="d-flex flex-lg-row flex-sm-column justify-content-evenly">
                <div className="col-lg-6 col-sm-12 p-4 text-start">
                  <div className="contact m-4">
                    <div className="fw-bold fs-5">Contact Details: </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Phone Number: </div>
                      <div className="d-flex align-items-center">
                        <div>{user.phoneNum}</div>
                        <FormDialog
                          data={{
                            label: "Phone Number",
                            name: "phoneNum",
                            value: user.phoneNum,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Email: </div>
                      <div className="d-flex align-items-center">
                        <div>{user.email}</div>
                        <FormDialog
                          data={{
                            label: "Email",
                            name: "email",
                            value: user.email,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="address m-4">
                    <div className="fw-bold fs-5">Address Details: </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Country: </div>
                      <div className="d-flex align-items-center">
                        <div>{user.address.country}</div>
                        <FormDialog
                          data={{
                            label: "Country",
                            name: "address.country",
                            value: user.address.country,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Governate: </div>
                      <div className="d-flex align-items-center">
                        <div>{user.address.governate}</div>
                        <FormDialog
                          data={{
                            label: "Governate",
                            name: "address.governate",
                            value: user.address.governate,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Area: </div>
                      <div className="d-flex align-items-center">
                        <div>{user.address.area}</div>
                        <FormDialog
                          data={{
                            label: "Area",
                            name: "address.area",
                            value: user.address.area,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Street: </div>
                      <div className="d-flex align-items-center">
                        <div>{user.address.street}</div>
                        <FormDialog
                          data={{
                            label: "Street",
                            name: "address.street",
                            value: user.address.street,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Building Number: </div>
                      <div className="d-flex align-items-center">
                        <div>{user.address.buildingNum}</div>
                        <FormDialog
                          data={{
                            label: "Building Number",
                            name: "address.buildingNum",
                            value: user.address.buildingNum,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Apartment Number: </div>
                      <div className="d-flex align-items-center">
                        <div>{user.address.apartmentNum}</div>
                        <FormDialog
                          data={{
                            label: "Apartment Number",
                            name: "address.apartmentNum",
                            value: user.address.apartmentNum,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 p-4 text-start">
                  {/* req bar */}
                  <div className="fw-bold fs-5 mt-4">Requests</div>
                  <div
                    className={`card overflow-y-scroll w-100 ${classes.scrollbarMalinka} `}
                    style={{ height: "400px" }}
                  >
                    {requests && requests.requests.length === 0 ? (
                      <div className="fs-3 m-auto text-secondary">
                        No Requests Made Yet
                      </div>
                    ) : (
                      <div className="card-body">
                        {requests &&
                          requests.requests.map((request, index) => (
                            <RequestCard
                              request={request}
                              key={request._id}
                              ind={index}
                              deleteRequest={deleteRequest}
                              requests={requests}
                              setRequests={setRequests}
                            ></RequestCard>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* testimonels */}
              <section class="gradient-custom">
                <div class="container mx-4 p-4">
                  <div class="row d-flex justify-content-center">
                    <div class="col-md-12">
                      <div class="text-start">
                        <div className="fw-bold fs-5">Reviews Made By Me: </div>
                        <i class="fas fa-quote-left fa-3x text-white"></i>
                      </div>
                      <table className="table bg-white  rounded-5 text-start w-100 shadow-sm  my-2 ">
                        <thead>
                          <tr>
                            <th className="col-1">ProfileImg</th>
                            <th className="col-1">Provider Name</th>
                            <th className="col-1">Rating</th>
                            <th className="col-1">Comment</th>
                            <th className="col-1"> Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviewsMade && reviewsMade.length === 0
                            ? "No reviews made"
                            : reviewsMade &&
                              reviewsMade.map((review, index) => (
                                <ReviewCard
                                  review={review}
                                  key={review._id}
                                ></ReviewCard>
                              ))}
                        </tbody>
                      </table>
                      {/* <div class="card">
                        <div class="card-body">
                          <div
                            id="carouselDarkVariant"
                            class="carousel slide carousel-dark"
                            data-mdb-ride="carousel"
                          >
                            <div class="carousel-indicators mb-0">
                              <button
                                data-mdb-target="#carouselDarkVariant"
                                data-mdb-slide-to="0"
                                class="active"
                                aria-current="true"
                                aria-label="Slide 1"
                              ></button>
                              <button
                                data-mdb-target="#carouselDarkVariant"
                                data-mdb-slide-to="1"
                                aria-label="Slide 1"
                              ></button>
                              <button
                                data-mdb-target="#carouselDarkVariant"
                                data-mdb-slide-to="2"
                                aria-label="Slide 1"
                              ></button>
                            </div>

                            <div class="carousel-inner pb-5">
                              {reviewsMade && reviewsMade.length === 0
                                ? "No reviews made"
                                : reviewsMade &&
                                  reviewsMade.map((review, index) => (
                                    <div class={`carousel-item ${index===0?"active":""}`}>
                                      <ReviewCard review={review}></ReviewCard>
                                    </div>
                                  ))}
                            </div>

                            <button
                              class="carousel-control-prev"
                              type="button"
                              data-mdb-target="#carouselDarkVariant"
                              data-mdb-slide="prev"
                            >
                              <span
                                class="carousel-control-prev-icon"
                                aria-hidden="true"
                              ></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button
                              class="carousel-control-next"
                              type="button"
                              data-mdb-target="#carouselDarkVariant"
                              data-mdb-slide="next"
                            >
                              <span
                                class="carousel-control-next-icon"
                                aria-hidden="true"
                              ></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="text-center mt-4 pt-2">
                        <i class="fas fa-quote-right fa-3x text-white"></i>
                      </div> */}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashBoard;
