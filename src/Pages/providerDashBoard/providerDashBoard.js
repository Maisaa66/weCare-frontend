import React, { useEffect, useState } from "react";
import classes from "./providerDashBoard.module.css";
import FormDialog from "../../components/UI/FormDialog/FormDialog";
import NavBar from "../../components/Layout/NavBar/NavBar";
import ReviewCard from "../../components/UI/reviewCard/ReviewCard";
import RequestCard from "../../components/UI/RequestCard/RequestCard";
import { useDispatch, useSelector } from "react-redux";
import { setInfo, setProfileId } from "../../Redux Store/slices/userSlice";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";

const ProviderDashBoard = () => {
  const state = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);

  const [provider, setProviderDetails] = useState(null);
  const [requests, setRequests] = useState(null);
  const [reviewsMade, setReviewsMade] = useState(null);

  const dispatch = useDispatch();

  const getProviderById = async (id) => {
    const response = await axios.get(
      `https://wecare-api-pzwn.onrender.com/api/v1/providers/${id}`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setInfo(response.data.data));
    setProviderDetails(response.data.data);
  };

  const getProviderRequest = async (id) => {
    const response = await axios.get(
      `https://wecare-api-pzwn.onrender.com/api/v1/requests/provider/${id}`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data);
    setRequests(response.data.data);
  };

  const updateData = (data) => {
    if (Object.keys(data)[0].includes("address")) {
      setProviderDetails({
        ...provider,
        address: {
          ...provider.address,
          [Object.keys(data)[0].split(".")[1]]: data[Object.keys(data)[0]],
        },
      });
    } else {
      setProviderDetails({ ...provider, ...data });
    }
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
    getProviderById(state);
    getProviderRequest(state);
    getReviewsMade(state);
  }, []);

  console.log(requests);
  // console.log(requests.requests[0].reqStatus);

  return (
    <>
      {provider && (
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
                        value: provider.profileImg,
                      }}
                      updateData={updateData}
                    />
                  </div>

                  <img
                    src={
                      provider.profileImg
                        ? provider.profileImg
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
                        {provider.firstName} {provider.lastName}
                      </div>
                      {provider.rating && (
                        <div
                          className="d-flex ms-3 rounded-pill px-2"
                          style={{
                            border: "1px solid #e8e6e6",
                            backgroundColor: "#e8e6e6",
                          }}
                        >
                          <div style={{ fontSize: "1rem" }}>
                            {provider.rating}
                          </div>

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
                    {/* <div className="d-flex m">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        style={{ width: "20px" }}
                      >
                        <path d="M7.8 207.7c-13.1-17.8-9.3-42.8 8.5-55.9L142.9 58.5C166.2 41.3 194.5 32 223.5 32H384 544c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H507.2l-44.9 36c-22.7 18.2-50.9 28-80 28H304 288 224c-17.7 0-32-14.3-32-32s14.3-32 32-32h64 16c8.8 0 16-7.2 16-16s-7.2-16-16-16H183.4L63.7 216.2c-17.8 13.1-42.8 9.3-55.9-8.5zM382.4 160l0 0 .9 0c-.3 0-.6 0-.9 0zM568.2 304.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 453.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V384c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 352l0 0-.9 0c.3 0 .6 0 .9 0z" />
                      </svg>
                      <div className="ms-2">{provider.serviceType}</div>
                    </div> */}
                    <div className="d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        style={{ width: "15px" }}
                      >
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                      </svg>
                      <div className="ms-2">
                        {provider.address.governate}, {provider.address.country}
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/providerProfile"
                    className={`h-50 p-2 rounded-pill ${classes.button}`}
                    onClick={() => dispatch(setProfileId(state))}
                  >
                    See Public View
                  </Link>
                </div>
              </div>

              {(provider.status === "rejected" ||
                provider.status === "suspended") && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Your application has been {provider.status}, please contact
                  info@wecare.com for more details
                </Alert>
              )}

              <div className="d-flex flex-lg-row flex-sm-column justify-content-evenly">
                <div className="col-lg-6 col-sm-12 p-4 text-start">
                  <div className="expertise m-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <div
                          className="fw-bold fs-5"
                          style={{ textTransform: "capitalize" }}
                        >
                          {provider.serviceType}{" "}
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div>${provider.hourlyRate}/hr</div>
                        <FormDialog
                          data={{
                            label: "Hourly Rate",
                            name: "hourlyRate",
                            value: provider.hourlyRate,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>

                    <div className="">
                      {/* <div>Expertise: </div> */}
                      <div className="d-flex align-items-center">
                        <div>{provider.experties}</div>
                        <FormDialog
                          data={{
                            label: "Expertise",
                            name: "experties",
                            value: provider.experties,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="generalInfo m-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <div
                          className="fw-bold fs-5"
                          style={{ textTransform: "capitalize" }}
                        >
                          General Info:
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div>Gender: </div>
                      <div className="d-flex align-items-center">
                        <div>{provider.gender}</div>
                        <FormDialog
                          data={{
                            label: "Gender",
                            name: "gender",
                            value: provider.gender,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Date of birth: </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ marginRight: "63px" }}
                      >
                        <div>{provider.dateOfBirth.split("T")[0]}</div>
                      </div>
                    </div>
                  </div>
                  <div className="contact m-4">
                    <div className="fw-bold fs-5">Contact Details: </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Phone Number: </div>
                      <div className="d-flex align-items-center">
                        <div>{provider.phoneNum}</div>
                        <FormDialog
                          data={{
                            label: "Phone Number",
                            name: "phoneNum",
                            value: provider.phoneNum,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Email: </div>
                      <div className="d-flex align-items-center">
                        <div>{provider.email}</div>
                        <FormDialog
                          data={{
                            label: "Email",
                            name: "email",
                            value: provider.email,
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
                        <div>{provider.address.country}</div>
                        <FormDialog
                          data={{
                            label: "Country",
                            name: "address.country",
                            value: provider.address.country,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Governate: </div>
                      <div className="d-flex align-items-center">
                        <div>{provider.address.governate}</div>
                        <FormDialog
                          data={{
                            label: "Governate",
                            name: "address.governate",
                            value: provider.address.governate,
                          }}
                          updateData={updateData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 p-4 text-start">
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
                            ></RequestCard>
                          ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="mt-5">
                      <div className="fw-bold fs-5">Your Documents: </div>
                      {provider.documents &&
                        provider.documents.map((document, index) => {
                          return (
                            <a
                              key={document}
                              href={document}
                              target="_blank"
                              className="d-block"
                            >
                              document {index + 1}
                            </a>
                          );
                        })}
                    </div>
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

export default ProviderDashBoard;
