import React, { useEffect, useState } from "react";
import Aside from "../../Aside/Aside";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SP() {
  let token = useSelector((state) => state.user.token);
  let [flag, setflag] = useState(true);
  let [sps, setSp] = useState([]);
  let [topSps, setTopSp] = useState([]);
  let [worstSps, setWorstSp] = useState([]);

  useEffect(() => {
    axios
      .get("https://wecare-api-pzwn.onrender.com/api/v1/providers", {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSp(res.data.data.providers);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        "https://wecare-api-pzwn.onrender.com/api/v1/providers?rating[gte]=4.8",
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTopSp(res.data.data.providers);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        "https://wecare-api-pzwn.onrender.com/api/v1/providers?rating[lte]=2",
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setWorstSp(res.data.data.providers);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <ul className="nav nav-tabs ">
            <li className="nav-item  col-5">
              <a
                className={
                  flag ? "text-main shadow-sm rounded-pill px-2" : "text-muted"
                }
                onClick={() => {
                  setflag(true);
                }}
              >
                Top 5
              </a>
            </li>
            <li className="nav-item col-6">
              <a
                className={
                  flag ? "text-muted" : "text-main shadow-sm rounded-pill px-2"
                }
                onClick={() => {
                  setflag(false);
                }}
              >
                Worst 5
              </a>
            </li>
          </ul>
          {flag ? (
            <div>
              {topSps.map((tsp) => (
                <div className="m-3 col-12 d-flex p-2 align-items-center justify-content-evenly bg-white rounded-5 shadow-sm">
                  <img
                    src={`${tsp.profileImg}`}
                    className="w-50 p-2  rounded-circle"
                  ></img>
                  <div className="text-start">
                    <h6 className="fs-12">{tsp.firstName}</h6>
                    <div className="ratingBox">
                      <p>
                        {tsp.rating}
                        <i className=" ps-1 text-warning fa-solid fa-star"></i>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {worstSps.map((wsp) => (
                <div className="m-3 col-12 d-flex p-2 align-items-center justify-content-evenly bg-white rounded-5 shadow-sm">
                  <img
                    src={`${wsp.profileImg}`}
                    className="w-50 p-2  rounded-circle"
                  ></img>
                  <div className="text-start">
                    <h6 className="fs-12">{wsp.firstName}</h6>
                    <div className="ratingBox">
                      <p>
                        {wsp.rating}
                        <i className=" ps-1 text-warning fa-solid fa-star"></i>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-10">
          <h6 className="text-main text-start">All Service providers</h6>
          <div className="h-500 overflow-scroll shadow">
            <table className="table bg-white table-responsive rounded-5 text-start w-75 shadow-sm p-1 my-2 ">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>First</th>
                  <th>Last</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>ِAll Details</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {sps.map((sp) => (
                  <tr>
                    <th scope="row">
                      <img
                        src={`${sp.profileImg}`}
                        className="w-100   rounded-circle"
                      ></img>
                    </th>
                    <td>{sp.firstName}</td>
                    <td>{sp.lastName}</td>
                    <td>{sp.phoneNum}</td>
                    <td>{sp.email}</td>
                    <td>
                      <Link
                        className="btn btn-warning"
                        to={`/admin/providers/${sp._id}`}
                      >
                        All Details
                      </Link>
                    </td>

                    <td>
                      <Link
                        className="btn btn-success"
                        to={`/admin/providers/update/${sp._id}`}
                      >
                        Update
                      </Link>
                    </td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <button className="mybtn btnSecSolid col-1 fs-6 m-1">Nurses</button>
            <button className="mybtn btnSecSolid col-1 fs-6 m-1">
              Autism Sp
            </button>
            <button className="mybtn btnSecSolid col-1 fs-6 m-1">
              Companions
            </button>
            <button className="mybtn btnSecSolid col-1 fs-6 m-1">
              Doctors
            </button>
          </div>
        </div>
        {/* <div className="col-3 ">
          <div className="bg-white rounded-5 shadow-sm p-1">
            <h5 className="text-center">Top 5 SP</h5>
            <hr className="w-100" />
            <ul className="text-start">
              <div>
                <li className="d-flex align-items-center">
                  <img className="px-2 rounded-circle w-25" src="" />
                  <div className="text-start">
                    <h6>name</h6>
                    <p>rating</p>
                  </div>
                </li>
                <hr className="w-50 m-auto " />
              </div>
            </ul>
          </div>
          <div className="bg-white rounded-5 shadow-sm p-1 mt-3">
            <h5 className="text-center">worst 5 SP</h5>
            <hr className="w-100" />
            <ul className="text-start">
              <div>
                <li className="d-flex align-items-center">
                  <img className="px-2 rounded-circle w-25" src="" />
                  <div className="text-start">
                    <h6>name</h6>
                    <p>rating</p>
                  </div>
                </li>
                <hr className="w-50 m-auto " />
              </div>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}
